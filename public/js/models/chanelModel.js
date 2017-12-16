define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var chanelModel = Backbone.Model.extend({

        

        defaults : {

            id:null,
            name: "name empty",
            icon:"c0",
            type:"normal",
            link:"link empty"           

        },

        urlRoot:'js/m3u/chanels.json',

        parse: function (response) {
           
            return response;
    
        },

        initialize: function(){

            _.bindAll(this);

        },



    });
 
    return chanelModel;

});
