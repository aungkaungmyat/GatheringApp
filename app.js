var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var uname;

app.set('view engine', 'ejs');
app.use('/assets' , express.static('assets'));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/select',urlencodedParser,function(req,res){
  uname = req.body.usrname;
  console.log(uname);
  res.render('select', {userinfo : req.body} );
})

app.get('/groupCreate' , function(req,res){
  res.render('groupCreate' , {uname : uname})
});

app.listen(3000);
