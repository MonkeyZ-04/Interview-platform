const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware นี้เป็นตัวอย่างเบื้องต้น ในระบบจริงควรสมบูรณ์กว่านี้
exports.protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // ในระบบจริง ควรจะ verify token และดึงข้อมูล user จากฐานข้อมูล
    // ที่นี่เราจะจำลองว่า token ถูกต้องและมี user id = 1 (เป็นกรรมการ)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: 1, role: 'interviewer' }; // Mock user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};