define(["underscore", "jquery", "app"], function(_, $, app) {
  return function () {

    var public = {};
    var private = {};

    private.createObject = function (averageCartype) {
      var queryObject = {
        c: [],
        ecol: [],
        sc: null,
        p: null,
        psz: 100,
        ll: null
      };

      // Cartypes
      for (var carclass in averageCartype.get("carclass"))
        queryObject.c.push(carclass);

      // Colors
      for (var color in averageCartype.get("colors"))
        queryObject.ecol.push(color);

      // Seats
      var seatsRange = averageCartype.get("min_seats") + ":" + averageCartype.get("max_seats");
      queryObject.sc = seatsRange;

      // Price
      var priceRange = averageCartype.get("min_price") + ":" + averageCartype.get("max_price");
      queryObject.p = priceRange;

      // Location
      queryObject.ll = app.userProfile.get("point");

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

