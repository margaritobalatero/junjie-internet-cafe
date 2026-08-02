const db = require("./database");

db.run(
  `
  UPDATE vouchers
  SET
    used = 0,
    used_at = NULL
  `,
  function (err) {

    if (err) {
      console.error(err);
      return;
    }

    console.log(
      `Reset ${this.changes} vouchers.`
    );

    db.close();

  }
);