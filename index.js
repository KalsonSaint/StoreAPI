const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

// ENV. VARIABLES
const { PORT, DB_URL } = process.env;

// CONSTANTS
const port = PORT || 4001;
const db = DB_URL;

// Import Routes
const authRoute = require("./routes/auth.route");

// ROUTES
app.use("api/v1/auth", authRoute);

// MIDDLEWARES
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Homepage
app.get("/", (req, res) => {
  res.send("Store API v1.0 for Gratis Digital Interview Assessment");
});

// Connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection successful"))
  .catch(() => console.log("DB Connection error!!!"));

// Listen to server
app.listen(port, (err) => {
  if (err) console.err(er);
  console.log(`App listening to PORT ${port}`);
});
