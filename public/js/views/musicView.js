
define([
    'jquery',
    'underscore',
    'backbone',
    'ui',
    'coverflow',
    'mousewheel',
    'jPlayer',
    'jPlayerPlaylist',
    'touchSwipe',
    'collections/songCollection',
    'text!templates/music.html'

], function($, _, Backbone, ui, coverflow, mousewheel, jPlayer, jPlayerPlaylist, touchSwipe, songCollection, musicTemplate){

    var misicView = Backbone.View.extend({
       
        el: '#music_container',
        //default set item to be centered on
        defaultItem: 6,
        //animation duration
        defaultDuration: 1200,
        html: '',
        imageCaption: '',
        sliderCtrl: '' ,
        coverflowCtrl:'',
        coverflowImages: '',
        coverflowItems: '',
        sliderVertical: '',
        origSliderHeight: '',
        sliderHeight: '',
        sliderMargin: '',
        difference: '',
        proportion: '',
        handleHeight: '',
        listContent: "",
        artist: "",
        album: "",
        sortable: '',
        scrollPane: '',
        

         
        initialize: function(){
            var that = this;

            
             var collection = new songCollection();
             collection.fetch({
                success: function (data) {
                    that.$el.html(_.template(musicTemplate, {songs : data.models}));
                    that.render(data.models);
                }
            });
            

        },

        render: function(data){
             
            var songs= [];
            for (let song of data){
                var obg = {
                    title :song.attributes.title,
                    artist:song.attributes.artist,
                    mp3   :"music/"+song.attributes.name,
                    poster:song.attributes.cover
                };
                songs.push(obg);
            }
            var that = this;
             
            this.coverflowCtrl= $('.music-coverflow #coverflow');
             
            setTimeout(function(){
               that.init_coverflow();

            }, 10);
            setTimeout(function(){
               var myPlaylist = new  jPlayerPlaylist({
                    jPlayer: "#jplayer_N",
                    cssSelectorAncestor: "#jp_container_N"
                },  songs, {
                    playlistOptions: {
                      enableRemoveControls: false,
                      autoPlay: false
                    },
                    swfPath: "js/libs/jPlayer",
                    supplied: "webmv, ogv, m4v, oga, mp3",
                    smoothPlayBar: true,
                    keyEnabled: true,
                    audioFullScreen: false
                });

            }, 15);
            

            
             
        },

        init_coverflow: function(){
            this.coverflowCtrl.coverflow({
                index:          6,
                density:        2,
                innerOffset:    50,
                innerScale:     .7,
                animateStep:    function(event, cover, offset, isVisible, isMiddle, sin, cos) {
                    if (isVisible) {
                        if (isMiddle) {
                            $(cover).css({
                                'filter':           'none',
                                '-webkit-filter':   'none'
                            });
                        } else {
                            var brightness  = 1 + Math.abs(sin),
                                contrast    = 1 - Math.abs(sin),
                                // filter = 'contrast('+contrast+')';
                                filter      = 'contrast('+contrast+') brightness('+brightness+')';
                            $(cover).css({
                                'filter':           filter,
                                '-webkit-filter':   filter
                            });
                        }
                    }
                }
            });
            // this.init_keyboard();
        },

        init_keyboard: function () {
            var that = this;
            $('.coverflow').coverflow('option', 'enableKeyboard');
            $(document).keydown(function (e) {
                // var current = that.coverflowCtrl.slider('value');
                if (e.keyCode == 37) {
                    // if (current > 0) {
                    //     current--;
                    //     that.skipTo(current);
                    // }
                    console.log("prev");
                    that.coverflowCtrl.coverflow( 'prev' );
                } else {
                    if (e.keyCode == 39) {
                        // if (current < $('#coverflow > *').length - 1) {
                        //     current++;
                        //     that.skipTo(current);
                        // }
                        console.log("next");
                        that.coverflowCtrl.coverflow( 'next' );
                    }
                }


            })
        },


    });
    return misicView;
});