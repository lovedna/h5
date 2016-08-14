/**
 * Created by Administrator on 15-9-6.
 */
/**
 * Created by Administrator on 15-9-3.
 */
/**
 * Created by Administrator on 15-8-23.
 */
function ShareSence(stage){
    this.height = stage.canvas.clientHeight;
    this.width = stage.canvas.clientWidth;
    this.sheet = null;
    this.bg = null;
}

ShareSence.prototype = new createjs.Container();


ShareSence.prototype.init = function(){
    var image = ResManager.getRes("sceneover");
    this.sheet = new createjs.SpriteSheet({
        images: [image],
        frames: [[0, 0, 211, 328, 0, 0.25, 0], [211, 0, 597, 210, 0, 50.25, 194], [0, 328, 300, 127, 0, 0.25, 0], [300, 328, 299, 127, 0, 0.25, 0], [0, 455, 611, 126, 0, 0.25, 0], [0, 581, 455, 81, 0, 0.25, 0], [455, 581, 455, 96, 0, 0.25, 0], [0, 677, 455, 97, 0, 0.25, 0], [455, 677, 455, 85, 0, 0.25, 0], [0, 774, 403, 38, 0, 0.25, 0], [403, 774, 68, 74, 0, 0.25, 0]]

    });


    var shape = new createjs.Shape();
    shape.graphics.beginFill("#342C42").drawRect(0, 0,this.width,this.height);
    this.addChild(shape);
    shape.alpha = 0.94;

    this.bg = ToolUtils.createSprite(this,this.sheet,10,400,20);
    ToolUtils.setLayout(this.bg,{right:20}, this.width, this.height)


}
ShareSence.prototype.close = function(){
    console.log("close")
    this.visible = false;


}

ShareSence.prototype.show = function(){

    this.visible = true;
}




