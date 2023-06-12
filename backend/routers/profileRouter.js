const express = require("express");
const router = express.Router();

const { getProfile , setProfile } = require("../controllers/profileController");

const auth = require("../middelware/authorize");

router.get("/", auth, getProfile);
router.post("/",auth , setProfile);

module.exports = router;