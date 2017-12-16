define(['routers/home'], function(router){
    var initialize = function(){
        this.route = new router();
    }

    return { initialize: initialize};
});
