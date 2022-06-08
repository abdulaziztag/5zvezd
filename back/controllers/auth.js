const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {sendConfirmationEmail} = require('../config/nodemailer.config')

module.exports.login = async (req, res) => {
 const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    if (candidate.status === 'Pending') {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      })
    }

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, process.env.JWT_SECRET, {expiresIn: 60*60*24*7})

      res.status(200).send({
        token: `Bearer ${token}`,
        name: candidate.name,
        email: candidate.email
      })
    } else {
      res.status(401).send({
        message: 'Password is incorrect!'
      })
    }
  } else {
    res.status(404).send({
      message: 'User not found!'
    })
  }
}

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email})
  const token = jwt.sign(
    {
      email: req.body.email
    },
    process.env.JWT_SECRET
  )

  if (candidate) {
    res.status(409).send({
      message: 'This email already exist!'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      confirmationCode: token
    })

    try {
      await user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          message:
            "User was registered successfully! Please check your email",
        });

        sendConfirmationEmail(
          user.name,
          user.email,
          user.confirmationCode
        )
      })
    } catch (e) {
      res.status(500).send({
        message: 'Something went wrong!'
      })
    }
  }
}

module.exports.confirmEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.body.confirmationCode
    })
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    user.status = "Active"
    user.save()
    res.status(200).send({
      message: 'Successfully activated!'
    })
  } catch (e) {
    res.status(500).send({message: 'Something went wrong!'})
  }
}