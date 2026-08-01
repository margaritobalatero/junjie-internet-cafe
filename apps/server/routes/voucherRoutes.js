const express = require("express");

const router = express.Router();


const {
  validateVoucher,
  useVoucher
} = require("../controllers/voucherController");



router.get(
  "/:code",
  validateVoucher
);


router.post(
  "/use",
  useVoucher
);


module.exports = router;