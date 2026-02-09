//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
let table_set = false;
let table = document.getElementById("taxes-table");
const init = () => {
    table = document.getElementById("taxes-table");


    //TODO: Unify the tax_calcs functions
    let ButtonEventListener = document.getElementById("button2020");
    ButtonEventListener.addEventListener("click", tax_calcs);
    let ButtonEventListener2 = document.getElementById("button2024");
    ButtonEventListener2.addEventListener("click", tax_calcs);
}

const tax_calcs = () => {
    console.log("beef");
    //check if TRs exist
    //if they do, get rid of the current TRs and replace them with a new batch
    //populate each TR with 2 TDs
    //names will likely have to be hardcoded (could use an array? Maybe? sounds jank.)
    //
}

const tax_calcs_2024 = () => {
    console.log("chicken")
}
document.addEventListener("DOMContentLoaded", init);