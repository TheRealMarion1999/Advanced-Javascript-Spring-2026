//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
let table_set = false;
const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];
let table = document.getElementById("taxes-table");
const init = () => {
    table = document.getElementById("taxes-table");


    //TODO: Unify the tax_calcs functions
    let ButtonEventListener = document.getElementById("button2020");
    ButtonEventListener.addEventListener("click", tax_calcs);
    let ButtonEventListener2 = document.getElementById("button2024");
    ButtonEventListener2.addEventListener("click", tax_calcs);
}

const tax_calcs = event => {
    let table = document.getElementById("taxes-table");
    //check if TRs exist
    //if they do, get rid of the current TRs and replace them with a new batch
    //populate each TR with 2 TDs
    for (i in TABLE_VALUES) {
        //apparenlty this has to be here... kinda don't like that lol. In Godot I could just declare it globally and then call a .new() function on nodes.
        let table_rows = document.createElement("tr");
        console.log(TABLE_VALUES[i]);
        //populate the taxes table
        table.appendChild(table_rows);

        
    }

    //this is a slightly more secure way of doing it, in the event we ever end up adding new buttons to the site
    if (event.currentTarget.getAttribute("data-model") == "taxes2020") {
        console.log("beef");
    } else if (event.currentTarget.getAttribute("data-model") == "taxes2024") {
        console.log("chicken");
    }
}
document.addEventListener("DOMContentLoaded", init);