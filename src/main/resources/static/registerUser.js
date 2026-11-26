
import { showMessage } from "./messages.js";

const userForm = document.getElementById("userForm");

const API_URL = "/api/user";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(!id){

    userForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const userData = {
            name: name,
            email: email
        };

        try{
            const response = await fetch(API_URL,{
                method: "POST",
                headers: {"Content-Type": "application/json" },

                body: JSON.stringify(userData)
            });

            if(!response.ok){
                throw new Error("Failed to register user");
            }

            showMessage("User registered successfully!", "green");

            userForm.reset();

            setTimeout(function (){
                window.location.href = "viewUsers.html";
            },1200);
        }

        catch(error){
            showMessage(error.message,"red");
        }

    });

}