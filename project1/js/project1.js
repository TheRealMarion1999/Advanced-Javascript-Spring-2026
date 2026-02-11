//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];
let table = document.getElementById("taxes-table");
//kind of bad practice to make these an array, but I couldn't think of good, clear names for each bracket
const FED_TAX_BRACKETS_2020 = [9876, 40126, 85526, 163301, 207351, 518401];
const FED_TAX_BRACKETS_2024 = [11601, 47151, 100526, 191951, 243726, 609351];
const WI_TAX_BRACKETS_2020 = [11971, 23931, 263481];
const WI_TAX_BRACKETS_2024 = [12761, 25521, 280951];
const SOCIAL_SECURITY_TAX_LIMIT_2020 = 137000;
const MEDICARE_TAX_LIMIT_2020 = 200000;
const SOCIAL_SECURITY_TAX_LIMIT_2024 = 168000;
const MEDICARE_TAX_LIMIT_2024 = 200000;
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
            destroy_table_rows(table);
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
const destroy_table_rows = (table) => {

    let child = table.lastElementChild;
    while (child) {
        table.removeChild(child);
        child = table.lastElementChild;
    }
}

//TODO: replace magic numbers
//TODO: move all of these to individual functions

//TODO: Frankly this whole roundabout way of doing it is stupid. There has to be a better way.
const tax_calcs_2020 = (money) => {
    let grossPay = 0;
    let fedTax = 0;
    let stateTax = 0;
    let medTax = 0;
    let SSNTax = 0;
    let totalTax = 0;
    let netPay = 0;
    money = Number(money);
    if (grossPay > FED_TAX_BRACKETS_2020[5]) {
        remainder = grossPay - 245178;
        fedTax = 245178 + (remainder * .37);
    } else if (grossPay > FED_TAX_BRACKETS_2020[4]) {
        remainder = grossPay - 130090;
        fedTax = 130090 + (remainder * .35);
    } else if (grossPay > FED_TAX_BRACKETS_2020[3]) {
        remainder = grossPay - 63810;
        fedTax = 63810 + (remainder * .32);
    } else if (grossPay > FED_TAX_BRACKETS_2020[2]) {
        remainder = grossPay - 24618;
        fedTax = 24618 + (remainder * .24);
    } else if (grossPay > FED_TAX_BRACKETS_2020[1]) {
        remainder = grossPay - 5802.5
        fedTax = 5802.5 + (remainder * .22);
    } else if (grossPay > FED_TAX_BRACKETS_2020[0]) {
        remainder = grossPay - 987.5;
        fedTax = 987.5 + (remainder * .12);
    } else {
        fedTax = grossPay * .1;
    }
    if (grossPay > WI_TAX_BRACKETS_2020[2]) {
        stateTax = 1;
    } else if (grossPay > WI_TAX_BRACKETS_2020[1]) {
        stateTax = 2;
    } else if (grossPay > WI_TAX_BRACKETS_2020[0]) {
        stateTax = 3;
    } else {
        stateTax = 4;
    }
    if (grossPay > SOCIAL_SECURITY_TAX_LIMIT_2020) {
        SSNTax = 84940;
    } else {
        SSNTax = grossPay * .062;
    }
    if (grossPay > MEDICARE_TAX_LIMIT_2020) {
        remainder = grossPay - 29000
        medTax = 29000 + (remainder * .0235);
    } else {
        medTax = grossPay * .0145;
    }

    totalTax = fedTax + stateTax + SSNTax + medTax;
    netPay = money - totalTax;
    return [convert_to_string(money),
        fedTax, 
        stateTax, 
        medTax, 
        SSNTax, 
        totalTax, 
        netPay];
}

const federal_tax_2020 = (money) => {

}

const state_tax_2020 = (money) => {

}

const medicare_tax_2020 = (money) => {

}

const social_security_tax_2020 = (money) => {

}

const tax_calcs_2024 = (money) => {
    let totalTax = 0;
    let netPay = 0;
    money = Number(money)
    totalTax = (federal_tax_2024(money) + 
                state_tax_2024(money) + 
                medicare_tax_2024(money) + 
                social_security_tax_2024(money));
    netPay = money - totalTax;
    netPay = convert_to_string(netPay);
    totalTax = convert_to_string(totalTax);
    //convert all numbers to strings
    return [convert_to_string(money),
        convert_to_string(federal_tax_2024(money)), 
        convert_to_string(state_tax_2024(money)),
        convert_to_string(medicare_tax_2024(money)),
        convert_to_string(social_security_tax_2024(money)),
        totalTax,
        netPay];
}
//TODO: could unify 2020 and 2024 function with a switch?
const federal_tax_2024 = (money) => {
    let tax
    if (money > FED_TAX_BRACKETS_2024[5]) {
        remainder = money - 183647.25
        tax = 183647.25 + (remainder * .37);
    } else if (money > FED_TAX_BRACKETS_2024[4]) {
        remainder = money - 55678.5; 
        tax = 55678.5 + (remainder * .35);
    } else if (money > FED_TAX_BRACKETS_2024[3]) {
        remainder = money - 39110.5; 
        tax = 39110.5 + (remainder * .32);
    } else if (money > FED_TAX_BRACKETS_2024[2]) {
        remainder = money - 17168.5 
        tax = 17168.5 + (remainder * .24);
    } else if (money > FED_TAX_BRACKETS_2024[1]) {
        remainder = money - 5426; 
        tax = 5426 + (remainder * .22);
    } else if (money > FED_TAX_BRACKETS_2024[0]) {
        remainder = money - 1160;
        tax = 1160 + (remainder * .12);
    } else {
        tax = money * .1;
    }
    return tax;
}

const state_tax_2024 = (money) => {
    let tax;
    if (money > WI_TAX_BRACKETS_2024[2]) {
        remainder = money - 14582.83;
        tax = 14582.83 + (remainder * .0765);
    } else if (money > WI_TAX_BRACKETS_2024[1]) {
        remainder = money - 1045.04;
        tax = 1045.04 + (remainder * .053);
    } else {
        remainder = money - 451.7;
        tax = 451.7 + (remainder * .0354);
    }
    return tax;
}

const medicare_tax_2024 = (money) => {
    let tax
    if (money > MEDICARE_TAX_LIMIT_2024) {
        remainder = money - 29000;
        tax = 29000 + (remainder * .0235);
    } else {
        tax = money * .0145;
    }
    return tax;
}

const social_security_tax_2024 = (money) => {
    let tax
    if (money > SOCIAL_SECURITY_TAX_LIMIT_2024) {
        tax = 10453.2
    } else {
        tax = money * .062;
    }
    return tax;
}

const convert_to_string = (number) => {
    number = number.toFixed(2);
    number = number.toString();
    number = "$" + number;
    return number;
}

const get_table_size = (table) => {
    let table2 = document.getElementById("taxes-table");
    let table_size = table.childNodes;

    return table_size.length;
}

document.addEventListener("DOMContentLoaded", init);