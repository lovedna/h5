/**
 * Created by Administrator on 15-8-23.
 */
function TestSentence(stage){
    this.height = stage.canvas.clientHeight;
    this.width = stage.canvas.clientWidth;
    this.itms = [];
    this.time = GlobalModel.MAX_SPEED;
    this.answer = null;
    this.count = 0;
    this.sentences = null;
    this.sentenceIndex = 0;
    this.sheet = null;
    this.ready = null;
    this.go = null;
    this.timeover = null;
    this.txt = null;
    this.groups = [];
    this.speed = 6;
    this.pool = new Pool();
    this.bottom_logo = null;
    this.sentenceContainer = new createjs.Container();

}

TestSentence.prototype = new createjs.Container();


TestSentence.prototype.init = function(){
    //ready go timeover
    this.sheet = new createjs.SpriteSheet({
        images: [ResManager.getRes("startscene")],
        frames: [[0,0,203,44,0,0,0],[203,0,84,32,0,0,0],[287,0,271,34,0,0,0],[558,0,386,364,0,0,0],[0,364,595,123,0,0,0],[0,487,656,73,0,0,0]]


});
    this.bottom_logo = ToolUtils.createSprite(this,this.sheet,5,(this.width*0.7-655)/2,this.height-100);
    this.addChild(this.sentenceContainer);
    this.ready = ToolUtils.createSprite(this,this.sheet,0,(this.width)/3,this.height/2);
    this.ready.regX = 101;
    this.ready.regY = 21.5;

    this.go = ToolUtils.createSprite(this,this.sheet,1,(this.width)/3,300);
    this.go.regX = 42;
    this.go.regY = 15.5;

    this.timeover = ToolUtils.createSprite(this,this.sheet,2,(this.width-250)/2,300);
    this.timeover.regX = 135;
    this.timeover.regY = 16.5;

    this.ready.alpha = this.go.alpha = this.timeover.alpha = 0;
    this.txt = ToolUtils.createText(this,"+1","60px Arial", "#fff");
    this.txt.alpha = 0;



    //show sentences
    var _this = this;
    this.initSentence();

    this.firework = new Fireworks2(this.width,this.height);
    this.addChild(this.firework);

    //check answer
    this.on("mousedown", function(evt){
        var container = evt.target;
        //right!!!!!!!!!!!!!!!////////////////////////////////////////////
        if(container.id == this.answer){
            _this.txt.text = "+1";
            GlobalEvent.dispatch(GlobalEvent.Event_Right);
            GlobalEvent.dispatch(GlobalEvent.Event_ShowFirework,{x:evt.stageX, y:evt.stageY});

            AudioManager.play(GlobalModel.Sound_Correct);
            //hide group itms
            for(var i=0; i<_this.groups.length; i++){
                var itm = _this.groups[i];
                if(itm.container == container) continue;
                createjs.Tween.get(itm.container, {override: true})
                    .wait(50*(i+1))
                    /*.to({alpha:0},200)*/
                    .call(function(tween){
                       _this.sentenceContainer.removeChild(tween.target);

                    });
            }
            _this.time-= GlobalModel.SPEED;
           _this.next();

        }else{
            //wrong!!!!!!!!!!!!!!!!!!!!!!!!
            GlobalEvent.dispatch(GlobalEvent.Event_Wrong);
            _this.txt.text = "-1"
            AudioManager.play(GlobalModel.Sound_Wrong);
        }
        // hide target
       createjs.Tween.get(container, {override: true}).to({alpha:0},200).call(function(){
           _this.sentenceContainer.removeChild(container);
       });
       // fly tip
        var rct = container.getBounds();
        _this.txt.x = container.x + rct.width/2;
        _this.txt.y = container.y + rct.height/2;
        _this.txt.alpha = 0;
        _this.txt.scaleX = _this.txt.scaleY = 0;
        _this.setChildIndex(_this.txt, _this.numChildren-1);
        createjs.Tween.get(_this.txt, {loop:false}).to({y: container.y-40, alpha:1, scaleX:1.5,scaleY:1.5},400,createjs.Ease.getPowInOut(2))
            .to({scaleX:1, scaleY:1,alpha: 0,y:container.y-60},200)
    })
    // start
    GlobalEvent.on(GlobalEvent.Event_GameStart, function(){
        console.log("sentence__________start!!!!!!!!!!!!!")
        //初始选项
        _this.initSentence();

        _this.ready.alpha = _this.go.alpha = _this.timeover.alpha = 0;
        _this.ready.y = _this.go.y = _this.timeover.y = _this.height/2-150;
        _this.ready.scaleX = _this.ready.scaleY = 0;
        _this.go.scaleX = _this.go.scaleY = 0;
        _this.timeover.scaleX = _this.timeover.scaleY = 0;

        /*setInterval(function(){
            _this.moveSentence()
        },20);*/

        createjs.Tween.get(_this.ready, {loop: false})
            .to({alpha: 1, scaleX:1.5, scaleY:1.5, y:_this.ready.y-100}, 500,createjs.Ease.getPowInOut(2))
            .to({y: _this.ready.y+200,scaleX:0, scaleY:0}, 600,createjs.Ease.getPowInOut(2))
            .to({alpha:0},100)

        createjs.Tween.get(_this.go, {loop: false}).wait(1000)
            .to({alpha: 1, scaleX:1.5, scaleY:1.5,y:_this.ready.y-100}, 500,createjs.Ease.getPowInOut(2))
            .to({y: _this.go.y+200,scaleX:0, scaleY:0}, 600,createjs.Ease.getPowInOut(2))
            .to({alpha:0},100)
            .call(function(){
                _this.next();
                //开始倒计时
                GlobalEvent.dispatch(GlobalEvent.Event_TimeStart);
                _this.setChildIndex(_this.timeover,_this.numChildren-1);
                createjs.Tween.get(_this.timeover, {loop: false}).wait((GlobalModel.TIMEUP -1)*1000)
                    .to({alpha: 1, scaleX:1.5, scaleY:1.5}, 800,createjs.Ease.getPowInOut(3))
                    .wait(800)
                    .to({alpha: 0, scaleX:0, scaleY:0},500,createjs.Ease.getPowInOut(2))
            })



        //_this.next();
    })
    //reset
    GlobalEvent.on(GlobalEvent.Event_GameOver,this.reset.bind(this))
    GlobalEvent.on(GlobalEvent.Event_TestMenuInitComplete, function(){
        _this.getCurSentence();
    });


}
TestSentence.prototype.initSentence = function(){
    //初始选项
    this.sentences = ResManager.getRes(GlobalModel.language).concat();
    this.sentences.map(function(itm,idx){
        itm.index = idx;
    })
    ToolUtils.randomListItems(this.sentences);
    GlobalModel.sentences = this.sentences;
}
TestSentence.prototype.getCurSentence = function(){
    if(this.sentenceIndex<this.sentences.length){
        var curSentence = this.sentences[this.sentenceIndex]
        //console.log("init scentence!!!!!!!!!!!!!!!!!")
        GlobalEvent.dispatch(GlobalEvent.Event_NextSentence,this.sentenceIndex)
        return curSentence
    }
}
TestSentence.prototype.next = function(){
    if(this.sentenceIndex<this.sentences.length){
        var curSentences = this.getCurSentence();
        console.log("itms:", this.itms.length)
        this.show(curSentences.sentences);
        this.sentenceIndex++;

    }

}
TestSentence.prototype.show = function(arr){
    var sentences = arr.concat();

    this.answer = sentences[0];
    console.log("answer:", this.answer)
    ToolUtils.randomListItems(sentences)
    var _this = this;
    this.groups.splice(0,this.groups.length);

    //console.log("groups clear:",_this.groups)

    for(var i=0; i<sentences.length; i++){
        var itm = null;
        if(_this.pool.isHaveItem()){
            itm = _this.pool.getItem();
        }else{
            itm = new TestSentenceItem();
            this.itms.push(itm);
        }
        if(!itm.container.parent){
            this.sentenceContainer.addChild(itm.container);
        }
        //console.log("parent:",itm.container.parent)
        itm.show(sentences[i]);

        //set x,y
        itm.container.y = -itm.container.height;
        itm.container.alpha = 1;
        itm.container.x = Math.random()*(this.width - itm.width- 300);
        _this.groups.push(itm);
        //console.log("groups add:",_this.groups)

        //move
        createjs.Tween.get(itm.container, {loop: false}).wait(i*this.time/7)
            .to({y: this.height}, this.time).call(function(tween){
                var target = tween.target;
                _this.sentenceContainer.removeChild(target);
                console.log("/////return itm:", target.id);

               /* for(var i=0; i<_this.itms.length; i++){
                    var tmp_itm = _this.itms[i];
                    var target = tween.target;
                    if(tmp_itm.container.id == target.id){

                        _this.pool.returnItem(tmp_itm);
                        //tmp_itm.container.y = -tmp_itm.container.height;

                        break;
                    }
                }*/

                if(target.id == _this.answer){
                    _this.next();
                }


        });
    }

}

/*TestSentence.prototype.moveSentence = function(){
    var len = this.sentenceContainer.numChildren;
    for(var i=0; i<len; i++){
        var child = this.sentenceContainer.getChildAt(i);
        child.y+= this.speed;
        if(child.y >= this.height){
            this.sentenceContainer.removeChild(child);
            i--;
            console.log("clear:",child.id)
            if(child.id == this.answer){
                this.next()
            }
        }
    }
}*/

TestSentence.prototype.reset = function(){

    this.time = GlobalModel.MAX_SPEED;
    this.answer = null;
    this.count = 0;
    this.sentenceIndex = 0;
    this.groups.splice(0,this.groups.length,1);
    this.speed = 6;
    //clear all items
    console.log("reset!!!!!!!!!!!!!",
        "children:",this.sentenceContainer.numChildren,
        "itms:", this.itms.length)

    //var len = this.sentenceContainer.numChildren
    for(var i=0; i<this.itms.length; i++){
        var itm = this.itms[i];
        var container = itm.container;
        container.y = -container.height;
        if(container.parent){
            this.sentenceContainer.removeChild(container);
        }

        this.pool.returnItem(itm);
    }

}