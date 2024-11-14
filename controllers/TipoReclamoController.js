const TipoReclamo = require('../models/TipoReclamos')
const Usuario = require('../models/Usuario')

const TipoReclamoController = {
    crearTipoReclamo: async (req, res) => {
        try {
            const { nombre } = req.body
            if (!nombre) { return res.status(401).json({ message: 'El nombre es requerido' }) }
            await TipoReclamo.create({ nombre })
            return res.status(201).json({ message: 'Tipo de reclamo creado satisfactoriamente' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    borrarTipoReclamo: async (req, res) => {
        try {
            const usuarioLogueado = await Usuario.findByPk(req.user.id)
            if (usuarioLogueado.rol != 1) { return res.status(403).json({ message: 'No estás autorizado a realizar esta acción' }) }
            const { id } = req.params
            const tipo = await TipoReclamo.findByPk(id)
            if (tipo) { await tipo.destroy() }
            return res.status(403).json({ message: 'Tipo borrado con exito' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    listarTipoReclamos: async (req, res) => {
        try {
            console.log(req);
            const tipos = await TipoReclamo.findAll()
            return res.status(200).json(tipos)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = TipoReclamoController