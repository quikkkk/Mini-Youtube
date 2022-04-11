const Router = require('express')
const router = new Router()
const multer = require('multer')
const Controller = require('../controller/Controller')

const videoStorageEngine = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, './upload/video')
 },
 filename: (req, file, cb) => {
  cb(null, `${Date.now()}--${file.originalname}`)
 }
})

const videoFilter = (req, file, cb) => file.mimetype === 'video/mp4' || file.mimetype === 'video/mp3' ? cb(null, true) : cb(null, false)
const upload = multer({ storage: videoStorageEngine, videoFilter })

router.post('/registration', Controller.Registration)
router.post('/login', Controller.Login)
router.post('/upload', upload.single('file'), Controller.UploadVideo)

router.get('/user/:_id', Controller.GET_CURRENT_USER)
router.get('/users', Controller.GET_ALL_USERS)

router.delete('/user/:_id', Controller.REMOVE_CURRENT_USER)
router.delete('/users', Controller.REMOVE_ALL_USERS)

module.exports = router