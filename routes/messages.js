/*
    path: api/messages
*/

const { Router } = require("express");
const { getChat } = require("../controllers/messages");
const { validateJWT } = require("../midlewares/validate-jwt");

const router = Router();

router.get("/:from", validateJWT, getChat);


module.exports = router;