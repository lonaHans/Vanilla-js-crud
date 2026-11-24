async function getUsers(){
    const response = await fetch("/api/users");
    const users = await response.json();
    const tableBody = document.getElementById("userTableBody");

    tableBody.innerHTML ="";

    users.forEach(user =>{
        const row = document.createElement("tr");

        row.innerHTML = <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>;

        tableBody.appendChild(row);
    });
}