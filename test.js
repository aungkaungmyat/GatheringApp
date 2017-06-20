new Vue({
  el: '#vue-app',
  data: {
    number: 1,
    nextNumber: 0,
    show: true,
    numbers: [{num: 1, disabled: true},
              {num: 2, disabled: true},
              {num: 3, disabled: true},
              {num: 4, disabled: true},
              {num: 5, disabled: true},
              {num: 6, disabled: true}],
    numDifference: 0
  },
  methods:{
    add:function(inc){
      this.numDifference =  1;
      this.numbers[this.number-1].disabled = false;
      this.number += inc;
      this.nextNumber = this.number;
      this.show = !this.show;
      // console.log(this.show);
    },
    showToggle(){
      return this.number;
    },
    changeNumber(event){
      this.numDifference =  event.target.id - this.nextNumber;
      console.log(this.numDifference)
      this.nextNumber = event.target.id;
      this.number = this.nextNumber-1+1;
      this.show = !this.show;
      // this.nextNumber =  this.number-1;
    }
  }
});
