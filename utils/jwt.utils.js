const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const tokenExpiryDays = 10;

exports.generateToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    type: user.user_type,
  };

  const token = jwt.sign(payload, secret, { expiresIn: `${tokenExpiryDays}d` });
  
  return token;
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

exports.decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

exports.getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  return token || null;
};