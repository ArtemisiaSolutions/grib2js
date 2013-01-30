var should  = require("should")

var Grib2   = require("../lib/grib/Grib2Wrapper.js")
var grib2   = new Grib2(__dirname + "/data/nmm.grb2f00", "/home/hostalerye/Téléchargements/grib2/wgrib2/wgrib2")

describe("Verifying if a point is in an area", function() {


    it("should work", function() {
        this.timeout(60000)
        grib2.isIn([{lat:48.487486,long:-4.526367}, {lat:48.893615,long:8.261719}, {lat:44.056012,long:7.734375}, {lat:43.389082,long:-1.669922}], {lat:50.007739,long:1.494141}).should.be.false
        grib2.isIn([{lat:48.487486,long:-4.526367}, {lat:48.893615,long:8.261719}, {lat:44.056012,long:7.734375}, {lat:43.389082,long:-1.669922}], {lat:45.767523,long:2.460938}).should.be.true
    })


})

describe("Gathering data from file", function() {

    it("should work", function(done) {
        this.timeout(60000)
        grib2.getDataFromFile("/home/hostalerye/Documents/ICC/PE/grib2js/out.csv", [{lat:44.653024,long:-1.625977}, {lat:44.933696,long:3.164063}, {lat:42.55308,long:3.339844}, {lat:43.325178,long:-2.285156}], function(err, res) {
                if(err) throw err
                done()
            }
        )
    })


})
