const init = () => {
    let divWithClass = document.createElement('div');
    let input = document.createElement('input');
    let button = document.createElement('button');

    //setting up internal variables... wouldn't it be nicer to just have a function for this? Hmmm...
    //like a general set function. I don't even really think it'd do much it'd just look nicer lol
    divWithClass.className = "form-group";
    input.className = "form-control"
    input.type = "text";
    input.id = "username";
    button.type = "button";
    button.textContent = "click me";

    divWithClass.appendChild(input);
    divWithClass.appendChild(button);
    document.body.appendChild(divWithClass);


}



document.addEventListener("DOMContentLoaded", init)