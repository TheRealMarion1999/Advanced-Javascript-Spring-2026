//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
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
    let values = [];
    let userInput = document.getElementById("input");
    let userInputValue = userInput.value;
    if (userInputValue !== "") {
        //check if TRs exist
        //if they do, get rid of the current TRs and replace them with a new batch
        //populate each TR with 2 TDs
        //this is a slightly more secure way of doing it, in the event we ever end up adding new buttons to the site
        if (event.currentTarget.getAttribute("data-model") == "taxes2020") {
            values = tax_calcs_2020(userInputValue);
        } else if (event.currentTarget.getAttribute("data-model") == "taxes2024") {
            values = tax_calcs_2024(userInputValue);
        }
        for (i in TABLE_VALUES) {
            create_table_row(table, TABLE_VALUES[i], values[i]);
        }
    }
}

//creates a table row with a value from the TABLE_VALUES array
const create_table_row = (table, leftCellContent = "term", rightCellContent = "value") => {
    let table_rows = document.createElement("tr");
    //(TODO: prolly could do this better)
    let table_data_L = document.createElement("td");
    let table_data_R = document.createElement("td");
    table_data_L.textContent = leftCellContent;
    table_data_R.textContent = rightCellContent;
    table_rows.appendChild(table_data_L);
    table_rows.appendChild(table_data_R);
    table.appendChild(table_rows);
}

const tax_calcs_2020 = (money) => {

    let grossPay = 0;
    let fedTax = 0;
    let stateTax = 0;
    let medTax = 0;
    let SSNTax = 0;
    let totalTax = 0;
    let netPay = 0;
    return [grossPay, fedTax, stateTax, medTax, SSNTax, totalTax, netPay];
}

const tax_calcs_2024 = (money) => {
    console.log(money);
}

document.addEventListener("DOMContentLoaded", init);