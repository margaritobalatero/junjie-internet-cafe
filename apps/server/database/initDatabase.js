const db = require("./database");


db.serialize(() => {


  db.run(`
    CREATE TABLE IF NOT EXISTS vouchers (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      code TEXT UNIQUE,

      minutes INTEGER,

      used INTEGER DEFAULT 0,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      used_at DATETIME

    )
  `);



  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      voucher_id INTEGER,

      voucher_code TEXT,

      pc_number INTEGER,

      started_at DATETIME,

      ended_at DATETIME

    )
  `);

  db.run(`
CREATE TABLE IF NOT EXISTS computers (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    computer_name TEXT UNIQUE,

    display_name TEXT,

    ip_address TEXT,

    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    enabled INTEGER DEFAULT 1

)
`);



});


console.log(
  "Database tables created"
);