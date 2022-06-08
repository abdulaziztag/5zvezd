const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()
const app = express()
const authRoutes = require('./routes/authRoutes')
const mongoUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
mongoose.connect(mongoUrl)

const auth = passport.authenticate('jwt', { session: false });

app.use('/api/auth', authRoutes)

app.get('/', auth, (req, res) => {
    res.send('Hello!')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Running!')
})