const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const ApiError = require("./utils/apiError");
const errorHandler = require("./controllers/errorController");

const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(errorHandler);

module.exports = app;
