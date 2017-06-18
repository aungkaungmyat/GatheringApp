new Vue({
  el: '#vue-app',
  data: {
    number: 1,
    nextNumber: 0,
    show: true
  },
  methods:{
    add:function(inc){
      this.number += inc;
      this.nextNumber = this.number;
      this.show = !this.show;
      // console.log(this.show);
    }
  }
});
