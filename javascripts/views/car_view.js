define(["backbone", "app", "text!template/car.html"], function(Backbone, app, template) {
  return Backbone.View.extend({
    events: {
      "click .close": function() { app.router.navigate("#", { trigger: true}); },
      "click #next": "next",
      "change input[type=checkbox]": "checkboxChange"
    },


    initialize: function(options){
    	this.detailsModel = options.detailsModel;
    	this.templateHelper = {
    		attributes:
    			[
    			  {
    			 	label: "Autotyp",
    			 	tag: "carclass",
    			 	value: this.detailsModel.get("category"),
            dataValue: this.detailsModel.get("category")
    			  },
    			 {
    			 	label: "Kaufpreis",
    			 	tag: "price",
    			 	value: this.detailsModel.get("price").gross,
            dataValue: this.detailsModel.get("price").grs.amount
    			 }
    			].concat(
            _.map(this.detailsModel.attributes.attributes, function(attr) {
              attr.dataValue = attr.value;
              if (!attr.tag) {
                attr.tag = attr.value;
              }
              return attr;
            })
          ),
  			images: this.model.get("images"),
  			title: this.model.get("title"),
  			url: this.model.get("url"),
  			description: this.detailsModel.get("description"),
  			percentage: app.adsCollection.getProgress()
    	};
    },

    render: function() {
      this.$el.html(_.template(template)(this.templateHelper));
      return this;
    },

    next: function(event) {
      // do not link the link
      event.preventDefault();

      // validate all spreadsheet props
      this.model.finish(this.detailsModel);

      // route the app
      app.router.navigate("#next", { trigger: true });
    },

    checkboxChange: function(event) {
      console.log(event.target.attributes["data-value"], event);
      if (event.target.checked) {
        this.model.setValue(event.target.name, event.target.attributes["data-value"].value);
      } else {
        this.model.unsetValue(event.target.name);
      }
    }
  });
});
