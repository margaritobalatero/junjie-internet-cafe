const expired = new Set();

function isExpired(sessionId) {
  return expired.has(sessionId);
}

function markExpired(sessionId) {
  expired.add(sessionId);
}

function clearExpired(sessionId) {
  expired.delete(sessionId);
}

module.exports = {
  isExpired,
  markExpired,
  clearExpired
};