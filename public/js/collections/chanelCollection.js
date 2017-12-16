define([
    'jquery',
    'underscore',
    'backbone',
    'models/chanelModel'
], function($, _, Backbone, chanelModel){
    var chanelCollection = Backbone.Collection.extend({
       
        model: chanelModel,

        url: 'js/data/chanels.json',


            //Parse the response
        parse: function (response) {
           
            return response;
    
        },

        initialize: function () {
            
            this.bind("reset", function (model, options) {

            });
        },

        byType: function (type) {
        filtered = this.filter(function (channel) {
            return box.get("type") === type;
        });
        return new Boxes(filtered);
    }


    });

    return chanelCollection ;
});
