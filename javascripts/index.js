define("index", ["backbone", "service/generator_service"], function(Backbone, GeneratorService) {
  console.log("works", GeneratorService);

  var generatorService = new GeneratorService();
});
