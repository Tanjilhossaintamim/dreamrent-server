const jwt = require("jsonwebtoken");

const varifyToken = (req, res, next) => {
  const token = req.headers?.authorization;
  const maintoken = token.split(" ");
  if (!maintoken[1]) {
    return res.status(401).send({ message: "unauthorized !" });
  }
  jwt.verify(maintoken[1], process.env.SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access !" });
    }
    req.user = decode;
    next();
  });
};

module.exports = { varifyToken };
