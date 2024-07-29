const express = require('express')

const TipoReclamoController = require('../controllers/TipoReclamoController')
const router = express.Router()

router.get('/', TipoReclamoController.listarTipoReclamos)
router.post('/', TipoReclamoController.crearTipoReclamo)
router.delete('/:id', TipoReclamoController.borrarTipoReclamo)

module.exports = router;