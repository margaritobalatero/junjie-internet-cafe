let currentSession = null;

export function startSession(voucher) {
  currentSession = {
    id: crypto.randomUUID(),
    voucherId: voucher.id,
    voucherCode: voucher.code,
    totalSeconds: voucher.minutes * 60,
    startedAt: Date.now()
  };
}

export function getSession() {
  return currentSession;
}

export function clearSession() {
  currentSession = null;
}