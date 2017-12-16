define([
    'jquery',
    'backbone',
    'underscore',
    'views/homeView',
    ],
    function($, Backbone, _, homeView){
        var Router = Backbone.Router.extend({
            homeView : new homeView(),
            initialize: function(){

                $(document).on('click', 'a[href^="/"]', function(e) {
                    e.preventDefault();
                    var href = $(e.currentTarget).attr('href');
                    // console.log('click ' + href);
                    Backbone.history.navigate(href, { trigger: true });
                  });






                // this.menuView = new menuView;
                // this.menuView.bind('collectionSelected',this.setLocation, this);
                // -----  for the domaine name marrakush.com ------
                Backbone.history.start({pushState: true, root:'/'});

                // ------  for the localhost ------
                // Backbone.history.start({pushState: true, root:'/amoddo/'});


                // Backbone.history.start();


            },

            routes: {

				'':'setView',
                'map.html':'setMap',
                'map':'maap',
                'home':'setMap',
                'parks':'parks',
                'cities/*name': 'visiteCity',
                'place/*name':'takeAlock',
                'wiki/*city':'city_info',
                'tour/*tour':'draw_road',
                'weather':'weather',
                'categories':'tourcategory',
                'category/*category':'toursbycategory',
               
                 
            },


           

            homeView: function(e){
                console.log('azoul');

            },

            
        });

        return Router;
    });