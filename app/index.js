const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const router = require("../config/routes");
const ApiError = require("./utils/apiError");
const errorHandler = require("./controllers/errorController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

/** Install Router */
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes do not exist`, 404));
});

app.use(errorHandler);

module.exports = app;
