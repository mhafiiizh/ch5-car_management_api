const router = require("express").Router();
const authenticate = require("../app/middlewares/authenticate");

const Car = require("../app/controllers/carController");

router.get("/", authenticate, Car.showCarsForMember);

module.exports = router;
