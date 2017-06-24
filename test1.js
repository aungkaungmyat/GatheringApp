Vue.component('date-picker',  {
  template: '<input/>',
  mounted: function() {
  // var self = this;
  // $(this.$el).datepicker({
  //   // dateFormat: this.dateFormat,
  //   // onSelect: function(date) {
  //   //   self.$emit('update-date', date);
  //   // }
  // });
  // flatpickr($(this.$el));
  flatpickr(this.$el);
  }

});
// Vue.component('date-picker', {
//   template: '<input/>',
//   props: [ 'dateFormat' ],
//   mounted: function() {
//   var self = this;
//   $(this.$el).datepicker({
//     dateFormat: this.dateFormat,
//     onSelect: function(date) {
//       self.$emit('update-date', date);
//     }
//   });
//   },
//   beforeDestroy: function() {
//     $(this.$el).datepicker('hide').datepicker('destroy');
//   }
// });

new Vue({
  el: '#app'
});
