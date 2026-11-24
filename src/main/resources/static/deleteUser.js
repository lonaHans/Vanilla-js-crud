
import { getUsers } from "./getUsers.js";
import { showMessage } from "./messages.js";

export async function deleteUser(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch("/api/users/" + id, {

            method: "DELETE"

        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        showMessage("User deleted successfully!", "green");

        getUsers();

    } catch (error) {

        showMessage(error.message, "red");

    }

}
