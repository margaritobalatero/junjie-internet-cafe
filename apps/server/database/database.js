const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(
  __dirname,
  "../../../database/cafe.db"
);

const db = new sqlite3.Database(
  dbPath,
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