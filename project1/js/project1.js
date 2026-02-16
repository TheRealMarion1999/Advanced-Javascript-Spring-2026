const TABLE_VALUES = ["Gross Pay", "Federal Taxes", "State Taxes", "Medicare Taxes", "SSN Taxes", "Total Taxes", "Net Pay"];

//FEDERAL TAX
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
        switch(event.currentTarget.getAttribute("data-model")) {
            case "taxes2020":
                values = tax_calcs_2020(userInputValue);
                break;
            case "taxes2024":
                values = tax_calcs_2024(userInputValue);
                break;
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
    /*
    if (money > FED_TAX_BRACKETS_2020[5]) {
        remainder = money - FED_TAX_REMAINDERS_2020[5];
        for (i = 0; i < 6; i++) {
            tax += FED_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[6]);
    } else if (money > FED_TAX_BRACKETS_2020[4]) {
        remainder = money - FED_TAX_REMAINDERS_2020[4];
        for (i = 0; i < 5; i++) {
            tax += FED_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[5]);
    } else if (money > FED_TAX_BRACKETS_2020[3]) {
        remainder = money - FED_TAX_REMAINDERS_2020[3];
        for (i = 0; i < 4; i++) {
            tax += FED_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[4]);
    } else if (money > FED_TAX_BRACKETS_2020[2]) {
        remainder = money - FED_TAX_REMAINDERS_2020[2];
        for (i = 0; i < 3; i++) {
            tax += FED_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[3]);
    } else if (money > FED_TAX_BRACKETS_2020[1]) {
        remainder = money - FED_TAX_REMAINDERS_2020[1];
        for (i = 0; i < 2; i++) {
            tax += FED_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[2]);
    } else if (money > FED_TAX_BRACKETS_2020[0]) {
        remainder = money - FED_TAX_REMAINDERS_2020[0];
        tax = FED_TAX_PREFILLED_2020[0] + (remainder * FED_TAX_PERCENTAGES[1]);
    } else {
        tax = money * FED_TAX_PERCENTAGES[0];
    }
    return tax;
    */
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
    /*
    if (money > WI_TAX_BRACKETS_2020[2]) {
        remainder = money - WI_TAX_REMAINDERS_2020[2];
        for (i = 0; i < 3; i++) {
            tax += WI_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * WI_TAX_PERCENTAGES_2020[3]);
    } else if (money > WI_TAX_BRACKETS_2020[1]) {
        remainder = money - WI_TAX_REMAINDERS_2020[1];
        for (i = 0; i < 2; i++) {
            tax += WI_TAX_PREFILLED_2020[i];
        }
        tax += (remainder * WI_TAX_PERCENTAGES_2020[2]);
    } else if (money > WI_TAX_BRACKETS_2020[0]) {
        remainder = money - WI_TAX_REMAINDERS_2020[0];
        tax = WI_TAX_PREFILLED_2020[0] + (remainder * WI_TAX_PERCENTAGES_2020[1]);
    } else {
        tax = money * WI_TAX_PERCENTAGES_2020[0];
    }
    return tax;
    */
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
    /*
    if (money > FED_TAX_BRACKETS_2024[5]) {
        remainder = money - FED_TAX_REMAINDERS_2024[5];
        for (i = 0; i < 6; i++) {
            tax += FED_TAX_PREFILLED_2024[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[6]);
    } else if (money > FED_TAX_BRACKETS_2024[4]) {
        remainder = money - FED_TAX_REMAINDERS_2024[4]; 
        for (i = 0; i < 5; i++) {
            tax += FED_TAX_PREFILLED_2024[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[5]);
    } else if (money > FED_TAX_BRACKETS_2024[3]) {
        remainder = money - FED_TAX_REMAINDERS_2024[3]; 
        for (i = 0; i < 4; i++) {
            tax += FED_TAX_PREFILLED_2024[i];
       }
        tax += (remainder * FED_TAX_PERCENTAGES[4]);
    } else if (money > FED_TAX_BRACKETS_2024[2]) {
        remainder = money - FED_TAX_REMAINDERS_2024[2];
        for (i = 0; i < 3; i++) {
            tax += FED_TAX_PREFILLED_2024[i];
        }
        tax += (remainder * FED_TAX_PERCENTAGES[3]);
    } else if (money > FED_TAX_BRACKETS_2024[1]) {
        remainder = money - FED_TAX_REMAINDERS_2024[1]; 
        for (i = 0; i < 2; i++) {
            tax += FED_TAX_PREFILLED_2024[i];
        }
       tax += (remainder * FED_TAX_PERCENTAGES[2]);
    } else if (money > FED_TAX_BRACKETS_2024[0]) {
        remainder = money - FED_TAX_REMAINDERS_2024[0];
        tax = FED_TAX_PREFILLED_2024[0] + (remainder * FED_TAX_PERCENTAGES[1]);
    } else {
        tax = money * FED_TAX_PERCENTAGES[0];
    }
    return tax;
    */
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
    //keeping this around and inaccessible in case the loop doesn't work
    /*
    if (money > WI_TAX_BRACKETS_2024[2]) {
        remainder = money - WI_TAX_REMAINDERS_2024[2];
        for (i = 0; i < 3; i++) {
            tax += WI_TAX_PREFILLED_2024[i];
        }
        tax += (remainder * WI_TAX_PERCENTAGES_2024[3]);
    } else if (money > WI_TAX_BRACKETS_2024[1]) {
        remainder = money - WI_TAX_REMAINDERS_2024[1];
        for (i = 0; i < 2; i++) {
            tax += WI_TAX_PREFILLED_2024[i];
        }
        tax += (remainder * WI_TAX_PERCENTAGES_2024[2]);
    } else if (money > WI_TAX_BRACKETS_2024[0]) {
        remainder = money - WI_TAX_REMAINDERS_2024[0];
        tax = WI_TAX_PREFILLED_2024[0] + (remainder * WI_TAX_PERCENTAGES_2024[1]);
    } else {
        tax = money * WI_TAX_PERCENTAGES_2024[0];
    }
    return tax;
    */
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
    let table_size = table.childNodes;

    return table_size.length;
}

const calculate_total_tax = (federal, state, medicare, social) => {
    return federal + state + medicare + social;
}

const calculate_net_pay = (money, total) => {
    return money - total;
}

const calculate_net_pay_2020 = (money) => {
    return money - calculate_total_tax(
                federal_tax_2020(money), 
                state_tax_2020(money), 
                medicare_tax(money), 
                social_security_tax_2020(money))
}

document.addEventListener("DOMContentLoaded", init);