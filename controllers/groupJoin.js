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
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
};

function setMarkers(map,data){
  var marker;
  for(var i = 0 ; i < data.length; i++){
    var usrname =  data[i].usrname;
    var lat =  data[i].lat;
    var lng = data[i].lng;
    var activityType =  data[i].activity.activityType;
    var numPeople =  data[i].activity.numPeople;
    var wishList =  data[i].activity.wishList;
    var startTime =  data[i].activity.startTime;
    var endTime =  data[i].activity.endTime;
    latlngset = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      map: map,
      title: usrname ,
      position: latlngset,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    map.setCenter(marker.getPosition())


    var content = '<h1 class="heading">' + usrname + '</h1><hr>'+
                  '<p>Activity Type: ' + activityType + '</p>'+
                  '<p>Number of People Needed: ' + numPeople + '</p>'+
                  '<p>WishList: ' + wishList + '</p>'+
                  '<p>EndTime: ' + endTime + '</p>';

          // '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
          // '<p>usrname is </p>'+ dusername +
          // '<div id="bodyContent">'+
          // '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          // 'sandstone rock formation in the southern part of the '+
          // 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
          // 'south west of the nearest large town, Alice Springs; 450&#160;km '+
          // '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
          // 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
          // 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
          // 'Aboriginal people of the area. It has many springs, waterholes, '+
          // 'rock caves and ancient paintings. Uluru is listed as a World '+
          // 'Heritage Site.</p>'+
          // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
          // 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
          // '(last visited June 22, 2009).</p>'+
          // '</div>';

var infowindow = new google.maps.InfoWindow()

google.maps.event.addListener(marker,'mouseover', (function(marker,content){
    return function() {
        infowindow.setContent(content);
        infowindow.open(map,marker);
    };
})(marker,content));


  }
}
