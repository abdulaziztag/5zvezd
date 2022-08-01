import {User} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {resize} from '../utils/resize.util.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const uploadAvatar = async (req, res) => {
  try {
    const filePath = path.join(__dirname + '/../uploads/' + req.file.filename);

    const updateAvatar = await User.findOneAndUpdate({
      '_id': req.user._id,
    }, {
      img: {
        data: fs.readFileSync(filePath),
        contentType: 'image/png',
      },
    }, {new: true, fields: ['img']});
    if (updateAvatar) {
      res.send({
        message: 'Successfully changed',
        img: await resize(updateAvatar.img),
      });
    } else {
      res.send({message: 'User not found!'});
    }
    fs.unlinkSync(filePath);
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const changeSettings = async ({body: {settings}, user}, res) => {
  try {
    const foundUser = await User.findOne({'_id': user._id});
    if (foundUser) {
      foundUser.settings = settings;
      foundUser.save();
      res.send({message: 'Successfully changed!'});
    } else {
      res.send({message: 'User not found!'});
    }
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const getSettings = async (req, res) => {
  try {
    const settings = await User.findOne({'_id': req.user._id}, ['settings']);
    if (settings) {
      res.send(settings);
    } else {
      res.send({message: 'User not found!'});
    }
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const adminRights = async ({headers, user}, res) => {
  try {
    await User.findOneAndUpdate({'_id': user._id}, {role: 'Admin'});

    res.send({message: 'Now you are Admin! Log in again to use functions!'});
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};
