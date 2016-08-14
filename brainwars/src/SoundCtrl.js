var SoundCtrl = function(){
    this.audio = new Audio();
    this.endedHandler = null;
    this.sndLoaded = false;
    this.interval_sndLoaded;
    var _this = this;
    /*this.audio.onloadedmetadata = function () {
        _this.sndLoaded = true;
        console.log("duration:", _this.audio.duration);
    };*/

    /*this.audio.addEventListener("ended", function(){
        if(_this.endedHandler){
            _this.endedHandler();
        }
    }, false);*/

}

SoundCtrl.prototype.getDuration = function(){
    return this.audio.duration;
}


SoundCtrl.prototype.play = function (cb){
    this.audio.currentTime = 0;
    this.audio.play();
    this.endedHandler = cb;
    //console.log(this.audio)

}

SoundCtrl.prototype.pause = function(){
    this.audio.pause();
}

SoundCtrl.prototype.stop = function(){
    //console.log("stop")
    if (!this.audio || this.audio.readyState !=4) return;
    this.audio.pause();
    this.audio.currentTime = 0;

}

SoundCtrl.prototype.setSnd = function(curaudio){
    this.sndLoaded = false;
    //this.audio.setAttribute("src", curaudio.src);
    this.audio = curaudio;
    //console.log("audio:", this.audio)
}

