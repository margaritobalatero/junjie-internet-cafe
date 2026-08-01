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

module.exports = {
  register,
  heartbeat,
  remove,
  getAll
};