var express = require('express')
const router = express.Router()
const api = require("./api")

router.get('/', function(req, res) {
    res.send("home")
});

router.get('/savedArticles', function(req, res) {
    res.send("saved articles")
});

// router.use('/', router)
router.use('/api', api)

module.exports = router