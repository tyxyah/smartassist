require("dotenv").config();

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");

// express app
const app = express();

// Allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
