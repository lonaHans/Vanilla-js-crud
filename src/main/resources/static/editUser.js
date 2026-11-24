
export function editUser(user) {

    document.getElementById("userId").value = user.id;

    document.getElementById("name").value = user.name;

    document.getElementById("email").value = user.email;

    document.getElementById("submitButton").textContent = "Update User";

    document.getElementById("cancelButton").hidden = false;

}
