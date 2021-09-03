const jwt = require("jsonwebtoken");
require("dotenv/config");

const { TOKEN_KEY } = process.env;
const secret = TOKEN_KEY || "AASD76AWSQW9ASF00ASFBASF8978A65A8FASF78";

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided. Token is required",
      status: "error",
      data: null,
    });
  }

  try {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized",
          status: "error",
          data: null,
        });
      }

      req.userId = decoded;
      return next();
    });
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token", status: "error" });
  }
};

module.exports = verifyToken;
