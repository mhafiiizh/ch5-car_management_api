const router = require("express").Router();
const authenticate = require("../app/middlewares/authenticate");
const checkRole = require("../app/middlewares/checkRole");

const Car = require("../app/controllers/carController");

router.get("/", authenticate, checkRole, Car.findAllCars);
router.post("/", authenticate, checkRole, Car.createCar);

router.get("/:id", authenticate, checkRole, Car.findCarById);
router.put("/:id", authenticate, checkRole, Car.updateCar);
router.delete("/:id", authenticate, checkRole, Car.deleteCar);

module.exports = router;
