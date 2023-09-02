const jwt = require('jsonwebtoken');

const FailedAuthorizationError = require('../errors/failedAuthorization.error');
const FailedAuthenticationError = require('../errors/failedAuthentication.error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new FailedAuthorizationError('Unauthorized'));
    } else {
      const verifiedToken = jwt.verify(token, process.env.JWT_KEY);
      req.userData = { userId: verifiedToken.userId };
      return next();
    }
  } catch (err) {
    return next(new FailedAuthenticationError('Forbidden'));
  }
};
