require("dotenv").config();
const jwt = require("jsonwebtoken");
const private_key = process.env.privateKey;
function authenticate(req, res, next) {
  const header = req.headers["authorization"];
  console.log(header);
  const token = header && header.split(" ")[1];
  if (token == undefined) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, private_key, (err, response) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.locals = response;
        next();
      }
    });
  }
}
module.exports = { authenticate };
