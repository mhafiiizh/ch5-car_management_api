const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../docs/swagger.json");

const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const Car = require("./carRouter");

router.use("/", Auth);
router.use("/api/v1/admins", Admin);
router.use("/api/v1/cars", Car);

// Open API
router.use("/api-docs", swaggerUI.serve);
router.use("/api-docs", swaggerUI.setup(swaggerDoc));
module.exports = router;
