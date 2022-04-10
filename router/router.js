const Router = require('express')
const router = new Router()
const Controller = require('../controller/Controller')

router.post('/registration', Controller.Registration)
router.post('/login', Controller.Login)

router.get('/user/:_id', Controller.GET_CURRENT_USER)
router.get('/users', Controller.GET_ALL_USERS)

router.delete('/user/:_id', Controller.REMOVE_CURRENT_USER)
router.delete('/users', Controller.REMOVE_ALL_USERS)

module.exports = router