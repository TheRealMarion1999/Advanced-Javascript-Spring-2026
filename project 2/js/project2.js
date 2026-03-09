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

const create_weather_information = (farenheit, windSpeed) => {
    const WIND_THRESHOLD = 15;
    if (windSpeed > WIND_THRESHOLD) {
        //add the wind symbol
    }

}

window.onload = init;