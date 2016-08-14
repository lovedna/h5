/**
 * Created by Administrator on 15-8-22.
 */
function Button(parent, x,y,name,state,defaultImg,selectedImg, mousedownHandler, pressupHandler){
    this.state = state;
    this.container = new createjs.Container();
    this.defaultImg = defaultImg;
    this.selectedImg = selectedImg;

    this.mousedownHandler = mousedownHandler;
    this.pressupHandler = pressupHandler;
    this.container.addChild(this.selectedImg);
    this.container.addChild(this.defaultImg);
    this.container.x = x ||0;
    this.container.y = y ||0;
    this.name = name;
    parent.addChild(this.container);
    var _this = this;
    this.setState(0);
    this.container.on("mousedown", function(evt){
        _this.selectedImg.visible = true;
        _this.defaultImg.visible = false;
        if(_this.mousedownHandler) _this.mousedownHandler(_this);
        //console.log("mousedown")
    })

    this.container.on("pressup", function(evt){
        //console.log("pressup")
        if(_this.pressupHandler) _this.pressupHandler(_this);
        if(_this.state>0) return;
        _this.defaultImg.visible = true;
        _this.selectedImg.visible = false;

    })
}

Button.prototype.setState = function(state){
    if(state>0){
        this.selectedImg.visible = true;
        this.defaultImg.visible = false;
    }else{
        this.defaultImg.visible = true;
        this.selectedImg.visible = false;
    }
}
