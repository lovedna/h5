/**
 * Created by Administrator on 15-8-22.
 */
function TestProgress(stage){
    this.total = GlobalModel.TIMEUP ;
    this.cur = 0;
    this.bg = new createjs.Shape();
    this.progress = new createjs.Shape();
    this.bar = new createjs.Shape();
    this.width = stage.canvas.clientWidth;
    this.radius = 15;

}

TestProgress.prototype = new createjs.Container();
TestProgress.prototype.init = function(){
    this.addChild(this.bg);
    this.addChild(this.progress);
    this.addChild(this.bar);
    this.bg.graphics.beginFill("#59506E").drawRect(0,0,this.width,30);
    this.bar.graphics.beginFill("#F0706A").drawCircle(0,0,15);
    this.bar.x = this.bar.y = this.radius;

    GlobalEvent.on(GlobalEvent.Event_NextTime, this.next.bind(this))
    GlobalEvent.on(GlobalEvent.Event_GameStart, this.reset.bind(this))
    //setInterval(this.next.bind(this),2000);
    this.drawPro();
    //console.log("init testProgress")
};
TestProgress.prototype.next = function(){
    //console.log(this.cur)
    if(this.cur++ < this.total){
       this.drawPro();
    }
}
TestProgress.prototype.drawPro = function(){
    var per = this.cur/this.total;
    var width = per * this.width -this.radius;
    //this.progress.graphics.clear();
    //this.progress.graphics.beginFill("#0DBBBC").drawRect(0,0,width,30);
    var _x = this.width - (this.radius + per * (this.width-this.radius*2));
    var _this = this;
    createjs.Tween.get(this.bar, {loop: false}).to({x: _x}, 1000, createjs.Ease.getPowInOut(2)).on("change",function(){
        _this.progress.graphics.clear();
        _this.progress.graphics.beginFill("#0DBBBC").drawRect(0,0,_this.bar.x,30);
    });
}
TestProgress.prototype.reset = function(){
    this.cur = 0;
    this.drawPro();
}