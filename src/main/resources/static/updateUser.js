
import { getUsers } from "./getUsers.js";
import { showMessage } from "./messages.js";

const userForm = document.getElementById("userForm");

userForm.addEventListener("submit", async function(event) {

    const id = document.getElementById("userId").value;

    if (id === "") {
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

        const response = await fetch("/api/users/" + id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        showMessage("User updated successfully!", "green");

        userForm.reset();

        document.getElementById("submitButton").textContent = "Register User";

        document.getElementById("cancelButton").hidden = true;

        getUsers();

    } catch (error) {

        showMessage(error.message, "red");

    }

});
