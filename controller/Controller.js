const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { KEY } = require('../MiddleWare/config/KEY')
const bcrypt = require('bcrypt')

const generaetAccessToken = (id, email, username) => {
 const payload = { id, email, username }

 return jwt.sign(payload, KEY, { expiresIn: '24h' })
}


class Controller {

 async Registration (req, res) {
  try {
   const { email, username, password } = req.body
   const HASH_PASSWORD = bcrypt.hashSync(password, 8)
   const currentId = await User.collection.count()

   const user = new User ({ _id: currentId + 1, email, username, password: HASH_PASSWORD })
   const currentUsername = await User.findOne({ username })
   const currentEmail = await User.findOne({ email })

   if (currentEmail)
    return res.json({ message: 'Choose another email', status: false })

   if (currentUsername)
    return res.json({ message: 'Choose another nickname', status: false })

   await user.save()
   return res.json({ message: 'Account created', status: true })
  } catch (e) {
   throw e;
  }
 }

 async Login (req, res) {
  try {
   const { email, password } = req.body
   const user = await User.findOne({ email })

   if (!user)
    return res.json({ message: 'Email is wrong', status: false })

   const validPassword = bcrypt.compareSync(password, user.password)

   if (!validPassword)
    return res.json({ message: 'Password is wrong', status: false })

   const token = generaetAccessToken(user._id, user.username, user.email)
   return res.json({ message: 'Success!', status: true, token })
  } catch (e) {
   throw e;
  }
 }

 async REMOVE_CURRENT_USER (req, res) {
  try {
   await User.findById(req.params._id).remove()
   return res.json({ status: true, message: 'This user was removed' })
  } catch (e) {
   throw e;
  }
 }

 async REMOVE_ALL_USERS (req, res) {
  try {
   await User.find().remove()
   return res.json({ status: true, message: 'All users deleted' })
  } catch (e) {
   throw e;
  }
 }

 async GET_CURRENT_USER (req, res) {
  try {
   const user = await User.findById(req.params._id)
   return res.json({ user })
  } catch (e) {
   throw e;
  }
 }

 async GET_ALL_USERS (req, res) {
  try {
   const user = await User.find()
   return res.json({ user })
  } catch (e) {
   throw e;
  }
 }

 async UploadVideo (req, res) {
  try {
   if (!req.file) return res.json({ message: 'You should upload video', status: false })

   res.json({ message: 'Single file uploaded successfully!', status: true })
  } catch (e) {
   throw e;
  }
 }
}

module.exports = new Controller()