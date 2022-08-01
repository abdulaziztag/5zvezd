import {Product, Comment} from '../models/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoose from 'mongoose';
import {resize} from '../utils/resize.util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const selectArguments = [
  'title', 'averageRating', 'img',
  'company', 'category', 'minCost', 'maxCost', 'createdAt'];

export const getProductById = async ({body: {productId}}, res) => {
  try {
    if (mongoose.isValidObjectId(productId)) {
      const product = await Product.findOne({_id: productId}).select('-img');
      const img = await Product.findOne({_id: productId}).select('img');

      if (product) {
        res.status(200).send({
          product: {
            img: await resize(img.img),
            product,
          },
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
    const products = await Product
        .find({}, ['title', '_id', 'img', 'averageRating'])
        .sort({
          [req.body.field]: req.body.fieldValue,
        })
        .limit(req.body.limit || 12);

    const filteredProduct = await Promise.all(
        products.map(async (product) => {
          const img = await resize(product.img, 300, 400);
          return {
            img,
            title: product.title,
            _id: product._id,
            averageRating: product.averageRating,
          };
        }),
    );
    res.json({filteredProduct});
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const calculateAverageRating = async (productId, res, message) => {
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
    const averageRating = average.length !== 0 ? average[0].AverageRating.toFixed(1) : 0;
    await Product.findOneAndUpdate(
        {'_id': productId},
        {'averageRating': averageRating},
    );

    res.send({
      message,
      averageRating: averageRating,
    });
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const filterProducts = async ({body}, res) => {
  try {
    const filteredProductsByTitle = await Product
        .find({
          $or: [
            { $text: { $search: body.title}},
          ],
        })
        .select(selectArguments);
    const filteredProductsByKey = await Product
        .find({
          $or: [
            {
              category: {'$in': body.category.map((key) => key.charAt(0).toUpperCase() + key.slice(1))},
            },
            {
              company: {'$in': body.company.map((key) => key.charAt(0).toUpperCase() + key.slice(1))},
            },
            {
              _id: {'$in': body.productId},
            },
          ],
        });

    const filteredProducts = await Promise.all(
        [...filteredProductsByTitle, ...filteredProductsByKey].map(async (product) => {
          const img = await resize(product.img, body.width, body.height);
          return {
            img,
            title: product.title,
            _id: product._id,
            averageRating: product.averageRating,
            company: product.company,
            category: product.category,
            maxCost: product.maxCost,
            minCost: product.minCost,
            createdAt: product.createdAt,
          };
        }),
    );

    res.send({
      filteredProducts,
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Something went wrong!'});
  }
};

