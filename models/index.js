// Exporting an object containing all of our models
const Article = require("./Article")
const Note = require("./Note")

function getAllArticles() {
    // Grab every document in the Articles collection
    return Article.find({}).populate("notes")
}

function getAllNotesByArticle(articleId) {
    return Article.find({ _id: articleId })
        .then(article => {
            return article.notes
        })
}

function addSavedArticle(article) {
    return Article.create(article)
}

function deleteSavedArticle() { }

// note: { title, body }
// returns promise of updated article
function addNote(note, articleId) {
    return Note.create(note)
        .then(function (dbNote) {
            return Article.findOneAndUpdate({ _id: articleId }, { $push: { notes: dbNote._id } }, { new: true })
            .then(() => dbNote)
        });
}

function deleteNote() { }

module.exports = {
    getAllArticles,
    getAllNotesByArticle,
    addSavedArticle,
    deleteSavedArticle,
    addNote,
    deleteNote
}