const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Libera preflight sem exigir token
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  const token = req.header('Authorization')?.split(' ')[1] || req.query.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
