define(["backbone", "jquery"], function(Backbone, $) {
  return Backbone.Router.extend({
    routes: {
      "": "index",
      "car/:id": "car"
    },

    index: function() {
      var self = this;
      require(["views/main_view"], function(MainView) {
        var view = new MainView();
        self.changePage(view);
      });
    },

    car: function(id) {

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
