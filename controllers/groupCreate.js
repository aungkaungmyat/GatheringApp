var uluru;

$(function () {
    $('#datetimepicker1').datetimepicker();
});

$('#submitBut').on('click', function() {
   console.log($('#dateTime').val());
   document.getElementById('dateTest').value = $('#dateTime').val();
 });

$(document).ready(function(){
  $('#submitBut').on('click', function(){
    var activityType = $('#activityType').val();
    var numPeople = $('#numPeople').val();
    var wishList = $('input[name="wishList"]:checked').val();
    var startTime = $('#startTime').val();
    var dateTest =  $('#dateTest').val();
    var lat =  $('#lat').val();
    var lng =  $('#lng').val();
    var data = {activityType: activityType,
                numPeople: numPeople,
                wishList: wishList,
                startTime: startTime,
                dateTest: dateTest,
                lat: lat,
                lng: lng
                };
    $.ajax({
          type: 'POST',
          url: '/createSuccess',
          data: data,
          // success: function(data){
          //   //do something with the data via front-end framework
          //   // location.reload();
          // }
      });

        // return false;
  })
})



window.onload = function(){
  navigator.geolocation.getCurrentPosition(showPosition);
};

function showPosition(position) {
  // var lat = position.coords.latitude;
  // var lng = position.coords.longitude;
    uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
    document.getElementById('lat').value = position.coords.latitude;
    // $('input[name="lat"]').val(position.coords.latitude);
    document.getElementById('lng').value = position.coords.longitude;
    // $('input[name="lng"]').val(position.coords.longitude);


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: uluru
    });

    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      draggable: true,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    google.maps.event.addListener(marker, 'dragend', function(evt){
    document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(7) + ' Current Lng: ' + evt.latLng.lng().toFixed(7) + '</p>';
    document.getElementById('lat').value = evt.latLng.lat().toFixed(7);
    document.getElementById('lng').value = evt.latLng.lng().toFixed(7);
});

    google.maps.event.addListener(marker, 'dragstart', function(evt){
    document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
});
};
