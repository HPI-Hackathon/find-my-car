define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
        headers: {
          "Accept-Language": "de"
        },
        url: function() { return "http://m.mobile.de/svc/a/" + this.id; }
    });
});
