const db = require("../database/database");

exports.validateVoucher = (req, res) => {

  console.log("BODY:", req.body);

  const code = req.body?.code?.trim();

  console.log("CODE:", code);

  if (!code) {

    return res.status(400).json({

      success: false,

      message: "Voucher code is required"

    });

  }

  db.get(

    `
    SELECT *
    FROM vouchers
    WHERE code = ?
    `,

    [code],

    (err, voucher) => {

      if (err) {

        console.error(err);

        return res.status(500).json({

          success: false,

          message: "Database error"

        });

      }

      if (!voucher) {

        return res.json({

          success: false,

          message: "Voucher not found"

        });

      }

      if (voucher.used) {

        return res.json({

          success: false,

          message: "Voucher already used"

        });

      }

      res.json({

        success: true,

        voucher

      });

    }

  );

};

exports.useVoucher = (req, res) => {

  const { id } = req.body || {};

  if (!id) {

    return res.status(400).json({

      success: false,

      message: "Voucher id is required"

    });

  }

  db.run(

    `
    UPDATE vouchers
    SET
      used = 1,
      used_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,

    [id],

    function (err) {

      if (err) {

        return res.status(500).json({

          success: false,

          message: "Database error"

        });

      }

      if (this.changes === 0) {

        return res.status(404).json({

          success: false,

          message: "Voucher not found"

        });

      }

      res.json({

        success: true,

        message: "Voucher marked as used"

      });

    }

  );

};