var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//var uname;

app.set('view engine', 'ejs');

//testing code


// set a cookie
/*app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    // var randomNumber=Math.random().toString();
    // randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',uname, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});*/
app.use(cookieParser());

app.use('/assets' , express.static('assets'));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/select',urlencodedParser,function(req,res){
  //uname = req.body.usrname;

  // read cookies
    console.log(req.cookies)



    // Set cookie
    res.cookie('cookieName', req.body.usrname) // options is optional

  //console.log(uname);
  res.render('select', {userinfo : req.body} );
})

app.get('/groupCreate' , function(req,res){
  console.log(req.cookies);
  console.log(req.cookies.cookieName);
  res.render('groupCreate' , {uname : req.cookies.cookieName})
});

app.listen(3000);
