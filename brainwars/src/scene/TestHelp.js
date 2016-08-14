/**
 * Created by Administrator on 15-9-3.
 */
/**
 * Created by Administrator on 15-8-23.
 */
function TestHelp(stage){
    this.height = stage.canvas.clientHeight;
    this.width = stage.canvas.clientWidth;
    this.sheet = null;
    this.bg = null;
}

TestHelp.prototype = new createjs.Container();


TestHelp.prototype.init = function(){

    this.sheet = new createjs.SpriteSheet({
        images: [ResManager.getRes("startscene")],
        frames: [[0,0,203,44,0,0,0],[203,0,84,32,0,0,0],[287,0,271,34,0,0,0],[558,0,386,364,0,0,0],[0,364,595,123,0,0,0],[0,487,656,73,0,0,0]]

    });

    var shape = new createjs.Shape();
    shape.graphics.beginFill("#342C42").drawRect(0, 0,this.width,this.height);
    this.addChild(shape);
    shape.alpha = 0.94;

    this.info = ToolUtils.createSprite(this,this.sheet,3,93,200);
    var bounds = this.info.getBounds();
    //this.info.x = (this.width - bounds.width) /2;
    //this.info.scaleX = this.info.scaleY = this.width/bounds.width
    this.start_btn = new Button(this,22,600,"start",0,ToolUtils.createSprite(this,this.sheet,4),
        ToolUtils.createSprite(this,this.sheet,4),null, this.close.bind(this));

    bounds = this.start_btn.container.getBounds();
    //this.start_btn.container.x = (this.width - bounds.width) /2;

    GlobalModel.help = true;

    this.visible = false;
    var _this = this;
    GlobalEvent.on(GlobalEvent.Event_ShowHelp,function(){
        _this.show()
    })
}
TestHelp.prototype.close = function(){
    console.log("close")
    this.visible = false;

    if(GlobalModel.help){
        GlobalModel.help = false;
        GlobalEvent.dispatch(GlobalEvent.Event_GameStart);
        console.log("TestHelp: Game Start")
    }

}

TestHelp.prototype.show = function(){
    console.log("show Help!!!!")
    this.visible = true;
}




