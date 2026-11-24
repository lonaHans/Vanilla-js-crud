async function getUsers(){
    const response = await fetch("/api/user");
    const users = await response.json();
    const tableBody = document.getElementById("userTableBody");

    tableBody.innerHTML ="";

    users.forEach(user =>{
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
           <td>${user.email}</td>

        `;
        tableBody.appendChild(row);
    });
}

const userForm = document.getElementById("userForm");
userForm.addEventListener("submit",async function(event){
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    try{
        const response = await fetch("/api/user",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const message = document.getElementById("message");

        if (response.ok) {

            message.textContent = "User registered successfully!";

            userForm.reset();

            getUsers();

        } else {

            message.textContent = "Error registering user!";

        }
    }

    catch (error){
        document.getElementById("message").textContent =
            "Could not connect to the server.";

        console.error(error);

    }
});

//console.log("JavaScript connected successfully!");