const clients = new Map();

function register(socketId, computer) {
  clients.set(socketId, {
    socketId,
    ...computer,
    connectedAt: new Date(),
    lastSeen: new Date()
  });
}

function heartbeat(socketId) {
  const client = clients.get(socketId);

  if (client) {
    client.lastSeen = new Date();
  }
}

function remove(socketId) {
  clients.delete(socketId);
}

function getAll() {
  return [...clients.values()];
}

function getBySocket(socketId) {

  return clients.get(socketId);

}


function getSocketByPC(pcNumber) {

  for (const [socketId, client] of clients) {

   if (Number(client.pcNumber) === Number(pcNumber)) {

      return socketId;

    }

  }

  return null;

}

module.exports = {
  register,
  heartbeat,
  remove,
  getAll,
  getBySocket,
  getSocketByPC
};