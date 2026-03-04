const USERNAME = "sjniesen";
const COUNTRY = "USA";
const ZIPCODE= 53562;

const init = () => {
    const WEATHER_BUTTON = document.getElementById("getWeather");
    WEATHER_BUTTON.addEventListener("click", getLocation);
}

const getLocation = () => {
    const URL = "http://api.geonames.org/postalCodeSearchJSON";

    const ENTERED_POSTAL_CODE = document.getElementById("zipCode");
    const POSTALCODE = ENTERED_POSTAL_CODE.value;
    console.log(ZIPCODE);

    const PARAMS = `?username=${USERNAME}&postalcode=${ZIPCODE}&country=${COUNTRY}`;

    const XHR = new XMLHttpRequest();

    console.log(URL + PARAMS);

    XHR.open("get", URL + PARAMS);

    XHR.onload = () => {
        if (XHR.readyState === 4) {
            const DATA = JSON.parse(XHR.responseText);

            console.log(DATA);
            const LAT = DATA;
        }
    }

    XHR.onerror = () => {
        console.log("network error");
    }
}

const getWeather = (lat, lng) => {

}

window.onload = init;