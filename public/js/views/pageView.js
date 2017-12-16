
define([
    'jquery',
    'underscore',
    'backbone',
    'views/tvView',
    'views/musicView',
    'views/gameView',
    'text!templates/page.html'

], function($, _, Backbone, tvView, musicView, gameView, pageTemplate){

    var pageView = Backbone.View.extend({
       
        el: '#page',
        events:{
            'click #chanel_tool' : 'CLicked',
        },
         
        initialize: function(page){
            
           
            console.log(page);
            this.$el.html(_.template(pageTemplate));
            if (page == "tv"){
                this.tv();

            }else if(page == "gamepad"){
                this.game();
            }else if (page=="music"){
                this.music()
            }
            this.render();
        },

        render: function(){
            
            
            // console.log(this.$el.selector);
            $("#page").css("display","block");
        },
        game : function(){
            console.log("game function");
            $(".tv-containt").css("display","none");
            $(".music-containt").css("display","none");
            $(".game-containt").css("display","block");
            var game = new gameView(); 
        },
        tv : function(){
            $(".game-containt").css("display","none");
            $(".music-containt").css("display","none");
            $(".tv-containt").css("display","block");
            var player = new tvView();

        },
        music:function(){

            $(".game-containt").css("display","none");
            $(".music-containt").css("display","block");
            $(".tv-containt").css("display","none");
            var music = new musicView();

        },

        CLicked: function(){
            var vlc = document.getElementById("vlc_player");
            // vlc.audio.toggleMute();

            console.log(vlc.playlist.itemCount);

        }
       



    });
    return pageView;
});