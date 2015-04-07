define(["backbone", "model/cartype"], function(Backbone, Cartype) {
    var CartypeCollection = Backbone.Collection.extend({
        model: Cartype,

        generateAverageCartype: function() {
            var averageCartype = new Cartype();
            var properties = {
                carclasses: [],
                seats: []
            };

            _(this.models).each(function(model) {

            });
        }
    });
});
