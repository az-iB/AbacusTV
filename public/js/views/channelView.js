
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/chanelCollection',
    'views/playerView',
    'text!templates/channel.html'

], function($, _, Backbone, chanelCollection, playerView, chanelTemplate){

    var channelView = Backbone.View.extend({
       
        el: '#channel_category',
        dataC: null,
        events:{
            'click .single-chanel': 'getChanel'
        },
       
        initialize: function(){
            console.log('chanel init');
          
            this.render();
        },

        render: function(){
            var that = this
            var collection = new chanelCollection();
             collection.fetch({
                success: function (data) {
                    console.log(data);
                    that.dataC = data;
                    that.$el.html(_.template(chanelTemplate, {chanels : data.models}));
                    $("#vnav").hide();
 
                }
            });

            // console.log(collection);
            // console.log(collection.models);
        },


        getChanel: function (e){
            console.log(e.currentTarget.id);

            // init the player view an lunch a tv channel by its ID
             
            var player = new playerView();
            player.render(this.dataC.get(e.currentTarget.id));
        },
 
         
    });

    return channelView;
});