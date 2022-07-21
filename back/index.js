import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import {config} from 'dotenv';
import {authRoutes, commentRoutes, productRoutes, userRoutes} from './routes/index.js';
import {passportGuard} from './middleware/passport.js';

const app = express();
config();

const mongoUrl = `${process.env.MONGODB_URI}`;

app.use(passport.initialize());
passportGuard(passport);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect(mongoUrl);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/comment', commentRoutes);

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running!');
});
