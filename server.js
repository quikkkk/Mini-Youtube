const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router/router')
const fileUpload = require('express-fileupload')

require('dotenv').config()

const PORT = process.env.PORT || 3005
const app = express()

app.use(fileUpload({ createParentPath: true }))
app.use(cors())
app.use(express.json())
app.use('/api', router)

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.d8ulk.mongodb.net/MiniYoutube`)

app.listen(PORT, () => console.log(`Server started on http://locahost:${PORT}`))