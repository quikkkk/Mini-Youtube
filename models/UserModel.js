const { Schema, model } = require('mongoose')

const User = new Schema({
 _id: Number,
 email: {
  type: String,
  required: true,
  unique: true,
  minlength: 6,
  maxlength: 255
 },
 username: {
  type: String,
  required: true,
  unique: true,
  minlength: 3,
  maxlength: 25
 },
 password: {
  type: String,
  required: true
 }
}, { timestamps: true })

module.exports = model('User', User)