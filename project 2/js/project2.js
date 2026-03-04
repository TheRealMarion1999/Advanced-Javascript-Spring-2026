const USERNAME = "sjniesen";
//TODO: For now, this is fine as just US, but getting different countries could be a worthwhile feature.
const COUNTRY = "US";
const ZIPCODE= 53562;

const init = () => {
    const WEATHER_BUTTON = document.getElementById("getWeather");
    WEATHER_BUTTON.addEventListener("click", getLocation);
}

const getLocation = () => {
    let lat;
    let lng;
    const URL = "http://api.geonames.org/postalCodeSearchJSON";

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
        console.log("network error while processing location");
    }
    XHR.send(null);
}

const getWeather = (lat, lng) => {
    const URL = "http://api.geonames.org/findNearByWeatherJSON";
    const PARAMS = `?lat=${lat}&lng=${lng}&username=${USERNAME}`;

    console.log(URL + PARAMS);
    const XHR = new XMLHttpRequest();

    XHR.open("get", URL + PARAMS, true);

    XHR.onload = () => {
        if (XHR.readyState === 4) {
            const DATA = JSON.parse(XHR.responseText);
            //this is great but... how am I gonna get this outta here?
            console.log(DATA);
        }
    }
    XHR.onerror = () => {
        console.log("network error while processing weather data");
    }
    XHR.send(null);

}

window.onload = init;