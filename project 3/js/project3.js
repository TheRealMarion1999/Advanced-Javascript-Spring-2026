const URL = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const MY_ID = "2934096";


const init = () => {
    const TEXTINPUT = document.getElementById("toDoInput");
    const BUTTON = document.getElementById("toDoButton");
    const LOAD_MESSAGE = document.getElementById("loadMessage");
    const OUTPUT = document.getElementById("output");
    get_todo_list()
    BUTTON.addEventListener("click", () => 
    {
        //call a POST statement, after it's done call a GET again..
        get_todo_list();
    });
}

const get_todo_list = () => {
    //for each of the entries in the json, create a table point
    create_table_point();
}

const create_new_json_point = async () => {
    const XHR = new XMLHttpRequest
    const PARAMS = {
    'StudentId' : '2934096',
    'Description' : 'Record Test'
    }
    const NEW_TASK_RESPONSE = await fetch()
}

const create_table_point = () => {
    const TABLE = document.getElementById("output");
    const TABLE_ROW = document.createElement("tr")
    const TEXT = document.createTextNode("TEXT")
    const TABLE_POINT = document.createElement("td");
    const TRASH_CAN_ICON = String.fromCodePoint(0x1F5D1);
    const DELETE_ICON = document.createElement("button");
    DELETE_ICON.textContent = TRASH_CAN_ICON;
    TABLE_POINT.appendChild(DELETE_ICON);
    TABLE_POINT.appendChild(TEXT);
    TABLE_ROW.appendChild(TABLE_POINT)
    TABLE.appendChild(TABLE_ROW);

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