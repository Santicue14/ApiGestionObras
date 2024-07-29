const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/database')

const AuthController = {
    login: async (req, res) => { //LOGIN FUNCION
        try {
            const { email, contrasena } = req.body

            if (!email || !contrasena) {
                return res.status(400).json({ message: 'Debe ingresar email y contraseña' })
            }

            const usuario = await Usuario.findOne({ where: { email: email } })
            if (!usuario) { return res.status(401).json({ message: 'El usuario con este mail no existe' }) }

            const coincideContrasena = await bcrypt.compare(contrasena, usuario.contrasena)
            if (!coincideContrasena) { return res.status(401).json({ message: 'Contraseña incorrecta' }) }

            const token = jwt.sign(
                { id: usuario.idUsuarios, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            })
            return res.status(201).json({ message: 'Usuario logueado satisfactoriamente', token })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    register: async (req, res) => { //REGISTER FUNCION
        try {
            const { nombre, email, contrasena } = req.body;

            if (!nombre || !email || !contrasena) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }

            // Verificar si el correo electrónico ya está en uso
            const existingUser = await Usuario.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(400).json({ message: 'El mail ya está en uso' });
            }

            const maxIdResult = await sequelize.query('SELECT MAX(idUsuarios) AS maxid FROM Usuarios', { type: sequelize.QueryTypes.SELECT })
            const nextId = (maxIdResult[0].maxId || 0) + 1;
            // Aquí puedes proceder con la creación del nuevo usuario
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const usuario = await Usuario.create({ idUsuarios: nextId, nombre, email, contrasena: hashedPassword });

            // Aquí podrías generar un token o realizar otras operaciones

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    logout: async (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        })
        return res.status(200).json({ message: 'Sesión cerrada con éxito' })
    }
}

module.exports = AuthController