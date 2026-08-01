const db = require("./database");

db.all(
  "SELECT * FROM sessions",
  [],
  (err, rows) => {

    if (err) {
      console.error("Database error:", err);
    } else {
      console.log(rows);
    }

    db.close();

  }
);