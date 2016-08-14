/**
 * Created by Administrator on 15-8-21.
 */
var Loading = function(stage){
    this.progress = 0;
    this.cur = 0;
    this.intervalId = 0;

}

Loading.prototype = new createjs.Container();

Loading.prototype.start = function(cb){
    var brain = new Brain();
    this.addChild(brain);
    brain.show();

    //txt
    this.txt = ToolUtils.createText(this,"loading0%...", "30px Arial", "#817694", 110, 560)
    //load queue
    this.cb = cb;
    var queue = new createjs.LoadQueue();
    ResManager.queue = queue;
    //queue.on("complete", handleComplete,this);
    //setting sound format
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.installPlugin(createjs.Sound);
    queue.on("progress", progressHandler, this);
    queue.loadManifest([
        {id: "flag", src:"res/flag.png"},
        {id: "startscene", src:"res/startscene.png"},
        {id: "sceneover", src:"res/sceneover.png"},
        {id: "sentences", src:"res/sentences.png"},
        {id: "brain", src:"res/brain.png"},
        //{id: "logo", src:"res/e2.png"},
        {id:"eng", src:"res/eng.json"},
        {id:"jp", src:"res/jp.json"}
    ]);
    var _this = this;
    this.intervalId = setInterval(function(){
        if(_this.cur < _this.progress-20){
            _this.cur++;
            _this.txt.text = "loading" + _this.cur + "%...";
            if(_this.cur== 80){
                console.log("start load sound")
                AudioManager.loadSounds([
                     {id:"wrong", src:"res/sound/wrong.mp3"},
                     {id:"correct", src:"res/sound/correct.mp3"},
                     {id:"loop", src:"res/sound/loop.mp3", loop:true}
                ],function(){
                    _this.progress = 120;
                })
            }
            if(_this.cur >=100){

                //add sound effect
               /* SoundManager.addSound(GlobalModel.Sound_GameStart,ResManager.getRes(GlobalModel.Sound_GameStart));
                SoundManager.addSound(GlobalModel.Sound_Btn,ResManager.getRes(GlobalModel.Sound_Btn));
                SoundManager.addSound(GlobalModel.Sound_Correct,ResManager.getRes(GlobalModel.Sound_Correct));

                SoundManager.addSound(GlobalModel.Sound_GameOver,ResManager.getRes(GlobalModel.Sound_GameOver));
                SoundManager.addSound(GlobalModel.Sound_Wrong,ResManager.getRes(GlobalModel.Sound_Wrong));

               SoundManager.addSound(GlobalModel.Sound_GameEntry,"res/sound/loop.ogg");*/
                _this.cb();
                clearInterval(_this.intervalId);




            }
        }

    },1)

    function progressHandler(evt){
        this.progress = parseInt(evt.progress*100);
        //console.log("loaded:", this.progress)
    }

    //this.scaleX = this.scaleY = 0.8
}