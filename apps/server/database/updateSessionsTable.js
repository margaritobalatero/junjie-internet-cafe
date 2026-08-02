const db = require("./database");

db.serialize(() => {

  db.run(`
    ALTER TABLE sessions
    ADD COLUMN status TEXT DEFAULT 'ACTIVE'
  `, (err) => {

    if (err) {
      console.log("status:", err.message);
    } else {
      console.log("✓ status column added");
    }

  });

  db.run(`
    ALTER TABLE sessions
    ADD COLUMN grace_started_at TEXT
  `, (err) => {

    if (err) {
      console.log("grace_started_at:", err.message);
    } else {
      console.log("✓ grace_started_at column added");
    }

  });

});