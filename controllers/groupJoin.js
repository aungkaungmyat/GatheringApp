var x = document.getElementById("latAndLong");
var uluru;

window.onload = function(){
  navigator.geolocation.getCurrentPosition(showPosition);
};

function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: uluru
  });

  setMarkers(map,local_data);
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });
  google.maps.event.addListener(marker, 'dragend', function(evt){
  document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(7) + ' Current Lng: ' + evt.latLng.lng().toFixed(7) + '</p>';
});

  google.maps.event.addListener(marker, 'dragstart', function(evt){
  document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
});
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
    initMap();
    //console.log(uluru);
    // console.log('testing if local_data is ' + local_data);
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 18,
    //   center: uluru
    // });
    // for(var j = 0 ;  j <  local_data.length ; j++){
    //   var point =  {lat: local_data[j].lat, lng: local_data[j].lng};
    //   var username = local_data[j].usrname
    //   var contentString = '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    //         '<p>usrname is </p>'+ username +
    //         '<div id="bodyContent">'+
    //         '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    //         'sandstone rock formation in the southern part of the '+
    //         'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    //         'south west of the nearest large town, Alice Springs; 450&#160;km '+
    //         '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    //         'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    //         'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    //         'Aboriginal people of the area. It has many springs, waterholes, '+
    //         'rock caves and ancient paintings. Uluru is listed as a World '+
    //         'Heritage Site.</p>'+
    //         '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    //         'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    //         '(last visited June 22, 2009).</p>'+
    //         '</div>';
    //     var infowindow = new google.maps.InfoWindow({
    //     content: contentString
    //     });
    //   var marker = new google.maps.Marker({
    //     draggable: true,
    //     position: point,
    //     map: map,
    //     icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    //   });
    //   /*marker.addListener('click', function() {
    //       infowindow.open(map, marker);
    //     });*/
    //   google.maps.event.addListener(marker, 'mouseover', (function(marker) {
    //        return function() {
    //           //  var content = address;
    //           //  infowindow.setContent(content);
    //            infowindow.open(map, marker);
    //            console.log('usrname is ' + username);
    //        }
    //      })(marker));
    // }



//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map,
//       draggable: true,
//       icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//     });
//     google.maps.event.addListener(marker, 'dragend', function(evt){
//     document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(7) + ' Current Lng: ' + evt.latLng.lng().toFixed(7) + '</p>';
// });
//
//     google.maps.event.addListener(marker, 'dragstart', function(evt){
//     document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
// });
};

function setMarkers(map,locations){
  var marker;
  for(var i = 0 ; i < locations.length; i++){
    var dusername =  locations[i].usrname;
    var lat =  locations[i].lat;
    var lng = locations[i].lng;
    latlngset = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      map: map,
      title: dusername ,
      position: latlngset,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    map.setCenter(marker.getPosition())


    var content = '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
          '<p>usrname is </p>'+ dusername +
          '<div id="bodyContent">'+
          '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the '+
          'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
          'south west of the nearest large town, Alice Springs; 450&#160;km '+
          '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
          'features of the Uluru - Kata Tjuta National Park. Uluru is '+
          'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
          'Aboriginal people of the area. It has many springs, waterholes, '+
          'rock caves and ancient paintings. Uluru is listed as a World '+
          'Heritage Site.</p>'+
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
          '(last visited June 22, 2009).</p>'+
          '</div>';

var infowindow = new google.maps.InfoWindow()

// google.maps.event.addListener(marker,'mouseover', (function(marker,content,infowindow){
//     return function() {
//         infowindow.setContent(content);
//         infowindow.open(map,marker);
//     };
// })(marker,content,infowindow));

google.maps.event.addListener(marker, 'mouseover', (function(marker) {
           return function() {  
               infowindow.setContent(content);
               infowindow.open(map, marker);
           }
         })(marker));

  }
}
