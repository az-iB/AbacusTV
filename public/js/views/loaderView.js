
define([
    'jquery',
    'underscore',
    'backbone'

], function($, _, Backbone){

    var loaderView = Backbone.View.extend({
       
        el: '#loader',
        loader: [],
        
        initialize: function(){
            loader = $('#loader');

            // this.$el.html(_.template(mainTemplate));
            // this.render();
        },

        render: function(){

          
        },
        show: function() {
             
            loader.siblings('div').hide();
            loader.show();
        },
        hide: function() {
            loader.siblings('div').show();
            loader.hide();
        }



    });
    return loaderView;
});