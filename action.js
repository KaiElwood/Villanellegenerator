// alert("connected")

// const randomPoem = document.getElementById("find")

// randomPoem.addEventListener("click", function(){

// })

var app = {
    nyTimesArticles: [],
    flickrData: [],

    initialize: function () {
        app.getWikipediaData();
    },

    // handles the data input onto page
    makeHTML: function () {
        var theHTML = '';
        for (var i = 0; i < app.nyTimesArticles.length; i++) {
            theHTML += "<div class='flickrArticle'>";
            theHTML += "<h3>" + app.nyTimesArticles[i].headline.main + "</h3>";
            theHTML += "</div>";
        }
        $('.container').html(theHTML);
    },

    // gets data from api
    getWikipediaData: function () {
        console.log("Get Wikipedia Data");
        var inputWord = 'apple';
        var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + inputWord + "&origin=*&format=json&formatversion=2";
        var searchTerm;
        alert(wikiURL)
        console.log(wikiURL);
        fetch(wikiURL,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                console.log(json);
                debugger;
                searchTerm = json.query.search[0].title;
                app.getText(searchTerm);
            })

            .catch(error => {
                console.log(error.message);
            });
    },

    // search for specified term, most popular from list
    getText: function (searchTerm) {
        debugger;
        var termURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=" + searchTerm + "&rvslots=*&rvprop=content&origin=*&format=json";
        fetch(termURL,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
    }


        // $.ajax({
        //     url: wikiURL,
        //     type: 'GET',
        //     dataType: 'json',
        //     error: function (err) {
        //         console.log("Uh oh...");
        //         console.log(err);
        //     },
        //     success: function (data) {
        //         console.log(data);
        //         app.nyTimesArticles = data.response.docs;
        //         console.log(app.nyTimesArticles);
        //         app.makeHTML();
        //     }
        // });




};