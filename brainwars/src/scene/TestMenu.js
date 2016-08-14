/**
 * Created by Administrator on 15-8-22.
 */
function TestMenu(stage){
    this.bg = new createjs.Shape();
    this.curBorder = new createjs.Shape();
    this.height = stage.canvas.clientHeight;
    this.width = stage.canvas.clientWidth;
    this.menuWidth = this.width * 0.3;
    this.curBorderWidth = this.menuWidth * 0.8;
    this.nextBorderWidth = this.menuWidth * 0.6;
    this.timeDes;
    this.time ;
    this.scoreDes;
    this.score;
    this.scoreNum = 0;
    this.cur;
    this.next;
    this.intervalId = null;
    this.sec = GlobalModel.TIMEUP ;
    this.nextBorder = new createjs.Shape();
}
TestMenu.prototype = new createjs.Container();

TestMenu.prototype.init = function(){

    this.flag_sheet = new createjs.SpriteSheet({
        images: [ResManager.getRes("sentences")],
        frames: [[0,0,161,161,0,0,0],[161,0,161,161,0,0,0],[322,0,161,161,0,0,0],[483,0,161,161,0,0,0],
            [644,0,161,161,0,0,0],[805,0,161,161,0,0,0],[0,161,161,161,0,0,0],[161,161,161,161,0,0,0],
            [322,161,161,161,0,0,0],[483,161,161,161,0,0,0],[644,161,161,161,0,0,0],[805,161,161,161,0,0,0],
            [0,322,161,161,0,0,0],[161,322,161,161,0,0,0],[322,322,161,161,0,0,0],[483,322,161,161,0,0,0],
            [644,322,161,161,0,0,0],[805,322,161,161,0,0,0],[0,483,161,161,0,0,0],[161,483,161,161,0,0,0],
            [322,483,161,161,0,0,0],[483,483,161,161,0,0,0],[644,483,161,161,0,0,0],[805,483,161,161,0,0,0],
            [0,644,161,161,0,0,0],[161,644,161,161,0,0,0],[322,644,161,161,0,0,0],[483,644,161,161,0,0,0],
            [644,644,161,161,0,0,0],[805,644,161,161,0,0,0],[0,805,161,161,0,0,0],[161,805,161,161,0,0,0],
            [322,805,161,161,0,0,0],[483,805,161,161,0,0,0],[644,805,161,161,0,0,0],[805,805,161,161,0,0,0],
            [0,966,161,161,0,0,0],[161,966,161,161,0,0,0],[322,966,161,161,0,0,0],[483,966,161,161,0,0,0],
            [644,966,161,161,0,0,0],[805,966,161,161,0,0,0],[0,1127,161,161,0,0,0],[161,1127,161,161,0,0,0],
            [322,1127,161,161,0,0,0],[483,1127,161,161,0,0,0],[644,1127,161,161,0,0,0],[805,1127,161,161,0,0,0],
            [0,1288,161,161,0,0,0],[161,1288,161,161,0,0,0]]




});

    this.addChild(this.bg);
    this.addChild(this.curBorder);
    this.addChild(this.nextBorder);
    this.bg.graphics.beginFill("#3D3648").drawRect(0,0,this.width*0.3,this.height);
    //console.log("height:", this.height)
    this.curBorder.graphics.beginFill("#0DBBBC");
    this.curBorder.graphics.drawRect(0,0,this.curBorderWidth,this.curBorderWidth);
    this.curBorder.x = (this.menuWidth - this.curBorderWidth)/2;
    this.curBorder.y = 378;
    //"Time"
    this.timeDes = ToolUtils.createText(this,"Time","30px Arial","#59506E",125,85);
    //"00:00"
    this.time = ToolUtils.createText(this,"00:00","30px Arial","#0DBBBC",116,130);
    //"Score"
    this.scoreDes = ToolUtils.createText(this,"Score","30px Arial","#59506E",115,200);
    //"ScoreNum"
    this.score = ToolUtils.createText(this,"0","30px Arial","#0DBBBC",190,246)
    this.score.textAlign = "right";
    //"Current"
    this.cur = ToolUtils.createText(this,"Current","30px Arial","#59506E",195,320)
    //"Next"
    this.next = ToolUtils.createText(this,"Next","30px Arial","#59506E",195,this.curBorder.y + this.curBorderWidth + 50)


    this.nextBorder.graphics.beginFill("#59506E");
    this.nextBorder.graphics.drawRect(0,0,this.nextBorderWidth,this.nextBorderWidth);
    this.nextBorder.x = (this.menuWidth - this.nextBorderWidth)/2;
    this.nextBorder.y = this.next.y + 50;
    //console.log("nextborder:", this.nextBorder)
    // reset layout
    ToolUtils.setLayouts([
            this.timeDes, this.time, this.scoreDes,
            this.score, this.cur, this.next
        ],
        {right:60},this.menuWidth);

    this.curImg = ToolUtils.createSprite(this,this.flag_sheet,-1,this.curBorder.x+5,this.curBorder.y+5);
    this.curImg.scaleX = this.curImg.scaleY = (this.curBorderWidth-12)/160

    this.nextImg = ToolUtils.createSprite(this,this.flag_sheet,-1,this.nextBorder.x,this.nextBorder.y);
    this.nextImg.scaleX = this.nextImg.scaleY = this.nextBorderWidth/160;
    this.nextImg.alpha = 0.3;
    //this.nextImg.visible = false;


    //format time
    this.time.text = ToolUtils.timeFmt(this.sec);
    var _this = this;

    //next sentence
    GlobalEvent.on(GlobalEvent.Event_NextSentence, function(evt, index){
        //return;
       // console.log("img Index:", index, _this.curImg, _this.nextImg);
        var curSentence = GlobalModel.sentences[index];
        var nextSentence = GlobalModel.sentences[index+1];
        //console.log(curSentence, nextSentence)

        _this.curImg.gotoAndStop(curSentence.index);
        _this.curImg.alpha = 1;
        /*createjs.Tween.get(_this.curImg, {loop: false})
         .to({alpha:1}, 500, createjs.Ease.getPowInOut(2))*/

        _this.nextImg.gotoAndStop(nextSentence.index)
        _this.nextImg.alpha = 0;
        createjs.Tween.get(_this.nextImg, {loop: false})
            .to({alpha:0.3}, 500, createjs.Ease.getPowInOut(2))

    });
    //game start
    GlobalEvent.on(GlobalEvent.Event_TimeStart,function(){
        _this.reset();
        clearInterval(_this.intervalId);

        //SoundManager.stop();
        //SoundManager.play(GlobalModel.Sound_GameStart);

        _this.intervalId = setInterval(function(){
         if(_this.sec >0){
             _this.sec --;
             var _time = ToolUtils.timeFmt(_this.sec);
             //console.log("time:",_time)
             _this.time.text = _time;
             if(_this.sec <= 10){
                _this.heartbeat(_this.time,1.2);
             }

             GlobalEvent.dispatch(GlobalEvent.Event_NextTime)
         }else{
             clearInterval(_this.intervalId);
             GlobalEvent.dispatch(GlobalEvent.Event_GameOver)
         }

         },1000);
    })
    //right answer
    GlobalEvent.on(GlobalEvent.Event_Right,function(){

        _this.scoreNum ++;
        _this.score.text = _this.scoreNum.toString();
        GlobalModel.score = _this.scoreNum;
        console.log("score:", _this.scoreNum,_this.score);
        _this.heartbeat(_this.score,1.5)
    })
    //wrong answer
    GlobalEvent.on(GlobalEvent.Event_Wrong,function(){

        if(_this.scoreNum>0){
            _this.scoreNum --;
            _this.score.text = _this.scoreNum.toString();
            _this.heartbeat(_this.score,1.5)
        }
        console.log("score:", _this.scoreNum)

    })

    GlobalEvent.on(GlobalEvent.Event_GameOver, this.reset.bind(this));
    //menu 初始化完毕
    GlobalEvent.dispatch(GlobalEvent.Event_TestMenuInitComplete);
    //this.scaleX = this.scaleY = 0.8;
};

TestMenu.prototype.heartbeat = function(displayObj, scale){
    createjs.Tween.get(displayObj, {loop: false})
        .to({scaleX:scale,scaleY:scale}, 200, createjs.Ease.getPowInOut(2))
        .to({scaleX:1,scaleY:1}, 200, createjs.Ease.getPowInOut(2))
}
TestMenu.prototype.reset = function(){
    this.intervalId = null;
    this.sec = GlobalModel.TIMEUP ;
    this.scoreNum = 0;
    this.score.text = this.scoreNum.toString();
    this.time.text = ToolUtils.timeFmt(this.sec);
    //this.curImg.gotoAndStop(0);
    //this.nextImg.gotoAndStop(1);
}