import {User} from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {sendConfirmationEmail} from '../utils/nodemailer.util.js';
import multer from 'multer';

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
        firstName: candidate.firstName,
        lastName: candidate.lastName,
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
    res.status(200).send();
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'});
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/');
  },
  filename: (req, file, cb) => {
    const {originalname} = file;
    cb(null, originalname);
  },
});

export const upload = multer({storage});

export const uploadAvatar = async (req, res) => {
  try {
    const updateAvatar = await User.findOneAndUpdate({
      email: req.body.email,
    }, {
      imgSrc: `/files/${req.file.originalname}`,
    }, {new: true});
    if (updateAvatar) {
      res.send(updateAvatar);
    } else {
      res.send({message: 'ds'});
    }
  } catch (e) {
    console.log(e);
  }
};
