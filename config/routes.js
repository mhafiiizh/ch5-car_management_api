const fs = require("fs");

const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
// const swaggerDoc = require("../docs/swagger.json");
const yaml = require("js-yaml");

const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const Car = require("./carRouter");
const Member = require("./memberRouter");

router.use("/", Auth);
router.use("/api/v1/admins", Admin);
router.use("/api/v1/cars", Car);
router.use("/cars", Member);

// Open API
const swaggerDoc = yaml.load(
  fs.readFileSync(`${__dirname}/../docs/swagger.yaml`, "utf-8")
);

router.use("/api-docs", swaggerUI.serve);
router.use("/api-docs", swaggerUI.setup(swaggerDoc));
module.exports = router;
