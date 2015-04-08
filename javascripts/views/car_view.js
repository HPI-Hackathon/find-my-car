define(["backbone", "app", "text!template/car.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
      "click .close": function() { app.router.navigate("#", { trigger: true}); },
      "click #next": "next",
      "change input[type=checkbox]": "checkboxChange"
    },

    render: function() {
      this.$el.html(_.template(template)(this.model.attributes));
      return this;
    },

    next: function(event) {
      // do not link the link
      event.preventDefault();

      // validate all spreadsheet props
      this.model.finish(this.detailsModel);

      // route the app
      app.router.navigate("#next", { trigger: true });
    },

    checkboxChange: function(event) {
      console.log(event);
      if (event.target.checked) {
        this.model.setValue(event.target.name, event.target.attributes[value]);
      } else {
        this.model.unsetValue(event.target.name);
      }
    }
  });
});
