const URL = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const MY_ID = "2934096";
const API_KEY = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S"


const init = () => {
    const BUTTON = document.getElementById("toDoButton");
    const LOAD_MESSAGE = document.getElementById("loadMessage");
    const OUTPUT = document.getElementById("output");
    get_todo_list()
    BUTTON.addEventListener("click", () => 
    {
        const TEXTINPUT = document.getElementById("toDoInput");
        //call a POST statement, after it's done call a GET again..
        const POST = create_new_json_point(TEXTINPUT.value);
        POST.then(get_todo_list)
        TEXTINPUT.value = "";
    });
}

const get_todo_list = async () => {
    //for each of the entries in the json, create a table point
    const XHR = new XMLHttpRequest();
    const TABLE = document.getElementById("output");
    TABLE.replaceChildren();
    const NEW_TASK_RESPONSE = await fetch(URL + MY_ID, {
        method: "GET",
        headers: {
            "x-api-key" : API_KEY,
            "Content-Type" : "application/json"
        }
    })
    //get the json data
    const DATA = await NEW_TASK_RESPONSE.json();
    const ITEMS = DATA.Items;
    //loop through the json data, adding a table point for each one. This is probably not the most efficient way to do this.
    for(let item in ITEMS) {
        create_table_point(TABLE, ITEMS[item].Description);
    }

}

const create_new_json_point = async (description = "test") => {
    const XHR = new XMLHttpRequest();
    const PARAMS = {
    'StudentId' : MY_ID,
    'Description' : description
    }
    await fetch(URL, {
        method: "POST",
        headers: {
            "x-api-key" : API_KEY,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(PARAMS)
    });
}

const create_table_point = async (table, description) => {
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
            const DELETE = delete_table_point(description);
            DELETE.then(get_todo_list);
    })
}

const delete_table_point = async (description) => {
    const XHR = new XMLHttpRequest();
    const PARAMS = {
        'StudentId' : MY_ID,
        'Description' : description
    }
    await fetch(URL, {
        method: "DELETE",
        headers: {
            "x-api-key" : API_KEY,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(PARAMS)
    });
}

/**
 * parse the json data from the api and output each entry to the table using create_table_point()
 * FOREACH MY GOAAAAT!!!
 */

window.addEventListener("load", init);