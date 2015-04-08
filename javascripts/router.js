define(["backbone", "jquery", "app"], function(Backbone, $, app) {
  return Backbone.Router.extend({
    routes: {
      "": "index",
      "cars": "cars",
      "car": "car",
      "next": "next"
    },

    index: function() {
      var self = this;
      require(["views/main_view"], function(MainView) {
        var view = new MainView();
        self.changePage(view);
      });
    },

    cars: function() {
      // fetch data from mobile.de
      app.update().done(function() {
        if (app.adsCollection.isEmpty()) {
          app.router.navigate("#");
          return;
        }
        app.router.navigate("#car");
      });
    },

    car: function() {
      var self = this;
      require(["views/car_view"], function(CarView) {
        var model = app.adsCollection.unshift();
        var view = new CarView({ model: model });
        self.changePage(view);
      });
    },

    next: function() {
      if (app.adsCollection.isEmpty()) {
        app.router.navigate("#");
        return;
      }

      app.router.navigate("#car");
    },

    changePage: function(view) {
      var html = view.render();
      console.log(view.el, html);
      $("#wrapper").append(view.el);

      if (this.active) {
        this.active.remove();
      }

      this.active = view;
    }

  });
});
