/**
 * Created by Administrator on 15-8-22.
 */
function StartScene(stage){
    this.progress = null;
    this.menu = null;
    this.stage = stage;
    this.sentence = null;
    this.help = null;
}
StartScene.prototype = new createjs.Container();
StartScene.prototype.init = function(){


}
StartScene.prototype.show = function(){
    //console.log("show startscene");
    if(!this.progress){

        //menu
        this.menu = new TestMenu(this.stage);
        this.menu.init();
        this.addChild(this.menu);
        //sentence
        this.sentence = new TestSentence(this.stage);
        this.sentence.init();
        this.addChild(this.sentence);
        this.sentence.x = this.menu.menuWidth;
        //progress
        this.progress = new TestProgress(this.stage);
        this.progress.init();
        this.addChild(this.progress);
        //help
        this.help = new TestHelp(this.stage);
        this.addChild(this.help );
        this.help.init();
        var bounds = this.help.getBounds();
        if(GlobalModel.mobile){
            this.help.scaleX = (this.stage.canvas.clientWidth/640);
            this.help.scaleY = (this.stage.canvas.clientWidth/640);
        }else{
            this.help.x = (this.stage.canvas.clientWidth - 640)/2;
        }
    }
    //tween menu progress
    //createjs.Tween.removeAllTweens();
    this.menu.x = -220;
    createjs.Tween.get(this.menu, {loop: false}).to({x: 0}, 1000,createjs.Ease.getPowInOut(3));
    this.progress.y = -60;
    _this = this;
    createjs.Tween.get(this.progress, {loop: false}).wait(200)
        .to({y: 0}, 1000,createjs.Ease.getPowInOut(4))
        .call(function(){
            //console.log("Game Start");

            if(!GlobalModel.help){
                GlobalEvent.dispatch(GlobalEvent.Event_GameStart);
                console.log("StartScene: Game Start")
            }else{
                GlobalEvent.dispatch(GlobalEvent.Event_ShowHelp);
            }


        });

}