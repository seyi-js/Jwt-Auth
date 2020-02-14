const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  console.log(token)
  if (!token) {
    return res.status(401).send("Access Denied");
  } 
  if (token){
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next()
  }else {
    res.status(400).send("Invalid Token");
  }
}

