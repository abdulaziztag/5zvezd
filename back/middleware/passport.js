import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index.js';
import { config } from 'dotenv';
config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const passportGuard = (passport) => {
  passport.use(
      new JwtStrategy(options, async (payload, done) => {
        try {
          const user = await User.findById(payload.userId).select('email _id role');
          done(null, user||false);
        } catch (e) {
          console.log(e);
        }
      }),
  );
};
