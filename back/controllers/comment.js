import {Comment, User} from '../models/index.js';
import {calculateAverageRating} from './product.js';

const checkSettingsAndSendFields = [
  {
    '$project': {
      firstName: {
        '$cond': {
          if: '$settings.hideName',
          then: 'Hidden name',
          else: '$firstName',
        },
      },
      lastName: {
        '$cond': {
          if: '$settings.hideName',
          then: 0,
          else: '$lastName',
        },
      },
      img: {
        '$cond': {
          if: '$settings.hideAvatar',
          then: 0,
          else: '$img',
        },
      },
    },
  },
];

export const addComment = async (
    {
      body: {user, productId, title, body, rating},
    }, res) => {
  try {
    const hasReview = await Comment.findOne({'user': user});
    if (hasReview) {
      res.send({message: 'This user already has review!'});
      return;
    }
    const comment = new Comment({
      user,
      productId,
      title,
      body,
      rating,
    });

    await comment.save((err) => {
      if (err) {
        res.send(err);
      }
    });

    await calculateAverageRating(productId, res); // in product controller
  } catch (e) {
    console.log(e);
    res.status(500).send({message: 'Something went wrong!'});
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.aggregate([
      {
        '$match': {
          'productId': req.body.productId,
        },
      },
      {
        '$lookup': {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          pipeline: checkSettingsAndSendFields,
          as: 'userInfo',
        },
      },
    ]);
    res.send({comments});
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};


export const getBestComment = async (productId) => {
  const comment = await Comment.aggregate([
    {
      '$match': {
        'productId': productId,
      },
    },
    {
      '$lookup': {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        pipeline: checkSettingsAndSendFields,
        as: 'userInfo',
      },
    },
  ]).sort({rating: -1}).limit(1);
  return comment[0];
};

export const deleteComment = async ({body}, res) => {
  try {
    const user = await User.findOne({'_id': body.userId});
    if (user) {
      await Comment.deleteOne({'_id': body.commentId});
      res.send({message: 'Successfully deleted!'});
    } else {
      res.status(404).send({message: 'User not found'});
    }
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};
