/**
 * Created by Administrator on 15-8-23.
 */
function TestSentenceItem(){
    this.container = new createjs.Container();
    this.bg = new createjs.Shape();
    this.container.addChild(this.bg);
    this.container.mouseChildren = false;
    this.txt = ToolUtils.createText(this.container,"sentence","60px Arial","#ffffff");
    //this.txt = new TextLink("","20px Arial", "#ffffff");
    this.width = 0;
    this.height = 0;
    this.id = ""
}


TestSentenceItem.prototype.show = function(sentence){
    this.id = sentence;
    this.container.id = sentence;
    this.txt.text = sentence;
    var rect = this.txt.getBounds();
    this.container.height = rect.height + 50;
    this.width = rect.width + 100;
    this.height = this.container.height

    this.bg.graphics.clear();
    this.bg.graphics.setStrokeStyle(15);
    this.bg.graphics.beginStroke("#4F4464");
    this.bg.graphics.beginFill("0CBCBA");
    this.bg.graphics.drawRoundRect(0,0,this.width, this.height,50);
    /*this.bg.graphics.beginFill("#4F4464").drawRoundRect(0,0,rect.width+40, rect.height+40,30)
     .beginFill("#0CBCBA").drawRoundRect(20,20,rect.width, rect.height,30) */                                   ;
    this.txt.x = (this.width - rect.width)/2;
    this.txt.y = 18;
    _this =this;


}