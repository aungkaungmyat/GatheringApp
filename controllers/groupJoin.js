var x = document.getElementById("latAndLong");
var uluru;

window.onload = function(){
  navigator.geolocation.getCurrentPosition(showPosition);
};

function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });

  setMarkers(map,local_data);
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    animation: google.maps.Animation.DROP,
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
    marker = new google.maps.Marker({
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
                  '<p>StartTime: ' + startTime + '</p>'+
                  '<p>EndTime: ' + endTime + '</p>';


var infowindow = new google.maps.InfoWindow()

google.maps.event.addListener(marker,'mouseover', (function(marker,content){
    return function() {
        infowindow.setContent(content);
        infowindow.open(map,marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setAnimation(null);
    };
})(marker,content));

google.maps.event.addListener(marker,'mouseover', (function(marker){
    return function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };
})(marker));
}
}
