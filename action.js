// ----------- variables
const randomPoem = document.getElementById("find");
const textInput = document.getElementById("input");
const book = document.getElementById("book");

// open book on click


// ----------- listen for enter on keyboard
textInput.addEventListener("keyup", function(e){
    // if key pressed is enter
    if (e.keyCode === 13){
        // save text as variable
        var text = textInput.value;
        // reset text
        debugger
        textInput.value = "";
        app.initialize(text);
        book.classList.toggle("poems");
        book.classList.toggle("moveRight");
        // app.useRita();
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
    makePoem: function (lines) {
        debugger
        var theHTML = '';
        theHTML += "<h1 class='title'>" + app.wikiTitle + "</h1>";
        for (var i = 0; i < lines.length; i++) {
            theHTML += "<p class='haiku'>";
            theHTML += lines[i];
            theHTML += "</p>";
        }
        // sets html for page 4
        document.getElementById('haikuHolder').innerHTML = theHTML;
    },

    // gets data from api
    getWikipediaData: function(input){
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
            if (app.wikiText[0]){
                app.useRita();
            }
            // .then(app.useRita())
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
        var maxSyllables = 5;
        var line1 = "";
        var tries = 0;
        // debugger
        while (true){
            tries ++;
            if (tries >20){
                break;
            }
            word = RiTa.randomWord();
            if (app.processSyllables(word) > maxSyllables) {
                if (maxSyllables === 0){
                    break;
                }
                continue;
            };
            if (syllables < 5){
                if (syllables > 5){
                    continue;
                };
                // add word to line1
                syllables += app.processSyllables(word);
                maxSyllables -= app.processSyllables(word);
                line1 += (word + " ");
            } else if (syllables>5){
                continue
            } else{
                break
            }
        }
        return line1;
    },

    lines2: function(){
        var syllables = 0;
        var maxSyllables = 7;
        var tries = 0;
        var line2 = "";
        // debugger
        while (true) {
            tries++;
            if (tries > 20) {
                break;
            }
            word = RiTa.randomWord();
            if (app.processSyllables(word) > maxSyllables){
                if (maxSyllables === 0){
                    break;
                }
                continue;
            };
            if (syllables < 7) {
                if (syllables > 7) {
                    continue;
                };
                // add word to line1
                syllables += app.processSyllables(word);
                maxSyllables -= app.processSyllables(word);
                line2 += (word + " ");
            } else if (syllables > 7) {
                continue
            } else {
                break
            }
        }
        return line2;
    },

    removeExtras: function(){
        debugger
        var tempString = RiTa.stripPunctuation(app.wikiText);
        var wordDatabase = RiTa.tokenize(tempString);
        return(wordDatabase);
        // for (i = 0; i < string.length(); i++) {
        //     var letter = string.charCodeAt(i);
        //     if (letter )
        //     if (string[i] !== )
        // }
    },
// need to add name for this function
    useRita: function(){
        debugger
        wordDatabase = app.removeExtras();
        // var lines = [];
        // wordDatabase = new RiString(app.wikiText);
        lines.push(app.lines13());
        lines.push(app.lines2());
        lines.push(app.lines13());
        app.makePoem(lines);
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
