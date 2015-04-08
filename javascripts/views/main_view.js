define(["backbone", "app", "text!template/main.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
      "click #go-button": function() { app.router.navigate("#cars"); }
    },

    render: function() {
      this.$el.html(_.template(template)());
      return this;
    }
  });
});
