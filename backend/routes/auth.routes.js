const express = require("express");
const router = express.Router();
const { signup,login,createTestAdmin } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
//router.get("/organizations", getOrganizations);
router.post("/create-test-admin", createTestAdmin);
module.exports = router;