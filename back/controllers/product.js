import {Product, Comment} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const selectArguments = [
  'title', 'averageRating', 'img',
  'company', 'category', 'minCost', 'maxCost', 'createdAt'];

export const getProductById = async ({body: {productId}}, res) => {
  try {
    if (mongoose.isValidObjectId(productId)) {
      const product = await Product.findOne({_id: productId});

      if (product) {
        res.status(200).send({
          product,
        });
      } else {
        res.status(404).send({
          message: 'Product by this id not found!',
        });
      }
    } else {
      res.status(404).send({
        message: 'Product by this id not found!',
      });
    }
  } catch (e) {
    res.status(500).send({message: 'Something went wrong'});
  }
};

export const addProduct = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      res.status(403).send({message: 'You do not have permissions do this operation!'});
      return;
    }

    const filePath = path.join(__dirname + '/../uploads/' + req.file.filename);

    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      company: req.body.company,
      img: {
        data: fs.readFileSync(filePath),
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
    fs.unlinkSync(filePath);
  } catch (e) {
    console.log(e);
    res.status(500).send({message: 'Something went wrong'});
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      res.status(403).send({message: 'You do not have permissions do this operation!'});
      return;
    }

    await Product.deleteOne({'_id': req.body.productId});
    res.send({message: 'Successfully deleted!'});
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const sortProductByField = async (req, res) => {
  try {
    const filteredProduct = await Product.find({}, ['title', '_id', 'img', 'averageRating'])
        .sort({
          [req.body.field]: req.body.fieldValue,
        })
        .limit(req.body.limit || 12);

    res.send({filteredProduct});
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
    const category = await Product
        .find({
          $or: [
            {
              category: {'$in': body.category},
            },
            {
              company: {'$in': body.company},
            },
            {
              title: body.title,
            },
          ],
        })
        .select(selectArguments);
    res.send({
      category,
    });
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

