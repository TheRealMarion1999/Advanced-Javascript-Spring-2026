const URL = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const MY_ID = "2934096";
const API_KEY = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S"


const init = () => {
    const TEXTINPUT = document.getElementById("toDoInput");
    const BUTTON = document.getElementById("toDoButton");
    const LOAD_MESSAGE = document.getElementById("loadMessage");
    const OUTPUT = document.getElementById("output");
    get_todo_list()
    BUTTON.addEventListener("click", () => 
    {
        //call a POST statement, after it's done call a GET again..
        create_new_json_point();
    });
}

const get_todo_list = () => {
    //for each of the entries in the json, create a table point
    create_table_point(document.getElementById("output"));
}

const create_new_json_point = async (description = "test") => {
    const XHR = new XMLHttpRequest();
    const TABLE = document.getElementById("output");
    const PARAMS = {
    'StudentId' : MY_ID,
    'Description' : description
    }
    const NEW_TASK_RESPONSE = await fetch(URL, {
        method: "POST",
        headers: {
            "x-api-key" : API_KEY,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(PARAMS)
    });
    create_table_point(TABLE, description);
    const DATA = await NEW_TASK_RESPONSE.JSON();
}

const create_table_point = (table, description = "test") => {
    const TABLE_ROW = document.createElement("tr");
    const TEXT = document.createTextNode(description);
    const TABLE_POINT = document.createElement("td");
    const TRASH_CAN_ICON = String.fromCodePoint(0x1F5D1);
    const DELETE_ICON = document.createElement("button");
    DELETE_ICON.textContent = TRASH_CAN_ICON;
    TABLE_POINT.appendChild(DELETE_ICON);
    TABLE_POINT.appendChild(TEXT);
    TABLE_ROW.appendChild(TABLE_POINT);
    table.appendChild(TABLE_ROW);

    DELETE_ICON.addEventListener("click", () => {
        //This will call a DELETE statement to the API, then call a GET again
            get_todo_list();
    })
}

/**
 * parse the json data from the api and output each entry to the table using create_table_point()
 * FOREACH MY GOAAAAT!!!
 */

window.addEventListener("load", init);