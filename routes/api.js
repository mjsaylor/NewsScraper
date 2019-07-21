var express = require('express')
const router = express.Router()
const models = require('../models')
const { scrapeArticles } = require('../utils/scraper')

router.get('/scrape', function (req, res) {
    scrapeArticles().then(articles => {
        res.json(articles)
    }).catch(err => {
        res.json({ error: err.message });
    });
});

router.get('/getAllArticles', function (req, res) {
    models.getAllArticles().then(articles => {
        res.json(articles)
    }).catch(err => {
        res.json({ error: err.message })
    })

});
router.get('/getAllNotesByArticle', function (req, res) {
    models.getAllNotesByArticle(req.query.articleId)
        .then(notes => {
            res.json(notes)
        }).catch(err => {
            res.json({ error: err.message })
        })
});

router.post('/addSavedArticle', function (req, res) {
    const { title, link } = req.query;
    console.log(`RECEIVED: title=${title}, link=${link}`)
    models.addSavedArticle({ title, link })
        .then(article => {
            res.json(article)
        }).catch(err => {
            res.json({ error: err.message })
        });
});

router.post('/deleteSavedArticle', function (req, res) {
    const { articleId } = req.query
    models.deleteSavedArticle(articleId)
        .then(() => {
            res.json({ ok: true })
        }).catch(err => {
            res.json({ error: err.message })
        });
});

router.post('/addNote', function (req, res) {
    const { title, body, articleId } = req.body
    models.addNote({ title, body }, articleId)
        .then(note => {
            res.redirect('/savedArticles')
        }).catch(err => {
            res.json({ error: err.message })
        });
});

router.post('/deleteNote', function (req, res) {
    const { noteId, articleId } = req.query
    models.deleteNote(noteId, articleId)
        .then(() => {
            res.json({ ok: true })
        }).catch(err => {
            res.json({ error: err.message })
        });
});

module.exports = router