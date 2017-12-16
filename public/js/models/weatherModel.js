define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var weatherModel = Backbone.Model.extend({

        

        defaults : {

            id:null,
            day:"no day availabal",
            low:"value.low.celsius",
            high:"value.high.celsius",
            icon:"no icon availabal"
            

        },

        // urlRoot:'api/weather',

        parse: function (response) {
           
            return response.weather;
    
        },

        initialize: function(){

         //    this.bind("reset", function (model, options) {
             
            
         // });

        }


    });
    return weatherModel;

});
