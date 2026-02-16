//due to the way that this is set up, it would be easy to take the content from this and create two functions that are called
//on click. This should be pretty easy. Should be lol.

//temporary thing so that I'm able to actually autofill variables for a node.
const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];

const FED_TAX_BRACKETS_2020 = [9876, 40126, 85526, 163301, 207351, 518401];
const FED_TAX_BRACKETS_2024 = [11601, 47151, 100526, 191951, 243726, 609351];
const FED_TAX_PERCENTAGES = [.1, .12, .22, .24, .32, .35, .37];
const FED_TAX_REMAINDERS_2020 = [987.5, 5802.5, 24618, 63810, 130090, 245178];
const FED_TAX_PREFILLED_2020 = [987.5, 5802.5, 24618, 63810, 130090, 245178];
const FED_TAX_REMAINDERS_2024 = [11160, 47150, 100525, 39110.5, 55678.5, 183647.25];
const FED_TAX_PREFILLED_2024 = [1160, 5426, 17168.5, 39110.5, 55678.5, 183647.25];

const WI_TAX_BRACKETS_2020 = [11971, 23931, 263481];
const WI_TAX_BRACKETS_2024 = [12761, 25521, 280951];
const WI_TAX_PERCENTAGES_2020 = [.0354, .0465, .0627, .0765];
const WI_TAX_PERCENTAGES_2024 = [WI_TAX_PERCENTAGES_2020[0], WI_TAX_PERCENTAGES_2020[1], .053, WI_TAX_PERCENTAGES_2020[2]];
const WI_TAX_REMAINDERS_2020 = [423.74, 979.88, 15999.67];
const WI_TAX_PREFILLED_2020 = [423.74, 979.88, 15999.67];
const WI_TAX_REMAINDERS_2024 = [451.7, 1045.04, 14582.83];
const WI_TAX_PREFILLED_2024 = [451.7, 1045.04, 14582.83];

//v- future proofing lol
const SOCIAL_SECURITY_TAX_BRACKET = [.062];
const SOCIAL_SECURITY_TAX_LIMIT_2020 = 137000;
const SOCIAL_SECURITY_MAX_PAY_2020 = 84940;
const SOCIAL_SECURITY_TAX_LIMIT_2024 = 168000;
const SOCIAL_SECURITY_MAX_PAY_2024 = 10453.2;

const MEDICARE_TAX_LIMIT_2020 = 200000;
const MEDICARE_REMAINDER = 29000;
const MEDICARE_TAX_BRACKETS = [.0145, .0235];
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
        remainder = money - FED_TAX_REMAINDERS_2020[5];
        tax = FED_TAX_PREFILLED_2020[5] + (remainder * FED_TAX_PERCENTAGES[6]);
    } else if (money > FED_TAX_BRACKETS_2020[4]) {
        remainder = money - FED_TAX_REMAINDERS_2020[4];
        tax = FED_TAX_PREFILLED_2020[4] + (remainder * FED_TAX_PERCENTAGES[5]);
    } else if (money > FED_TAX_BRACKETS_2020[3]) {
        remainder = money - FED_TAX_REMAINDERS_2020[3];
        tax = FED_TAX_PREFILLED_2020[3] + (remainder * FED_TAX_PERCENTAGES[4]);
    } else if (money > FED_TAX_BRACKETS_2020[2]) {
        remainder = money - FED_TAX_REMAINDERS_2020[2];
        tax = FED_TAX_PREFILLED_2020[2] + (remainder * FED_TAX_PERCENTAGES[3]);
    } else if (money > FED_TAX_BRACKETS_2020[1]) {
        remainder = money - FED_TAX_REMAINDERS_2020[1];
        tax = FED_TAX_PREFILLED_2020[1] + (remainder * FED_TAX_PERCENTAGES[2]);
    } else if (money > FED_TAX_BRACKETS_2020[0]) {
        remainder = money - FED_TAX_REMAINDERS_2020[0];
        tax = FED_TAX_PREFILLED_2020[0] + (remainder * FED_TAX_PERCENTAGES[1]);
    } else {
        tax = money * FED_TAX_PERCENTAGES_2020[0];
    }
    return tax;
}

const state_tax_2020 = (money) => {
    let tax;
    let remainder;
    if (money > WI_TAX_BRACKETS_2020[2]) {
        remainder = money - WI_TAX_REMAINDERS_2020[2];
        tax = WI_TAX_PREFILLED_2020[2] + (remainder * WI_TAX_PERCENTAGES_2020[3]);
    } else if (money > WI_TAX_BRACKETS_2020[1]) {
        remainder = money - WI_TAX_REMAINDERS_2020[1];
        tax = WI_TAX_PREFILLED_2020[1] + (remainder * WI_TAX_PERCENTAGES_2020[2]);
    } else if (money > WI_TAX_BRACKETS_2020[0]) {
        remainder = money - WI_TAX_REMAINDERS_2020[0];
        tax = WI_TAX_PREFILLED_2020[0] + (remainder * WI_TAX_PERCENTAGES_2020[1]);
    } else {
        tax = money * WI_TAX_PERCENTAGES_2020[0];
    }
    if (isNaN(tax)) {
        console.log(money);
    }
    return tax;
}

const medicare_tax_2020 = (money) => {
    let tax;
    let remainder;
    if (money > MEDICARE_TAX_LIMIT_2020) {
        remainder = money - MEDICARE_REMAINDER
        tax = MEDICARE_REMAINDER + (remainder * MEDICARE_TAX_BRACKETS[1]);
    } else {
        tax = money * MEDICARE_TAX_BRACKETS[0];
    }
    return tax;
}

const social_security_tax_2020 = (money) => {
    let tax;
    if (money > SOCIAL_SECURITY_TAX_LIMIT_2020) {
        tax = SOCIAL_SECURITY_MAX_PAY_2020;
    } else {
        tax = money * SOCIAL_SECURITY_TAX_BRACKET[0];
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

const federal_tax_2024 = (money) => {
    let tax
    let remainder;
    if (money > FED_TAX_BRACKETS_2024[5]) {
        remainder = money - FED_TAX_REMAINDERS_2024[5];
        tax = FED_TAX_PREFILLED_2024[5] + (remainder * FED_TAX_PERCENTAGES[6]);
    } else if (money > FED_TAX_BRACKETS_2024[4]) {
        remainder = money - FED_TAX_REMAINDERS_2024[4]; 
        tax = FED_TAX_PREFILLED_2024[4] + (remainder * FED_TAX_PERCENTAGES[5]);
    } else if (money > FED_TAX_BRACKETS_2024[3]) {
        remainder = money - FED_TAX_REMAINDERS_2024[3]; 
        tax = FED_TAX_PREFILLED_2024[3] + (remainder * FED_TAX_PERCENTAGES[4]);
    } else if (money > FED_TAX_BRACKETS_2024[2]) {
        remainder = money - FED_TAX_REMAINDERS_2024[2]; 
        tax = FED_TAX_PREFILLED_2024[2] + (remainder * FED_TAX_PERCENTAGES[3]);
    } else if (money > FED_TAX_BRACKETS_2024[1]) {
        remainder = money - FED_TAX_REMAINDERS_2024[1]; 
        tax = FED_TAX_PREFILLED_2024[1] + (remainder * FED_TAX_PERCENTAGES[2]);
    } else if (money > FED_TAX_BRACKETS_2024[0]) {
        remainder = money - FED_TAX_REMAINDERS_2024[0];
        tax = FED_TAX_PREFILLED_2024[0] + (remainder * FED_TAX_PERCENTAGES[1]);
    } else {
        tax = money * FED_TAX_PERCENTAGES[0];
    }
    return tax;
}

const state_tax_2024 = (money) => {
    let tax;
    let remainder;
    if (money > WI_TAX_BRACKETS_2024[2]) {
        remainder = money - WI_TAX_REMAINDERS_2024[2];
        tax = WI_TAX_PREFILLED_2024[2] + (remainder * WI_TAX_PERCENTAGES_2024[3]);
    } else if (money > WI_TAX_BRACKETS_2024[1]) {
        remainder = money - WI_TAX_REMAINDERS_2024[1];
        tax = WI_TAX_PREFILLED_2024[1] + (remainder * WI_TAX_PERCENTAGES_2024[2]);
    } else if (money > WI_TAX_BRACKETS_2024[0]) {
        remainder = money - WI_TAX_REMAINDERS_2024[0];
        tax = WI_TAX_PREFILLED_2024[0] + (remainder * WI_TAX_PERCENTAGES_2024[1]);
    } else {
        tax = money * WI_TAX_PERCENTAGES_2024[0];
    }
    return tax;
}

const medicare_tax_2024 = (money) => {
    let tax
    let remainder;
    if (money > MEDICARE_TAX_LIMIT_2024) {
        remainder = money - MEDICARE_REMAINDER;
        tax = MEDICARE_REMAINDER + (remainder * MEDICARE_TAX_BRACKETS[1]);
    } else {
        tax = money * MEDICARE_TAX_BRACKETS[0];
    }
    return tax;
}

const social_security_tax_2024 = (money) => {
    let tax
    if (money > SOCIAL_SECURITY_TAX_LIMIT_2024) {
        tax = SOCIAL_SECURITY_MAX_PAY_2024;
    } else {
        tax = money * SOCIAL_SECURITY_TAX_BRACKET[0];
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