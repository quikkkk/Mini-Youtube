const Router = require('express')
const router = new Router()
const multer = require('multer')
const Controller = require('../controller/Controller')

const fileStorageEngine = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, './upload/image')
 },
 filename: (req, file, cb) => {
  cb(null, `${Date.now()}--${file.originalname}`)
 }
})

const imageFilter = (req, file, cb) => file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg' ? cb(null, true) : cb(null, false)
const upload = multer({ storage: fileStorageEngine, imageFilter })

router.post('/registration', Controller.Registration)
router.post('/login', Controller.Login)
router.post('/upload', upload.single('file'), Controller.UploadImage)

router.get('/user/:_id', Controller.GET_CURRENT_USER)
router.get('/users', Controller.GET_ALL_USERS)

router.delete('/user/:_id', Controller.REMOVE_CURRENT_USER)
router.delete('/users', Controller.REMOVE_ALL_USERS)

module.exports = router