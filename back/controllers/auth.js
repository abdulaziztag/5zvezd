import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendConfirmationEmail } from '../utils/nodemailer.util.js';

export const login = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email});
  if (candidate) {
    if (candidate.status === 'Pending') {
      return res.status(401).send({
        message: 'Pending Account. Please Verify Your Email!',
      });
    }

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 * 7});

      res.status(200).send({
        token: `Bearer ${token}`,
        name: candidate.name,
        email: candidate.email,
      });
    } else {
      res.status(401).send({
        message: 'Password is incorrect!',
      });
    }
  } else {
    res.status(404).send({
      message: 'User not found!',
    });
  }
};

export const register = async ({body: {password, name, email}}, res) => {
  const candidate = await User.findOne({email});
  const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
  );

  if (candidate) {
    res.status(409).send({
      message: 'This email already exist!',
    });
  } else {
    const user = new User({
      name: name,
      email: email,
      password,
      confirmationCode: token,
    });

    await user.save((err) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      res.send({
        message:
          'User was registered successfully! Please check your email',
      });

      sendConfirmationEmail(
          user.name,
          user.email,
          user.confirmationCode,
      );
    });
  }
};

export const confirmEmail = async ({body: {confirmationCode}}, res) => {
  try {
    const user = await User.findOne({
      confirmationCode,
    });
    if (!user) {
      return res.status(404).send({message: 'User Not found.'});
    }
    user.status = 'Active';
    user.save();
    res.status(200).send({
      message: 'Successfully activated!',
    });
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'});
  }
};
