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
          app.router.navigate("#", { trigger: true });
          return;
        }

        app.router.navigate("#car", { trigger: true });
      });
    },

    car: function() {
      if (!app.adsCollection || app.adsCollection.isEmpty()) {
        app.router.navigate("#", { trigger: true });
      }

      var self = this;
      require(["views/car_view", "model/details_model"], function(CarView, DetailsModel) {
        var model = app.adsCollection.shift();
        var detailsModel = new DetailsModel({ id: model.id });

        detailsModel.fetch().done(function() {
          var view = new CarView({ model: model, detailsModel: detailsModel });
          self.changePage(view);
        });

      });
    },

    next: function() {
      this.scrollToTop();
      if (app.adsCollection.isEmpty()) {
        app.router.navigate("#", { trigger: true });
        return;
      }

      app.router.navigate("#car", { trigger: true });
    },

    changePage: function(view) {
      var html = view.render();
      console.log(view.el, html);
      $("#wrapper").append(view.el);

      if (this.active) {
        this.active.remove();
      }

      this.active = view;
    },

    scrollToTop: function() {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

  });
});
