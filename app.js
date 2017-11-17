const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


var tables = [];
var waitList = [];
var allRes = [];
var counter = 0;


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/all", function (req, res) {
    res.json(allRes);
});

app.get("/api/tables", function (req, res) {
    res.json(tables);
});
app.get("/api/waitlist", function (req, res) {
    res.json(waitList);
});


app.post("/api/reservation", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newRes = req.body;
    console.log(newRes);
    //newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();

    console.log(newRes);
    allRes = [];
    counter++;
    allRes.push(newRes);

    for (var i = 0; i < allRes.length; i++) {
        // if tables is less than 5
        if (counter < 6) {
            // fill the table it reservations
            tables.push(allRes[i]);
            // if tables are full
        } else {
            // fill the waitlist
            waitList.push(allRes[i]);
        }
    }

    res.json(newRes);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});