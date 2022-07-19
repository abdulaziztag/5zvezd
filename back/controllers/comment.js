import {Comment} from '../models/index.js';
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
      body: {productId, title, body, rating},
      headers,
      user,
    }, res) => {
  try {
    const hasReview = await Comment.findOne({'user': user._id});
    if (hasReview) {
      res.send({message: 'This user already has review!'});
      return;
    }
    const comment = new Comment({
      user: user._id,
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


export const sortCommentByField = async (req, res) => {
  try {
    const comment = await Comment.aggregate([
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
    ])
        .sort({
          [req.body.field]: req.body.fieldValue,
        })
        .limit(req.body.limit || 1);
    res.send({
      comment,
    });
  } catch (e) {
    res.send({message: 'Something went wrong!'});
  }
};

export const deleteComment = async ({body, headers, user}, res) => {
  try {
    const comment = await Comment
        .findOne({'_id': body.commentId}, ['_id'])
        .lean()
        .populate('user', ['_id']);
    if (comment.user._id.toString() === req.user._id.toString()) {
      await Comment.deleteOne({'_id': body.commentId});
      res.send({message: 'Successfully deleted!'});
    } else {
      res.status(403).send({message: 'You do not have permission to do this!'});
    }
  } catch (e) {
    res.send({message: 'Comment not found or you are not author of this comment!'});
  }
};