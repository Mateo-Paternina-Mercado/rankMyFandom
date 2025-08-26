const { Strategy, ExtractJwt } = require("passport-jwt");

function passportConfig(passport) {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      (payload, done) => done(null, payload)
    )
  );
}

module.exports = passportConfig;
