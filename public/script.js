// script.js
const socket = io();

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");
const sendButton = document.getElementById("send-button");
const loader = document.getElementById("loader");
const inputContainer = document.getElementById("input-container");

function displayMessage(role, message) {
  const div = document.createElement("div");
  div.innerHTML = `<p><b>${role === "user" ? "You" : "Assistant"}:</b> ${message}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function toggleLoader(showLoader) {
  if (showLoader) {
    loader.style.display = "block";
    inputContainer.style.display = "none"; // Hide input box while showing the loader
  } else {
    loader.style.display = "none";
    inputContainer.style.display = "flex"; // Show input box again
  }
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;
  displayMessage("user", message); // Display user's message in the chat
  toggleLoader(true); // Show loader while waiting for a response

  socket.emit("sendMessage", message, (error) => {
    if (error) {
      alert(error);
    }

    messageInput.value = "";
    messageInput.focus();
    toggleLoader(false); // Hide loader and show input box ("Send" button) after getting a response
  });
});

socket.on("message", (message) => {
  displayMessage("assistant", message); // Display assistant's message in the chat
});
