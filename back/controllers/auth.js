const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
module.exports.login = async (req, res) => {
 const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
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
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).send(user)
    } catch (e) {
      res.status(500).send({
        message: 'Something went wrong!'
      })
    }
  }
}