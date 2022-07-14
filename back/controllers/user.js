import {User} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const uploadAvatar = async (req, res) => {
  try {
    const updateAvatar = await User.findOneAndUpdate({
      email: req.body.email,
    }, {
      img: {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        contentType: 'image/png',
      },
    }, {new: true, fields: ['img']});
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
