const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { User } = require("../model/user.js");

const signIn = (req, res) => {
  let { email, password } = req.body;

  const hash = crypto
    .createHmac("sha256", password)
    .update("Whats app Clone")
    .digest("hex");

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.json({
        error: "Cannot authenticate user. Please try later",
      });
    }

    if (!user) {
      return res.json({
        error: "User not available",
      });
    }

    if (user.password !== hash) {
      return res.json({
        error: "Enter correct password",
      });
    }

    var token = jwt.sign(
      { _id: user._id, email: user.email },
      "This is my token"
    );

    return res.json({
      _id: user._id,
      email: user.email,
      token: token,
    });
  });
};

const signUp = (req, res) => {
  let { password, confirmPassword } = req.body;
  console.log(password, confirmPassword);

  if (password && password !== confirmPassword) {
    return res.json({
      error: "Both passwords are not same",
    });
  }

  const hash = crypto
    .createHmac("sha256", password)
    .update("Whats app Clone")
    .digest("hex");
  console.log(hash);

  const user = new User({
    email: req.body.email,
    password: hash,
  });

  user.save().then((data) => {
    console.log("User saved");
    res.json({ data: "User saved" });
  });
};

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, "This is my token");
    console.log(decoded);
    req.user = decoded._id;
    next();
  } catch (err) {
    res.status(401);
    return res.json({ error: "Invalid token" });
  }
};

module.exports = { signIn, signUp, isAuthenticated };
