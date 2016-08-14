/**
 * Created by Administrator on 15-9-5.
 */
/**
 * Created by Administrator on 15-8-29.
 */
var AudioManager = {
    soundCfg:{},
    curSndCtr:null,
    loadList:null,
    callback:null

};
AudioManager.loadSounds = function(sounds, cb){
    this.loadList = sounds;
    this.callback = cb;
    this.loadSound();

}
AudioManager.loadSound = function(){
    if(this.loadList.length){
        var sound = this.loadList.shift();
        AudioManager.addSound(sound.src,sound.id, sound.loop);
    }else{
        this.callback = null;
    }

}

AudioManager.addSound = function(src, id, loop){
    var audio = document.createElement("audio");
    audio.src = src;
    audio.id = id;
    audio.loop = loop
    audio.load();
    var _this = this;
    audio.addEventListener("canplaythrough", function(){
        _this.soundCfg[audio.id] = audio;
        console.log(id + " loaded");

        _this.callback();
        _this.loadSound()
        //console.log(" sounds load complete");

    },false);
}

AudioManager.play = function(id, cb){

    var audio = this.soundCfg[id];
    if(!audio) return;
    audio.play();
    //console.log("play sound:", id)
}

AudioManager.stop = function(id){
    var audio = this.soundCfg[id];
    if(!audio) return;
    audio.pause();
    audio.currentTime = 0;

}