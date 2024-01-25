const jwt = require("jsonwebtoken");

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }

    next();
  } catch (error) {
    return res.status(403).json({
      status: false,
      statusCode: 403,
      message: "You are not allowed to access",
      data: null,
      error: err.message,
    });
  }
};

module.exports = { auth };
