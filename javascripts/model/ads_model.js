define(["backbone", "app", "underscore"], function(Backbone, app, _) {
    return Backbone.Model.extend({
    //data attributes
    defauls:{
    	validateHashes: {}
    },

    //converter 
    finish: function(){
    	//match values
  		if(_.contains(validateHashes, "attr.ecol")){
  			app.ratings.addBaseValue("colors", this.get("attr").ecol);
  		};
  		if(_.contains(validateHashes, "category")){
  			app.ratings.addBaseValue("carclasses", this.get("category"));
  		};
  		//TODO get seats
  		if(_.contains(validateHashes, "seats")){
  			app.ratings.addBaseValue("seats", seats);
  		};
  		if(_.contains(validateHashes, "attr.price.grs.ammount")){
  			app.ratings.addBaseValue("priceclasses", app.ratings.getPriceCategory(this.get("attr").price.grs.ammount));
  		};
    	app.blacklist.addId(this.id);
    },

    setValue: function(key){
    	validateHashes[key] = key;
    },

    unsetValue: function(key){
    	delete validateHashes[key];
    },

    });
});