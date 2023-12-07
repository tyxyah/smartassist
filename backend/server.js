require("dotenv").config();

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const studentRoutes = require("./routes/student");
const SS202112Routes = require("./routes/202112")

// express app
const app = express();

// Allow requests
app.use(cors({ origin: 'http://localhost:3000' }));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/student", studentRoutes);
app.use("/api/study_scheme", SS202112Routes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI_USER)
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
