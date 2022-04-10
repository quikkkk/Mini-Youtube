const jwt = require('jsonwebtoken')
const { KEY } = require('./config/KEY')

module.exports = function (req, res, next) {
 const AUTH_HEADER = req.headers['authorization']
 const token = AUTH_HEADER && AUTH_HEADER.split(' ')[1]

 if (token === null)
  return res.json({ message: 'Token is empty', status: false })

 jwt.verify(token, KEY, function (err, user) {
  if (err)
   return res.json({ message: 'Some error', status: false })

  req.user = user
  next()
 })
}