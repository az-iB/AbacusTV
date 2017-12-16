
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/vnav.html'

], function($, _, Backbone, vnavTemplate){

    var vnavView = Backbone.View.extend({
       
        el: '#vnav',
         
        initialize: function(){
            console.log('nav_h init');

            this.$el.html(_.template(vnavTemplate));
            // this.render();
        },

        render: function(){

          
        },
       



    });
    return vnavView;
});