const express = require('express')
const router = express.Router()
const {generateImage} = require('../controllers/aiControllers');


router.post('/imgenerate',generateImage)



module.exports = router
