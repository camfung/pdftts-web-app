const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config");
const executeQuery = require("../dao/db").executeQuery;
require("dotenv").config();

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async function(accessToken, refreshToken, profile, cb) {
        try {
          const user = await findOrCreateUser(profile, accessToken);  // Update this function for Google user profiles
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  async function findOrCreateUser(profile, accessToken) {
    try {
      // Check if user exists
      let res = await executeQuery(
        "SELECT * FROM users WHERE auth_provider_id = $1",
        [profile.id]
      );

      if (res.rows.length > 0) {
        // Update the access token if it has changed
        if (res.rows[0].access_token !== accessToken) {
          await executeQuery(
            "UPDATE users SET access_token = $1, updated_at = CURRENT_TIMESTAMP WHERE auth_provider_id = $2",
            [accessToken, profile.id]
          );
        }
        return res.rows[0]; // User exists
      }

      // If not, create a new user
      res = await executeQuery(
        "INSERT INTO users (auth_provider_id, email, display_name, access_token, created_at, updated_at, credits) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 10) RETURNING *",
        [profile.id, profile.emails[0].value, profile.displayName, accessToken]
      );

      return res.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
