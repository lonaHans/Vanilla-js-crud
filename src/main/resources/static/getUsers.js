
import { editUser } from "./editUser.js";
import { deleteUser } from "./deleteUser.js";
import { showMessage } from "./messages.js";

const API_URL = "/api/users";

export async function getUsers() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to retrieve users");
        }

        const users = await response.json();

        const tableBody = document.getElementById("userTableBody");

        tableBody.innerHTML = "";

        users.forEach(user => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.id}</td>
                <td></td>
                <td></td>
                <td></td>
            `;

            row.cells[1].textContent = user.name;
            row.cells[2].textContent = user.email;


            const editButton = document.createElement("button");

            editButton.textContent = "Edit";

            editButton.addEventListener("click", function() {
                editUser(user);
            });


            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function() {
                deleteUser(user.id);
            });

            row.cells[3].appendChild(editButton);
            row.cells[3].appendChild(deleteButton);

            tableBody.appendChild(row);

        });

    } catch (error) {

        showMessage(error.message, "red");

    }

}
