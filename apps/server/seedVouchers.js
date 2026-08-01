const db = require("./database");


const vouchers = [

  ["ABC123",30],

  ["XYZ789",60],

  ["AAA111",90]

];


const stmt =
db.prepare(
`
INSERT OR IGNORE INTO vouchers
(code, minutes)
VALUES (?,?)
`
);


vouchers.forEach(v => {

  stmt.run(v[0],v[1]);

});


stmt.finalize();


console.log(
"Vouchers added"
);