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
        case 30 : return readTemplate330(data)
        case 204 : return readTemplate3204(data)
        default : return {error : "wrong template number"}
    }
}

function readTemplateSection5(value, data) {
    switch(value) {
        case 3 : return readTemplate53(data)
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

function readTemplate330(data) {
    var template = {}
    template.shapeOfEarth                                   = Grib2Spec.readEarthShape(data.readUInt8(14))
    template.scaleFactorOfRadiusOfSphericalEarth            = data.readUInt8(15)
    template.scaleValueOfRadiusOfSphericalEarth             = data.readUInt32BE(16)
    template.scaleFactorOfMajorAxisOfOblateSpheroidEarth    = data.readUInt8(20)
    template.scaledValueOfMajorAxisOfOblateSpheroidEarth    = data.readUInt32BE(21)
    template.scaleFactorOfMinorAxisOfOblateSpheroidEarth    = data.readUInt8(25)
    template.scaledValueOfMinorAxisOfOblateSpheroidEarth    = data.readUInt32BE(26)
    template.nx                                             = data.readUInt32BE(30)
    template.ny                                             = data.readUInt32BE(34)
    template.la1                                            = data.readUInt32BE(38)
    template.lo1                                            = data.readUInt32BE(42)
    template.resolutionAndComponentFlags                    = Grib2Spec.readResolutionComponentFlags(data[46])
    template.laD                                            = data.readUInt32BE(47)
    template.loV                                            = data.readUInt32BE(51)
    template.dx                                             = data.readUInt32BE(55)
    template.dy                                             = data.readUInt32BE(59)
    template.projectionCentreFlag                           = Grib2Spec.readProjectionCentre(data[63])
    template.scanningMode                                   = Grib2Spec.readScanMode(data[64])
    template.latin1                                         = data.readUInt32BE(65)
    template.latin2                                         = data.readUInt32BE(69)
    template.latitudeOfSouthernPoleOfProjection             = data.readUInt32BE(73)
    template.longitudeOfSouthernPoleOfProjection            = data.readUInt32BE(77)
    return template
}

function readTemplate3204(data) {
    var template = {}
    template.shapeOfEarth                   = Grib2Spec.readEarthShape(data.readUInt8(14))
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

function readTemplate53(data) {
    var template = {}
    template.referenceValue                         = data.readFloatBE(11)
    template.binaryScaleFactor                      = data.readUInt16BE(15)
    template.decimalScaleFactor                     = data.readUInt16BE(17)
    template.bitsUsedForEachPack                    = data.readUInt8(19)
    template.typeOfOriginalFieldValues              = data.readUInt8(20)
    template.groupSlittingMethod                    = data.readUInt8(21)
    template.missingValueManagement                 = data.readUInt8(22)
    template.primaryMissingValueSubstitute          = data.readUInt32BE(23)
    template.secondaryMissingValueSubstitute        = data.readUInt32BE(27)
    template.ng                                     = data.readUInt32BE(31)
    template.referenceOfGroupWidths                 = data.readUInt8(35)
    template.bitsUsedForGroupWidths                 = data.readUInt8(36)
    template.referenceForGroupLengths               = data.readUInt32BE(37)
    template.lengthIncrementForGroupLengths         = data.readUInt8(41)
    template.trueLengthOfLastGroup                  = data.readUInt32BE(42)
    template.bitsUsedForScaledGroupLengths          = data.readUInt8(46)
    template.orderOfSpatialDifference               = data.readUInt8(47)
    template.numberOfOctetsRequiredInDataSection    = data.readUInt8(48)
    return template
}

function readTemplate540(data) {
    var template = {}
    var ratio = data.readUInt8(22)
    template.referenceValue             = data.readFloatBE(11)
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