const db = require("./database");

const vouchers = [
  ["F8K2LM", 30],
  ["Q4X7NP", 30],
  ["T9W3AZ", 30],
  ["M6RV1H", 30],
  ["J2CY8Q", 30],

  ["Z5PL9D", 60],
  ["H7NT4K", 60],
  ["B3XF6W", 60],
  ["R8MJ2V", 60],
  ["L1QP7C", 60],

  ["Y4DK8T", 90],
  ["N6ZH3A", 90],
  ["P2FW9R", 90],
  ["C7LX5M", 90],
  ["V9JB4N", 90],

  ["G3TR8Y", 120],
  ["U5MP2X", 120],

  ["K8QV6L", 180],
  ["D4HN7Z", 180],

  ["W2RC9F", 300]
];

db.serialize(() => {

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO vouchers
    (
      code,
      minutes,
      used
    )
    VALUES (?, ?, 0)
  `);

  vouchers.forEach(([code, minutes]) => {
    stmt.run(code, minutes);
  });

  stmt.finalize();

  console.log("✓ 20 random vouchers added.");

});