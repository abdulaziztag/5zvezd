import {User} from '../models/index.js';

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
