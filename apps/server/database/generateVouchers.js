const db = require("./database");
const prompt = require("prompt-sync")();

function randomCode(length = 6) {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < length; i++) {

    code += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );

  }

  return code;

}

const count =
  parseInt(
    prompt("How many vouchers? ")
  );

const minutes =
  parseInt(
    prompt("Minutes per voucher? ")
  );

if (
  isNaN(count) ||
  isNaN(minutes) ||
  count <= 0 ||
  minutes <= 0
) {

  console.log("Invalid input.");

  process.exit();

}

const stmt = db.prepare(`
INSERT OR IGNORE INTO vouchers
(
  code,
  minutes,
  used
)
VALUES (?, ?, 0)
`);

let inserted = 0;

function insertVoucher() {

  if (inserted >= count) {

    stmt.finalize();

    console.log(
      `\n✓ ${count} vouchers created.`
    );

    return;

  }

  const code = randomCode();

  stmt.run(
    code,
    minutes,
    function () {

      if (this.changes > 0) {

        inserted++;

        console.log(
          `${inserted}. ${code}`
        );

      }

      insertVoucher();

    }

  );

}

insertVoucher();