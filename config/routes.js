const router = require("express").Router();

const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const Car = require("./carRouter");

router.use("/", Auth);
router.use("/api/v1/admins", Admin);
router.use("/api/v1/cars", Car);

module.exports = router;
