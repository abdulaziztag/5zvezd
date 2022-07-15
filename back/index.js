import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import { config } from 'dotenv';
const app = express();
config();
import { authRoutes, productRoutes, commentRoutes, userRoutes } from './routes/index.js';

const mongoUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

app.use(passport.initialize());
import { passportGuard } from './middleware/passport.js';
passportGuard(passport);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect(mongoUrl);

const auth = passport.authenticate('jwt', { session: false });

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/comment', commentRoutes);

app.get('/', auth, (req, res) => {
  res.send('Hello!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running!');
});
