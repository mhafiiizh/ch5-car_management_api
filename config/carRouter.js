const router = require("express").Router();
const authenticate = require("../app/middlewares/authenticate");
const checkRole = require("../app/middlewares/checkRole");
const uploader = require("../app/middlewares/uploader");

const Car = require("../app/controllers/carController");

router.get(
  "/",
  authenticate,
  checkRole("Superadmin", "Admin"),
  Car.findAllCars
);
router.post(
  "/",
  authenticate,
  checkRole("Superadmin", "Admin"),
  uploader.single("image"),
  Car.createCar
);

router.get(
  "/:id",
  authenticate,
  checkRole("Superadmin", "Admin"),
  Car.findCarById
);
router.put(
  "/:id",
  authenticate,
  checkRole("Superadmin", "Admin"),
  uploader.single("image"),
  Car.updateCar
);
router.delete(
  "/:id",
  authenticate,
  checkRole("Superadmin", "Admin"),
  Car.deleteCar
);

module.exports = router;
