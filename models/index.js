// Exporting an object containing all of our models
const Article = require("./Article");
const Note = require("./Note");

function getAllArticles() {
    // Grab every document in the Articles collection
    return Article.find({}).populate("notes");
}

function getAllNotesByArticle(articleId) {
    return Article.findOne({ _id: articleId })
        .populate("notes")
        .then(article => article.notes);
}

function addSavedArticle(article) {
    return Article.create(article)
}

function deleteSavedArticle(articleId) {
    return Article.findOne({ _id: articleId }).populate("notes").then(article => {
        const removesNotes = article.notes.map(note => Note.deleteOne({ _id: note._id }).exec())
        return Promise.all(removesNotes)
            .then(() => Article.deleteOne({ _id: articleId }));
    })
}

// note: { title, body }
function addNote(note, articleId) {
    return Note.create(note)
        .then(function (dbNote) {
            return Article.findOneAndUpdate({ _id: articleId }, { $push: { notes: dbNote._id } }, { new: true })
                .then(() => dbNote)
        });
}

function deleteNote(noteId, articleId) {
    return Note.deleteOne({ _id: noteId })
        .then(() => Article.findOneAndUpdate({ _id: articleId }, { $pull: { notes: noteId } }));
}

module.exports = {
    getAllArticles,
    getAllNotesByArticle,
    addSavedArticle,
    deleteSavedArticle,
    addNote,
    deleteNote
}