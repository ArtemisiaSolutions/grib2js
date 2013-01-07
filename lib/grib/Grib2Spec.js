// Discipline (Code table 0.0)
exports.readDiscipline = function(value) {
    switch(value) {
        case 0   : return "Meteorological"
        case 1   : return "Hydrological"
        case 2   : return "Land Surface"
        case 3   : return "Space"
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

// Local tables version number (Code table 1.1)
exports.readLocalTableVersionNumber = function(value) {
	switch(value) {
		case 0   : return "Local tables not used. Only table entries and templates from the current master table are valid."
		case 255 : return "Missing"
		default  : return "Number of local tables version used"
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

// Production status of data(Code table 1.3)
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

// Source of Grid Definition (Code table 3.0)
exports.readGridDefinitionSource = function(value){
	switch(value) {
		case 0 	 : return "Specified in Code table 3.1"
		case 1 	 : return "Predetermined grid definition"
		case 255 : return "A grid definition does not apply to this product"
		default	 : return "Unknown: "+ value
	}
}

// Grid Definition Template Number (Code table 3.1)
exports.readDefinitionTemplateNumber = function(value){
	switch(value) {
		case 0     : return "Latitude/longitude"
		case 1     : return "Rotated latitude/longitude"
		case 2     : return "Stretched latitude/longitude"
		case 3     : return "Stretched and rotated latitude/longitude"
		case 10    : return "Mercator"
		case 20    : return "Polar stereographic"
		case 30    : return "Lambert Conformal"
		case 31    : return "Albers equal-area"
		case 40    : return "Gaussian latitude/longitude"
		case 41    : return "Rotated Gaussian latitude/longitude"
		case 42    : return "Stretched Gaussian latitude/longitude"
		case 43    : return "Stretched and rotated Gaussian latitude/longitude"
		case 50    : return "Spherical harmonic coefficients"
		case 51    : return "Rotated spherical harmonic coefficients"
		case 52    : return "Stretched spherical harmonic coefficients"
		case 53    : return "Stretched and rotated spherical harmonic coefficients"
		case 90    : return "Space view perspective orthographic"
		case 100   : return "Triangular grid based on an icosahedron"
		case 110   : return "Equatorial azimuthal equidistant projection"
		case 120   : return "Azimuth-range projection"
		case 1000  : return "Cross-section grid, with points equally spaced on the horizontal"
		case 1100  : return "Hovmöller diagram grid, with points equally spaced on the horizontal"
		case 1200  : return "Time section grid"
		case 65535 : return "Missing"
		default    : return "Unknown: "+ value
	}
}
