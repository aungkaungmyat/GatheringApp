var mongoose = require('mongoose');
var x = document.getElementById("latAndLong");
var uluru;

window.onload = function(){
  navigator.geolocation.getCurrentPosition(showPosition);
};

console.log('testing if local_data is ' + local_data);
// console.log('clients are '+ clients);
// var local_data = <%- JSON.stringify(clients) %>;
// const pep =  <%- Person %>;
// console.log(local_data);
// console.log("length is " + local_data.length);
// for(var i = 0 ; i < local_data.length ; i++){
//   console.log("local data is " + local_data[i]);
//   pep.findOne({usrname:local_data[i]},function(error,doc){
//     console.log('got in here');
//     if(doc){
//       doc.lat = position.coords.latitude;
//       doc.lng = position.coords.longitude;
//     }
//   })
// }
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
    //console.log(uluru);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
};
