let currentSession = null;

export function startSession(
  sessionId,
  voucher,
  pcNumber
) {

  currentSession = {

    sessionId,

    voucherId: voucher.id,

    voucherCode: voucher.code,

    pcNumber,

    durationSeconds: voucher.minutes * 60,

    startedAt: Date.now(),

    addedSeconds: 0

  };

}

export function getSession() {

  return currentSession;

}

export function extendSession(
  voucher,
  endedAt
) {

  if (!currentSession) return;

  currentSession.voucherId = voucher.id;

  currentSession.voucherCode = voucher.code;

  currentSession.serverEndedAt = endedAt;

}

export function clearSession() {

  currentSession = null;

}