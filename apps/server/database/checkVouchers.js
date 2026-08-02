const db = require("./database");

db.all(
  "SELECT * FROM vouchers",
  [],
  (err, rows) => {

    if (err) {

      console.log(err);

    } else {

      console.table(rows);

    }

    process.exit();

  }
);