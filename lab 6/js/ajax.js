const init = () => {
    let xhr = new XMLHttpRequest();
    const URL = "mystery.txt";

    console.log("readystate: " + xhr.readyState);
    xhr.withCredentials = true;
    xhr.open("get", URL);

    xhr.onreadystatechange = () => {
        const CONTAINER = document.getElementById("container");
        if (xhr.readyState == 4) {
            const TEXT = xhr.responseText;
            const PARAGRAPH = document.createElement("p");
            PARAGRAPH.textContent = TEXT;
            CONTAINER.appendChild(PARAGRAPH);
        }
    }

    xhr.send(null);

    console.log(xhr.responseText);
}


window.onload = init