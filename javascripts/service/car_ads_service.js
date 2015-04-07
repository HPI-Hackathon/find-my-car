define(["underscore", "jquery", app], function(_, $, app) {
  return function () {

    var public = {};
    var private = {};

    private.createObject = function (averageCartype) {
      var queryObject = {
        c: [],
        ecol: [],
        sc: null,
        p: null,
        ll: null
      };

      // Cartypes
      for (var carclass in averageCartype.carclass)
        queryObject.c.push(carclass);

      // Colors
      for (var color in averageCartype.colors)
        queryObject.ecol.push(color);

      // Seats
      var seatsRange = averageCartype.min_seats + ":" + averageCartype.max_seats;
      queryObject.sc = seatsRange;

      // Price
      var priceRange = averageCartype.min_price + ":" + averageCartype.max_price;
      queryObject.p = priceRange;

      // Location
      queryObject.ll = app.userProfile.point;

      return queryObject;
    };

    private.createURL = function (queryObject) {
      var url = "http://m.mobile.de/svc/s/?";
      var params = $.param(queryObject);
      url = url.concat(params);

      return url;
    };

    public.getResults = function (averageCartype) {
      var queryObject = private.createObject(averageCartype);
      var url = private.createURL(queryObject);

      return $.getJSON(url);
    };

    return public;
  };
});

