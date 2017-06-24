Vue.component('date-picker',  {
  template: '<input  class="fs-anim-lower" id="q1" name="q1" type="text" placeholder="Aung Kaung Myat"  required/>',
  mounted: function() {
  // var self = this;
  // $(this.$el).datepicker({
  //   // dateFormat: this.dateFormat,
  //   // onSelect: function(date) {
  //   //   self.$emit('update-date', date);
  //   // }
  // });
  // flatpickr($(this.$el));
  flatpickr(this.$el,{
    enableTime: true
  });

  }

});

$(document).keypress(function(e) {
  if(e.which == 13) {
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
