$(document).on("click", "#clearbtn", function () {
    $("#articles").empty()
    $("#articles").append("<div>There are no articles... You should scrape some!</div>")
});

$(document).on("click", "#scrapebtn", function () {
    location.reload(true)
});