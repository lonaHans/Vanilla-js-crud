
import { editUser } from "./editUser.js";
import { deleteUser } from "./deleteUser.js";
import { showMessage } from "./messages.js";


const API_URL = "/api/user";

export async function getUsers() {

    const response = await fetch(API_URL);

    const users = await response.json();

    const tableBody = document.getElementById("userTableBody");

    tableBody.innerHTML = "";

    users.forEach(user => {

        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td> <a href="registerUser.html?id=${user.id}">Edit</a> </td>
            </tr>
        `;

        tableBody.innerHTML += row;

    });

}

getUsers();

