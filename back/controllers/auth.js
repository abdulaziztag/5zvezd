import {User} from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {sendConfirmationEmail} from '../utils/nodemailer.util.js';
import {resize} from '../utils/resize.util.js';

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
        role: candidate.role,
      }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 * 7});

      res.status(200).send({
        token: `Bearer ${token}`,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        userId: candidate._id,
        img: candidate.img !== '' ? await resize(candidate.img, 200, 200) : '',
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

export const register = async ({body: {password, firstName, email, lastName}}, res) => {
  const candidate = await User.findOne({email});
  const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
  );

  if (candidate) {
    if (candidate.status === 'Pending') {
      sendConfirmationEmail(
          candidate.firstName,
          candidate.lastName,
          candidate.email,
          candidate.confirmationCode,
          res,
      );
      return;
    }
    res.status(409).send({
      message: 'This email already exist!',
    });
  } else {
    const user = new User({
      firstName,
      email,
      lastName,
      password,
      confirmationCode: token,
    });

    await user.save((err) => {
      if (err) {
        res.status(500).send({message: err.message});
        return;
      }
      sendConfirmationEmail(
          user.firstName,
          user.lastName,
          user.email,
          user.confirmationCode,
          res,
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
    res.status(200).send({message: 'Successfully confirmed!'});
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'});
  }
};
