const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

//create userinfo Schema & model
const personSchema = new Schema({
  name:{
    type: String,
    required: [true,'Name field is required']
  },
  password:{
    type:String
  }
});

const person = mongoose.model('person',personSchema);

module.export = person;
