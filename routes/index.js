var express = require('express')
const router = express.Router()
const api = require("./api")
const { scrapeArticles } = require('../utils/scraper')
const models = require("../models")


router.get('/', function(req, res) {
    scrapeArticles().then(articles => {
        res.render("index", { articles, homePage: true })
    })
});

router.get('/savedArticles', function(req, res) {
    models.getAllArticles().then(articles => {
        res.render("savedArticles", { articles })
    })
});

// router.use('/', router)
router.use('/api', api)

module.exports = router