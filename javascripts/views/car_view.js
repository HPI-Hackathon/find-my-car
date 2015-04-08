define(["backbone", "app", "text!template/car.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
      "click .close": function() { app.router.navigate("#", { trigger: true}); }
    },

    render: function() {
      this.$el.html(_.template(template)(this.model.attributes));
      return this;
    }
  });
});
