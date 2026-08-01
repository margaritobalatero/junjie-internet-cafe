const vouchers = [
  {
    id: 1,
    code: "ABC123",
    minutes: 30,
    used: false,
    createdAt: new Date(),
    usedAt: null,
  },
  {
    id: 2,
    code: "XYZ789",
    minutes: 60,
    used: false,
    createdAt: new Date(),
    usedAt: null,
  },
  {
    id: 3,
    code: "AAA111",
    minutes: 90,
    used: false,
    createdAt: new Date(),
    usedAt: null,
  },
];

export function validateVoucher(code) {
  const normalized = code.trim().toUpperCase();

  const voucher = vouchers.find(v => v.code === normalized);

  if (!voucher) {
    return {
      success: false,
      message: "Invalid voucher."
    };
  }

  if (voucher.used) {
    return {
      success: false,
      message: "Voucher already used."
    };
  }

  return {
    success: true,
    voucher
  };
}

export function useVoucher(id) {
  const voucher = vouchers.find(v => v.id === id);

  if (voucher) {
    voucher.used = true;
    voucher.usedAt = new Date();
  }
}