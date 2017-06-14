var express = require('express');
var session = require("cookie-session");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const Person = require('./models/userdb.js');

//keepin track of all the users
var clients = [];

mongoose.connect('mongodb://localhost/Gatheringapp');
mongoose.Promise = global.Promise;
//var uname;

app.set('view engine', 'ejs');



app.use(session({
    secret: 'what does this do?' // great question! We will come back to that, but we need it for now!
}));

app.use('/assets' , express.static('assets'));

app.use('/controllers' , express.static('controllers'));

app.use('/bower_components' , express.static('bower_components'))

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
    //console.log(req.body);
    Person.findOne({usrname:req.body.usrname},function(error,doc){
      if(doc){
      //console.log(doc);
      if(doc.password == req.body.password){
      // Person.update({'_id':doc._id})
      req.session.uname = req.body.usrname;
      req.session._id = doc._id;
      res.render('select', {userinfo : req.body} );
      }
      else{
        console.log('invalid password');
      }
      }
      else{
        console.log('username not found');
      }
    });

})

app.get('/groupCreate' , function(req,res){
  //console.log('socket user name is '+ socket.username);
  //console.log(req.session._id);
  //var updatedData = {username}
  res.render('groupCreate' , {uname : req.session.uname})
});

app.get('/groupJoin' , function(req,res){
  //console.log(clients);
  Person.find({},function(err,data){
    if(err) throw err;
    res.render('groupJoin',{data:data})
  })

})

app.post('/createSuccess' ,urlencodedParser, function(req,res){
  var dbuname;
  var dbpassword;

  console.log('lat is ' + req.body.lat);
  // console.log('req body is ' + req.body);
  // console.log('dateTime is ' + req.body.dateTime);
  // console.log('reqbody is' + req.body);
  Person.findOne({_id:req.session._id}).then(function(doc){
    if(doc){
    dbuname = doc.usrname;
    dbpassword =  doc.password;

    console.log('db username and password are '+dbuname + ' and ' + dbpassword);
    var updatedData = {
      usrname: dbuname,
      password: dbpassword,
      lat: Number(req.body.lat),
      lng: Number(req.body.lng)
    }
    Person.findByIdAndUpdate({_id:req.session._id},updatedData).then(function(){
      Person.findOne({_id:req.session._id}).then(function(doc){
        res.render('createSuccess', {data:doc})
      })
    });
    }
  })
//   Person.findOne({_id:req.session._id}).then(function(doc){
//
// });

});

io.on('connection', function(socket){
  console.log('a user connected');
  //console.log(io.sockets.clients());

  // socket.on('currentUser', function(username){
  //   socket.username = username;
  // });
  socket.on('setCurrentUser', function(username){
    console.log('username is ' + username);
    clients.push(username);
    //socket.username = username;
    //socket.set('socketname', username);
  });

  // socket.on('disconnect', function(username){
  //   console.log('a user has disconnected')
  //   clients.splice(clients.indexOf(username),1);
  // })

});

server.listen(process.env.port || 3000, function(){
  console.log('now listening for requests at port 3000')
});
