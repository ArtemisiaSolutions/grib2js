var should  = require("should")

var Grib2   = require("../lib/grib/Grib2Wrapper.js")
var grib2   = new Grib2()

describe("Verifying if a point is in an area", function() {
    it("should work", function() {
        this.timeout(60000)
        grib2.isIn([{lat:48.487486,lon:-4.526367}, {lat:48.893615,lon:8.261719}, {lat:44.056012,lon:7.734375}, {lat:43.389082,lon:-1.669922}], 50.007739, 1.494141).should.be.false
        grib2.isIn([{lat:48.487486,lon:-4.526367}, {lat:48.893615,lon:8.261719}, {lat:44.056012,lon:7.734375}, {lat:43.389082,lon:-1.669922}], 45.767523, 2.460938).should.be.true
    })
})

describe("Gathering data from file", function() {
    it("should work", function(done) {
        this.timeout(60000)
        grib2.getDataFromFile("test/out.csv", [{lat:44.653024,lon:-1.625977}, {lat:44.933696,lon:3.164063}, {lat:42.55308,lon:3.339844}, {lat:43.325178,lon:-2.285156}], function(err, res) {
                if(err) throw err
                done()
            }
        )
    })
})
