const Usuario = require('../models/Usuario')

const UsuarioController = {
    getInfoUserLogged: async (req, res) => {
        try {
            const usuarioLogueado = await Usuario.findByPk(req.user.id)
            if (!usuarioLogueado) { return res.status(401).json({ message: 'No se encontró el usuario' }) }
            return res.status(200).json(usuarioLogueado)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll()
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    borrarUsuario: async (req, res) => {
        try {
            const { id } = req.params
            const usuarioLogueado = await Usuario.findByPk(req.user.id)
            if (usuarioLogueado.rol != 1) { return res.status(403).json({ message: 'No estás autorizado a realizar esta acción' }) }
            const usuario = await Usuario.findByPk(id)
            if (!usuario) { return res.status(404).json({ message: 'Usuario no encontrado' }) }

            await usuario.destroy()

            res.status(200).json({message: 'Usuario eliminado con exito'})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }

    }
}

module.exports = UsuarioController;