//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];

//this is only here because otherwise I couldn't auto-fill commands.
//let table = document.getElementById("taxes-table");
//kind of bad practice to make these an array, but I couldn't think of good, clear names for each bracket
const FED_TAX_BRACKETS_2020 = [9876, 40126, 85526, 163301, 207351, 518401];
const FED_TAX_BRACKETS_2024 = [11601, 47151, 100526, 191951, 243726, 609351];
const FED_TAX_REMAINDERS_2020 = [];
const FED_TAX_REMAINDERS_2024 = [];
const WI_TAX_BRACKETS_2020 = [11971, 23931, 263481];
const WI_TAX_BRACKETS_2024 = [12761, 25521, 280951];
const WI_TAX_REMAINDERS_2020 = [];
const WI_TAX_REMAINDERS_2024 = [];
const SOCIAL_SECURITY_TAX_LIMIT_2020 = 137000;
const SOCIAL_SECURITY_MAX_PAY_2020 = 84940;
const MEDICARE_TAX_LIMIT_2020 = 200000;
const MEDICARE_REMAINDER = 29000;
const SOCIAL_SECURITY_TAX_LIMIT_2024 = 168000;
const SOCIAL_SECURITY_MAX_PAY_2024 = 10453.2;
const MEDICARE_TAX_LIMIT_2024 = 200000;
const init = () => {
    //seemingly wasn't needed either; commented out just in case something actually did need it.
    //let table = document.getElementById("taxes-table");


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

const tax_calcs_2020 = (money) => {
    money = Number(money);

    return [convert_to_string(money),
        convert_to_string(federal_tax_2020(money)), 
        convert_to_string(state_tax_2020(money)),
        convert_to_string(medicare_tax_2020(money)),
        convert_to_string(social_security_tax_2020(money)),
        convert_to_string(calculate_total_tax(
                            federal_tax_2020(money), 
                            state_tax_2020(money),
                            medicare_tax_2020(money),
                            social_security_tax_2020(money)
                        )),
        convert_to_string(
                money - calculate_total_tax(
                social_security_tax_2020(money), 
                state_tax_2020(money), 
                medicare_tax_2020(money), 
                social_security_tax_2020(money))
            )];
}

const federal_tax_2020 = (money) => {
    let tax;
    let remainder;
    if (money > FED_TAX_BRACKETS_2020[5]) {
        remainder = money - 245178;
        tax = 245178 + (remainder * .37);
    } else if (money > FED_TAX_BRACKETS_2020[4]) {
        remainder = money - 130090;
        tax = 130090 + (remainder * .35);
    } else if (money > FED_TAX_BRACKETS_2020[3]) {
        remainder = money - 63810;
        tax = 63810 + (remainder * .32);
    } else if (money > FED_TAX_BRACKETS_2020[2]) {
        remainder = money - 24618;
        tax = 24618 + (remainder * .24);
    } else if (money > FED_TAX_BRACKETS_2020[1]) {
        remainder = money - 5802.5
        tax = 5802.5 + (remainder * .22);
    } else if (money > FED_TAX_BRACKETS_2020[0]) {
        remainder = money - 987.5;
        tax = 987.5 + (remainder * .12);
    } else {
        tax = money * .1;
    }
    return tax;
}

const state_tax_2020 = (money) => {
    let tax;
    let remainder;
    if (money > WI_TAX_BRACKETS_2020[2]) {
        remainder = money - 15999.67;
        tax = 15999.67 + (remainder * .0765);
    } else if (money > WI_TAX_BRACKETS_2020[1]) {
        remainder = money - 979.88;
        tax = 979.88 + (remainder * .0627);
    } else if (money > WI_TAX_BRACKETS_2020[0]) {
        remainder = money - 423.74;
        tax = 423.74 + (remainder * .0465);
    } else {
        tax = money * .0354;
    }
    return tax;
}

const medicare_tax_2020 = (money) => {
    let tax;
    let remainder;
    if (money > MEDICARE_TAX_LIMIT_2020) {
        remainder = money - MEDICARE_REMAINDER
        tax = MEDICARE_REMAINDER + (remainder * .0235);
    } else {
        tax = money * .0145;
    }
    return tax;
}

const social_security_tax_2020 = (money) => {
    let tax;
    if (money > SOCIAL_SECURITY_TAX_LIMIT_2020) {
        tax = SOCIAL_SECURITY_MAX_PAY_2020;
    } else {
        tax = money * .062;
    }
    return tax;
}

const tax_calcs_2024 = (money) => {
    money = Number(money)
    //could declare the array here as a var maybe? and then run conversion as a for loop and return.
    return [convert_to_string(money),
        convert_to_string(federal_tax_2024(money)), 
        convert_to_string(state_tax_2024(money)),
        convert_to_string(medicare_tax_2024(money)),
        convert_to_string(social_security_tax_2024(money)),
        //honestly, these are a little hard to read, but I decided to try and get zero variables in the main function just to test myself
        convert_to_string(calculate_total_tax(
                            federal_tax_2024(money), 
                            state_tax_2024(money),
                            medicare_tax_2024(money),
                            social_security_tax_2024(money)
                        )),
        convert_to_string(
                money - calculate_total_tax(
                social_security_tax_2024(money), 
                state_tax_2024(money), 
                medicare_tax_2024(money), 
                social_security_tax_2024(money))
            )];
}
//TODO: could unify 2020 and 2024 function with a switch?

//why is the math wrong. This is the data given BY THE TABLE the math shouldn't be wrong
const federal_tax_2024 = (money) => {
    let tax
    let remainder;
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
        remainder = money - 100525 
        tax = 17168.5 + (remainder * .24);
    } else if (money > FED_TAX_BRACKETS_2024[1]) {
        remainder = money - 47150; 
        tax = 5426 + (remainder * .22);
    } else if (money > FED_TAX_BRACKETS_2024[0]) {
        remainder = money - 11160;
        tax = 1160 + (remainder * .12);
    } else {
        tax = money * .1;
    }
    return tax;
}

const state_tax_2024 = (money) => {
    let tax;
    let remainder;
    if (money > WI_TAX_BRACKETS_2024[2]) {
        remainder = money - 14582.83;
        tax = 14582.83 + (remainder * .0765);
    } else if (money > WI_TAX_BRACKETS_2024[1]) {
        remainder = money - 1045.04;
        tax = 1045.04 + (remainder * .053);
    } else if (money > WI_TAX_BRACKETS_2024[0]) {
        remainder = money - 451.7;
        tax = 451.7 + (remainder * .0465);
    } else {
        tax = money * .0354
    }
    return tax;
}

const medicare_tax_2024 = (money) => {
    let tax
    let remainder;
    if (money > MEDICARE_TAX_LIMIT_2024) {
        remainder = money - MEDICARE_REMAINDER;
        tax = MEDICARE_REMAINDER + (remainder * .0235);
    } else {
        tax = money * .0145;
    }
    return tax;
}

const social_security_tax_2024 = (money) => {
    let tax
    if (money > SOCIAL_SECURITY_TAX_LIMIT_2024) {
        tax = SOCIAL_SECURITY_MAX_PAY_2024;
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
    let table_size = table.childNodes;

    return table_size.length;
}

const calculate_total_tax = (federal, state, medicare, social) => {
    return federal + state + medicare + social;
}

document.addEventListener("DOMContentLoaded", init);