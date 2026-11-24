
async function getUsers() {
    try {
        const response = await fetch("/api/user");

        if (!response.ok) {
            throw new Error("Could not retrieve users");
        }

        const users = await response.json();

        console.log("Users received:", users);

        const tableBody = document.getElementById("userTableBody");

        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">
                        Edit
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading users:", error);
    }
}

const userForm = document.getElementById("userForm");

userForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const id = document.getElementById("userId").value;

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    const message = document.getElementById("message");

    try {

        let response;

        if (id) {

            response = await fetch(`/api/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

        } else {

            response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

        }

        console.log("HTTP Status:", response.status);

        if (response.ok) {

            if (id) {
                message.textContent = "User updated successfully!";
            } else {
                message.textContent = "User registered successfully!";
            }

            userForm.reset();

            document.getElementById("userId").value = "";

            document.getElementById("submitButton").value = "Register User";

            await getUsers();

        } else {

            const errorMessage = await response.text();

            console.error("Backend error:", errorMessage);

            message.textContent = "Error saving user! Status: " + response.status;
        }

    } catch (error) {

        console.error("Error:", error);

        message.textContent = "Could not connect to the server.";

    }

});


function editUser(id, name, email) {

    document.getElementById("userId").value = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("submitButton").value = "Update User";

}

document.addEventListener("DOMContentLoaded", function() {
    getUsers();
});
