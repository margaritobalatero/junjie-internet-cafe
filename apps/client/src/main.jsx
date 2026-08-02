import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { socket } from "./services/socketService";

socket.connect();

socket.on("connect", () => {

  console.log("Connected to server:", socket.id);

});

socket.emit("register-computer", {

    pcNumber: 2,

    computerName: "CLIENT-2",

    displayName: "PC-2"

});

socket.on("session-update", (session) => {

  console.log(
    "SESSION UPDATE:",
    session
  );

});

socket.on("server-time", (data) => {

  console.log("Server Time:", data.now);

});

socket.on("session-ended", () => {

    console.log("SESSION EXPIRED");

});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);