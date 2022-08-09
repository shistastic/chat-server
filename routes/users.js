/*
    path: api/users
*/

const { Router } = require("express");
const { getUsers } = require("../controllers/users");
const { validateJWT } = require("../midlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);


module.exports = router;

