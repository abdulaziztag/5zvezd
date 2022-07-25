import {Comment, Product} from '../models/index.js';
import {calculateAverageRating} from './product.js';

const checkSettingsAndSendFields = [
  {
    $project: {
      firstName: {
        $cond: {
          if: '$settings.hideName',
          then: 'Hidden name',
          else: '$firstName',
        },
      },
      lastName: {
        $cond: {
          if: '$settings.hideName',
          then: 0,
          else: '$lastName',
        },
      },
      img: {
        $cond: {
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
      body: {productId, title, body, rating, cost},
      headers,
      user,
    }, res) => {
  try {
    const hasReview = await Comment.findOne({
      $and: [
        {
          user: user._id,
        },
        {
          productId,
        },
      ],
    });
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

    const product = await Product.findOne({'_id': productId});

    if (product.minCost > +cost || product.minCost === 0) {
      await Product.findOneAndUpdate({'_id': productId}, {minCost: +cost});
    } else if (product.maxCost < +cost) {
      await Product.findOneAndUpdate({'_id': productId}, {maxCost: +cost});
    }

    await calculateAverageRating(productId, res, 'Successfully added!'); // in product controller
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'});
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          'productId': req.body.productId,
        },
      },
      {
        $lookup: {
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
        $match: {
          $or: [
            {
              productId: req.body.productId,
            },
            {
              user: req.body.userId ? req.body.userId : '',
            },
          ],
        },
      },
      {
        $lookup: {
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

export const deleteComment = async ({body, user}, res) => {
  try {
    const comment = await Comment
        .findOne({user: user._id, productId: body.productId}, ['_id'])
        .lean()
        .populate('user', ['_id']);
    if (comment.user._id.toString() === user._id.toString()) {
      await Comment.deleteOne({'user': user._id});
      await calculateAverageRating(body.productId, res, 'Successfully deleted!');
    } else {
      res.status(403).send({message: 'You do not have permission to do this!'});
    }
  } catch (e) {
    res.send({message: 'Comment not found or you are not author of this comment!'});
  }
};
