define([
    'jquery',
    'underscore',
    'backbone',
    'models/weatherModel'
], function($, _, Backbone, weatherModel){
    var weatherCollection = Backbone.Collection.extend({
       
        model: weatherModel,

        // url: 'api/weather',


            //Parse the response
        parse: function (response) {
           
            return response.weathers;
    
        },

        initialize: function () {
         
         //    this.bind("reset", function (model, options) {
             
         //    // console.log("Inside weather collection");
             
         //    // console.log(model);
         // });
        }


    });

    return weatherCollection ;
});
