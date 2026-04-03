const init = () => {
    let alice = new Student("Alice", "Messer", "amesser@cooluni.edu", "Math of Finance");
    let andrew = new Student("Andrew", "Andrews", "aandrews@cooluni.edu", "Biology");
    alice.printDetails();
    andrew.printDetails();
}

class Student {
    #firstName;
    #lastName;
    #email;

    static register (courseName) {
        console.log(courseName);
    }

    constructor (firstName, lastName, email, courseName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;

        Student.register(courseName);
    }

    get firstName () {
        return this.#firstName;
    }

    get lastName () {
        return this.#lastName;
    }

    get email () {
        return this.#email;
    }

    set firstName (newName) {
        if (newName.length == 0) {
            console.log("error, name empty");
            newName = "error"
            this.#firstName = newName;
        } else {
            this.#firstName = newName;
        }
    }

    set lastName (newName) {
        if (newName.length == 0) {
            console.log("error, name empty");
            newName = "error"
            this.#lastName = newName;
        } else {
            this.#lastName = newName;
        }
    }

    set email (newEmail) {
        if (newEmail.length == 0) {
            console.log("error, name empty");
            newEmail = "error"
            this.#email = newEmail;
        } else {
            this.#email = newEmail;
        }
    }

    printDetails() {
        console.log(this.#firstName, this.#lastName, "|", this.#email)
    }
}

window.onload = init