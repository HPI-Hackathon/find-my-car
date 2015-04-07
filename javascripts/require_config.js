require.config({

  baseUrl: "javascripts",
  waitSeconds: 120,

  paths: {
    text: "../bower_components/requirejs-text/text",
    backbone : "../bower_components/backbone/backbone",
    underscore: "../bower_components/underscore/underscore-min",
    jquery : "../bower_components/jquery/dist/jquery.min"
  },

  map: {
    backbone: {
      underscore: "underscore"
    }
  }

});
