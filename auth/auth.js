const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ id: user.idUsuarios, email: user.email }, secret, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({message: `No estás autorizado`});
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({message: `No estás autorizado`});
    }
    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };
