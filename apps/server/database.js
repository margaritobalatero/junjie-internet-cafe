const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "../database/cafe.db",
  (err) => {

    if (err) {
      console.log(
        "Database error:",
        err.message
      );
    } else {
      console.log(
        "SQLite connected"
      );
    }

  }
);


module.exports = db;