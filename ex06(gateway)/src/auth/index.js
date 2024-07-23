const express = require("express");
const promMid = require("express-prometheus-middleware");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = 8001;

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);
app.use(bodyParser.json());
app.use(cookieParser("MY SECRET"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (request, response) => {
  response.jsonp({ status: "OK" });
});

app.get("/", (request, response) => {
  response.status(200).json(config);
});

app.post("/login", (request, response) => {
  const { id } = request.body;
  let options = {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    signed: true,
  };

  response.cookie("token", id, options);
  response.status(200).send(`login - ok`);
});

app.get("/auth", (request, response) => {
  const id = request.signedCookies["token"];
  if (!id) {
    response.status(401).send("not valid token");
  }
  response.setHeader("X-UserId", id);
  response.status(200).send("ok");
});

app.get("/logout", (request, response) => {
  response.clearCookie("token");
  response.send("you are logged out");
});

app.listen(port, () => {
  console.log(`Auth app listening on port ${port}`);
});
