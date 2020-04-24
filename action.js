// ----------- variables
const randomPoem = document.getElementById("find");
const textInput = document.getElementById("input");

// open book on click


// ----------- listen for enter on keyboard
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

// ----------- random article
randomPoem.addEventListener("click", function(){
    app.initialize();
})

// ----------- Main App
var app = {
    wikiText: [],
    wikiTitle: [],


    // transmit input to next function
    initialize: function (input) {
        app.getWikipediaData(input);
    },

    // handles the data input onto page
    makePoem: function () {
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
            // alert(wikiURL)
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
                    pageid = Object.keys(json.query.pages);
                    var textResults = json.query.pages;
                    app.wikiText = textResults[`${pageid[0]}`].revisions[0]["*"];
                    app.wikiTitle = textResults[`${pageid[0]}`].title;
                })

                .catch(error => {
                    console.log(error.message);
                });
        }
    },

    // search for specified term, most popular from list
    getText: function (searchTerm, pageid) {
        // debugger;
        var termURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=" + searchTerm + "&rvslots=*&rvprop=content&origin=*&format=json";
        console.log(termURL);
        fetch(termURL,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                console.log(json);
                var textResults = json.query.pages;
                app.wikiText = textResults[`${pageid}`].revisions[0].slots.main["*"];
                app.wikiTitle = textResults[`${pageid}`].title;
            })
    },

    processSyllables: function(word){
        rs = new RiString(word);
        features = rs.features();
        var syllablesCount = features.syllables.split(/\//).length;
        return syllablesCount;
    },

    // parse data with rita
    lines13: function(){
        // while ()
        var syllables = 0;
        var line1 = "";
        debugger
        while (true){
            word = RiTa.randomWord();
            if (syllables < 5){
                if (syllables > 5){
                    continue;
                };
                // add word to line1
                syllables += app.processSyllables(word);
                line1 += (word + " ");
            } else if (syllables>5){
                continue
            } else{
                break
            }
        }
        return line1;
    },

    useRita(){
        wordDatabase = new RiString(app.wikiText);
        line1 = app.lines13()
        // line2 = app.line2()
        line3 = app.lines13()
        // app.makePoem(line1,line2,line3);
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
