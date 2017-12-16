
define([
    'jquery',
    'underscore',
    'backbone',
    'views/pageView',
    'text!templates/nav.html'

], function($, _, Backbone, pageView, navTemplate){

    var navView = Backbone.View.extend({
       
        el: '#nav_block',
        id:'',

        events: {
            'click .hover' : 'navCLick'
        //     'mouseenter .hover': 'boxMouseOver',
        //     'mouseover .info-box': 'boxMouseOver',
        //     'mouseleave .a-block': 'boxMouseOut'
        },
        
        initialize: function(){

            this.$el.html(_.template(navTemplate));
            // this.render();
        },

        render: function(){

          
        },

        navCLick : function(e){
            // var page = new pageView(e.currentTarget.id);
            
            if (e.currentTarget.id == "tv") {

                var page = new pageView("tv");
            }
            else if(e.currentTarget.id == "gamepad"){
                var page = new pageView("gamepad");

            }
            else if(e.currentTarget.id == "music"){

                var page =new pageView("music");

            }

        },

        // boxMouseOver : function (e){
        //    console.log(e);
        //     id= e.currentTarget;
        //    console.log(e);
        //    $(id).removeClass("hover");
        //     // var id = e.target.className
        //     setTimeout(function(){ $(e.currentTarget).css("width","25%"); }, 10);
        //     setTimeout(function(){ $(".hover").css("width","7%"); }, 20);
           

        // },

        // boxMouseOut : function (e){
        //     console.log(id);
        //      if ((e.type != "mouseover") || (e.type != "mouseenter") ) {
        //     $(id).addClass("hover");
        //     setTimeout(function(){ $(id).css("width","10%"); }, 20);
        //     setTimeout(function(){ $(".hover").css("width","10%"); }, 40);
        //     }
        // },

        

    });
    return navView;
});