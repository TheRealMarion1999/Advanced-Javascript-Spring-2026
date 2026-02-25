const init = () => {

}

const getLocation = () => {
    const URL = "" //"https://api.geonames.org/postalCodeSearchJSON";
    const COUNTRY = "USA";

    const XHR = new XMLHttpRequest();

    XHR.open("get", URL);

    XHR.onload = () => {
        if (xhr.readyState === 4) {

        }
    }

    XHR.onerror = () => {
        console.log("network error");
    }
}

const getWeather = (lat, lng) => {

}

window.onload = init;