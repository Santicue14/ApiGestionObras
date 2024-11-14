const Reclamo = require('../models/Reclamo')
const TipoReclamos = require('../models/TipoReclamos')

const ReclamoController = {
    crearReclamo: async (req, res) => {
        try {
            const {dni, nombre, email, celular, domicilio,entre_calles, observaciones, idTipoReclamo} = req.body
            if(!dni || !nombre || !domicilio){ return res.status(400).json({message: 'Los campos dni, nombre y domicilio son requeridos'})}
            const data = {dni, nombre, email, celular, domicilio,entre_calles, observaciones, idTipoReclamo}
            const reclamo = await Reclamo.create(data)
            return res.status(201).json({message: 'Reclamo creado con éxito', reclamo})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },
    listarReclamos: async (req, res) => {
        try {
            const reclamos = await Reclamo.findAll({
                include: {
                    model: TipoReclamos,
                    as: 'tipoReclamo', // Alias de la relación
                    attributes: ['nombre']
                }
            });
            return res.status(200).json({ reclamos });
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    },
    listarReclamosxTipo: async(req,res)=>{

    },
    borrarReclamo: async (req, res) => {

    },
    verDetallesReclamo: async (req, res) => {

    },
    actualizarEstadoReclamo: async (req, res) => {

    }
}

module.exports = ReclamoController