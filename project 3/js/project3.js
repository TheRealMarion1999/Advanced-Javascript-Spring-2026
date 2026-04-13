const URL = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const MY_ID = "2934096";

const HTTP = require("http");
let server = HTTP.createServer((req, res) => {
    res.write("Hello!!! Hi!!!");
})

const init = () => {
    const TEXTINPUT = document.getElementById("toDoInput");
    const BUTTON = document.getElementById("toDoButton");
    const LOAD_MESSAGE = document.getElementById("loadMessage");
    const OUTPUT = document.getElementById("output");

    BUTTON.addEventListener("click", () => 
    {
        create_table_point();
    });
}

/* 
when creating the table elements, we want to have a unified structure like this:
<td><a>(trashcan ascii image)</a>(task name)</td>
*/

const create_table_point = () => {
    const TABLE = document.getElementById("output");
    const TABLE_ROW = document.createElement("tr")
    const TABLE_POINT = document.createElement("td");
    const TRASH_CAN_ICON = String.fromCodePoint(0x1F5D1);
    const DELETE_ICON = document.createElement("a");
    DELETE_ICON.textContent = TRASH_CAN_ICON;
    DELETE_ICON.href = "";
    TABLE_POINT.appendChild(DELETE_ICON);
    TABLE_POINT.append("TEXT");
    TABLE_ROW.appendChild(TABLE_POINT)
    TABLE.appendChild(TABLE_ROW);
}

/**
 * parse the json data from the api and output each entry to the table using create_table_point()
 * FOREACH MY GOAAAAT!!!
 */

window.addEventListener("load", init);