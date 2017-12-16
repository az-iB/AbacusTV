/**
* Module dependencies.
*/

var express = require('express')
  , app = express()  
  , server = require('http').createServer(app)
  , path = require('path')
  , morgan = require('morgan')
  , io = require('socket.io').listen(server)
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , errorhandler = require('errorhandler')
  , spawn = require('child_process').spawn
  , omx = require('omxcontrol');



// all environments
app.set('port', process.env.TEST_PORT || 8080);
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(omx());

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler({log: errorNotification}))
}
function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

//Routes
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
  
});

app.get('/remote', function (req, res) {
  res.sendfile(__dirname + '/public/remote.html');
});

app.get('/play/:video_id', function (req, res) {

});


//Socket.io Config
io.set('log level', 1);

server.listen(app.get('port'), function(){
  console.log('KeenTv TV is running on port ' + app.get('port'));
  getAllFilesFromFolder();
  function getAllFilesFromFolder(){
    var jsonfile = require('jsonfile');
    var btoa = require('btoa');
    var path = 'C:/Users/oz/Desktop/Project/AbacusTV/public/js/data/songs.json';
    var walk    = require('walk');
    var jsmediatags = require("jsmediatags");
    var files   = [];
    var songs = [];
    var song = "";
    var j = 0;

    // Walker options
    var walker  = walk.walk("C:/Users/oz/Desktop/Project/AbacusTV/public/music", { followLinks: false });

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        
        var song =root + '/' + stat.name;
        files.push(song);
 
        new jsmediatags.Reader(song).setTagsToRead(["title", "track", "artist", "album", "picture", "year", "genre"]).read({
          onSuccess: function(tag) {
             
            var cover = tag.tags.picture;
            if (cover) {
              var base64String = "";
              for (var i = 0; i < cover.data.length; i++) {
                  base64String += String.fromCharCode(cover.data[i]);
              }
              var base64 = "data:" + cover.format + ";base64," + btoa(base64String);
              cover = base64;
            } else {
              cover=undefined;
            }
            var obj = {
              "id":j,
              "name":stat.name,
              "album" :tag.tags.album,
              "artist":tag.tags.artist,
              "title" :tag.tags.title,
              "genre" :tag.tags.genre,
              "year"  :tag.tags.year,
              "cover" :cover 
            };
            
            songs.push(obj);
            j++;

          },
          onError: function(error) {
            // console.log(':(', error.type, error.info);
          }
        });
        next();
    });

    walker.on('end', function() {
     
      jsonfile.writeFile(path, songs, function (err) {
        if (err) {console.error("jsonfile error",err);}
        
      });
        
    });
    
  }
});

var ss;

//Run and pipe shell script output
function run_shell(cmd, args, cb, end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        me = this;
    child.stdout.on('data', function (buffer) { cb(me, buffer); });
    child.stdout.on('end', end);
}

//Socket.io Server
io.sockets.on('connection', function (socket) {

 socket.on("screen", function(data){
   socket.type = "screen";
   ss = socket;
   console.log("Screen ready...");
 });
 socket.on("remote", function(data){
   socket.type = "remote";
   console.log("Remote ready...");
 });

 socket.on("controll", function(data){
    console.log(data);
   if(socket.type === "remote"){

     if(data.action === "tap"){
         if(ss != undefined){
            ss.emit("controlling", {action:"enter"});
            }
     }
     else if(data.action === "swipeLeft"){
      if(ss != undefined){
          ss.emit("controlling", {action:"goLeft"});
          }
     }
     else if(data.action === "swipeRight"){
       if(ss != undefined){
           ss.emit("controlling", {action:"goRight"});
           }
     }
   }
 });

 socket.on("video", function(data){

    if( data.action === "play"){
    var id = data.video_id,
         url = "http://www.youtube.com/watch?v="+id;

    var runShell = new run_shell('youtube-dl',['-o','%(id)s.%(ext)s','-f','/18/22',url],
        function (me, buffer) {
            me.stdout += buffer.toString();
            socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            //child = spawn('omxplayer',[id+'.mp4']);
            omx.start(id+'.mp4');
        });
    }

 });
});
