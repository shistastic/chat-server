/*
    path: api/login
*/

const {Router} = require("express");
const {crearUsuario, loginUser, renewToken} = require("../controllers/auth");
const {check} = require("express-validator");
const { validarCampos } = require("../midlewares/validar-campos");
const { validateJWT } = require("../midlewares/validate-jwt");

const router = Router();


router.post("/new", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
   
    validarCampos,
],crearUsuario);

router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
],loginUser);

router.get("/renew", validateJWT,renewToken);


module.exports = router;

