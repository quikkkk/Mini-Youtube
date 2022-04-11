const { Schema, model } = require('mongoose')

const ImageModel = new Schema({
 image: {
  data: Buffer,
  contentType: String
 }
})

module.exports = model('Image', ImageModel)