const express = require("express");
const router = express.Router();

const { 
    dashboard, loginPage, loginAdmin, logout, 
    forgotpasswordPage, profilePage, sendMail, verifyotp, changePassword 
} = require("../controller/index.controller");

router.get("/", loginPage);
router.get("/dashboard", dashboard);
router.post("/login", loginAdmin);
router.get("/logout", logout);
router.get("/profile", profilePage);
router.get("/forgotpassword", forgotpasswordPage);
router.post("/sendMail", sendMail);
router.post("/verify-otp", verifyotp);
router.post("/change-password", changePassword);

router.use("/admin", require("./admin.routes"));

module.exports = router;
