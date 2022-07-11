import {User} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const uploadAvatar = async (req, res) => {
  try {
    console.log(req.file.filename);
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
    console.log(e);
  }
};
