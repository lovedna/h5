/**
 * Created by Administrator on 15-8-22.
 */
function GameScene(stage){
    this.stage = stage;
    this.entryScene = new EntryScene(stage) ;
    this.entryScene.name = "entryScene";
    if(GlobalModel.mobile){
        this.entryScene.scaleX = (stage.canvas.clientWidth/640);
        this.entryScene.scaleY = (stage.canvas.clientWidth/640);
    }else{
        this.entryScene.x = (stage.canvas.clientWidth - 640)/2;
    }
    
    //
    //this.entryScene.y = (stage.canvas.clientHeight - 339)/2;

    this.startScene = new StartScene(stage) ;
    this.startScene.name = "startScene";
    this.overScene = new OverScene(stage) ;
    this.overScene.name = "overScene";
    if(GlobalModel.mobile){
        this.overScene.scaleX = (stage.canvas.clientWidth/640);
        this.overScene.scaleY = (stage.canvas.clientWidth/640);
    }else{
        this.overScene.x = (stage.canvas.clientWidth - 640)/2;
    }

}
GameScene.scene_Entry = "entryScene";
GameScene.scene_Start = "startScene";
GameScene.scene_Over = "overScene";

GameScene.prototype.showScene = function(sceneName){
    this.stage.removeAllChildren();
    var scene = this[sceneName];
    scene.alpha = 0;
    this.stage.addChild(scene);
    scene.show();
    //tween
    createjs.Tween.get(scene, {loop: false})
        .to({alpha: 1}, 500)
}

