
import { getUsers } from "./getUsers.js";
import { showMessage } from "./messages.js";

const userForm = document.getElementById("userForm");

const API_URL = "/api/users";

userForm.addEventListener("submit", async function(event) {

    const id = document.getElementById("userId").value;

    if (id !== "") {
        return;
    }

    event.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const userData = {
        name: name,
        email: email
    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        });

        if (!response.ok) {
            throw new Error("Failed to register user");
        }

        showMessage("User registered successfully!", "green");

        userForm.reset();

        getUsers();

    } catch (error) {

        showMessage(error.message, "red");

    }

});
