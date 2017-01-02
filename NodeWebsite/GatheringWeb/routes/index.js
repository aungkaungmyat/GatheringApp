var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET Hello World page. */
router.get('/createGroup', function(req, res) {
    res.render('createGroup', { title: 'Creating Group' });
});

/* POST to Add User Service */
router.post('/myForm', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var numParicipants = req.body.NumParicipants;
    var wishlist = req.body.wishlist;
    var gameType = req.body.GameType;
    var startTime = req.body.StartTime;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "numParicipants" : numParicipants,
        "Wishlist" : wishlist,
        "gameType" : gameType,
        "startTime" : startTime
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("createGroup");
        }
    });
});

module.exports = router;
