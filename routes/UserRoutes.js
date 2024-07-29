const express = require('express')

const UserController = require('../controllers/UserController')
const router = express.Router()

router.get('/', UserController.listarUsuarios)
router.get('/getinfo', UserController.getInfoUserLogged)
router.delete('/usuario/:id', UserController.borrarUsuario)

module.exports = router;