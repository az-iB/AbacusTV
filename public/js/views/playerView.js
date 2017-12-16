
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/player.html'

], function($, _, Backbone, playerTemplate){

    var playerView = Backbone.View.extend({
       
        el: '#player',
         
        initialize: function(){
            console.log('player init');
            
            // this.$el.html(_.template(playerTemplate));
            
            // this.render();
        },

        render: function(model){
            console.log(model);
           this.$el.html(_.template(playerTemplate, {channel : model}));
          
          
        },
       



    });
    return playerView;
});