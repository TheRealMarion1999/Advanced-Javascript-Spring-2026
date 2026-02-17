const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];

//FEDERAL TAX

//could merge Brackets and Remainders? Possibly... They're both just one off...
//that, and the name is kind of deceptive on Remainders...
const FED_TAX_BRACKETS_2020 = [9876, 40126, 85526, 163301, 207351, 518401];
const FED_TAX_BRACKETS_2024 = [11601, 47151, 100526, 191951, 243726, 609351];
const FED_TAX_PERCENTAGES = [.1, .12, .22, .24, .32, .35, .37];
const FED_TAX_REMAINDERS_2020 = [9875, 40125, 85525, 163300, 207350, 518400];
const FED_TAX_PREFILLED_2020 = [FED_TAX_REMAINDERS_2020[0] * FED_TAX_PERCENTAGES[0],
                                (FED_TAX_REMAINDERS_2020[1] - FED_TAX_REMAINDERS_2020[0]) * FED_TAX_PERCENTAGES[1],
                                (FED_TAX_REMAINDERS_2020[2] - FED_TAX_REMAINDERS_2020[1]) * FED_TAX_PERCENTAGES[2],
                                (FED_TAX_REMAINDERS_2020[3] - FED_TAX_REMAINDERS_2020[2]) * FED_TAX_PERCENTAGES[3],
                                (FED_TAX_REMAINDERS_2020[4] - FED_TAX_REMAINDERS_2020[3]) * FED_TAX_PERCENTAGES[4],
                                (FED_TAX_REMAINDERS_2020[5] - FED_TAX_REMAINDERS_2020[4]) * FED_TAX_PERCENTAGES[5]
                                ];
const FED_TAX_REMAINDERS_2024 = [11600, 47150, 100525, 191950, 243725, 609350];
const FED_TAX_PREFILLED_2024 = [FED_TAX_REMAINDERS_2024[0] * FED_TAX_PERCENTAGES[0],
                                (FED_TAX_REMAINDERS_2024[1] - FED_TAX_REMAINDERS_2024[0]) * FED_TAX_PERCENTAGES[1],
                                (FED_TAX_REMAINDERS_2024[2] - FED_TAX_REMAINDERS_2024[1]) * FED_TAX_PERCENTAGES[2],
                                (FED_TAX_REMAINDERS_2024[3] - FED_TAX_REMAINDERS_2024[2]) * FED_TAX_PERCENTAGES[3],
                                (FED_TAX_REMAINDERS_2024[4] - FED_TAX_REMAINDERS_2024[3]) * FED_TAX_PERCENTAGES[4],
                                (FED_TAX_REMAINDERS_2024[5] - FED_TAX_REMAINDERS_2024[4]) * FED_TAX_PERCENTAGES[5]
                                ];

//STATE TAX
const WI_TAX_BRACKETS_2020 = [11971, 23931, 263481];
const WI_TAX_BRACKETS_2024 = [12761, 25521, 280951];
const WI_TAX_PERCENTAGES_2020 = [.0354, .0465, .0627, .0765];
const WI_TAX_PERCENTAGES_2024 = [WI_TAX_PERCENTAGES_2020[0], WI_TAX_PERCENTAGES_2020[1], .053, WI_TAX_PERCENTAGES_2020[2]];
const WI_TAX_REMAINDERS_2020 = [11970, 23930, 263480];
const WI_TAX_PREFILLED_2020 = [WI_TAX_REMAINDERS_2020[0] * WI_TAX_PERCENTAGES_2020[0],
                                (WI_TAX_REMAINDERS_2020[1] - WI_TAX_REMAINDERS_2020[0]) * WI_TAX_PERCENTAGES_2020[1],
                                (WI_TAX_REMAINDERS_2020[2] - WI_TAX_REMAINDERS_2020[1]) * WI_TAX_PERCENTAGES_2020[2]];
const WI_TAX_REMAINDERS_2024 = [12760, 25520, 280951];
const WI_TAX_PREFILLED_2024 = [WI_TAX_REMAINDERS_2024[0] * WI_TAX_PERCENTAGES_2024[0],
                                (WI_TAX_REMAINDERS_2024[1] - WI_TAX_REMAINDERS_2024[0]) * WI_TAX_PERCENTAGES_2024[1],
                                (WI_TAX_REMAINDERS_2024[2] - WI_TAX_REMAINDERS_2024[1]) * WI_TAX_PERCENTAGES_2024[2]];

//SOCIAL SECURITY
const SOCIAL_SECURITY_TAX_BRACKET = .062;
const SOCIAL_SECURITY_TAX_LIMIT_2020 = 137000;
const SOCIAL_SECURITY_MAX_PAY_2020 = 8494;
const SOCIAL_SECURITY_TAX_LIMIT_2024 = 168000;
const SOCIAL_SECURITY_MAX_PAY_2024 = 10453.2;

//MEDICARE
const MEDICARE_TAX_LIMIT = 200000;
const MEDICARE_REMAINDER = 29000;
const MEDICARE_TAX_BRACKETS = [.0145, .0235];
const init = () => {

    /*
    let ButtonEventListener = document.getElementById("button2020");
    ButtonEventListener.addEventListener("click", tax_calcs);
    let ButtonEventListener2 = document.getElementById("button2024");
    ButtonEventListener2.addEventListener("click", tax_calcs);
    */
   //uhhh I mean I guess this works?? I guess these can be constant too????
   //flaw with this setup: I need both buttons in order for it to work for... Some Reason...
    const BUTTON_EVENT_LISTENER = document.getElementById("button2020");
    BUTTON_EVENT_LISTENER.addEventListener("click", main);
    const BUTTON_EVENT_LISTENER_2 = document.getElementById("button2024");
    BUTTON_EVENT_LISTENER_2.addEventListener("click", main);
}

const main = event => {
    const TABLE = document.getElementById("taxes-table");
    let values = [];
    const USER_INPUT = document.getElementById("input");
    const USER_INPUT_VALUE = USER_INPUT.value;
    if (USER_INPUT_VALUE !== "") {

        if (get_table_size(TABLE) > 1) {
            destroy_table_rows(TABLE);
        }
        switch(event.currentTarget.getAttribute("data-model")) {
            case "taxes2020":
                values = tax_calcs_2020(USER_INPUT_VALUE);
                break;
            case "taxes2024":
                values = tax_calcs_2024(USER_INPUT_VALUE);
                break;
        }
        for (i in TABLE_VALUES) {
            create_table_row(TABLE, TABLE_VALUES[i], values[i]);
        }
    }
}

//creates a table row with a value from the TABLE_VALUES array
const create_table_row = (table, leftCellContent = "term", rightCellContent = "value") => {
    const TABLE_ROW = document.createElement("tr");
    TABLE_ROW.className = "infoRow";
    //(TODO: prolly could do this better)
    const TABLE_DATA_L = document.createElement("td");
    const TABLE_DATA_R = document.createElement("td");
    TABLE_DATA_L.textContent = leftCellContent;
    TABLE_DATA_R.textContent = rightCellContent;
    TABLE_ROW.appendChild(TABLE_DATA_L);
    TABLE_ROW.appendChild(TABLE_DATA_R);
    table.appendChild(TABLE_ROW);
}

//destroys all rows in the current array
const destroy_table_rows = (table) => {

    let child = table.lastElementChild;
    while (child) {
        table.removeChild(child);
        child = table.lastElementChild;
    }
}

const tax_calcs_2020 = (money) => {
    money = Number(money);
    const FEDERAL = federal_tax_2020(money);
    const STATE = state_tax_2020(money);
    const MEDICARE = medicare_tax(money);
    const SOCIAL = social_security_tax_2020(money);
    const TOTAL = calculate_total_tax(FEDERAL, STATE, MEDICARE, SOCIAL);
    const NET = calculate_net_pay(money, TOTAL);
    return [convert_to_string(money),
        convert_to_string(FEDERAL), 
        convert_to_string(STATE),
        convert_to_string(MEDICARE),
        convert_to_string(SOCIAL),
        convert_to_string(TOTAL),
        convert_to_string(NET)];
}

const federal_tax_2020 = (money) => {
    let tax;
    tax = 0;
    let remainder;
    for (i = FED_TAX_PERCENTAGES.length - 1; i > -1; i--) {
        if (money > FED_TAX_BRACKETS_2020[i - 1]) {
            remainder = money - FED_TAX_REMAINDERS_2020[i - 1];
            for (j = 0; j < i; j++) {
                tax += FED_TAX_PREFILLED_2020[j];
            }
            tax += remainder * FED_TAX_PERCENTAGES[i];
            return tax;
        } else if (money < FED_TAX_BRACKETS_2020[0]) {
            tax = money * FED_TAX_PERCENTAGES[0];
            return tax;
        }
    }
}

const state_tax_2020 = (money) => {
    let tax;
    tax = 0;
    let remainder;
    for (i = WI_TAX_BRACKETS_2020.length - 1; i > -1; i--) {
        if (money > WI_TAX_BRACKETS_2020[i - 1]) {
            remainder = money - WI_TAX_REMAINDERS_2020[i - 1];
            for (j = 0; j < i; j++) {
                tax += WI_TAX_PREFILLED_2020[j];
            }
            tax += remainder * WI_TAX_PERCENTAGES_2020[i];
            return tax;
        } else if (money < WI_TAX_BRACKETS_2020[0]) {
            tax = money * WI_TAX_PERCENTAGES_2020[0];
            return tax;
        }
    }
}

const medicare_tax = (money) => {
    let tax;
    let remainder;
    if (money > MEDICARE_TAX_LIMIT) {
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
        tax = money * SOCIAL_SECURITY_TAX_BRACKET;
    }
    return tax;
}

const tax_calcs_2024 = (money) => {
    money = Number(money)
    const FEDERAL = federal_tax_2024(money);
    const STATE = state_tax_2024(money);
    const MEDICARE = medicare_tax(money);
    const SOCIAL = social_security_tax_2024(money);
    const TOTAL = calculate_total_tax(FEDERAL, STATE, MEDICARE, SOCIAL);
    const NET = calculate_net_pay(money, TOTAL);
    return [convert_to_string(money),
        convert_to_string(FEDERAL), 
        convert_to_string(STATE),
        convert_to_string(MEDICARE),
        convert_to_string(SOCIAL),
        convert_to_string(TOTAL),
        convert_to_string(NET)];
}

const federal_tax_2024 = (money) => {
    let tax;
    tax = 0;
    let remainder;
    for (i = FED_TAX_PERCENTAGES.length - 1; i > -1; i--) {
        if (money > FED_TAX_BRACKETS_2024[i - 1]) {
            remainder = money - FED_TAX_REMAINDERS_2024[i - 1];
            for (j = 0; j < i; j++) {
                tax += FED_TAX_PREFILLED_2024[j];
            }
            tax += remainder * FED_TAX_PERCENTAGES[i];
            return tax;
        } else if (money < FED_TAX_BRACKETS_2024[0]) {
            tax = money * FED_TAX_PERCENTAGES[0];
            return tax;
        }
    }
    console.log("we had to go past here");
    remainder = 0;
    tax = 0;
}

const state_tax_2024 = (money) => {
    let tax;
    tax = 0;
    let remainder;
    for (i = WI_TAX_BRACKETS_2024.length - 1; i > -1; i--) {
        if (money > WI_TAX_BRACKETS_2024[i - 1]) {
            remainder = money - WI_TAX_REMAINDERS_2024[i - 1];
            for (j = 0; j < i; j++) {
                tax += WI_TAX_PREFILLED_2024[j];
            }
            tax += remainder * WI_TAX_PERCENTAGES_2024[i];
            return tax;
        } else if (money < WI_TAX_BRACKETS_2024[0]) {
            tax = money * WI_TAX_PERCENTAGES_2024[0];
            return tax;
        }
    }
}


const social_security_tax_2024 = (money) => {
    let tax
    if (money > SOCIAL_SECURITY_TAX_LIMIT_2024) {
        tax = SOCIAL_SECURITY_MAX_PAY_2024;
    } else {
        tax = money * SOCIAL_SECURITY_TAX_BRACKET;
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
    const TABLE_SIZE = table.childNodes;

    return TABLE_SIZE.length;
}

const calculate_total_tax = (federal, state, medicare, social) => {
    return federal + state + medicare + social;
}

const calculate_net_pay = (money, total) => {
    return money - total;
}

document.addEventListener("DOMContentLoaded", init);