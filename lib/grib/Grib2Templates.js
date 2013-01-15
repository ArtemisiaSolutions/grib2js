var Grib2Spec = require("./Grib2Spec.js")

exports.readTemplate = function(section, value, data) {
    switch(section) {
        case 3 : return readTemplateSection3(value, data)
        case 5 : return readTemplateSection5(value, data)
        case 7 : return readTemplateSection7(value, data)
        default : return {error : "wrong section number"}
    }
}

function readTemplateSection3(value, data) {
    switch(value) {
        case 204 : return readTemplate3204(data)
        default : return {error : "wrong template number"}
    }
}

function readTemplateSection5(value, data) {
    switch(value) {
        case 40 : return readTemplate540(data)
        default : return {error : "wrong template number"}
    }
}

function readTemplateSection7(value, data) {
    switch(value) {
        case 40 : return readTemplate740(data)
        default : return {error : "wrong template number"}
    }
}

function readTemplate3204(data) {
    var template = {}
    template.shapeOfTheEarth                = Grib2Spec.readEarthShape(data.readUInt8(14))
    template.scaleValueOfRadius             = data.readUInt32BE(16)
    template.scaleFactorOfMajorAxis         = data.readUInt8(20)
    template.scaledValueOfMajorAxis         = data.readUInt32BE(21)
    template.scaleFactorOfMinorAxis         = data.readUInt8(25)
    template.scaledValueOfMinorAxis         = data.readUInt32BE(26)
    template.ni                             = data.readUInt32BE(30)
    template.nj                             = data.readUInt32BE(34)
    template.resolutionAndComponentFlags    = Grib2Spec.readResolutionComponentFlags(data[54])
    template.scanningMode                   = Grib2Spec.readScanMode(data[71])
    return template
}

function readTemplate540(data) {
    var template = {}
    var ratio = data.readUInt8(22)
    template.referenceValue             = data.readFloatBE(14)
    template.binaryScaleFactor          = data.readUInt16BE(15)
    template.decimalScaleFactor         = data.readUInt16BE(17)
    template.depthOfGrayscaleImage      = data.readUInt8(19)
    template.typeOfOriginalFieldValues  = Grib2Spec.readOriginalFieldValuesType(data.readUInt8(20))
    template.typeOfCompression          = Grib2Spec.readCompressionType(data.readUInt8(21))
    template.targetCompressionRation    = ratio === 255 ? "Missing" : ratio
    return template
}

function readTemplate740(data) {
    var template = {}
    template.codeStream = data.slice(5)
    return template
}