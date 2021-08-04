class Coordinate{
    constructor(lat,long){
        this.latitude = lat
        this.longitude = long
    }

    static fromCoordinates(coords){
        let lat = coords.latitude;
        let long = coords.longitude;
        return new Coordinate(lat,long)
    }
}

const TEMP = {
    KELVIN : 0,
    FAHRENHEIT : 1,
    CELSIUS : 2,
}

function convertTempetureUnit(degree,inType,outType,decimals = 2) {
    //Convert temp to Kelvin
    switch (inType){
        case TEMP.KELVIN:
            
            break
        case TEMP.FAHRENHEIT:
            degree = (degree-32) * 5/9 + 273.15
            break
        case TEMP.CELSIUS:
            degree = (degree+273.15)
            break
        default:
            throw "Tempeture type is not valid"
    }

    switch (outType){
        case TEMP.KELVIN:
            
            break
        case TEMP.FAHRENHEIT:
            degree = (degree - 273.15) * 9/5 + 32
            break
        case TEMP.CELSIUS:
            degree = (degree-273.15)
            break
        default:
            throw "Tempeture type is not valid"
    }

    return Number((degree).toFixed(decimals));

}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}
