var x = document.getElementById("latAndLong");
var uluru;

window.onload = function(){
  navigator.geolocation.getCurrentPosition(showPosition);
};


//console.log('pep inside is ' + pep);
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
    console.log('testing if local_data is ' + local_data);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: uluru
    });
    for(var j = 0 ;  j <  local_data.length ; j++){
      var point =  {lat: local_data[j].lat, lng: local_data[j].lng};
//       var icon = {
//     url: '/assets/img/mapMarker.png', // url
//     scaledSize: new google.maps.Size(40, 40),
//     fillColor: '#ff0000'
// };
      var marker = new google.maps.Marker({
        draggable: true,
        position: point,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
    }
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
};
