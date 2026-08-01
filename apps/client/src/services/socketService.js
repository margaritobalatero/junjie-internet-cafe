import { io } from "socket.io-client";

const SERVER_URL = "http://192.168.10.118:5000";

export const socket = io(SERVER_URL, {
  autoConnect: false
});