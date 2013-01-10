var fs = require("fs")
var EventEmitter = require("events").EventEmitter

var Grib2Spec = require("./Grib2Spec.js")

function index(file, callback) {
    
    var indexes = []
    
    fs.open(file, "r", function(err, fd) {
        
        if(err) return callback(err, undefined)
        
        em.on("data", function(data) {
    
            console.log(JSON.stringify(data, null, 2))
            indexify(fd, indexes, data.section0.stats.end)
        })
        em.on("error", function(err) {
            callback(err)
        })
        em.on("end", function() {
            callback()
        })
        
        indexify(fd, indexes, 0)
    })
}

var em = new EventEmitter()

function indexify(fd, indexes, index) {
    // console.log("reading section0")
    readSection0(fd, index, function(err, section0) {
        
        if(err) return em.emit("error", err)
            
        if(!section0) return em.emit("end")
            
        // console.log("reading section1")
        readSection1(fd, section0.stats.start, function(err, section1) {
            
            if(err) return em.emit("error", err)
            
            readSection2(fd, section1.stats.end, function(err, section2) {
            
                if(err) return em.emit("error", err)

                readSection3(fd, section2.stats.end, function(err, section3) {

                    if(err) return em.emit("error", err)

                    readSection4(fd, section3.stats.end, function(err, section4) {

                        if(err) return em.emit("error", err)

                        readSection5(fd, section4.stats.end, function(err, section5) {

                            if(err) return em.emit("error", err)

                            readSection6(fd, section5.stats.end, function(err, section6) {

                                if(err) return em.emit("error", err)

                                readSection7(fd, section6.stats.end, function(err, section7) {

                                    if(err) return em.emit("error", err)

                                    readSection8(fd, section7.stats.end, function(err, section8) {

                                        var sequence = {
                                            section0: section0,
                                            section1: section1,
                                            section2: section2,
                                            section3: section3,
                                            section4: section4,
                                            section5: section5,
                                            section6: section6,
                                            section7: section7,
                                            section8: section8
                                        }

                                        em.emit("data", sequence)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

/** reads a GRIB sequence and return the contained data
 */
function readSection0(fd, start, callback) {
    
    var section0 = {}
    
    var headerBuf = new Buffer(16)
    
    fs.read(fd, headerBuf, 0, 16, start, function(err, bytesRead, buffer) {
        
        if(bytesRead === 0) {
            return callback(undefined, undefined)
        } else if(bytesRead !== 16) {
            return callback(new Error("Could not read header. Instead, read "+bytesRead+"/16 bytes"), undefined)
        }
        
        section0.stats = {}
        section0.stats.start = start
        
        section0.discipline = Grib2Spec.readDiscipline(headerBuf.readUInt8(6))
        
        section0.edition = headerBuf.readUInt8(7)
        // section0.length1 = headerBuf.readUInt32LE(8)
        
        section0.stats.length = headerBuf.readUInt32BE(12)
        
        var fullBuf = new Buffer(section0.stats.length)
        
        fs.read(fd, fullBuf, 0, section0.stats.length, start, function(err, bytesRead, buffer) {
            
            if(err) return callback(err, undefined)
                
            var startOfSequence = fullBuf.toString("ASCII", 0, 4)
            section0.startOfSequence = startOfSequence
            if(startOfSequence !== "GRIB") { // HEX: 47524942
                return callback(new Error("Not a GRIB sequence. I expected the keyword 'GRIB' but instead I got: "+startOfSequence))
            }
            
            // console.log("Read ["+bytesRead+"]")
            
            if(fullBuf.toString("ASCII", section0.stats.length-4, section0.stats.length) === "7777") {
                
                section0.stats.end = section0.stats.start + section0.stats.length
                
                callback(undefined, section0)
            
                
            } else {
                
                console.log("*************************")
                console.log(JSON.stringify(section0))
                callback(new Error("Did not find the end of the sequence where it was expected: "+fullBuf.toString("HEX", section0.stats.length-4, section0.stats.length)), undefined)
                
            }
        })
    })
    
}

function readSection1(fd, sequenceStart, callback) {
    
    var section1 = {}
    
    var start = sequenceStart + 16 // section0 ends at byte 16
    
    
    section1.stats = {}
    section1.stats.start = start
    
    // first read the length of section 1
    fs.read(fd, new Buffer(4), 0, 4, start, function(err, bytesRead, buffer) {
    
        if(err) return callback(err, undefined)
    
        section1.stats.start = start
    
        section1.stats.length = buffer.readUInt32BE(0)
        
        section1.stats.end = section1.stats.start + section1.stats.length
        
        // fully load the content of section1
        fs.read(fd, new Buffer(section1.stats.length), 0, section1.stats.length, start, function(err, bytesRead, buffer) {
            
            if(err) return callback(err, undefined)
            
            section1.numberOfSection = buffer.readUInt8(4)
            section1.originatingCenter = buffer.readUInt16BE(5)
            section1.originatingSubCenter = buffer.readUInt16BE(7)
            section1.masterTableVersionNumber = Grib2Spec.readMasterTableVersionNumber(buffer.readUInt8(9))
            section1.localTableVersionNumber = buffer.readUInt8(10)
            
            // TODO: transform to date object, UTC
            section1.date = {}
            section1.date.reference = Grib2Spec.readReferenceTimeSignificance(buffer.readUInt8(11))
            section1.date.year = buffer.readUInt16BE(12)
            section1.date.month = buffer.readUInt8(14)
            section1.date.day = buffer.readUInt8(15)
            section1.date.hour = buffer.readUInt8(16)
            section1.date.minute = buffer.readUInt8(17)
            section1.date.second = buffer.readUInt8(18)
            
            section1.productionStatus = Grib2Spec.readProductionStatus(buffer.readUInt8(19))
            section1.dataType = Grib2Spec.readDataType(buffer.readUInt8(20))
            
            // console.log(JSON.stringify(section1, null, 2))
            
            callback(undefined, section1)
        })
    })
}

function readSection2(fd, startOfSection, callback) {
    var section2 = {}
    
    section2.stats = {}
    section2.stats.start = startOfSection
    
    // first read the length of section 2
    fs.read(fd, new Buffer(5), 0, 5, section2.stats.start, function(err, bytesRead, buffer) {
        
        if(err) return callback(err, undefined)
        
        section2.stats.length = buffer.readUInt32BE(0)
        section2.numberOfSection = buffer.readUInt8(4)
        if(section2.numberOfSection !== 2) {
            section2.stats.length = 0
        }
        section2.stats.end = section2.stats.start + section2.stats.length
        
        callback(undefined, section2)
        
    })
}

function readSection3(fd, startOfSection, callback) {
    var section3 = {}

    section3.stats = {}
    section3.stats.start = startOfSection

    // r
    fs.read(fd, new Buffer(4), 0, 4, section3.stats.start, function(err, bytesRead, buffer) {

        if(err) return callback(err, undefined)

        section3.stats.length = buffer.readUInt32BE(0)

        section3.stats.end = section3.stats.start + section3.stats.length

        // fully load the content of section1
        fs.read(fd, new Buffer(section3.stats.length), 0, section3.stats.length, section3.stats.start, function(err, bytesRead, buffer) {

            if(err) return callback(err, undefined)

            section3.numberOfSection = buffer.readUInt8(4)
            section3.sourceOfGridDefinition = Grib2Spec.readGridDefinitionSource(buffer.readUInt8(5))
            section3.numberOfDataPoints = buffer.readUInt32BE(6)
            section3.numberOfOctetsOfList = buffer.readUInt8(10)
            section3.interpretationOfList = Grib2Spec.readListInterpretation(buffer.readUInt8(11))
            section3.gridDefinitionTemplateNumber = Grib2Spec.readDefinitionTemplateNumber(buffer.readUInt16BE(12))
            //TODO finish section 3
            // console.log(JSON.stringify(section1, null, 2))

            callback(undefined, section3)
        })
    })
    
}

function readSection4(fd, startOfSection, callback) {
    var section4 = {}

    section4.stats = {}
    section4.stats.start = startOfSection

    fs.read(fd, new Buffer(4), 0, 4, section4.stats.start, function(err, bytesRead, buffer) {

        if(err) return callback(err, undefined)

        section4.stats.length = buffer.readUInt32BE(0)
        section4.stats.end = section4.stats.start + section4.stats.length

        fs.read(fd, new Buffer(section4.stats.length), 0, section4.stats.length, section4.stats.start, function(err, bytesRead, buffer) {

            if(err) return callback(err, undefined)

            section4.numberOfSection = buffer.readUInt8(4)
            section4.numberOfCoordinateValues = buffer.readUInt16BE(5)
            section4.productDefinitionTemplateNumber = Grib2Spec.readProductDefinitionTemplateNumber(buffer.readUInt16BE(9))

            callback(undefined, section4)
        })
    })
}

function readSection5(fd, startOfSection, callback) {
    var section5 = {}

    section5.stats = {}
    section5.stats.start = startOfSection

    fs.read(fd, new Buffer(4), 0, 4, section5.stats.start, function(err, bytesRead, buffer) {

        if(err) return callback(err, undefined)

        section5.stats.length = buffer.readUInt32BE(0)
        section5.stats.end = section5.stats.start + section5.stats.length

        fs.read(fd, new Buffer(section5.stats.length), 0, section5.stats.length, section5.stats.start, function(err, bytesRead, buffer) {

            if(err) return callback(err, undefined)

            section5.numberOfSection = buffer.readUInt8(4)
            section5.numberOfDataPoints = buffer.readUInt32BE(5)
            section5.dataRepresentationTemplateNumber = Grib2Spec.readDataRepresentationTemplateNumber(buffer.readUInt16BE(9))

            callback(undefined, section5)
        })
    })
}

function readSection6(fd, startOfSection, callback) {
    var section6 = {}

    section6.stats = {}
    section6.stats.start = startOfSection

    fs.read(fd, new Buffer(6), 0, 6, section6.stats.start, function(err, bytesRead, buffer) {

        if(err) return callback(err, undefined)

        section6.stats.length = buffer.readUInt32BE(0)
        section6.stats.end = section6.stats.start + section6.stats.length
        section6.numberOfSection = buffer.readUInt8(4)
        section6.bitMapIndicator = Grib2Spec.readBitMapIndicator(buffer.readUInt8(4))

        callback(undefined, section6)
    })
}

function readSection7(fd, startOfSection, callback) {
    var section7 = {}

    section7.stats = {}
    section7.stats.start = startOfSection

    fs.read(fd, new Buffer(4), 0, 4, section7.stats.start, function(err, bytesRead, buffer) {

        if(err) return callback(err, undefined)

        section7.stats.length = buffer.readUInt32BE(0)
        section7.stats.end = section7.stats.start + section7.stats.length

        fs.read(fd, new Buffer(section7.stats.length), 0, section7.stats.length, section7.stats.start, function(err, bytesRead, buffer) {

            if(err) return callback(err, undefined)

            section7.numberOfSection = buffer.readUInt8(4)

            callback(undefined, section7)
        })
    })
}

function readSection8(fd, endOfSequence, callback) {
    var section8 = {}
    
    section8.stats = {}
    section8.stats.start = endOfSequence-4
        
    section8.stats.length = 4
    section8.stats.end = endOfSequence
    
    fs.read(fd, new Buffer(4), 0, 4, section8.stats.start, function(err, bytesRead, buffer) {
        
        if(err) return callback(err, undefined)
        
        section8.data = buffer.toString("ascii")
        
        callback(undefined, section8)
        
    })
}


module.exports = {
    index: index
}
