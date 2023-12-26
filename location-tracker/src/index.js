require("./models/User");
require("./models/Track");

const express = require("express");
const app = express();
const router = require("./routes/authRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

app.use(bodyParser.json());
app.use(router);
app.use(trackRoutes);

const mongoURI =
  "mongodb+srv://amansiddofficial:2019105%40Database786@cluster0.2dvvsyt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("DB is connected...");
});
mongoose.connection.on("error", (err) => {
  console.log("Error while connecting to mongoDB ", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send("Hello there!");
});

app.listen(3000, () => {
  console.log(`App is listening on 3000`);
});
