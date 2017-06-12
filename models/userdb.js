const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


//create userinfo Schema & model
const personSchema = new Schema({
  usrname:{
    type: String
    //required: [true,'Name field is required']
  },
  password:{
    type: String
  }
  // lat:{
  //   type: Number
  //   // default: 0
  // },
  // lng:{
  //   type: Number
  //   // default: 0
  // }
});

const Person = mongoose.model('person',personSchema);

module.exports = Person;
