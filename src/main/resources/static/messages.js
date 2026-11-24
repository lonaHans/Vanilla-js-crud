
export function showMessage(text, color) {

    const message = document.getElementById("message");

    message.textContent = text;

    message.style.color = color;

}
