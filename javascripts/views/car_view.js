define(["backbone", "app", "text!template/car.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
    },

    render: function() {
      this.$el.html(_.template(template)());
      return this;
    }
  });
});
