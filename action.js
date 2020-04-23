// alert("connected")

const randomPoem = document.getElementById("find");
const textInput = document.getElementById("input");

// listen for enter on keyboard
textInput.addEventListener("keyup", function(e){
    // if key pressed is enter
    if (e.keyCode === 13){
        // save text as variable
        var text = textInput.value;
        // reset text
        textInput.value = "";
        app.initialize(text);
    }
})

// random article
randomPoem.addEventListener("click", function(){
    app.initialize();
})

var app = {
    wikiText: [],
    wikiTitle: [],


    // transmit input to next function
    initialize: function (input) {
        debugger
        app.getWikipediaData(input);
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
    getWikipediaData: function (input) {
        // need to parse input value for text --> if text, do stuff. if no text, random article
        if (input){
            console.log("Get Wikipedia Data");
            var inputWord = input;
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
                    // debugger;
                    searchTerm = json.query.search[0].title;
                    pageid = json.query.search[0].pageid;
                    app.getText(searchTerm, pageid);
                })

                .catch(error => {
                    console.log(error.message);
                });
        } else {
            console.log("Get Random Wikipedia Data");
            var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=1&origin=*";
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
                    // debugger;
                    searchTerm = json.query.search[0].title;
                    app.getText(searchTerm);
                })

                .catch(error => {
                    console.log(error.message);
                });
        }
    },

    // search for specified term, most popular from list
    getText: function (searchTerm, pageid) {
        debugger;
        var termURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=" + searchTerm + "&rvslots=*&rvprop=content&origin=*&format=json";
        fetch(termURL,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                // THIS IS THE PROBLEM PART -- NEED TO BE ABLE TO INPUT PAGE ID
                console.log(json);
                app.wikiText = f
                // save specific ID and input it string for wikiText
                var textResults = `json.query.pages.${pageid}.revisions[0].slots.main`;
                app.wikiText = textResults;
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