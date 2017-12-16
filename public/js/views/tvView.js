
define([
    'jquery',
    'underscore',
    'backbone',
    'views/chanelView',
    'views/channelCategoryView',
    'views/vnavView',
    'text!templates/tv.html'

], function($, _, Backbone, chanelView, channelCategoryView, vnavView, tvTemplate){

    var tvView = Backbone.View.extend({
       
        el: '#tv_container',
         
        initialize: function(){
            console.log('tv init');
            
            this.$el.html(_.template(tvTemplate));
            
            this.render();
        },

        render: function(){
             
           // this.$el.html(_.template(tvTemplate));
           console.log("azoul");
           var player = new chanelView();
           player.render();
           var vnav = new vnavView();
           var category = new channelCategoryView();
           
          
          
        },
       



    });
    return tvView;
});