
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/info.html'

], function($, _, Backbone, infoTemplate){

    var infoView = Backbone.View.extend({
       
        el: '#info',
         
        initialize: function(){
            console.log('info init');

            this.$el.html(_.template(infoTemplate));
            // this.render();
        },

        render: function(){

          
        },
       



    });
    return infoView;
});