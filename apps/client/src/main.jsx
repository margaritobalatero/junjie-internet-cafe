import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { socket } from "./services/socketService";

socket.connect();

socket.on("connect", () => {

  console.log("Connected to server:", socket.id);

});

socket.on("server-time", (data) => {

  console.log("Server Time:", data.now);

});

socket.emit("register-computer", {

    computerName: "CLIENT-2",

    displayName: "PC-2"

});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);