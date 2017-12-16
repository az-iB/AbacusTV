
define([
    'jquery',
    'underscore',
    'backbone',
    'jqbridget',
    'niceScroll',
    'collections/chanelCollection',
    'views/playerView',
    'views/channelView',
    'masonry',
    'imagesLoaded',
    'libs/colorfinder-1.1',
    'text!templates/chanel.html'

], function($, _, Backbone, jqbridget, niceScroll, chanelCollection, playerView, channelView, masonry, imagesloaded, colorfinder, chanelTemplate){

    var chanelView = Backbone.View.extend({
       
        el: '#chanel_list',
        dataC: null,
        events:{
            'click .single-chanel': 'getChanel',
            'scroll': 'scroll',
            'resize':'resize'
        },
        docElem : window.document.documentElement,
        support: { animations : Modernizr.cssanimations },
        animEndEventNames: {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
       
         
        initialize: function(){
            console.log('chanel init');
           
            this.docElem = this.el;
            
            // animation end event name
            this.animEndEventName = this.animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
        },

        render: function(){
            var that = this
            var collection = new chanelCollection();
             collection.fetch({
                 
                success: function (data) {
                    that.dataC = data;
                    that.getChanelList(that.dataC);
                }
            });

             
        },
        filterchannels:function(category){
            var that = this
            var collection = new chanelCollection();
            
             collection.fetch({
                 
                success: function (data) {
                     that.dataC = data;
                    var channels = data.where({type: category});
                    var channelsList = new chanelCollection(channels);
                    console.log(data);
                    console.log(channels);
                    if (category != 'all') { 
                        that.getChanelList(channelsList);
                    }else {
                        that.getChanelList(data);
                    }
                    
                }
            });
            
            
        },

        getChanelList:function(data){
            console.log(this.dataC);

            
            this.$el.html(_.template(chanelTemplate, {chanels : data.models}));

            this.GridScrollFx( this,document.getElementById( 'grid' ), {
                viewportFactor : 0.4
            } );

            // NICE SCROLL
       
            $("#chanel_list").niceScroll({
                cursorcolor: "#d7d7d7",
                cursorwidth: "6px",
                cursorborder: "none",
                cursorborderradius: "8px",
                horizrailenabled: false,
                autohidemode: false
            });
            $("#channel_category").niceScroll({
                cursorcolor: "#d7d7d7",
                cursorwidth: "0px",
                cursorborder: "none",
                cursorborderradius: "8px",
                horizrailenabled: false,
                autohidemode: false
            });

        },

        scroll: function(){
            var self = this;
                this.items.forEach( function( item ) {
                    if( !classie.has( item.el, 'shown' ) && !classie.has( item.el, 'animate' ) && self.inViewport( item.el, self.options.viewportFactor ) ) {
                        ++self.itemsRenderedCount;

                        if( !item.curtain ) {
                            classie.add( item.el, 'shown' );
                            return;
                        };

                        classie.add( item.el, 'animate' );
                        
                        // after animation ends add class shown
                        var onEndAnimationFn = function( ev ) {
                            if( self.support.animations ) {
                                this.removeEventListener( self.animEndEventName, onEndAnimationFn );
                            }
                            classie.remove( item.el, 'animate' );
                            classie.add( item.el, 'shown' );
                        };

                        if( self.support.animations ) {
                            item.curtain.addEventListener( self.animEndEventName, onEndAnimationFn );
                        }
                        else {
                            onEndAnimationFn();
                        }
                    }
                });
                this.didScroll = false;
        },
        resize: function(){
            console.log("resize");
            var self = this;
            
        },

        getChanel: function (e){
            console.log(e.currentTarget.id);
            $(".tvNav-container").css("width","40%");

            // init the player view an lunch a tv channel by its ID
             
            var player = new playerView();
            player.render(this.dataC.get(e.currentTarget.id));
            var channelList = new channelView();
        
            $( "#chanel_list" ).fadeOut( "slow" );
        },

        getViewportH :function() {
            var client = this.docElem['clientHeight'],
                inner = window['innerHeight'];
             
            if( client < inner )
                return inner;
            else
                return client;
        },

        scrollY : function() {
            
            return window.pageYOffset || this.docElem.scrollTop;
        },

        // http://stackoverflow.com/a/5598797/989439
        getOffset: function( el ) {
            var offsetTop = 0, offsetLeft = 0;
            do {
                if ( !isNaN( el.offsetTop ) ) {
                    offsetTop += el.offsetTop;
                }
                if ( !isNaN( el.offsetLeft ) ) {
                    offsetLeft += el.offsetLeft;
                }
            } while( el = el.offsetParent )

            return {
                top : offsetTop,
                left : offsetLeft
            }
        },

        inViewport:function( el, h ) {
            var elH = el.offsetHeight,
                scrolled = this.scrollY(),
                viewed = scrolled + this.getViewportH(),
                elTop = this.getOffset(el).top,
                elBottom = elTop + elH,
                // if 0, the element is considered in the viewport as soon as it enters.
                // if 1, the element is considered in the viewport only when it's fully inside
                // value in percentage (1 >= h >= 0)
                h = h || 0;

            return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
        },

        extend : function( a, b ) {
            for( var key in b ) { 
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }
            return a;
        },

        GridItem : function( el ) {
            this.el = el;
            this.anchor = el.querySelector( 'a' ) 
            this.image = el.querySelector( 'img' );
            this.desc = el.querySelector( 'h3' );
            this.addCurtain = function() {
                if( !this.image ) return;
                this.curtain = document.createElement( 'div' );
                this.curtain.className = 'curtain';
                var rgb = new ColorFinder( function favorHue(r,g,b) {
                    // exclude white
                    //if (r>245 && g>245 && b>245) return 0;
                    return (Math.abs(r-g)*Math.abs(r-g) + Math.abs(r-b)*Math.abs(r-b) + Math.abs(g-b)*Math.abs(g-b))/65535*50+1;
                } ).getMostProminentColor( this.image );
                if( rgb.r && rgb.g && rgb.b ) {
                    this.curtain.style.background = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
                }
                this.anchor.appendChild( this.curtain );
            }

            this.changeAnimationDelay = function( time ) {
                if( this.curtain ) {
                    this.curtain.style.WebkitAnimationDelay = time + 'ms';
                    this.curtain.style.animationDelay = time + 'ms';
                }
                if( this.image ) {
                    this.image.style.WebkitAnimationDelay = time + 'ms';
                    this.image.style.animationDelay = time + 'ms';
                }
                if( this.desc ) {
                    this.desc.style.WebkitAnimationDelay = time + 'ms';
                    this.desc.style.animationDelay = time + 'ms';
                }
            }
        },

     

        GridScrollFx: function( _that, el, options ) {  
           console.log("GridScrollFx");
            this.el = el;
            this.options = $.extend( {}, this.options );
            $.extend( this.options, options );
            
            _that.initGrid(this,_that);
            this.options = {
                // Minimum and maximum delay of the animation (random value is chosen)
                minDelay : 0,
                maxDelay : 500,
                // The viewportFactor defines how much of the appearing item has to be visible in order for the animation to start
                // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
                // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
                viewportFactor : 0
            }

           

            this._scrollPage = function() {
                var self = this;
                console.log("_scrollPage");
                console.log(this);
                this.items.forEach( function( item ) {
                    if( !classie.has( item.el, 'shown' ) && !classie.has( item.el, 'animate' ) && inViewport( item.el, self.options.viewportFactor ) ) {
                        ++self.itemsRenderedCount;

                        if( !item.curtain ) {
                            classie.add( item.el, 'shown' );
                            return;
                        };

                        classie.add( item.el, 'animate' );
                        
                        // after animation ends add class shown
                        var onEndAnimationFn = function( ev ) {
                            if( support.animations ) {
                                this.removeEventListener( animEndEventName, onEndAnimationFn );
                            }
                            classie.remove( item.el, 'animate' );
                            classie.add( item.el, 'shown' );
                        };

                        if( support.animations ) {
                            item.curtain.addEventListener( animEndEventName, onEndAnimationFn );
                        }
                        else {
                            onEndAnimationFn();
                        }
                    }
                });
                this.didScroll = false;
            }

            this._resizeHandler = function() {
                var self = this;
                function delayed() {
                    self._scrollPage();
                    self.resizeTimeout = null;
                }
                if ( this.resizeTimeout ) {
                    clearTimeout( this.resizeTimeout );
                }
                this.resizeTimeout = setTimeout( delayed, 1000 );
            }
        },

        initGrid : function (that,_that) {
                
                var self = that, items = [];

                [].slice.call( that.el.children ).forEach( function( el, i ) {
                    var item = new _that.GridItem( el );
                    items.push( item );
                } );

                that.items = items;
                that.itemsCount = that.items.length;
                that.itemsRenderedCount = 0;
                that.didScroll = false;

                imagesloaded( that.el, function() {
                    // show grid
                    classie.add( self.el, 'loaded' );

                    // initialize masonry
                    new masonry( self.el, {
                        itemSelector : 'li',
                        isFitWidth : true,
                        transitionDuration : 0
                    } );
                    
                    // the items already shown...
                    self.items.forEach( function( item ) {
                        if( _that.inViewport( item.el ) ) {
                            ++self.itemsRenderedCount;
                            classie.add( item.el, 'shown' );
                        }
                        else {
                            item.addCurtain();
                            // add random delay
                            item.changeAnimationDelay( Math.random() * ( self.options.maxDelay - self.options.minDelay ) + self.options.minDelay );
                        }
                    } );

                    onScrollFn = function() {
                        console.log("azoul scrooll");
                        if( !self.didScroll ) {
                            self.didScroll = true;
                            setTimeout( function() { self._scrollPage(); }, 200 );
                        }
                        
                        if( self.itemsRenderedCount === self.itemsCount ) {
                            window.removeEventListener( 'scroll', onScrollFn, false );
                        }
                    }

                    // animate the items inside the viewport (on scroll)
                    // $(".chanel_list").scroll(onScrollFn, false);
                    window.addEventListener( 'scroll', onScrollFn, false );
                    // check if new items are in the viewport after a resize
                    window.addEventListener( 'resize', function() { self._resizeHandler(); }, false );
                });
            }
    });

    return chanelView;
});