let currentSession = null;


export function startSession(voucher) {

  currentSession = {

    voucherId: voucher.id,

    voucherCode: voucher.code,

    durationSeconds: voucher.minutes * 60,

    startedAt: Date.now(),

    addedSeconds: 0
  };

}



export function getSession() {

  return currentSession;

}



export function extendSession(voucher) {

  if (!currentSession) return;


  currentSession.durationSeconds +=
    voucher.minutes * 60;


  currentSession.addedSeconds +=
    voucher.minutes * 60;

}



export function clearSession() {

  currentSession = null;

}