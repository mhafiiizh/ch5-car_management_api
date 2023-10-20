const router = require("express").Router();
const Admin = require("../app/controllers/adminController");
const checkSuperadmin = require("../app/middlewares/checkSuperadmin");
const authenticate = require("../app/middlewares/authenticate");

router.get("/", Admin.findAllAdmins);
router.post(
  "/",
  authenticate,
  checkSuperadmin("Superadmin"),
  Admin.createAdmin
);

router.get("/:id", Admin.findAdminById);
router.put("/:id", Admin.updateAdmin);
router.delete("/:id", Admin.deleteAdmin);

module.exports = router;
