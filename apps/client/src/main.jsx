import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { socket } from "./services/socketService";

socket.connect();

socket.emit("register-computer", {

    computerName: "CLIENT-2",

    displayName: "PC-2"

});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);