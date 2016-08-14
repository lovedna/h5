/**
 * Created by Administrator on 15-8-21.
 */
var ToolUtils = {};

ToolUtils.createBitmap = function(parent, data, x, y){
    var bm = new createjs.Bitmap(data);
    parent.addChild(bm);
    bm.x = x || 0;
    bm.y = y || 0;
    return bm;
}
ToolUtils.createText = function(parent, text, sizeAndFont, color, x, y){
    var txt = new createjs.Text(text, sizeAndFont, color);
    parent.addChild(txt);
    txt.x = x || 0;
    txt.y = y || 0;
    return txt;
}

ToolUtils.createSprite = function(parent, sheet, curframe, x, y){

    var sprite = new createjs.Sprite(sheet);
    sprite.gotoAndStop(curframe);
    parent.addChild(sprite);
    sprite.x = x || 0;
    sprite.y = y || 0;
    return sprite;
}

ToolUtils.timeFmt = function(sec){
    var _sec = sec%60;
    _sec = _sec<10? "0"+_sec.toString() : _sec.toString();
    var minute  = parseInt((sec / 60) % 60);
    var hour  = parseInt(sec / 3600 % 60);
    minute = minute<10? "0"+minute.toString() : minute.toString();
    return minute + ":" + _sec;
}

ToolUtils.randomListItems = function(lis,deep) {
    var len = lis.length;
    for(var i=0; i<len-1; i++)
    {
        var index = deep  ? ToolUtils.getRandomIndex(i+1,lis.length)
                            : ToolUtils.getRandomIndex(i,lis.length);
        var tmp = lis[index];
        lis[index] = lis[i];
        lis[i] = tmp;
    }


}

ToolUtils.getRandomIndex = function(min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

ToolUtils.setCenterPos = function(child, parent){
    var bounds_child = child.getBounds();
    var bounds_parent = parent.getBounds();
    console.log(bounds_child, bounds_parent)
    child.x = (bounds_parent.width - bounds_child.width)/2;
    child.y = (bounds_parent.height - bounds_child.height)/2;
}
/*
* 设置相对布局
* */
ToolUtils.setLayout = function(disObj,layoutCfg,marginWidth,marginHeight){
    var bounds = disObj.getBounds();
    for(var i in layoutCfg){
        switch(i){
            case "right" :
                disObj.x = marginWidth - bounds.width - layoutCfg[i];
                break;
            case "bottom" :
                disObj.y = marginHeight - bounds.height - layoutCfg[i];
                break;
            default :
                break;
        }
    }
}

ToolUtils.setLayouts = function(disObjList,layoutCfg,marginWidth,marginHeight){
    for(var i=0; i<disObjList.length; i++){
        var disObj = disObjList[i];
        ToolUtils.setLayout(disObj,layoutCfg,marginWidth,marginHeight)
    }
}