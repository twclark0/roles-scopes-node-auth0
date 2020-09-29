const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authConfig = require("./src/auth_config.json");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (!authConfig.domain || !authConfig.audience) {
  throw new Error(
    "Please make sure that auth_config.json is in place and populated"
  );
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.get("/api/public", (req, res) => {
  res.send({
    msg: "You called the public API!"
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
