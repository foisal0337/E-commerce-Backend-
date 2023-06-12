const express = require("express");
const router = express.Router();

const { createCardItem,
    getCardItem,
    updateCardItem,
    deleteCardItem} = require("../controllers/cardController");

const auth = require("../middelware/authorize");

router.get("/",getCardItem);
router.post("/",auth , createCardItem);
router.put("/",auth , updateCardItem);
router.delete("/:id",auth , deleteCardItem);

module.exports = router;