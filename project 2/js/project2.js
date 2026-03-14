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

    const PARAMS = `?username=${USERNAME}&postalcode=${POSTALCODE}&country=${COUNTRY}`;

    const XHR = new XMLHttpRequest();

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
    const XHR = new XMLHttpRequest();

    XHR.open("get", URL + PARAMS, true);

    XHR.onload = () => {
        if (XHR.readyState === 4) {
            const DATA = JSON.parse(XHR.responseText);
            const WIND_DIRECTON = DATA.weatherObservation.windDirection;
            const WIND_SPEED = DATA.weatherObservation.windSpeed;
            const TEMPERATURE = convert_to_burger_measurements(DATA.weatherObservation.temperature).toFixed(2);
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
    temperatureStuff(farenheit);
    windStuff(windSpeed, windDirection);
}

const temperatureStuff = (farenheit) => {
    const TEMPERATURE_TABLE = document.getElementById("temperature");
    const TEMPERATURE_HOT_SYMBOL = String.fromCodePoint(0x2600);
    const TEMPERATURE_COLD_SYMBOL = String.fromCodePoint(0x2744);
    const TEMPERATURE_NEUTRAL_SYMBOL = String.fromCodePoint(0x2601);
    const HOT = 83;
    const COLD = 34;
    if (farenheit >= HOT) {
        TEMPERATURE_TABLE.textContent = TEMPERATURE_HOT_SYMBOL;
    } else if (farenheit <= COLD) {
        TEMPERATURE_TABLE.textContent = TEMPERATURE_COLD_SYMBOL;
    } else {
        TEMPERATURE_TABLE.textContent = TEMPERATURE_NEUTRAL_SYMBOL;
    }
}

const windStuff = (windSpeed, windDirection) => {
    const WIND_SPEED_TABLE = document.getElementById("windSpeed");
    const WIND_SYMBOL = String.fromCodePoint(0xF04);
    const WIND_THRESHOLD = 15;

    const WIND_DIRECTION_TABLE = document.getElementById("windDir");
    //these are giving me grief because I'm too used to Eulers and being able to go backwards on an axis by going negative. I can't do that here.
    const WIND_DIRECTION_N = 0;
    const WIND_DIRECTION_NE = range(23, 77, 1);
    const WIND_DIRECTION_E = 90;
    const WIND_DIRECTION_SE = range(112, 158, 1);
    const WIND_DIRECTION_S = 180;
    const WIND_DIRECTION_SW = range(202, 248, 1);
    const WIND_DIRECTION_W = 270;
    const WIND_DIRECTION_NW = range(292, 338, 1);
    const WIND_DIRECTION_W_SYMBOL = String.fromCodePoint(0x2190);
    const WIND_DIRECTION_N_SYMBOL = String.fromCodePoint(0x2191);
    const WIND_DIRECTION_E_SYMBOL = String.fromCodePoint(0x2192);
    const WIND_DIRECTION_S_SYMBOL = String.fromCodePoint(0x2193);
    const WIND_DIRECTION_NW_SYMBOL = String.fromCodePoint(0x2196);
    const WIND_DIRECTION_NE_SYMBOL = String.fromCodePoint(0x2197);
    const WIND_DIRECTION_SE_SYMBOL = String.fromCodePoint(0x2198);
    const WIND_DIRECTION_SW_SYMBOL = String.fromCodePoint(0x2199);

    if (windSpeed >= WIND_THRESHOLD) {
        WIND_SPEED_TABLE.textContent = windSpeed + WIND_SYMBOL;
    } else {
        WIND_SPEED_TABLE.textContent = windSpeed;
    }
    //if Wind Direction +- 11 is within the bounds of a wind direction, make its text content that symbol.
    //TODO: Make this a switch. I don't know how to do declarations as cases but there's a way to do it in Godot so there's prolly a way to do it here.
    //Yanderedev "There has to be a better way to do this".png
    if (WIND_DIRECTION_NW.includes(windDirection)) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_NW_SYMBOL;
    } else if (windDirection >= WIND_DIRECTION_W) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_W_SYMBOL;
    } else if (WIND_DIRECTION_SW.includes(windDirection)) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_SW_SYMBOL;
    } else if (windDirection >= WIND_DIRECTION_S) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_S_SYMBOL;
    } else if (WIND_DIRECTION_SE.includes(windDirection)) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_W_SYMBOL;
    } else if (windDirection >= WIND_DIRECTION_E) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_E_SYMBOL;
    } else if (WIND_DIRECTION_NE.includes(windDirection)) {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_NE_SYMBOL;
    } else {
        WIND_DIRECTION_TABLE.textContent = WIND_DIRECTION_N_SYMBOL;
    }
}

//Shamlessly stolen from Stackoverflow, I didn't feel like typing out a 41 integer array for problem-solving with wind directions.
//here's the thread I took it from: https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

window.onload = init;