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
exports.readResolutionComponentFlags = function(value) {
    var flags = {}
    flags.iDirectionIncrements = "Not given"
    flags.jDirectionIncrements = "Not given"
    flags.uAndvComponents = "Relative to easterly and northerly directions"
    if((value & 4) === 4) {
        flags.iDirectionIncrements = "Given"
    }
    if((value & 8) === 8) {
        flags.jDirectionIncrements = "Given"
    }
    if((value & 16) === 16) {
        flags.uAndvComponents = "Relative to the defined grid"
    }
    return flags
}

// Scanning Mode (Flag table 3.4)
exports.readScanMode = function(number, value) {
    var flags = {}
    flags.iDirection = "+i(+x)"
    flags.jDirection = "-j(-y)"
    flags.adjacentConsecutivePoints = "i(x)"
    flags.rowsDirection = "All rows scan in the same direction"
    if((value & 1) === 1) {
        flags.iDirection = "-i(-x)"
    }
    if((value & 2) === 2) {
        flags.jDirection = "+j(+y)"
    }
    if((value & 4) === 4) {
        flags.adjacentConsecutivePoints = "j(y)"
    }
    if((value & 8) === 8) {
        flags.rowsDirection = "Adjacent rows scan in the opposite direction"
    }
    return flags
}

// Projection Centre (Flag table 3.5)
exports.readProjectionCentre = function(value) {
    var flags = {}
    flags.projectionPlane = "North Pole is on the projection plane"
    flags.projectionType = "Only one projection center is used"
    if((value & 1) === 1) {
        flags.projectionPlane = "South Pole is on the projection plane"
    }
    if((value & 2) === 2) {
        flags.projectionType = "Projection is bi-polar and symmetric"
    }
    return flags
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
    var flags = {}
    if((value & 1) === 1) {
        flags.orientation = "Anti-clockwise (i.e., counter-clockwise) orientation"
    } else {
        flags.orientation = "Clockwise orientation"
    }
    return flags
}

// Scanning mode for one diamond (Flag table 3.10)
exports.readDiamondScanningMode = function(number, value) {
    var flags = {}
    flags.iDirection = "Points scan in +i direction, i.e. from pole to equator"
    flags.jDirection = "Points scan in +j direction, i.e. from west to east"
    flags.adjacentConsecutivePoints = "Adjacent points in i direction are consecutive"
    if((value & 1) === 1) {
        flags.iDirection = "Points scan in -i direction, i.e. from equator to pole"
    }
    if((value & 2) === 2) {
        flags.jDirection = "Points scan in -j direction, i.e. from east to west"
    }
    if((value & 4) === 4) {
        flags.adjacentConsecutivePoints = "Adjacent points in j direction are consecutive"
    }
    return flags
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

// Product Definition Template Number (Code table 4.0)
exports.readProductDefinitionTemplateNumber = function(value) {
	switch(value) {
		case 0     : return "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time"
		case 1     : return "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer at a point in time"
		case 2     : return "Derived forecast based on all ensemble members at a horizontal level or in a horizontal layer at a point in time"
		case 3     : return "Derived forecasts based on a cluster of ensemble members over a rectangular area at a horizontal level or in a horizontal layer at a point in time"
		case 4     : return "Derived forecasts based on a cluster of ensemble members over a circular area at a horizontal level or in a horizontal layer at a point in time"
		case 5     : return "Probability forecasts at a horizontal level or in a horizontal layer at a point in time"
		case 6     : return "Percentile forecasts at a horizontal level or in a horizontal layer at a point in time"
		case 7     : return "Analysis or forecast error at a horizontal level or in a horizontal layer at a point in time"
		case 8     : return "Average, accumulation, extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval"
		case 9     : return "Probability forecasts at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval"
		case 10    : return "Percentile forecasts at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval"
		case 11    : return "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous interval"
		case 12    : return "Derived forecasts based in all ensemble members at a horizontal level or in a horizontal layer, in a continuous or non-continuous interval"
		case 13    : return "Derived forecasts based on a cluster of ensemble members over a rectangular area, at a horizontal level or in a horizontal layer, in a continuous or non-continuous interval"
		case 14    : return "Derived forecasts based on a cluster of ensemble members over a circular area, at a horizontal level or in a horizontal layer, in a continuous or non-continuous interval"
		case 20    : return "Radar product"
		case 30    : return "Satellite product"
		case 254   : return "CCITT IA5 character string"
		case 1000  : return "Cross section of analysis and forecast at a point in time"
		case 1001  : return "Cross section of averaged or otherwise statistically processed analysis or forecast over a range of time"
		case 1002  : return "Cross section of analysis and forecast, averaged or or otherwise statistically processed"
		case 1100  : return "Hovmöller-type grid with no averaging or other statistical processing"
		case 1101  : return "Hovmöller-type grid with averaging or other statistical processing"
		case 65535 : return "Missing"
		default    : return "Unknown: "+value
	}
}

// Category of parameters by product discipline (Code table 4.1)
exports.readProductDisciplineParameters = function(discipline, category) {
	switch(discipline) {
		case 0: switch(category) {
			case 0   : return "Temperature"
			case 1   : return "Moisture"
			case 2   : return "Momentum"
			case 3   : return "Mass"
			case 4   : return "Short-wave Radiation"
			case 5   : return "Long-wave Radiation"
			case 6   : return "Cloud"
			case 7   : return "Thermodynamic Stability indices"
			case 8   : return "Kinematic stability indices"
			case 9   : return "Temperature probabilities"
			case 10  : return "Moisture probabilities"
			case 11  : return "Momentum probabilities"
			case 12  : return "Mass probabilities"
			case 13  : return "Aerosols"
			case 14  : return "Trace gases(e.g Ozone, CO2)"
			case 15  : return "Radar"
			case 16  : return "Forecast Radar Imagery"
			case 17  : return "Electro-dynamics"
			case 18  : return "Nuclear/radiology"
			case 19  : return "Physical atmospheric properties"
			case 190 : return "CCITT IA5 string"
			case 191 : return "Miscellaneous"
			case 255 : return "Missing"
			default  : return "Unknown "+category 
		}
		case 1: switch(category) {
			case 0 : return "Hydrology basic products"
			case 1 : return "Hydrology probabilities"
			case 255 : return "Missing"
			default  : return "Unknown "+category 
		}
		//Land surface products
		case 2: switch(category) {
			case 0   : return "Vegetation/Biomass"
			case 1   : return "Agri-/aquacultural Special Products"
			case 2   : return "Transportation-related Products"
			case 3   : return "Soil Products"
			case 255 : return "Missing"
			default  : return "Unknown "+category
		}
		//Space products
		case 3: switch(category) {
			case 0   : return "Image format products"
			case 1   : return "Quantitative products"
			case 255 : return "Missing"
			default  : return "Unknown "+category
		}
		//Oceanographic products
		case 10: switch(category) {
			case 0   : return "Waves"
			case 1   : return "Currents"
			case 2   : return "Ice"
			case 3   : return "Surface Properties"
			case 4   : return "Sub-surface Properties"
			case 255 : return "Missing"
			default  : return "Unknown "+category
		}
		default: return "Unknown "+discipline
	}
}

// Parameter number by product discipline and parameter category (code table 4.2)
exports.readProductDisciplineCategoryParameters = function(discipline, category, number) {
	switch(discipline) {
		//Product Discipline 0: Meteorological products
		case 0: switch(category) {
			//Parameter Category 0: Temperature
			case 0   : switch(number) {
				case 0   : return "Temperature (K)"
				case 1   : return "Virtual temperature (K)"
				case 2   : return "Potential temperature (K)"
				case 3   : return "Pseudo-adiabatic potential temperature or equivalent potential temperature (K)"
				case 4   : return "Maximum temperature (K)"
				case 5   : return "Minimum temperature (K)"
				case 6   : return "Dew point temperature (K)"
				case 7   : return "Dew point depression(or deficit) (K)"
				case 8   : return "Lapse rate (K m-1)"
				case 9   : return "Temperature anomaly (K)"
				case 10  : return "Latent heat net flux (W m-2)"
				case 11  : return "Sensible heat net flux (W m-2)"
				case 12  : return "Heat index (K)"
				case 13  : return "Wind chill factor (K)"
				case 14  : return "Minimum dew point depression (K)"
				case 15  : return "Virtual potential temperature (K)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 1: Moisture
			case 1   : switch(number) {
				case 0   : return "Specific humidity (kg kg-1)"
				case 1   : return "Relative humidity (%)" 
				case 2   : return "Humidity mixing ration (kg kg-1)"
				case 3   : return "Precipitable water (kg m-2)"
				case 4   : return "Vapor pressure (Pa)"
				case 5   : return "Saturation deficit (Pa)"
				case 6   : return "Evaporation (kg m-2)"
				case 7   : return "Precipitation rate (kg m-2 s-1)"
				case 8   : return "Total precipitation (kg m-2)"
				case 9   : return "Large scale precipitation(non-convective) (kg m-2)"
				case 10  : return "Convective precipitation (kg m-2)"
				case 11  : return "Snow depth (m)"
				case 12  : return "Snowfall rate water equivalent (kg m-2 s-1)"
				case 13  : return "Water equivalent of accumulated snow depth (kg m-2)"
				case 14  : return "Convective snow (kg m-2)"
				case 15  : return "Large scale know (kg m-2)"
				case 16  : return "Snow melt(kg m-2)"
				case 17  : return "Snow age (day)"
				case 18  : return "Absolute humidity (kg m-3)"
				case 19  : return "Precipitation type (code table (4.201))"
				case 20  : return "Integrated liquid water (kg m-2)"
				case 21  : return "Condensate (kg kg-1)"
				case 22  : return "Cloud mixing ratio (kg kg-1)"
				case 23  : return "Ice water mixing ratio (kg kg-1)"
				case 24  : return "Rain mixing ratio (kg kg-1)"
				case 25  : return "Snow mixing ratio (kg kg-1)"
				case 26  : return "Horizontal moisture convergence (kg kg-1 s-1)"
				case 27  : return "Maximum relative humidity (%)"
				case 28  : return "Maximum absolute humidity (kg m-3)"
				case 29  : return "Total snowfall (m)"
				case 30  : return "Precipitable water category (code table(4.202))"
				case 31  : return "Hail (m)"
				case 32  : return "Graupel(snow pellets) (kg kg-1)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 2: Momentum
			case 2   : switch(number) {
				case 0   : return "Wind direction(from which blowing) (deg true)"
				case 1   : return "Wind speed (m s-1)" 
				case 2   : return "u-component of wind m s-1"
				case 3   : return "v-component of wind m s-1"
				case 4   : return "Stream function (m2 s-1)"
				case 5   : return "Velocity potential (m2 s-1)"
				case 6   : return "Montgomery streal function (m2 s-2)"
				case 7   : return "Sigma coordinate vertical velocity (s-1)"
				case 8   : return "Vertical velocity(pressure) (Pa s-1)"
				case 9   : return "Vertical velocity(geometric) (m s-1)"
				case 10  : return "Absolute vorticity (s-1)"
				case 11  : return "Absolute divergence (s-1)"
				case 12  : return "Relative vorticity (s-1)"
				case 13  : return "Relative divergence (s-1)"
				case 14  : return "Potential vorticity (K m2 kg-1 s-1)"
				case 15  : return "Vertical u-component shear (s-1)"
				case 16  : return "Vertical v-component shear (s-1)"
				case 17  : return "Momentum flux, u-component (N m-2)"
				case 18  : return "Momentum flux, v-component (N m-2)"
				case 19  : return "Wind mixing energy (J)"
				case 20  : return "Boundary layer dissipation (W m-2)"
				case 21  : return "Maximum wind speed (m s-1)"
				case 22  : return "Wind speed(gust) (m s-1)"
				case 23  : return "u-component of wind(gust) (m s-1)"
				case 24  : return "v-component of wind(gust) (m s-1)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 3: Mass
			case 3   : switch(number) {
				case 0   : return "Pressure (Pa)"
				case 1   : return "Pressure reduced to MSL (Pa)"
				case 2   : return "Pressure tendency (Pa s-1)"
				case 3   : return "ICAO Standard Atmosphere Reference Height (m)"
				case 4   : return "Geopotential (m2 s-2)"
				case 5   : return "Geopotential height (gpm)"
				case 6   : return "Geometric height (m)"
				case 7   : return "Standard deviation of height (m)"
				case 8   : return "Pressure anomaly (Pa)"
				case 9   : return "Geopotential height anomaly (gpm)"
				case 10  : return "Density (kg m-3)"
				case 11  : return "Altimeter setting (Pa)"
				case 12  : return "Thickness (m)"
				case 13  : return "Pressure altitude (m)"
				case 14  : return "Density altitude (m)"
				case 255 : return "Missing"
				default  : return "Unknown "+number		
			}
			//Parameter Category 4: Short-wave Radiation
			case 4   : switch(number) {
				case 0   : return "Net long wave radiation flux(surface) (W m-2)"
				case 1   : return "Net long wave radiation flux(top of atmosphere) (W m-2)"
				case 2   : return "Short wave radiation flux (W m-2)"
				case 3   : return "Global radiation flux (W m-2)"
				case 4   : return "Brightness temperature (K)"
				case 5   : return "Radiance(with respect to wave number) (W m-3 sr-1)"
				case 6   : return "Radiance(with respect to wave length) (W m-3 sr-1)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 5: Long-wave Radiation
			case 5   : switch(number) {
				case 0   : return "Net long wave radiation flux(surface) (W m-2)"
				case 1   : return "Net long wave radiation flux(top of atmosphere) (W m-2)"
				case 2   : return "Long wave radiation flux (W m-2)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 6: Cloud
			case 6   : switch(number) {
				case 0   : return "Cloud ice (kg m-2)"
				case 1   : return "Total cloud cover (%)"
				case 2   : return "Convective cloud cover (%)"
				case 3   : return "Low cloud cover (%)"
				case 4   : return "Medium cloud cover (%)"
				case 5   : return "High cloud cover (%)"
				case 6   : return "Cloud water (kg m-2)"
				case 7   : return "Cloud amount (%)"
				case 8   : return "Cloud type (code table (4.203))"
				case 9   : return "Thunderstorm maximum tops (m)"
				case 10  : return "Thunderstorm coverage (code table (4.204))"
				case 11  : return "Cloud base (m)"
				case 12  : return "Cloud top (m)"
				case 13  : return "Ceiling (m)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 7: Thermodynamic Stability Indices
			case 7   : switch(number) {
				case 0   : return "Parcel lifted index (to 500 hPa) (K)"
				case 1   : return "Best lifted index (to 500 hPa) (K)"
				case 2   : return "K index K"
				case 3   : return "KO index (K)"
				case 4   : return "Total totals index (K)"
				case 5   : return "Sweat index (numeric)"
				case 6   : return "Convective available potential energy J kg-1"
				case 7   : return "Convective inhibition (J kg-1)"
				case 8   : return "Storm relative helicity (J kg-1)"
				case 9   : return "Energy helicity index (numeric)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 13: Aerosols
			case 13  : switch(number) {
				case 0   : return "Aerosol type (code table (4.205))"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 14: Trace Gases
			case 14  : switch(number) {
				case 0   : return "Total ozone (Dobson)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 15: Radar
			case 15  : switch(number) {
				case 0   : return "Base spectrum width (m s-1)"
				case 1   : return "Base reflectivity (dB)"
				case 2   : return "Base radial velocity (m s-1)"
				case 3   : return "Vertically-integrated liquid (kg m-1)"
				case 4   : return "Layer-maximum base reflectivity (dB)"
				case 5   : return "Precipitation (kg m-2)"
				case 6   : return "Radar spectra (1)"
				case 7   : return "Radar spectra (2)"
				case 8   : return "Radar spectra (3)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 18: Nuclear/radiology
			case 18  : switch(number) {
				case 0   : return "Air concentration of Caesium 137 (Bq m-3)"
				case 1   : return "Air concentration of Iodine 131 (Bq m-3)"
				case 2   : return "Air concentration of radioactive pollutant (Bq m-3)"
				case 3   : return "Ground deposition of Caesium 137 (Bq m-2)"
				case 4   : return "Ground deposition of Iodine 131 (Bq m-2)"
				case 5   : return "Ground deposition of radioactive pollutant (Bq m-2)"
				case 6   : return "Time-integrated air concentration of caesium pollutant (Bq s m-3)"
				case 7   : return "Time-integrated air concentration of iodine pollutant (Bq s m-3)"
				case 8   : return "Time-integrated air concentration of radioactive pollutant (Bq s m-3)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 19: Physical atmospheric properties
			case 19  : switch(number) {
				case 0   : return "Visibility (m)"
				case 1   : return "Albedo (%)"
				case 2   : return "Thunderstorm probability (%)"
				case 3   : return "mixed layer depth (m)"
				case 4   : return "Volcanic ash (code table (4.206))"
				case 5   : return "Icing top (m)"
				case 6   : return "Icing base (m)"
				case 7   : return "Icing (code table (4.207))"
				case 8   : return "Turbulence top (m)"
				case 9   : return "Turbulence base (m)"
				case 10  : return "Turbulence (code table (4.208))"
				case 11  : return "Turbulent kinetic energy (J kg-1)"
				case 12  : return "Planetary boundary layer regime (code table (4.209))"
				case 13  : return "Contrail intensity (code table (4.210))"
				case 14  : return "Contrail engine type (code table (4.211))"
				case 15  : return "Contrail top (m)"
				case 16  : return "Contrail base (m)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 253: ASCII character string
			case 253 : switch(number) {
				case 0   : return "Arbitrary text string(CCITTIA5)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			default  : return "Unknown "+category
		}
		//Product Discipline 1: Hydrologic products,
		case 1: switch(category) {
			//Parameter Category 0: Hydrology basic products
			case 0  : switch(number) {
				case 0   : return "Flash flood guidance (kg m-2)"
				case 1   : return "Flash flood runoff (kg m-2)"
				case 2   : return "Remotely sensed snow cover (code table 4.215)"
				case 3   : return "Elevation of snow covered terrain (code table 4.216)"
				case 4   : return "Snow water equivalent percent of normal (%)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 1: Hydrology probabilities
			case 1  : switch(number) {
				case 0   : return "Conditional percent precipitation amount fractile for an overall period (kg m-2)"
				case 1   : return "Percent precipitation in a sub-period of an overall period (%)"
				case 2   : return "Probability of 0.01 inch of precipitation (POP) (%)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			default : return "Unknown "+category
		}
		//Product Discipline 2: Land surface products
		case 2: switch(category) {
			//Parameter Category 0: Vegetation/Biomass
			case 0  : switch(number){
				case 0   : return "Land cover (1=land, 2=sea) (Proportion)"
				case 1   : return "Surface roughness (m)"
				case 2   : return "Soil temperature (K)"
				case 3   : return "Soil moisture content (kg m-2)"
				case 4   : return "Vegetation (%)"
				case 5   : return "Water runoff (kg m-2)"
				case 6   : return "Evapotranspiration (kg-2 s-1)"
				case 7   : return "Model terrain height (m)"
				case 8   : return "Land use (code table (4.212))"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 3: Soil Products
			case 3  : switch(number) {
				case 0   : return "Soil type (code table (4.213))"
				case 1   : return "Upper layer soil temperature (K)"
				case 2   : return "Upper layer soil moisture (kg m-3)"
				case 3   : return "Lower layer soil moisture (kg m-3)"
				case 4   : return "Bottom layer soil temperature (K)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			default : return "Unknown "+category
			
		}
		//Product discipline 3: Space products,
		case 3: switch(category) {
			//Parameter Category 0: Image format products
			case 0  : switch(number) {
				case 0   : return "Scaled radiance (numeric)"
				case 1   : return "Scaled albedo (numeric)"
				case 2   : return "Scaled brightness temperature (numeric)"
				case 3   : return "Scaled precipitable water (numeric)"
				case 4   : return "Scaled lifted index (numeric)"
				case 5   : return "Scaled cloud top pressure (numeric)"
				case 6   : return "Scaled skin temperature (numeric)"
				case 7   : return "Cloud mask (Code table 4.217)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 1: Quantitative products
			case 1  : switch(number) {
				case 0   : return "Estimated precipitation (kg m-2)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			default : return "Unknown "+category
		}
		//Product Discipline 10: Oceanographic products,
		case 10: switch(category) {
			//Parameter Category 0: Waves
			case 0  : switch(number) {
				case 0   : return "Wave spectra (1)"
				case 1   : return "Wave spectra (2)"
				case 2   : return "Wave spectra (3)"
				case 3   : return "Significant height of combined wind waves and swell (m)"
				case 4   : return "Direction of wind waves (Degree true)"
				case 5   : return "Significant height of wind waves (m)"
				case 6   : return "Mean period of wind waves (s)"
				case 7   : return "Direction of swell waves (Degree true)"
				case 8   : return "Significant height of swell waves (m)"
				case 9   : return "Mean period of swell waves (s)"
				case 10  : return "Primary wave direction (Degree true)"
				case 11  : return "Primary wave mean period (s)"
				case 12  : return "Secondary wave direction (Degree true)"
				case 13  : return "Secondary wave mean period (s)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 1: Currents
			case 1  : switch(number) {
				case 0   : return "Current direction (Degree true)"
				case 1   : return "Current speed (m s-1)"
				case 2   : return "u-component of current (m s-1)"
				case 3   : return "v-component of current(m s-1)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 2: Ice
			case 2  : switch(number) {
				case 0   : return "Ice cover (Proportion)"
				case 1   : return "Ice thickness (m)"
				case 2   : return "Direction of ice drift (Degree true)"
				case 3   : return "Speed of ice drift (m s-1)"
				case 4   : return "u-component of ice drift (m s-1)"
				case 5   : return "v-component of ice drift (m s-1)"
				case 6   : return "Ice growth rate (m s-1)"
				case 7   : return "Ice divergence (s-1)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 3: Surface Properties
			case 3  : switch(number) {
				case 0   : return "Water temperature (K)"
				case 1   : return "Deviation of sea level from mean (m)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			//Parameter Category 4: Sub-surface Properties
			case 4  : switch(number) {
				case 0   : return "Main thermocline depth (m)"
				case 1   : return "Main thermocline anomaly (m)"
				case 2   : return "Transient thermocline depth (m)"
				case 3   : return "Salinity (kg kg-1)"
				case 255 : return "Missing"
				default  : return "Unknown "+number
			}
			default : return "Unknown "+category
		}
		default : return "Unknown "+discipline
	}	
}

// Type of generating process (code table 4.3)
exports.readGeneratingProcessType = function(value) {
	switch(value) {
		case 0   : return "Analysis"
		case 1   : return "Initialization"
		case 2   : return "Forecast"
		case 3   : return "Bias corrected forecast"
		case 4   : return "Ensemble forecast"
		case 5   : return "Probability forecast"
		case 6   : return "Forecast error"
		case 7   : return "Analysis error"
		case 8   : return "Observation"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Indicator of unit of time range (code table 4.4)
exports.readTimeRangeUnitIndicator = function(value) {
		switch(value) {
			case 0   : return "Minute"
			case 1   : return "Hour"
			case 2   : return "Day"
			case 3   : return "Month"
			case 4   : return "Year"
			case 5   : return "Decade(10 years)"
			case 6   : return "Normal(30 years)"
			case 7   : return "Century(100 years)"
			case 10  : return "3 hours"
			case 11  : return "6 hours"
			case 12  : return "12 hours"
			case 13  : return "Second"
			case 255 : return "Missing"
			default  : return "Unknown "+value
		}
}

// Fixed surface types and units (code table 4.5)
exports.readSurfaceTypesUnits = function(value) {
	switch(value) {
		case 1   : return "Ground or water surface"
		case 2   : return "Cloud base level"
		case 3   : return "Level of cloud tops"
		case 4   : return "Level of 0°C isotherm"
		case 5   : return "Level of adiabatic condensation lifted from the surface"
		case 6   : return "Maximum wind level"
		case 7   : return "Tropopause"
		case 8   : return "Nominal top of the atmosphere"
		case 9   : return "Sea bottom"
		case 20  : return "Isothermal level (K)"
		case 100 : return "Isobaric surface (Pa)"
		case 101 : return "Mean sea level"
		case 102 : return "Specific altitude above mean sea level (m)"
		case 103 : return "Specified height level above ground (m)"
		case 104 : return 'Sigma level ("sigma" value)'
		case 105 : return "Hybrid level"
		case 106 : return "Depth below land surface (m)"
		case 107 : return "Isentropic(theta) level (K)"
		case 108 : return "Level at specified pressure difference from ground to level (Pa)"
		case 109 : return "Potential vorticity surface (K m2 kg-1 s-1)"
		case 111 : return "Eta* level"
		case 117 : return "Mixed layer depth (m)"
		case 160 : return "Depth below sea level (m)"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Type of ensemble forecast (code table 4.6)
exports.readEnsembleForecastType = function(value) {
	switch(value) {
		case 0   : return "Unperturbed high-resolution control forecast"
		case 1   : return "Unperturbed low-resolution control forecast"
		case 2   : return "Negatively perturbed forecast"
		case 3   : return "Positively perturbed forecast"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

//  Derived forecast (code table 4.7)
exports.readDerivedForecast = function(value) {
	switch(value) {
		case 0   : return "Unweighted mean of all members"
		case 1   : return "Weighted mean of all members"
		case 2   : return "Standard deviation with respect to cluster mean"
		case 3   : return "Standard deviation with respect to cluster mean, normalized"
		case 4   : return "Spread of all members"
		case 5   : return "Large anomaly index of all members"
		case 6   : return "Unweighted mean of the cluster members"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Clustering Method (code table 4.8)
exports.readClusteringMethod = function(value) {
	switch(value) {
		case 0   : return "Anomaly correlation"
		case 1   : return "Root mean square"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Probability Type (code table 4.9)
exports.readProbabilityType = function(value) {
	switch(value) {
		case 0   : return "Probability of event below lower limit"
		case 1   : return "Probability of event above upper limit"
		case 2   : return "Probability of event between lower and upper limits. The range includes the lower limit but not the upper limit."
		case 3   : return "Probability of event above lower limit"
		case 4   : return "Probability of event below upper limit"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Type of statistical processing (code table 4.10)
exports.readStatisticalProcessingType = function(value) {
	switch(value) {
		case 0   : return "Average"
		case 1   : return "Accumulation"
		case 2   : return "Maximum"
		case 3   : return "Minimum"
		case 4   : return "Difference (Value at the end of time range minus value at the beginning)"
		case 5   : return "Root mean square"
		case 6   : return "Standard deviation"
		case 7   : return "Covariance (Temporal variance)"
		case 8   : return "Difference (Value at the start of time range minus value at the end)"
		case 9   : return "Ratio"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Type of time intervals (code table 4.11)
exports.readTimeIntervalsType = function(value) {
	switch(value) {
		case 1   : return "Successive times processed have same forecast time, start time of forecast is incremented"
		case 2   : return "Successive times processed have same start time of forecast, forecast time is incremented"
		case 3   : return "Successive times processed have start time of forecast incremented and forecast time decremented so that valid time remains constant"
		case 4   : return "Successive times processed have start time of forecast decremented and forecast time incremented so that valid time remains constant"
		case 5   : return "Floating subinterval of time between forecast time and end of overall time interval"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
} 

// Operating Mode (code table 4.12)
exports.readOperatingMode = function(value) {
	switch(value) {
		case 0   : return "Maintenance mode"
		case 1   : return "Clear air"
		case 2   : return "Precipitation"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Quality Control Indicator (code table 4.13)
exports.readQualityControlIndicator = function(value) {
	switch(value) {
		case 0   : return "No quality control applied"
		case 1   : return "Quality control applied"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Clutter Filter Indicator (code table 4.14)
exports.readClutterFillerIndicator = function(value) {
	switch(value) {
		case 0   : return "No clutter filter used"
		case 1   : return "Clutter filter used"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Precipitation Type (code table 4.201)
exports.readPrecipitationType = function(value) {
	switch(value) {
		case 1   : return "Rain"
		case 2   : return "Thunderstorm"
		case 3   : return "Freezing rain"
		case 4   : return "Mixed/ice"
		case 5   : return "Snow"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Precipitable water category (code table 4.202)
exports.readPrecipitableWaterCategory = function(value) {
	switch(value) {
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Cloud type (code table 4.203)
exports.readCloudType = function(value) {
	switch(value) {
		case 0   : return "Clear"
		case 1   : return "Cumulonimbus"
		case 2   : return "Stratus"
		case 3   : return "Stratocumulus"
		case 4   : return "Cumulus"
		case 5   : return "Altostratus"
		case 6   : return "Nimbostratus"
		case 7   : return "Altocumulus"
		case 8   : return "Cirrostratus"
		case 9   : return "Cirrocumulus"
		case 10  : return "Cirrus"
		case 11  : return "Cumulonimbus - ground based fog beneath the lowest layer"
		case 12  : return "Stratus - ground based fog beneath the lowest layer"
		case 13  : return "Stratocumulus - ground based fog beneath the lowest layer"
		case 14  : return "Cumulus - ground based fog beneath the lowest layer"
		case 15  : return "Altostratus - ground based fog beneath the lowest layer"
		case 16  : return "Nimbostratus - ground based fog beneath the lowest layer"
		case 17  : return "Altocumulus - ground based fog beneath the lowest layer"
		case 18  : return "Cirrostratus - ground based fog beneath the lowest layer"
		case 19  : return "Cirrocumulus - ground based fog beneath the lowest layer"
		case 20  : return "Cirrus - ground based fog beneath the lowest layer" 
		case 191 : return "Unknown type"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Thunderstorm coverage (code table 4.204)
exports.readThunderstormCoverage = function(value) {
	switch(value) {
		case 0   : return "None"
		case 1   : return "Isolated (1% - 2%)"
		case 2   : return "Few (3% - 15%)"
		case 3   : return "Scattered (16% - 45%)"
		case 4   : return "Numerous (> 45%)"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Aerosol type (code table 4.205)
exports.readAerosolType = function(value) {
	switch(value) {
		case 0   : return "Aerosol not present"
		case 1   : return "Aerosol present"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Volcanic ash (code table 4.206)
exports.readVolcanicAsh = function(value) {
	switch(value) {
		case 0   : return "Not present"
		case 1   : return "Present"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Icing (code table 4.207)
exports.readIcing = function(value) {
	switch(value) {
		case 0   : return "None"
		case 1   : return "Light"
		case 2   : return "Moderate"
		case 3   : return "Severe"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Turbulence (code table 4.208)
exports.readTurbulence = function(value) {
	switch(value) {
		case 0   : return "None(smooth)"
		case 1   : return "Light"
		case 2   : return "Moderate"
		case 3   : return "Severe"
		case 4   : return "Extreme"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Planetary boundary layer regime (code table 4.209)
exports.readPlanetaryBoundaryLayerRegime = function(value) {
	switch(value) {
		case 1   : return "Stable"
		case 2   : return "Mechanically driven turbulence"
		case 3   : return "Forced convection"
		case 4   : return "Free convection"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Contrail intensity (code table 4.210)
exports.readContrailIntensity = function(value) {
	switch(value) {
		case 0   : return "Contrail not present"
		case 1   : return "Contrail present"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Contrail engine type (code table 4.211)
exports.readContrailEngineType = function(value) {
	switch(value) {
		case 0   : return "Low bypass"
		case 1   : return "High bypass"
		case 2   : return "Non bypass"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Land use (code table 4.212)
exports.readLandUse = function(value) {
	switch(value) {
		case 1   : return "Urban land"
		case 2   : return "Agriculture"
		case 3   : return "Range land"
		case 4   : return "Deciduous forest"
		case 5   : return "Coniferous forest"
		case 6   : return "Forest/wetland"
		case 7   : return "Water"
		case 8   : return "Wetlands"
		case 9   : return "Desert"
		case 10  : return "Tundra"
		case 11  : return "Ice"
		case 12  : return "Tropical forest"
		case 13  : return "Savannah"
		case 255 : return "Missing"
		default  : return "Unknown "+value 
	}
}

// Soil type (code table 4.213)
exports.readSoilType = function(value) {
	switch(value) {
		case 1   : return "Sand"
		case 2   : return "Loamy sand"
		case 3   : return "Sandy loam"
		case 4   : return "Silt loam"
		case 5   : return "Organic(redefined)"
		case 6   : return "Sandy clay loam"
		case 7   : return "Silt clay loam"
		case 8   : return "Clay loam"
		case 9   : return "Sandy clay"
		case 10  : return "Silty clay"
		case 11  : return "Clay"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Remotely Sensed Snow Coverage (code table 4.215)
exports.readRemotelySensedSnowCoverage = function(value) {
	switch(value) {
		case 50  : return "No-snow/no-cloud"
		case 100 : return "Clouds"
		case 250 : return "Snow"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Elevation of Snow Covered Terrain (code table 4.216)
exports.readSnowCoveredTerrainElevation = function(value) {
	if(value >= 0 && value <= 90)
		return "Elevation in increments of 100 m"
	else if(value == 254)
		return "Clouds"
	else if(value == 255)
		return "Missing"
	else
		return "Unknown "+value
}

// Cloud mask type (code table 4.217)
exports.readCloudMaskType = function(value) {
	switch(value) {
		case 0   : return "Clear over water"
		case 1   : return "Clear over land"
		case 2   : return "Cloud"
		case 3   : return "No data"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Horizontal dimension processed (code table 4.220)
exports.readHorizontalDimensionProcessed = function(value) {
	switch(value) {
		case 0   : return "Latitude"
		case 1   : return "Longitude"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Treatment of missing data (code table 4.221)
exports.readMissingDataTreatment = function(value) {
	switch(value) {
		case 0   : return "Not included" 
		case 1   : return "Extrapolated"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Data Representation Template Number (code table 5.0)
exports.readDataRepresentationTemplateNumber = function(value) {
	switch(value) {
		case 0   : return "Grid point data - simple packing"
		case 1   : return "Matrix value - simple packing"
		case 2   : return "Grid point data - complex packing"
		case 3   : return "Grid point data - complex packing and spatial differencing"
		case 50  : return "Spectral data -simple packing"
		case 51  : return "Spherical harmonics data - complex packing"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Type of original field values (code table 5.1)
exports.readOriginalFieldValuesType = function(value) {
	switch(value) {
		case 0   : return "Floating point"
		case 1   : return "Integer"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Matrix coordinate value function definition (code table 5.2)
exports.readMatrixCoordinateValueFunctionDefinition = function(value) {
	switch(value) {
		case 0   : return "Explicit coordinate values set"
		case 1   : return "Linear coordinates"
		case 11  : return "Geometric coordinates"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Matrix coordinate parameter (code table 5.3)
exports.readMatrixCoordinateParameter = function(value) {
	switch(value) {
		case 1   : return "Direction Degrees true"
		case 2   : return "Frequency (s-1)"
		case 3   : return "Radial number (2pi/lambda) (m-1)"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Group Splitting Method (code table 5.4)
exports.readGroupSplittingMethod = function(value) {
	switch(value) {
		case 0   : return "Row by row splitting"
		case 1   : return "General group splitting"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Missing Value Management for Complex Packing (code table 5.5)
exports.readMissingValueManagement = function(value) {
	switch(value) {
		case 0   : return "No explicit missing values included within data values"
		case 1   : return "Primary missing values included within data values"
		case 2   : return "Primary and secondary missing values included within data values"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Order of Spatial Differencing (code table 5.6)
exports.readSpatialDifferencingOrder = function(value) {
	switch(value) {
		case 1   : return "First-order spatial differencing"
		case 2   : return "Second-order spatial differencing"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Precision of floating-point numbers (code table 5.7)
exports.readFloatingPointNumbersPrecision = function(value) {
	switch(value) {
		case 1   : return "IEEE 32-bit (I=4 in Section 7)"
		case 2   : return "IEEE 64-bit (I=8 in Section 7)"
		case 3   : return "IEEE 128-bit (I=16 in Section 7)"
		case 255 : return "Missing"
		default  : return "Unknown "+value
	}
}

// Type of compression (code table 5.40)
exports.readCompressionType = function(value) {
    switch(value) {
        case 0   : return "Lossless"
        case 1   : return "Lossy"
        case 255 : return "Missing"
        default  : return "Unknown "+value
    }
}

// Bit Map Indicator (code table 6.0)
exports.readBitMapIndicator = function(value) {
	if(value == 0)
		return "A bit map applies to this product and is specified in this Section"
	else if (value >= 1 && value <= 253)
		return "A bit map pre-determined by the originating/generating Centre applies to this product and is not specified in this Section"
	else if (value == 254)
		return 'A bit map defined previously in the same "GRIB" message applies to this product'
	else if (value == 255)
		return "Missing"
	else
		return "Unknown "+value
}
