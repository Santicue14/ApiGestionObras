const express = require('express')

const ReclamoController = require('../controllers/ReclamoController')
const router = express.Router()

router.post('/', ReclamoController.crearReclamo)
router.get('/', ReclamoController.listarReclamos)

module.exports = router;