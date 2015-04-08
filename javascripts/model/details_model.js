define(["backbone"], function(Backbone) {
    var DetailsModel = Backbone.Model.extend({
        headers: {
          "Accept-Language": "de"
        },
        url: function() { return "http://m.mobile.de/svc/a/" + this.id; }
    });

    return DetailsModel;
});
