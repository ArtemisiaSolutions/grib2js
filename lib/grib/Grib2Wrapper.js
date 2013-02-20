var exec    = require('child_process').exec
var fs      = require('fs')
var config  = require('../../cfg/config')

module.exports = function Grib2() {

    var self = this
    this.wgrib2 = config.wgrib2


    function getLevelRequest(level) {
        if(level == 0 || level == "surface") {
            return ["-match", '"surface"']
        } else if(level.match(/^[0-9]+\s(m|mb)$/)){
            return ["-match", '"'+level+'"']			
        } else {
            return []
        }
    }

    function getDataTypeRequest(dataType) {
        if(dataType == 'temperature' || dataType == 'TMP' ) {
            return ["-match", '"TMP"']
        } else if(dataType == 'snow' || dataType == 'SNOD') {
			return ["-match", "SNOD"]
		} else if(dataType == 'wind' || dataType == 'WIND') {
			return ["-match", '"(UGRD|VGRD)"']
		} else {
            return []
        }
    }

    function getDateRequest(date) {
        if(date.match(/^[0-9]{10}$/)) {
            return ["-match", ":vt="+date+":"]
        } else if(date) {
            var dateString = shortener(date)
            return ["-match", ":vt="+dateString+":"]
        } else {
            return []
        }
    }
    
    function shortener(date){
		var dateObject = new Date(date)
		var month = dateObject.getMonth()+1
		var monthString = ""
		if(month<10) {
			monthString += "0"+month
		} else {
			monthString += month
		}
		var dayString = ""
		if(dateObject.getDate()<10) {
			dayString += "0"+dateObject.getDate()
		} else {
			dayString += dateObject.getDate()
		}
		var hours=""
		if(dateObject.getUTCHours() < 10) hours += "0" + dateObject.getUTCHours()
		else hours += dateObject.getUTCHours()
		var dateString = dateObject.getFullYear() + monthString + dayString + hours
		return dateString
	}
	
	this.getFile = function(date){
		var dateObject = new Date(date)
		var month = dateObject.getMonth()+1
		var monthString = ""
		if(month<10) {
			monthString += "0"+month
		} else {
			monthString += month
		}
		var dayString = ""
		if(dateObject.getDate()<10) {
			dayString += "0"+dateObject.getDate()
		} else {
			dayString += dateObject.getDate()
		}
		var dateString = dateObject.getFullYear() + monthString + dayString
		var file = "./gribs/" + dateString + ".grb2"
		if(!fs.existsSync(file)) {
			console.log("file '"+file+"' doesn't exist")
			console.log("this is a test")
			console.log("defaulted to a test file")
			console.log("if values don't show up on the map, that's probably why")
			return "./gribs/nmm.grb2f72"
		}
		return file
	}

    this.getData = function(dataType, date, level, bounds, callback) {

		var csvFile = "./csv/"+shortener(date)+level.replace(" ","")+dataType+".csv"

		// CSV file already generated ?
		if(fs.existsSync(csvFile))
		{
			console.log("CSV file already generated")

			switch(dataType)
			{
				case "wind" :
					return self.getWindDataFromFile(csvFile, bounds, callback)
					break;
				default :
	        		return self.getDataFromFile(csvFile, bounds, callback)
			}
		}
		else
		{
			var file = self.getFile(date)

		    self.generateFileFor(file, dataType, date, level, csvFile, function(error, out) {
		        if(error) return callback(error)
		
				switch(dataType)
				{
					case "wind" :
						return self.getWindDataFromFile(out, bounds, callback)
						break;
					default :
		        		return self.getDataFromFile(out, bounds, callback)
				}
		    })
		}
    }

    this.generateFileFor = function(file, dataType, date, level, out, callback) {
        var queryParams = [file]
        queryParams = queryParams.concat(getDataTypeRequest(dataType))
        queryParams = queryParams.concat(getDateRequest(date))
        queryParams = queryParams.concat(getLevelRequest(level))
        queryParams = queryParams.concat('-not "WTMP"')
        queryParams = queryParams.concat(["-csv", out])
		console.log(self.wgrib2 + " " + queryParams.join(" "))
        exec(self.wgrib2 + " " + queryParams.join(" "),
            function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error)
                }
                callback(error, out)
            })
    }


	this.getWindDataFromFile = function(file, bounds, callback) {
		fs.readFile(file, "utf-8", function(err, data) {
            if(err) return callback(err, undefined)
            var res = {}
            var lat, lon
			res.type = "wind"
            res.values = {}
            data.split("\n").forEach(function(line) {
				var lineElements = line.split(",")
	
				if(!res.level) {
					res.level = lineElements[3]
				}
		
				lat = parseFloat(lineElements[5])
				lon = parseFloat(lineElements[4])
				
				if(self.isIn(bounds, lat, lon)) {

					switch(lineElements[2])
					{
						case '"UGRD"' :
							res.values[lon]= {}
							res.values[lon][lat]  = {}
							res.values[lon][lat]["u"] = parseFloat(lineElements[6])
							break
						case '"VGRD"' :
							if(res.values[lon][lat] != undefined)
								res.values[lon][lat]["v"] = parseFloat(lineElements[6])
							break
					}

				}								
				
            })
			
            return callback(undefined, res)
        })
	}
	

    this.getDataFromFile = function(file, bounds, callback) {
		
        fs.readFile(file, "utf-8", function(err, data) {
            if(err) return callback(err, undefined)
            var res = {}
            var min, max
            res.values = []
            data.split("\n").forEach(function(line) {
				var lineElements = line.split(",")
				if(!res.type) {
					res.type = lineElements[2]
				}
				if(!res.level) {
					res.level = lineElements[3]
				}

				var lineData = {}
				lineData.lat = parseFloat(lineElements[5])
				lineData.lon = parseFloat(lineElements[4])
				
				if(self.isIn(bounds, lineData.lat, lineData.lon)) {

					var value = parseFloat(lineElements[6])
										
					if(lineElements[2] == '"TMP"')
					{
						value -= 273
					}

					lineData.value = value
					
					res.values.push(lineData)
				}
				
            })

            return callback(undefined, res)
        })
    }

 
    this.isIn = function(bounds, lat, lon) {

		if(isNaN(lat) || isNaN(lon))
		{
			return false
		}

        var x = lon
        var lastPoint = bounds[bounds.length-1]
        var isInside = false
        bounds.forEach(function(point) {
            var x1 = lastPoint.lon
            var x2 = point.lon
            var dx = x2 - x1
            if (Math.abs(dx) > 180.0) {
                // we have, most likely, just jumped the dateline (could do further validation to this effect if needed). normalise the numbers.
                if (x > 0) {
                    while (x1 < 0) x1 += 360
                    while (x2 < 0) x2 += 360
                } else {
                    while (x1 > 0) x1 -= 360
                    while (x2 > 0) x2 -= 360
                }
                dx = x2 - x1
            }
            if ((x1 <= x && x2 > x) || (x1 >= x && x2 < x)) {
                var grad = (point.lat - lastPoint.lat) / dx
                var intersectAtLat = lastPoint.lat + ((x - x1) * grad)
                if (intersectAtLat > lat) isInside = !isInside
            }
            lastPoint = point
        })
		
		return isInside
    }

    return this

}
