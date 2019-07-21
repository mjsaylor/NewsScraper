var express = require('express')
const router = express.Router()
const models = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')

router.get('/scrape', function (req, res) {
    // First, we grab the body of the html with axios
    const articles = [];
    axios.get("https://www.postandcourier.com/")
        .then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:

            $("article h4").each(function (i, element) {
                // Save an empty result object
                var result = {};
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text()
                    .trim();
                result.link = $(this)
                    .children("a")
                    .attr("href")
                articles.push(result)
            });
        }).then(() => {
            res.json(articles)
        }).catch(err => {
            console.log(err.message);
        });
});

router.get('/getAllArticles', function (req, res) {
    models.getAllArticles().then(articles => {
        res.json(articles)
    }).catch(err => {
        console.log(err.message)
    })

});
router.get('/getAllNotesByArticle/:articleId', function (req, res) {
    models.getAllNotesByArticle(req.params.articleId)
        .populate("notes")
        .then(article => {
            res.json(article)
        }).catch(err => {
            console.log(err.message)
        })
});

router.post('/addSavedArticle', function (req, res) {
    res.send("addSavedArticle")
});

router.get('/deleteSavedArticle', function (req, res) {
    res.send("deleteSavedArticle")
});

router.post('/addNote', function (req, res) {
    const { title, body, articleId } = req.body
    models.addNote({ title, body }, articleId)
        .then(note => {
            res.json(note)
        })

});

router.get('/deleteNote', function (req, res) {
    res.send("deleteNote")
});

module.exports = router