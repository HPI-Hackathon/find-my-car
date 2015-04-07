define([
  "backbone",
  "model/ads_model"
  ], function(Backbone, AdsModel) {
  
    return Backbone.Collection.extend({
      model: AdsModel
    });
});
