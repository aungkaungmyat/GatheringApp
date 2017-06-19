new Vue({
  el: '#vue-app',
  data: {
    number: 1,
    nextNumber: 0,
    show: true,
    numbers: [1,2,3,4,5,6],
    fsdotcurrent: {
      background: '#fffed8'
    }
  },
  methods:{
    add:function(inc){
      this.number += inc;
      this.nextNumber = this.number;
      this.show = !this.show;
      // console.log(this.show);
    },
    showToggle(){
      return this.number;
    }
  }
});
