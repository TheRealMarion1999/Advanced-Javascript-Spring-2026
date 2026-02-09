//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];
let table = document.getElementById("taxes-table");
let grossPay = 0;
let fedTax = 0;
let stateTax = 0;
let medTax = 0;
let SSNTax = 0;
let totalTax = 0;
let netPay = 0;
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

        if (get_table_size(table) > 1) {
            destroy_table_rows();
        }
        //check if TRs exist (or just... anything in table, really.)
        //if they do, get rid of the current TRs and replace them with a new batch
        //destroy_table_rows();
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
    let table_row = document.createElement("tr");
    table_row.className = "infoRow";
    //(TODO: prolly could do this better)
    let table_data_L = document.createElement("td");
    let table_data_R = document.createElement("td");
    table_data_L.textContent = leftCellContent;
    table_data_R.textContent = rightCellContent;
    table_row.appendChild(table_data_L);
    table_row.appendChild(table_data_R);
    table.appendChild(table_row);
}

//destroys all rows in the current array
const destroy_table_rows = () => {
    let table = document.getElementById("taxes-table");

    let child = table.lastElementChild;
    while (child) {
        table.removeChild(child);
        child = table.lastElementChild;
    }
}


const tax_calcs_2020 = (money) => {
    grossPay = 1;
    fedTax = 2;
    stateTax = 3;
    medTax = 4;
    SSNTax = 5;
    totalTax = 6;
    netPay = 7;
    return [grossPay, fedTax, stateTax, medTax, SSNTax, totalTax, netPay];
}

const tax_calcs_2024 = (money) => {
    grossPay = 8;
    fedTax = 9;
    stateTax = 10;
    medTax = 11;
    SSNTax = 12;
    totalTax = 13;
    netPay = 14;
    return [grossPay, fedTax, stateTax, medTax, SSNTax, totalTax, netPay];
}

const get_table_size = (table) => {
    let table2 = document.getElementById("taxes-table");
    let table_size = table.childNodes;

    return table_size.length;
}

document.addEventListener("DOMContentLoaded", init);