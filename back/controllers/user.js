import {User} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

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
    fs.unlinkSync(filePath);
    if (updateAvatar) {
      res.send({message: 'Successfully changed', updateAvatar});
    } else {
      res.send({message: 'User not found!'});
    }
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const changeSettings = async ({body: {settings, userId}}, res) => {
  try {
    const user = await User.findOne({'_id': userId});
    if (user) {
      user.settings = settings;
      user.save();
      res.send({message: 'Successfully changed!'});
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
