const axios = require('axios')
const cheerio = require('cheerio')

function scrapeArticles() {
    const articles = [];
    return axios.get("https://www.postandcourier.com/")
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
            return articles
        });
}

module.exports = { scrapeArticles }