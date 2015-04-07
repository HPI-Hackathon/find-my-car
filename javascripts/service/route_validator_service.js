/*
Function which evaluates a single route and returns a list of cartypes
*/

define(["underscore", "model/cartype_model"], function(_, CartypeModel) {
  return function (route) {

    var public = {};
    var private = {};

    private.carTypes = [];

    private.areaCarClasses = {
      city: ["Kleinwagen", "Kombi"],
      highway: ["Limousine", "Geländewagen/Pickup", "Caprio/Roadster", "Sportwagen/Coupé"],
      rural: ["Geländewagen/Pickup", "Kleinwagen", "Caprio/Roadster", "Van/Kleinbus"]
    };

    public.validateRoute = function (route) {
      var carClasses = private.areaCarClasses[route.surrounding];

      _.each(carClasses, function(carType){
        var newCarType = new CartypeModel();

        newCarType.carclass = carType;
        newCarType.seats = route.groupsize;

        private.carTypes.push(newCarType);
      });

      return private.carTypes;
    };

    return public;
  };
});
