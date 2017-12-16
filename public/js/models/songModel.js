define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var songModel = Backbone.Model.extend({

        

        defaults : {

            id:null,
            name:"name empty",
            album: "album empty",
            artist:"artist empty",
            title:"title empty",
            genre:"genre empty",
            year: "year empty",
            cover:"images/mp3.png"        

        },

        urlRoot:'js/data/songs.json',

        parse: function (response) {
           
            return response;
    
        },

        initialize: function(){

            _.bindAll(this);

        },



    });
 
    return songModel;

});
