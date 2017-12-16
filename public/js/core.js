require.config({
    baseUrl: "js",
    paths: {
        jquery: 'libs/jquery.min',
        jqbridget:'libs/jquery-bridget',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        niceScroll:'libs/jquery.nicescroll.min',
        ui:'libs/jQuery-UI-1.8.9',
        imagesLoaded: 'libs/imagesloaded.pkgd.min',
        masonry:'libs/masonry.pkgd.min',
        jPlayer:'libs/jPlayer/jquery.jplayer.min',
        coverflow:'libs/coverflow',
        touchSwipe:'libs/jquery.touchSwipe.min',
        mousewheel:'libs/jquery.mousewheel.min',
        jPlayerPlaylist:'libs/jPlayer/add-on/jplayer.playlist.min',
        gmap:'libs/gmap',
        tree:'libs/three.min',
        tweenmax:'libs/TweenMax.min',
        async: 'libs/async',
        text: 'libs/text',
        templates: '../templates',

    },
    'shim':{
        backbone:{
            'deps' :['jquery' ,'underscore'],
            'exports' : 'Backbone'
        },
        jPlayerPlaylist:{
            'deps' :['jquery' ,'jPlayer'],
            'exports' : 'jPlayerPlaylist'
        },
        coverflow:{
            'deps' :['jquery' ,'ui'],
            'exports' : 'coverflow'
        },
        underscore: {
            'exports': '_',
        },
       
    },
    waitSeconds: 10,
    urlArgs: 'v='+Math.floor(Math.random()*99999)
});

require([
    'app'
], function(App){
    App.initialize();
});