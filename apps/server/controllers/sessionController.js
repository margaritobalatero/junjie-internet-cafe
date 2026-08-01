const db = require("../database/database");

exports.startSession = (req, res) => {

  const { voucher } = req.body;

  const startedAt = new Date();

  const endedAt = new Date(
    startedAt.getTime() + voucher.minutes * 60000
  );

  db.run(
    `
    INSERT INTO sessions
    (
      voucher_id,
      voucher_code,
      pc_number,
      started_at,
      ended_at
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      voucher.id,
      voucher.code,
      1, // We'll replace this with the actual PC later
      startedAt.toISOString(),
      endedAt.toISOString()
    ],
    function (err) {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to create session"
        });
      }

      res.json({
        success: true,
        sessionId: this.lastID,
        startedAt,
        endedAt
      });

    }
  );

};