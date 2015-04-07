define(["underscore", "jquery"], function(_, $) {
  return function (averageCartype) {

    var public = {};
    var private = {};

    private.createObject = function (averageCartype) {
      var queryObject = {
        c: [],
        sc: null,
        p: null,
        ecol: []
      };

      for (var carclass in averageCartype.carclass)
        queryObject.c.push(carclass);

      for (var color in averageCartype.colors)
        queryObject.ecol.push(color);

      var seatsRange = averageCartype.min_seats + ":" + averageCartype.max_seats;
      queryObject.sc = seatsRange;

      var priceRange = averageCartype.min_price + ":" + averageCartype.max_price;
      queryObject.p = priceRange;

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

      var results = $.getJSON(url, function(json) {
        return json;
      });

      return results;
    };

    return public;
  };
});

