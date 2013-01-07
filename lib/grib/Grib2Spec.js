// Discipline (Code table 0.0)
exports.readDiscipline = function(value) {
    switch(value) {
        case 0   : return "Meteorological"
        case 1   : return "Hydrological"
        case 3   : return "Land Surface"
        case 2   : return "Space"
        case 10  : return "Oceanographic"
        case 255 : return "Missing"
        default  : return "Unknown: "+ value
    }
}

// Master tables version number (Code table 1.0)
exports.readMasterTableVersionNumber = function(value) {
    switch(value) {
        case 0   : return "Experimental"
        case 1   : return "Initial"
        case 255 : return "Missing"
        default  : return "Future"
    }
}

// Significance of reference time (Code table 1.2)
exports.readReferenceTimeSignificance = function(value) {
    switch(value) {
        case 0   : return "Analysis"
        case 1   : return "Start of forecast"
        case 2   : return "Verifying time of forecast"
        case 3   : return "Observation time"
        case 255 : return "Missing"
        default  : return "Unknown: "+ value
    }
}

// Production status (Code table 1.3)
exports.readProductionStatus = function(value) {
    switch(value) {
        case 0   : return "Operational"
        case 1   : return "Operational test"
        case 2   : return "Research"
        case 3   : return "Re-analysis"
        case 255 : return "Missing"
        default  : return "Unknown: "+ value
    }
}
// Type of data (Code table 1.4)
exports.readDataType = function(value) {
    switch(value) {
        case 0   : return "Analysis"
        case 1   : return "Forecast"
        case 2   : return "Analysis and forecast"
        case 3   : return "Control forecast"
        case 4   : return "Perturbed forecast"
        case 5   : return "Control and perturbed forecast"
        case 6   : return "Processed satellite observations"
        case 7   : return "Processed radar observations"
        case 255 : return "Missing"
        default  : return "Unknown: "+ value
    }
}