let currentSession = null;

export function startSession(voucher) {
  currentSession = {
    voucherId: voucher.id,
    voucherCode: voucher.code,

    durationSeconds: voucher.minutes * 60,

    startedAt: Date.now(),
  };
}

export function getSession() {
  return currentSession;
}

export function clearSession() {
  currentSession = null;
}