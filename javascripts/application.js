define(["backbone"], function(Backbone) {
    var Application = function() {
      // enable global events
      _.extend(this, Backbone.Events);
    };

    _.extend(Application.prototype, {
      initialize: function() {
        this.trigger("initialize");
      },

      onInitialize: function(initializer) {
        this.on("initialize", initializer);
      }
    });

    return Application;
});
