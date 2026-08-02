const db = require("./database");

db.run("DELETE FROM sessions", function(err) {

    if (err) {

        console.log(err);

    } else {

        console.log("Deleted", this.changes, "sessions.");

    }

    process.exit();

});