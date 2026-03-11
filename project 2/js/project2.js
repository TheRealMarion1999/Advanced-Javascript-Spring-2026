const USERNAME = "sjniesen";
//TODO: For now, this is fine as just US, but getting different countries could be a worthwhile feature.
const COUNTRY = "US";
const ZIPCODE= 53562;

const init = () => {
    const WEATHER_BUTTON = document.getElementById("getWeather");
    WEATHER_BUTTON.addEventListener("click", getLocation);
}

const getLocation = () => {
    const URL = "http://api.geonames.org/postalCodeSearchJSON";

    const MESSAGE = document.getElementById("loadingMessage");
    MESSAGE.textContent = "Girls are conducting meteorology, please wait warmly...";

    const ENTERED_POSTAL_CODE = document.getElementById("zipCode");
    const POSTALCODE = ENTERED_POSTAL_CODE.value;
    console.log(POSTALCODE);

    const PARAMS = `?username=${USERNAME}&postalcode=${POSTALCODE}&country=${COUNTRY}`;

    const XHR = new XMLHttpRequest();

    console.log(URL + PARAMS);

    XHR.open("get", URL + PARAMS, true);

    XHR.onload = () => {
        
        if (XHR.readyState === 4) {
            const DATA = JSON.parse(XHR.responseText);
            const LAT = DATA.postalCodes[0].lat;
            const LNG = DATA.postalCodes[0].lng;
            const PLACE = DATA.postalCodes[0].placeName;
            const STATE = DATA.postalCodes[0].adminName1;
            const COUNTY = DATA.postalCodes[0].adminName2;
            //this is probably not a good way to do it. nesting XHRs just feels wrong, y'know?
            getWeather(LAT, LNG);
        }
    }
    XHR.onerror = () => {
        MESSAGE.textContent = "network error while processing location";
        console.log("network error while processing location");
    }
    XHR.send(null);
}

const getWeather = (lat, lng) => {
    const URL = "http://api.geonames.org/findNearByWeatherJSON";
    const PARAMS = `?lat=${lat}&lng=${lng}&username=${USERNAME}`;

    const MESSAGE = document.getElementById("loadingMessage");

    console.log(URL + PARAMS);
    const XHR = new XMLHttpRequest();

    XHR.open("get", URL + PARAMS, true);

    XHR.onload = () => {
        if (XHR.readyState === 4) {
            const DATA = JSON.parse(XHR.responseText);
            //this is great but... how am I gonna get this outta here?
            console.log(DATA);
            const WIND_DIRECTON = DATA.weatherObservation.windDirection;
            const WIND_SPEED = DATA.weatherObservation.windSpeed;
            const TEMPERATURE = convert_to_burger_measurements(DATA.weatherObservation.temperature).toFixed(2);
            console.log(TEMPERATURE);
            //ohhhh ewwww am I really gonna have to put the node creation in here too...? gross...
            create_weather_information(TEMPERATURE, WIND_SPEED, WIND_DIRECTON);
        }
    }
    XHR.onerror = () => {
        MESSAGE.textContent = "network error while processing weather data"
        console.log("network error while processing weather data");
    }
    XHR.send(null);

    MESSAGE.textContent = ""
    

}

const convert_to_burger_measurements = (celsius) => {
    const FARENHEIT = celsius * (9.0/5.0) + 32;
    return FARENHEIT;
}

const create_weather_information = (farenheit, windSpeed, windDirection) => {
    const TEMPERATURE_TABLE = document.getElementById("temperature");
    const TEMPERATURE_HOT_SYMBOL = String.fromCodePoint(0x2600);
    const TEMPERATURE_COLD_SYMBOL = String.fromCodePoint(0x2744);
    const TEMPERATURE_NEUTRAL_SYMBOL = String.fromCodePoint(0x2601);
    const WIND_SPEED_TABLE = document.getElementById("windSpeed");
    const WIND_SYMBOL = String.fromCodePoint(0xF04);
    const WIND_THRESHOLD = 15;

    const WIND_DIRECTION_TABLE = document.getElementById("windDir");
    const WIND_DIRECTION_N = 0;
    const WIND_DIRECTION_E = 90;
    const WIND_DIRECTION_S = 180;
    const WIND_DIRECTION_W = 270;
    const WIND_DIRECTION_W_SYMBOL = String.fromCodePoint(0x2190);
    const WIND_DIRECTION_N_SYMBOL = String.fromCodePoint(0x2191);
    const WIND_DIRECTION_E_SYMBOL = String.fromCodePoint(0x2192);
    const WIND_DIRECTION_S_SYMBOL = String.fromCodePoint(0x2193);
    const WIND_DIRECTION_NW_SYMBOL = String.fromCodePoint(0x2196);
    const WIND_DIRECTION_NE_SYMBOL = String.fromCodePoint(0x2197);
    const WIND_DIRECTION_SE_SYMBOL = String.fromCodePoint(0x2198);
    const WIND_DIRECTION_SW_SYMBOL = String.fromCodePoint(0x2199);

    const HOT = 83;
    const COLD = 34;
    windSpeed = WIND_THRESHOLD
    if (windSpeed >= WIND_THRESHOLD) {
        WIND_SPEED_TABLE.textContent = windSpeed + WIND_SYMBOL;
    } else {
        WIND_SPEED_TABLE.textContent = windSpeed;
    }
    if (farenheit >= HOT) {
        TEMPERATURE_TABLE.textContent = TEMPERATURE_HOT_SYMBOL;
    } else if (farenheit <= COLD) {
        TEMPERATURE_TABLE.textContent = TEMPERATURE_COLD_SYMBOL;
    } else {
        TEMPERATURE_TABLE.textContent = TEMPERATURE_NEUTRAL_SYMBOL;
    }
    //if Wind Direction +- 11 is within the bounds of a wind direction, make its text content that symbol.
    if (windDirection) {
        
    }


}

window.onload = init;