const router = require("express").Router();
const Admin = require("../app/controllers/adminController");
const authenticate = require("../app/middlewares/authenticate");
const checkRole = require("../app/middlewares/checkRole");

router.get("/", Admin.findAllAdmins);
router.post("/", authenticate, checkRole("Superadmin"), Admin.createAdmin);

router.get("/:id", Admin.findAdminById);
router.put("/:id", Admin.updateAdmin);
router.delete("/:id", Admin.deleteAdmin);

module.exports = router;
