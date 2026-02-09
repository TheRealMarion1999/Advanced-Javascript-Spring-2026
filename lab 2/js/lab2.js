
//I know the lab asked for a variable, but... we're never going to change any of these, and even then if I remember right,
//consts work a little different in JS, don't they? Like, I vaguely remember them being more fluid than in what I'd consider a "normal"
//language like C or Java

//EDIT: The reason they're more fluid is just because of the stateless form of the web, so reloading a web page is the same as reloading
//an instance.
const LAB_TITLE = "Programming for Designers - Lab 2";

const init = () => {
    //...technically, these could also be constants, since we're not changing them.
    //actually, couldn't the value from lab 1 also be a constant? I might try that now...
    let id;
    let name;
    let bornInMadison;

    //these still showed up as null for me, why?
    const BEANS = document.querySelector("#beans");
    
    const BEANS2 = document.getElementById("beans");

    id = 10;
    name = "Marion";
    bornInMadison = true;
    
    printLabTitle();
    printLabParameters(id, name, bornInMadison);
}


// :V I didn't know about this before the lecture!!
//researched into this a bit more. seems like these don't get hoisted to the top of the script?
//I'm not really sure why I should use this, it's neat but seems like a more cumbersome way of writing functions vs declaring a block.
const printLabTitle = () => console.log(LAB_TITLE);

//oh I forgot you can't specify types for parameters... that's kinda annoying, I'm so used to doing that even in dynamically typed languages.
const printLabParameters = (id, name, bornInMadison) => {
    console.log(id);
    console.log(name);
    console.log(bornInMadison);
}


document.addEventListener("DOMContentLoaded", init)
//function printLabTitle() {
//    console.log(LAB_TITLE);
//}