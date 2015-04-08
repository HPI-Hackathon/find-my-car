define(["backbone", "app", "text!template/car.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
      "click .close": function() { app.router.navigate("#", { trigger: true}); }
    },


    initialize: function(options){
    	this.detailsModel = options.detailsModel;
    	this.templateHelper = {
    		attributes: 
    			[
    			  {
    			 	label: "Autotyp",
    			 	tag: "carclass",
    			 	value: this.detailsModel.get("category")
    			  },
    			 {
    			 	label: "Kaufpreis",
    			 	tag: "price",
    			 	value: this.detailsModel.get("price").grs.amount
    			 }
    			].concat(this.detailsModel.attributes),
    			images: this.model.get("images"),
    			title: this.model.get("title"),
    			url: this.model.get("url"),
    			description: this.detailsModel.get("description")
    	};
    },

    render: function() {
      this.$el.html(_.template(template)(this.model.attributes));
      return this;
    }
  });
});
