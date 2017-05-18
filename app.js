var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use('/assets' , express.static('assets'));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/select',function(req,res){
  console.log(req)
  res.render('select')
})

app.listen(3000);
