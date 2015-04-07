/*
Function which evaluates a single route and returns a list of cartypes
*/

define(["underscore", "model/cartype_model"], function(_, CartypeModel) {
  return function (route) {

    var public = {};
    var private = {};

    private.areaCarClasses = {
      city: ["SmallCar", "EstateCar"],
      highway: ["Limousine", "OffRoad", "Cabrio", "SportsCar"],
      rural: ["OffRoad", "SmallCar", "Cabrio", "Van"]
    };

    public.validateRoute = function (route) {
      var carClasses = private.areaCarClasses[route.surrounding];

      return _.map(carClasses, function(carType){
        return new CartypeModel({
          carclass: carType,
          seats: route.groupsize
        });
      });
    };

    return public;
  };
});
