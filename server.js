// bring in and initialize express and json body parsing listen to environment port or 5000.
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");

app.use(cors());
app.use(express.json());

const users = require("./routes/api/users");

app.use("/api/users", users);

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true })
  .then(() => console.log("Connected to db"))
  .catch((error) => console.error("failed to connect to db", error));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}`));

// mongoose naming conventions.
// model User
// collection users
// model file -> User.js
// routes -> users.js
