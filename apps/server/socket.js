const {
  isExpired,
  markExpired
} = require("./services/expiredSessions");

const clientManager = require("./clientManager");

const { getRemainingTime } =
require("./services/sessionTimer");

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

  // Broadcast server time every second
setInterval(() => {

  getRemainingTime((sessions) => {

    console.log("Timer Service:", sessions);


  


    const computers = clientManager.getAll();


    computers.forEach((computer) => {

const pcSession = sessions.find(
    session => session.pcNumber == computer.pcNumber
);

if (!pcSession) {

    io.to(computer.socketId).emit("session-ended");

    return;

}

if (pcSession.remainingSeconds <= 0) {

    if (!isExpired(pcSession.sessionId)) {

        markExpired(pcSession.sessionId);

        io.to(computer.socketId).emit(
            "session-ended",
            {
                sessionId: pcSession.sessionId
            }
        );

        console.log(
            `Session ${pcSession.sessionId} expired.`
        );

    }

}
else {

    io.to(computer.socketId).emit(
        "session-update",
        pcSession
    );

}

    });


  });


}, 1000);

  return io;
}

function getIO() {
  return io;
}

module.exports = {
  initialize,
  getIO
};