
define([
    'jquery',
    'underscore',
    'backbone',
    'views/homeView',
    'views/timeView',
    'views/weatherView',
    'views/navView',
    'views/infoView',
    'text!templates/main.html'

], function($, _, Backbone, homeView, timeView, weatherView, navView, infoView, mainTemplate){

    var homeView = Backbone.View.extend({
       
        el: '#main_container',
        
        initialize: function(){
            // console.log("home view init start");
            this.$el.html(_.template(mainTemplate));
            this.render();
        },

        render: function(){
            // console.log("home view render start");
            var time = new timeView();
            var weather = new weatherView();
            var nav = new navView();
            // var info = new infoView();
            
          
        },



    });
    return homeView;
});
