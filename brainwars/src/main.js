/**
 * Created by Administrator on 15-7-9.
 */
window.onload = init;
var stage;
var scene;
var firework;
var logo;

function init() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stage = new createjs.Stage("canvas");
    scene = new GameScene(stage);
    firework = new Fireworks2(canvas.width,canvas.height);
    stage.addChild(firework);
    createjs.Touch.enable(stage);
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", tickHandler);
    function tickHandler(event) {
        //console.log("TICK!!!");
        stage.update(event);
    }
    GlobalEvent.on(GlobalEvent.Event_ShowStartScene,changeScene)
    GlobalEvent.on(GlobalEvent.Event_ShowEntryScene,changeScene)
    GlobalEvent.on(GlobalEvent.Event_GameOver,changeScene)
    GlobalEvent.on(GlobalEvent.Event_ShowFirework,showFirework)
    this.gameLoading();
    //this.gameEntry();
    //console.log("stage:",stage);

    WX.init();
}

function changeScene(evt){
    switch(evt){
        case GlobalEvent.Event_ShowEntryScene :// game entry
            scene.showScene(GameScene.scene_Entry)
            break;
        case GlobalEvent.Event_ShowStartScene :// game start
            scene.showScene(GameScene.scene_Start)

            break;
        case GlobalEvent.Event_GameOver ://game over
            console.log("GAMEOVER")
            scene.showScene(GameScene.scene_Over)
            break;
    }
}
function gameLoading(){
    //logo
    logo = ToolUtils.createBitmap(stage,"res/loading/logo.png",(stage.canvas.clientWidth)/2,150);
    logo.regX = 253/2;
    logo.regY = 25/2;
    logo.alpha = 0;
    logo.scaleX =  logo.scaleY = 1.8;
    createjs.Tween.get(logo, {loop: false})
        .to({alpha: 1, scaleX:2, scaleY:2}, 1500, createjs.Ease.getBackInOut(2));

    var loading = new Loading(stage);
    stage.addChild(loading);


    loading.x = (stage.canvas.clientWidth - 331)/2;
    loading.y = (stage.canvas.clientHeight - 521-40)/2;
    loading.alpha = 0;

    createjs.Tween.get(loading, {loop: false}).wait(500).call(function(){
        loading.start(gameEntry);
    })
        .to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2))



}
function gameEntry(){
    //changeScene(GlobalEvent.Event_ShowEntryScene)
    scene.showScene(GameScene.scene_Over)

}

function showFirework(type, data){
    console.log("show firework:", data)
    firework.x = data.x-250;
    firework.y = data.y;
    firework.create();
}






