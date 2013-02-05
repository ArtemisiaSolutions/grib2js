
var should  = require("should")

var Grib2   = require("../lib/grib/Grib2.js")

describe("When indexing", function() {
    
    
    it("should work", function(done) {
        
        this.timeout(60000)
        Grib2.index(__dirname + "/data/nmm.grb2f00", function(err, index) {
        //Grib2.index(__dirname + "/data/ofs_atl.t00z.f001.grb.grib2", function(err, index) {
            
            if(err) throw err
                
            console.log(JSON.stringify(index, null, 2))
                
            done()
            
        })
        
    })
    
})
