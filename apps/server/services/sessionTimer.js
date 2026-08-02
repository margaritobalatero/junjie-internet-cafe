const db = require("../database/database");

function getRemainingTime(callback) {

  db.all(
    `
    SELECT *
    FROM sessions
    WHERE status != 'ENDED'
    ORDER BY id DESC
    `,
    [],
    (err, sessions) => {

      if (err) {
        console.log(err);
        callback([]);
        return;
      }

      const now = Date.now();

      const results = [];

      sessions.forEach((session) => {

        const remainingSeconds = Math.max(
          0,
          Math.floor(
            (
              new Date(session.ended_at).getTime() -
              now
            ) / 1000
          )
        );

        if (remainingSeconds <= 0) {

          db.run(
            `
            UPDATE sessions
            SET status='ENDED'
            WHERE id=?
            `,
            [session.id]
          );

          return;

        }

        results.push({

          sessionId: session.id,

          voucherCode: session.voucher_code,

          pcNumber: session.pc_number,

          status: "ACTIVE",

          remainingSeconds

        });

      });

      callback(results);

    }

  );

}

module.exports = {
  getRemainingTime
};