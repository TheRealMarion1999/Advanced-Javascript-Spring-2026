
const init = () => {
    let students = [
        {"name":"Johnson Brohnson", "id":"123456", "email":"jbrohnson@coolUniversity.edu"},
        {"name":"Anna Golbi", "id":"242182", "email":"agolbi@coolUniversity.edu"},
        {"name":"Andrew Andrews", "id":"124753" , "email":"aandrews@coolUniversity.edu"},
        {"name":"Delroy Crisp", "id":"123156" , "email":"dcrisp@coolUniversity.edu"},
        {"name":"Winston Begum", "id":"182563" , "email":"wbegum@coolUniversity.edu"}
    ]
    const CONTAINER = document.getElementById("container");
    for(let i = 0; i < students.length; i++) {
        console.log("student ID: " + students[i].id + "\nStudent email: " + students[i].email);
        create_student_listing(CONTAINER, "student ID: " + students[i].id);
        create_student_listing(CONTAINER, "Student email: " + students[i].email)
    }
}

const create_student_listing = (container, text) => {
    const PARAGRAPH = document.createElement("p");
    PARAGRAPH.textContent = text;
    container.appendChild(PARAGRAPH);

}

window.onload = init

//document.addEventListener("DOMContentLoaded", init);