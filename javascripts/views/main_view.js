define(["backbone", "text!template/main.html"], function(Backbone, template) {
  return Backbone.View.extend({
    render: function() {
      this.$el.html(_.template(template)());
      return this;
    }
  });
});
