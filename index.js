const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const postRoute = require("./routes/blog.js");
const authRoute = require("./routes/auth.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(postRoute);
app.use(authRoute);

app.listen(7000, () => {
  console.log("SERVER CONECTED");
});

mongoose.connect("mongodb://localhost:27017/test", () => {
  console.log("DB CONNECTED");
});
