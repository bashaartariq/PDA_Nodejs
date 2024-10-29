// roleMiddleware.js
function allowRoles(roles) {
  return (req, res, next) => {
    if (roles.includes(res.locals.role)) {
      return next();
    } else {
      return res.sendStatus(401);
    }
  };
}

module.exports = { allowRoles };
