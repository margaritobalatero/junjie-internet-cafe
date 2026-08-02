const db = require("../database/database");

exports.startSession = (req, res) => {

 const { voucher, pcNumber } = req.body;

  const startedAt = new Date();

 const TEST_MINUTES = 2;

const endedAt = new Date(
  startedAt.getTime() + TEST_MINUTES * 60 * 1000
);

  db.run(
    `
  INSERT INTO sessions
(
  voucher_id,
  voucher_code,
  pc_number,
  started_at,
  ended_at,
  status
)
VALUES (?, ?, ?, ?, ?, ?)
    `,
 [
  voucher.id,
  voucher.code,
  pcNumber,
  startedAt.toISOString(),
  endedAt.toISOString(),
  "ACTIVE"
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

exports.extendSession = (req, res) => {

  const { sessionId, voucher } = req.body;

  db.get(

    `
    SELECT ended_at
    FROM sessions
    WHERE id=?
    `,

    [sessionId],

    (err, session) => {

      if (err || !session) {

        return res.status(404).json({

          success:false,

          message:"Session not found"

        });

      }

      const currentEnd =
        new Date(session.ended_at);

      const newEnd =
        new Date(

          currentEnd.getTime() +

          voucher.minutes * 20000

        );

      db.run(

        `
        UPDATE sessions
        SET

          ended_at=?,
          status='ACTIVE',
          grace_started_at=NULL

        WHERE id=?
        `,

        [

          newEnd.toISOString(),

          sessionId

        ],

        function(err) {

          if (err) {

            return res.status(500).json({

              success:false,

              message:"Unable to extend session"

            });

          }

          res.json({

            success:true,

            endedAt:newEnd

          });

        }

      );

    }

  );

};