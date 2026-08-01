const clientManager = require("./clientManager");

const { Server } = require("socket.io");

let io;

function initialize(server) {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);

    socket.on("register-computer", (computer) => {

    clientManager.register(socket.id, computer);

    console.log(`${computer.displayName} connected`);

    console.log(clientManager.getAll());

});

    socket.on("disconnect", () => {

    clientManager.remove(socket.id);

    console.log("Client disconnected:", socket.id);

    console.log(clientManager.getAll());

});

  });

  return io;
}

function getIO() {
  return io;
}

module.exports = {
  initialize,
  getIO
};