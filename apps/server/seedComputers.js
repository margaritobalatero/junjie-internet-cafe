const db = require("./database");

const pcs = [

    ["SERVER","PC-1"],
    ["CLIENT-2","PC-2"],
    ["CLIENT-3","PC-3"],
    ["CLIENT-4","PC-4"]

];

const stmt = db.prepare(`
INSERT OR IGNORE INTO computers
(computer_name, display_name)
VALUES (?,?)
`);

pcs.forEach(pc=>{

    stmt.run(pc[0],pc[1]);

});

stmt.finalize();

console.log("Computers seeded.");