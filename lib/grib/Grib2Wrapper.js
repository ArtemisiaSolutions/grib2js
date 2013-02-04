var exec    = require('child_process').exec
var fs      = require('fs')

module.exports = function Grib2(pathToFile, pathToWGrib2) {

    var self = this
    this.file = pathToFile
    this.wgrib2 = pathToWGrib2

    this.generateFileFor = function(dataType, level, out, callback) {
        var queryParams
        if(dataType == "temperature") {
            queryParams = [self.file,"-V", "-match", "\"TMP:"+level+"\"", "-not", "\"WTMP\"","-csv", out]
        } else if(dataType == "waterTemperature") {
            queryParams = [self.file,"-V", "-match", "\"WTMP:"+level+"\"", "-csv", out]
        }
        if(queryParams) {
        exec(self.wgrib2 + " " + queryParams.join(" "),
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                callback(error, stdout)
            })
        } else {
            callback(new Error("dataType unknown"))
        }
    }

    this.getDataFromFile = function(file, bounds, callback) {
        fs.readFile(file, "utf-8", function(err, data) {
            if(err) return callback(err, undefined)
            var res = {}
            res.values = []
            var strRes = ""
            data.split("\n").forEach(function(line) {
                var lineElements = line.split(",")
                if(!res.type) {
                    res.type = lineElements[2]
                }
                if(!res.level) {
                    res.level = lineElements[3]
                }
                var lineData = {}
                lineData.lat = lineElements[5]
                lineData.lon = lineElements[4]
                lineData.val = lineElements[6]
                if(self.isIn(bounds, lineData)) {
                    res.values.push(lineData)
                    strRes += line + "\n"
                }
            })
            return callback(undefined, res)
        })
    }

    this.isIn = function(bounds, location) {
        var x = location.long
        var lastPoint = bounds[bounds.length-1]
        var isInside = false
        bounds.forEach(function(point) {
            var x1 = lastPoint.long;
            var x2 = point.long;
            var dx = x2 - x1;
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
                if (intersectAtLat > location.lat) isInside = !isInside
            }
            lastPoint = point
        })
        return isInside
    }

    return this;

}