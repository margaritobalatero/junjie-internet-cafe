const db = require("./database");

db.all(
    "SELECT * FROM computers",
    [],
    (err, rows)=>{

        console.log(rows);

        db.close();

    }
);