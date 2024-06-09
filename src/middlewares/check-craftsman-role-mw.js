import jwt from 'jsonwebtoken';

const checkCraftsmanRole = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSEC);
    if (decoded.role !== 'craftsman') {
      return res.status(403).json('Forbidden. Not a client user.');
    }

    req.craftsmanId = decoded._id;

    next();
  } catch (error) {
    return res.status(401).json('Invalid token.');
  }
};

export default checkCraftsmanRole;
