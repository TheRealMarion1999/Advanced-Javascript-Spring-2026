function lab1() {
    let message;

    const OUTPUT = document.getElementById("username");

    const CONSTANT = OUTPUT.value;
    
    //technically not doing anything, since the form's input is marked as required anyways, so you uh... *can't* input "".
    // this would be a kind of gross way of doing it anyway, since there's already a built-in tool for that kind of validation in html.
    // my understanding is that you'd use JS for more complex validation that can't be done in html.
    if (CONSTANT !== "") {
        message = "Welcome to AdvJava, " + CONSTANT + "!";
    }

    alert(message);
}

const testing_putting_things_down = () => {
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