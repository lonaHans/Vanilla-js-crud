
import { showMessage } from "./messages.js";

const API_URL = "/api/user";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const userForm = document.getElementById("userForm");

if(id){
    async function getUserById(){
        try{
            const response =  await  fetch(`${API_URL}/${id}`);

            if(!response.ok){
                throw new Error("User does not exist!!");
            }

            const user = await response.json();

            document.getElementById("name").value = user.name;
            document.getElementById("email").value = user.email;

        }

        catch(error){
            showMessage(error.message, "red");
        }
    }

    getUserById();

    userForm.addEventListener("submit", async function(event){
        console.log("UPDATE FORM SUBMITTED");
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const userData = {
            name: name,
            email: email
        };

        try{
            const response = await fetch(`${API_URL}/${id}`,{
                method: "PUT",

                headers:{"Content-Type": "application/json"},

                body: JSON.stringify(userData)
            });

            if(!response.ok){
                throw new Error("Failed to update user");
            }

            showMessage("User updated successfully!","green");

            setTimeout(function(){window.location.href = "viewUsers.html";
            },1200);
        }

        catch(error){
            showMessage(error.message,"red");
        }

    });
}