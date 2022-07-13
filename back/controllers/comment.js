import {Comment, Product, User} from '../models/index.js';

export const addComment = async (
    {
      body: {userId, productId, title, body, rating},
    }, res) => {
  try {
    const comment = new Comment({
      userId,
      productId,
      title,
      body,
      rating,
    });
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
        {'averageRating': average[0].AverageRating},
    );
    await comment.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({message: 'Successfully added!'});
      }
    });
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'});
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      productId: req.body.productId,
    });
    const mappedComments = [];
    comments.forEach((key) => {
      User.findOne({'_id': key.userId},
          [
            'firstName',
            'lastName',
            'email',
            'img',
          ])
          .then((data) => {
            mappedComments.push({comment: key, user: data});
          });
    });
    console.log(mappedComments);
    res.send({comments: mappedComments});
  } catch (e) {

  }
};
