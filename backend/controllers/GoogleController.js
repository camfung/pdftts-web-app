const passport = require("passport");
const GoogleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: [
      "email",
      "profile"
    ],
    showDialog: true,
  })(req, res, next);
};

const callback = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL + "/",
    failureRedirect: process.env.CLIENT_URL + "/login",
  })(req, res, next);
};

module.exports = {
  GoogleLogin,
  callback,
};
