Vue.component('date-picker',  {
  template: '<input  class="fs-anim-lower" id="q4" name="q4" type="text" placeholder="2017/6/17 12:00"  required/>',
  mounted: function() {
  flatpickr(this.$el,{
    enableTime: true
  });
  }
});

Vue.component('date-picker1',  {
  template: '<input  class="fs-anim-lower" id="q5" name="q5" type="text" placeholder="2017/6/18 12:00"  required/>',
  mounted: function() {
  flatpickr(this.$el,{
    enableTime: true
  });
  }
});

// window.onload = function () {
//     // var e = document.getElementById("db_info");
//     // e.innerHTML='Found you';
//     document.getElementById("verticalLine").style.marginLeft = (Number(document.getElementById("searchBox").offsetWidth) * (-1)) + 33 + "px";
// };
// document.getElementById("toBeMovedLeft").style.marginLeft = (Number(document.getElementById("searchBox").offsetWidth) * (-1)) + 33 + "px";
// console.log(document.getElementById("searchBox").offsetWidth)

$(document).keypress(function(e) {

  if(e.which == 13) {
    e.preventDefault();
  $( "#fscontinue" ).trigger( "click" );
}
});

new Vue({
  el: '#vue-app',
  data: {
    number: 1,
    nextNumber: 0,
    show: true,
    numbers: [{
        num: 1,
        disabled: true
      },
      {
        num: 2,
        disabled: true
      },
      {
        num: 3,
        disabled: true
      },
      {
        num: 4,
        disabled: true
      },
      {
        num: 5,
        disabled: true
      },
      {
        num: 6,
        disabled: true
      }
    ],
    numDifference: 0,
    questions: [true,
                false,
                false,
                false,
                false,
                false
              ],
    fstest: false,
    overview: false,
    formfull: true
  },
  methods: {
    add: function(inc) {
      this.numDifference = 1;
      this.numbers[this.number - 1].disabled = false;
      this.number += inc;
      this.nextNumber = this.number;
      this.show = !this.show;
      if(this.number === 7){

        this.overview = true;
        this.formfull = false;

      }
      // console.log(this.show);
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          this.questions[j] = false;
        }
        switch (this.number - 1) {
          case 0:
            this.questions[0] = true;
            break;
          case 1:
            this.questions[1] = true;
            break;
          case 2:
            this.questions[2] = true;
            break;
          case 3:
            this.questions[3] = true;
            break;
          case 4:
            this.questions[4] = true;
            break;
          case 5:
            this.questions[5] = true;
            startMap();
            break;
          default:

        }
      }
      if(this.number === 7){
        for(var k = 0 ; k < 6 ; k++){
          this.questions[k] = true;
        }
      }
      this.fstest = true;

    },
    showToggle() {
      return this.number;
    },
    changeNumber(event) {
      this.numDifference = event.target.id - this.nextNumber;
      console.log(this.numDifference)
      this.nextNumber = event.target.id;
      this.number = this.nextNumber - 1 + 1;
      this.show = !this.show;
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          this.questions[j] = false;
        }
        switch (this.number - 1) {
          case 0:
            this.questions[0] = true;
            break;
          case 1:
            this.questions[1] = true;
            break;
          case 2:
            this.questions[2] = true;
            break;
          case 3:
            this.questions[3] = true;
            break;
          case 4:
            this.questions[4] = true;
            break;
          case 5:
            this.questions[5] = true;
            break;
          default:

        }
      }

    }
  }
});

$(document).ready(function(){

  $('.fs-submit').on('click', function(){
    var activityType = $('#q1').val();
    var numPeople = $('#q2').val();
    var wishList = $('#q3').val();
    var startTime = $('#q4').val();
    var endTime =  $('#q5').val();
    var lat =  $('#lat').val();
    var lng =  $('#lng').val();
    var data = {activityType: activityType,
                numPeople: numPeople,
                wishList: wishList,
                startTime: startTime,
                endTime: endTime,
                lat: lat,
                lng: lng
                };
                // console.log(data);

    $.ajax({
          type: 'POST',
          url: '/createSuccess',
          data: data,
           success: function(response){
            //  console.log(response);
            alert('group created');
          //  console.log('successful');
          // alert('success');
          //    location.reload();
          // console.log(data);
          // $.ajax({
          //   type: 'GET',
          //   url: '/createSuccess',
          //   success: function(){
          //     console.log('got here')
          //   }
          //
          // })
           }
      });

        // return false;
  });
});

var uluru;


function startMap(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {



    uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
    document.getElementById('lat').value = position.coords.latitude;

    document.getElementById('lng').value = position.coords.longitude;



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

    // search box
          var input = document.getElementById('searchBox');
          var searchBox = new google.maps.places.SearchBox(input);
          // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
          });

          searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
              return;
            }
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
              }
              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
          });


  google.maps.event.addListener(marker, 'dragstart', function(evt){
  map.panTo(marker.getPosition());
});

    google.maps.event.addListener(marker, 'dragend', function(evt){
    document.getElementById('lat').value = evt.latLng.lat().toFixed(7);
    document.getElementById('lng').value = evt.latLng.lng().toFixed(7);
    map.panTo(marker.getPosition());

});


};
