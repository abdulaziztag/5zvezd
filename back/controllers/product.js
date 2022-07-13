import {Product, User, Comment} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFullProduct = async ({body: {productId}}, res) => {
  try {
    const product = await Product.findOne({_id: productId});
    const comment = await Comment.find({productId}).sort({rating: -1 }).limit(1);
    const user = await User.findOne({'_id': productId}, [
      'firstName',
      'lastName',
      'email',
      'img',
    ]);
    res.status(200).send({
      product,
      comment,
      user,
    });
  } catch (e) {
    res.status(500).send({message: 'Something went wrong'});
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      company: req.body.company,
      img: {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        contentType: 'image/png',
      },
    });
    await product.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({message: 'Successfully added!'});
      }
    });
  } catch (e) {
    res.status(500).send({message: 'Something went wrong'});
  }
};
