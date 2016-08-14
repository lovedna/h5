/**
 * Created by Administrator on 15-8-29.
 */
var SoundManager = {
    soundCfg:{},
    curSndCtr:null
};
SoundManager.addSound = function(id,audio){
    var sndCtr = new SoundCtrl();
    sndCtr.setSnd(audio);
    this.soundCfg[id] = sndCtr;
    //console.log(this.soundCfg)
}

SoundManager.play = function(id, cb){

    this.curSndCtr = this.soundCfg[id];
    if(!this.curSndCtr) return;
    this.curSndCtr.stop();
    this.curSndCtr.play();
    //console.log("play sound:", id)
}

SoundManager.stop = function(id){
    if(id) this.curSndCtr = this.soundCfg[id];
    if(!this.curSndCtr) return;
    this.curSndCtr.stop();

}