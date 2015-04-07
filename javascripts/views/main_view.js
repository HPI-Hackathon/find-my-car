define(["backbone"], function(Backbone) {
  return Backbone.View.extend({
    template: "<h1>BUUHHH</h1>",

    render: function() {
      this.$el.html(_.template(this.template)());
      return this;
    }
  });
});
