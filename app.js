var express = require('express');
var session = require("cookie-session");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const Person = require('./models/userdb.js');

mongoose.connect('mongodb://localhost/Gatheringapp');
mongoose.Promise = global.Promise;
//var uname;

app.set('view engine', 'ejs');



app.use(session({
    secret: 'what does this do?' // great question! We will come back to that, but we need it for now!
}));

app.use('/assets' , express.static('assets'));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/',urlencodedParser,function(req,res){
    Person.create(req.body).then(function(person){
      console.log(person);
      res.render('index');
    });
})

app.get('/signUp',function(req,res){
  res.render('signUp');
});

app.post('/select',urlencodedParser,function(req,res){
    Person.findOne({usrname:req.body.usrname},function(error,doc){
      if(doc){
      console.log(doc);
      req.session.uname = req.body.usrname;
      res.render('select', {userinfo : req.body} );
      }
      else{
        console.log('error');
      }
    });

})

app.get('/groupCreate' , function(req,res){
  res.render('groupCreate' , {uname : req.session.uname})
});

app.get('/groupJoin' , function(req,res){
  res.render('groupJoin')
})

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests at port 3000')
});
