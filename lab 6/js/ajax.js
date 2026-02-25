const init = () => {
    const xhr = new XMLHttpRequest();
    const URL = "mystery.txt";

    console.log("readystate: " + xhr.readyState);
    xhr.withCredentials = true;
    xhr.open("get", URL);
    /*
    xhr.onreadystatechange = () => {
        some_stuff(xhr)
    }
    */

    xhr.onload = () => {
        some_stuff(xhr);
    }
    xhr.onerror = () => {
        console.log("Network error");
    }
    xhr.send(null);

    console.log(xhr.responseText);
}

const some_stuff = (xhr) => {
    const CONTAINER = document.getElementById("container");
    if (xhr.readyState == 4) {
        const TEXT = xhr.responseText;
        const PARAGRAPH = document.createElement("p");
        PARAGRAPH.textContent = TEXT;
        CONTAINER.appendChild(PARAGRAPH);
    }
}


window.onload = init