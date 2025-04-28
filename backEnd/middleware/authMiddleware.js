// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    // Simulate a token verification (e.g., JWT)
    if (token === 'valid_token') {
      next();  // Proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = authMiddleware;