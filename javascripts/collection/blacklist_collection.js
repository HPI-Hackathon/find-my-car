define([
  "backbone",
  "model/ads_model"
  ], function(Backbone, AdsModel) {
    return Backbone.Collection.extend({
      model: AdsModel,

    	initialize: function(){
    		this.totalAmount = this.models.length;
    	},

    	getProgress: function(){
    		var finishedAds = this.totalAmount - this.models.length;
    		return  finishedAds / this.totalAmount * 100;
    	}
    });
});
