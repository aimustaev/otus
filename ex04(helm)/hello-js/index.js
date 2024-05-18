const express = require("express");
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/health", (req, res) => {
  res.jsonp({ status: "OK" });
});

app.get("/", db.getConfig);

app.get("/config", db.getConfig);

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
