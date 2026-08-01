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

    console.log(
        `${computer.displayName} connected`
    );

    console.log(computer);

});

    socket.on("disconnect", () => {

      console.log("Client disconnected:", socket.id);

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