import {Product, Comment} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {getBestComment} from './comment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProductById = async ({body: {productId}}, res) => {
  try {
    const product = await Product.findOne({_id: productId});
    const bestComment = await getBestComment(productId);

    res.status(200).send({
      product,
      comment: bestComment,
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

export const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({'_id': req.body.productId});
    res.send({message: 'Successfully deleted!'});
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const getHomePageProducts = async (req, res) => {
  try {
    const highestRating = await Product
        .find({})
        .sort({averageRating: -1})
        .limit(req.body.count || 12);
    const lastAdded = await Product
        .find({})
        .sort({created_at: -1})
        .limit(req.body.count || 12);
    const orderByCategory = await Product.find({category: req.body.category || 'Food'}).limit(12);
    res.send({
      highestRating,
      lastAdded,
      orderByCategory,
    });
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const calculateAverageRating = async (productId, res) => {
  try {
    const average = await Comment.aggregate([
      {
        '$match': {
          'productId': productId,
        },
      },
      {
        '$group': {
          '_id': '$productId',
          'AverageRating': {'$avg': {'$ifNull': ['$rating', 0]}},
        },
      },
    ]);
    await Product.findOneAndUpdate(
        {'_id': productId},
        {'averageRating': average[0].AverageRating.toFixed(1)},
    );
    res.send({message: 'Successfully added!'});
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const filterProducts = async ({body}, res) => {
  try {
    const products = await Product
        .find({
          category: {'$in': body.category},
        })
        .select(['title', 'averageRating', 'img', 'company', 'category', 'minCost', 'maxCost']);
    console.log(products);
    res.send(products);
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};
