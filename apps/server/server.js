const voucherRoutes =
require("./routes/voucherRoutes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/vouchers",
  voucherRoutes
);


app.get("/", (req, res) => {

  res.json({
    message: "Junjie Internet Cafe Server Running"
  });

});


const PORT = 5000;


const HOST = "0.0.0.0";


const http = require("http");

const { initialize } = require("./socket");

const server = http.createServer(app);

initialize(server);

server.listen(PORT, HOST, () => {

  console.log(`Server running on ${HOST}:${PORT}`);

});