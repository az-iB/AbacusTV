define([
    'jquery',
    'underscore',
    'backbone',
    'models/songModel'
], function($, _, Backbone, songModel){
    var songCollection = Backbone.Collection.extend({
       
        model: songModel,

        url: 'js/data/songs.json',


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

    return songCollection ;
});
