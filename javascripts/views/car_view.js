define(["backbone", "app", "text!template/car.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
      "click .close": function() { app.router.navigate("#", { trigger: true}); }
    },

    containerCar = {
    	price: this.detailsModel.get("attr").price.grs.ammount,
    	seats: this.detailsModel.get("seats"),
    	color: this.detailsModel.get("attr").ecol,
    	carclass: this.get("category"),
    },

    render: function() {
      this.$el.html(_.template(template)(this.model.attributes));
      return this;
    }
  });
});
