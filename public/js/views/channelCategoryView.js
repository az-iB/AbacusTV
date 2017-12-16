
define([
    'jquery',
    'underscore',
    'backbone',
    'views/chanelView',
    'text!templates/channelCategory.html'

], function($, _, Backbone, chanelView, channelCategoryTemplate){

    var channelCtegoryView = Backbone.View.extend({
       
        el: '#channel',

        events:{
            'click .category': 'getChanels'

        },
         
        initialize: function(){
            console.log('channel category init');

            this.$el.html(_.template(channelCategoryTemplate));
            // this.render();
        },

        render: function(){

          
        },

        getChanels: function(e){

            var channels = new chanelView();
            channels.filterchannels($(e.currentTarget).data('type'));
            

        },
       



    });
    return channelCtegoryView;
});