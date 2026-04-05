const URL = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const MY_ID = "2934096";

const init = () => {
    const TEXTINPUT = document.getElementById("toDoInput");
    const BUTTON = document.getElementById("toDoButton");
    const LOAD_MESSAGE = document.getElementById("loadMessage");
    const OUTPUT = document.getElementById("output");

    BUTTON.addEventListener("click", () => 
    {
        LOAD_MESSAGE.textContent = "yes";
    });
}

/* 
when creating the table elements, we want to have a unified structure like this:
<td><a>(trashcan ascii image)</a>(task name)</td>
*/

const create_table_point = (table) => {
    const TABLE_POINT = document.createElement("td");
    const TRASH_CAN_ICON = String.fromCodePoint(0x1F5D1);
    const DELETE_ICON = document.createElement("a");
    DELETE_ICON.textContent = TRASH_CAN_ICON;
    DELETE_ICON.href = "";
    TABLE_POINT.appendChild(DELETE_ICON);
    TABLE_POINT.append("TEXT");
    table.appendChild(TABLE_POINT);
}

window.addEventListener("load", init);