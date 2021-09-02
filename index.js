const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

// ENV. VARIABLES
const { PORT } = process.env;

// CONSTANTS
const port = PORT || 4001;

const authRoute = require("./routes/auth.route");

// ROUTES
app.use("api/v1/auth", authRoute);

// MIDDLEWARES
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Welcome Page
app.get("/", (req, res) => {
  res.send("Store API v1.0 for Gratis Digital Interview Assessment");
});

app.listen(port, (err) => {
  if (err) console.err(er);
  console.log(`App listening to PORT ${port}`);
});
