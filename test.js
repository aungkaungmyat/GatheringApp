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
  },
  methods:{
    add:function(inc){
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
      this.nextNumber = event.target.id;
      this.number = this.nextNumber-1+1;
      // this.nextNumber =  this.number-1;
    }
  }
});
