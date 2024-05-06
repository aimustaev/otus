const express = require("express");
require('dotenv').config();
const app = express();
const port = 8000;

app.get("/health", (req, res) => {
  res.jsonp({ status: "OK" });
});

app.get("/", (req, res) => {
  res.jsonp({ version: 4, hostname: process.env.HOSTNAME });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
