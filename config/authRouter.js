const router = require("express").Router();

const Auth = require("../app/controllers/authController");
const authenticate = require("../app/middlewares/authenticate");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/me", authenticate, Auth.checkToken);

module.exports = router;
