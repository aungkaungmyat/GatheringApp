var express = require('express');
var session = require("cookie-session");
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//var uname;

app.set('view engine', 'ejs');

//testing code

app.use(session({
    secret: 'what does this do?' // great question! We will come back to that, but we need it for now!
}))

/*if (navigator.geolocation) {
  console.log('It is valild');
} else {
  // Print out a message to the user.
  document.write('Your browser does not support GeoLocation');
}*/

app.use('/assets' , express.static('assets'));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/select',urlencodedParser,function(req,res){

    req.session.uname = req.body.usrname;


  res.render('select', {userinfo : req.body} );
})

app.get('/groupCreate' , function(req,res){
  res.render('groupCreate' , {uname : req.session.uname})
});

app.get('/groupJoin' , function(req,res){
  res.render('groupJoin')
})

app.listen(3000);
