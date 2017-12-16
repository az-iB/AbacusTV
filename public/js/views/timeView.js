
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/time.html'

], function($, _, Backbone, timeTemplate){

    var timeView = Backbone.View.extend({
        el:'#time_block',
       
         
        
        initialize: function(){

            this.start();

            // this.$el.html(_.template(timeTemplate));
            // this.render();
        },

        render: function(){

          
        },

        weekdays : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        months : ["January","February","March","April","May","June","July","August","September","October","November","December"],

        timeParts: function() {
            var date = new Date(),
                hour = date.getHours();

            return {
              // Digital
              day: this.weekdays[date.getDay()],
              date: date.getDate(),
              month: this.months[date.getMonth()],
              hour: this.appendZero(hour),
              minute: this.appendZero(date.getMinutes()),
              second: this.appendZero(date.getSeconds()),
            };
        },

        appendZero : function(num) {
            if(num < 10) {
              return "0" + num;
            }
            return num;
        },

        refresh: function() {
            var parts = this.timeParts(12);
            this.$el.html(_.template(timeTemplate, { day: parts.day, month : parts.day , date: parts.date , hour: parts.hour, minute : parts.minute, second : parts.second   }));
           

            // this.$el.digital.date.html(parts.day + ', ' + parts.month + ' ' + parts.date);
            // this.$el.digital.time.html("<span class='hour'>"+parts.hour+"</span> : "+"<span class='minute'>"+parts.minute+"</span>"+" : <span class='second'>"+parts.second+"</span");
        },

        start: function() {
            that = this;

            if (this._running) {
            clearInterval(this._running);
            }

            this._running = setInterval(function() {

              that.refresh();
            }, 1000);
            this.refresh();
      }



    });
    return timeView;
});