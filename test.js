new Vue({
  el: '#vue-app',
  data: {
    number: 1
  },
  methods:{
    add:function(inc){
      this.number += inc;
    }
  }
});
