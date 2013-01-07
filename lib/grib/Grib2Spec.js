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

// Shape of the earth (Code table 3.2)
exports.readEarthShape = function(value) {
	switch(value) {
		case 0   : return "Earth assumed spherical with radius = 6,367,470.0m"
		case 1   : return "Earth assumed spherical with radius specified by data producer"
		case 2   : return "Earth assumed oblate spheroid with size as determined by IAU in 1965"
		case 3   : return "Earth assumed oblate spheroid with major and minor axes defined by data producer"
		case 4   : return "Earth assumed oblate spheroid as defined in IAG-GRS80 model"
		case 5   : return "Earth assumed represented by WSG84"
		case 6   : return "Earth assumed spherical with radius of 6,371,229.0m"
		case 255 : return "Missing"
		default  : return "Unknown: "+ value
	}
}

// Resolution and Component Flags (Flag table 3.3)
exports.readResolutionComponentFlags = function(number, value) {
	switch(number) {
		case 3  : switch(value) {
			case 0  : return "i direction increments not given"
			case 1  : return "i direction increments given"
			default : return "Unknown: "+ value
		}
		case 4  : switch(value) {
			case 0  : return "j direction increments not given"
			case 1  : return "j direction increments given"
			default : return "Unknown: "+ value
		}
		case 5  : switch(value) {
			case 0  : return "Resolved u and v components of vector quantities relative to easterly and northerly directions"
			case 1  : return "Resolved u and v components of vector quantities relative to the defined grid in the direction of increasing x and y(or i and j) coordinates respectively"
			default : return "Unknown: "+ value
		}
		default : return "Unknown: "+ value
	}
}

// Scanning Mode (Flag table 3.4)
exports.readScanMode = function(number, value) {
	switch(number) {
		case 1  : switch(value) {
			case 0  : return "Points of first row or column scan in the +i(+x) direction"
			case 1  : return "Points of first row or column scan in the -i(-x) direction"
			default : return "Unknown: "+ value
		}
		case 2  : switch(value) {
			case 0  : return "Points of first row or column scan in the -j(-y) direction"
			case 1  : return "Points of first row or column scan in the +j(+y) direction"
			default : return "Unknown: "+ value
		}
		case 3  : switch(value) {
			case 0  : return "Adjacent points in i(x) direction are consecutive"
			case 1  : return "Adjacent points in j(y) direction are consecutive"
			default : return "Unknown: "+ value
		}
		case 4  : switch(value) {
			case 0  : return "All rows scan in the same direction"
			case 1  : return "Adjacent rows scan in the opposite direction"
			default : return "Unknown: "+ value
		}
		default : return "Unknown: "+ value
	}
}

// Projection Centre (Flag table 3.5)
exports.readProjectionCentre = function(number, value) {
	switch(number) {
		case 1  : switch(value) {
			case 0  : return "North pole in on the projection plane"
			case 1  : return "South pole in on the projection plane"
			default : return "Unknown: "+ value
		}
		case 2  : switch(value) {
			case 0  : return "Only one projection centre is used"
			case 1  : return "Projection is bi-polar and symmetric"
			default : return "Unknown: "+ value
		}
		default : return "Unknown: "+ value
	}
}

// Spectral data representation type (Code table 3.6)
exports.readSpectralDataRepresentationType = function(value) {
	switch(value) {
		case 1  : return "Legendre functions"
		default : return "Unknown: "+value
	}
}

// Spectral data representation mode (Code table 3.7)
exports.readSpectralDataRepresentationMode = function(value) {
	switch(value) {
		case 1   : return "Complex numbers are stored as pairs of real numbers"
		case 255 : return "Missing"
		default  : return "Unknown: "+value
	}
}

// Grid point position
exports.readGridPointPosition = function(value) {
	switch(value) {
		case 0   : return "Grid points at triangle vertices"
		case 1   : return "Grid points at centres of triangles"
		case 2   : return "Grid points at midpoints of triangle sides"
		case 255 : return "Missing"
		default  : return "Unknown: "+value
	}
}

// Numbering order of diamonds as seen from the corresponding pole (Flag table 3.9)
exports.readDiamondsNumber = function(number, value) {
	switch(number) {
		case 1  : switch(value) {
			case 0  : return "Clockwise orientation"
			case 1  : return "Anti-clockwise (i.e., counter-clockwise) orientation"
			default : return "Unknown: "+ value
		}
		default : return "Unknown: "+ value
	}
}

// Scanning mode for one diamond (Flag table 3.10)
exports.readDiamondScanningMode = function(number, value) {
	switch(number) {
		case 1  : switch(value) {
			case 0  : return "Points scan in +i direction, i.e. from pole to equator"
			case 1  : return "Points scan in -i direction, i.e. from equator to pole"
			default : return "Unknown: "+ value
		}
		case 2  : switch(value) {
			case 0  : return "Points scan in +j direction, i.e. from west to east"
			case 1  : return "Points scan in -j direction, i.e. from east to west"
			default : return "Unknown: "+ value
		}
		case 3  : switch(value) {
			case 0  : return "Adjacent points in i direction are consecutive"
			case 1  : return "Adjacent points in j direction are consecutive"
			default : return "Unknown: "+ value
		}
		default : return "Unknown: "+ value
	}
}

// Interpretation of list of numbers defining number of points (Code table 3.11)
exports.readListInterpretation = function(value) {
	switch(value) {
		case 0   : return "There is no appended list"
		case 1   : return "Numbers define number of points corresponding to full coordinate circles (i.e. parallels), coordinate values on each circle are multiple of the circle mesh, and extreme coordinate values given in grid definition (i.e. extreme longitudes) may not be reached in all rows"
		case 2   : return "Numbers define number of points corresponding to coordinate lines delimited by extreme coordinate values given in grid definition (i.e. extreme longitudes) which are present in each row"
		case 255 : return "Missing"
		default  : return "Unknown: "+value
	}
}

// Physical meaning of vertical coordinate (Code table 3.15)
exports.readVerticalCoordinatePhysicalMeaning = function(value){
	switch(value) {
		case 20  : return "Temperature (K)"
		case 100 : return "Pressure (Pa)"
		case 101 : return "Pressure deviation from mean sea level (Pa)"
		case 102 : return "Altitude above mean sea level (m)"
		case 103 : return "Height above ground (m)"
		case 104 : return "Sigma coordinate"
		case 105 : return "Hybrid coordinate"
		case 106 : return "Depth below land surface (m)"
		case 107 : return "Potential temperature theta (K)"
		case 108 : return "Pressure deviation from ground level (Pa)"
		case 109 : return "Potential vorticity (K m-2 kg-1 s-1)"
		case 110 : return "Geometrical height (m)"
		case 111 : return "Eta coordinate"
		case 112 : return "Geopotential height (gpm)"
		case 160 : return "Depth below sea level (m)"
		case 255 : return "Missing"
		default  : return "Unknown: "+value
	}
}

// Type of horizontal line (Code table 3.20)
exports.readHorizontalLineType = function(value) {
	switch(value) {
		case 0   : return "Rhumb"
		case 1   : return "Great circle"
		case 255 : return "Missing"
		default  : return "Unknown: "+value
	}
}

// Vertical dimension coordinate values definition (Code table 3.21)
exports.readVerticalDimensionCoordinateValuesDefinition = function(value) {
	switch(value) {
		case 0   : return "Explicit coordinate values set"
		case 1   : return "Linear coordinates"
		case 11  : return "Geometric coordinates"
		case 255 : return "Missing"
		default  : return "Unknown: "+value
	}
}


