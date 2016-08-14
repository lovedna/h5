/**
 * Created by Administrator on 15-8-25.
 */
/**
 * Created by Administrator on 15-8-22.
 */
/**
 * Created by Administrator on 15-8-22.
 */
function OverScene(stage){
    this.stage = stage;
    this.image = null;
    this.flag_sheet = null;
    this.bg = null;
    this.brian = null;
    this.share_btn = null;
    this.start_btn = null;
    this.app_btn = null;
    this.score_txt = null;
    this.judge = null;
    this.height = stage.canvas.clientHeight;
    this.width = stage.canvas.clientWidth;
    this.IQ = null;
    this.shareIcon = null;
    this.shareInfo = null;
    this.percent = null;
    this.score = null;
    this.scoreNum = null;
    this.modal = null;

}
OverScene.prototype = new createjs.Container();

OverScene.prototype.show = function(){

    console.log("show OverScene")
    // play gameover sound
    AudioManager.stop(GlobalModel.Sound_GameStart);

    var _this = this;
    if (this.image) {
    } else {
        this.image = ResManager.getRes("sceneover");
        this.flag_sheet = new createjs.SpriteSheet({
            images: [this.image],
            frames: [[0,0,210,328,0,0,0],[210,0,596,210,0,0,0],[0,328,299,127,0,0,0],[299,328,298,127,0,0,0],[0,455,610,126,0,0,0],[0,581,454,33,0,0,0],[454,581,454,39,0,0,0],[0,620,454,35,0,0,0],[454,620,454,34,0,0,0],[0,655,402,38,0,0,0],[402,655,67,74,0,0,0]]

    });
        var brain_sheet = new createjs.SpriteSheet({
            images: [ResManager.getRes("brain")],
            framerate: 3,
            frames: [[0, 0, 212, 328, 0, 0, 0], [212, 0, 212, 328, 0, 0, 0], [424, 0, 212, 328, 0, 0, 0], [636, 0, 212, 328, 0, 0, 0], [0, 328, 212, 328, 0, 0, 0], [212, 328, 213, 328, 0, 0, 0], [425, 328, 212, 328, 0, 0, 0], [637, 328, 212, 328, 0, 0, 0], [0, 656, 212, 328, 0, 0, 0], [212, 656, 212, 328, 0, 0, 0], [424, 656, 212, 328, 0, 0, 0], [636, 656, 212, 328, 0, 0, 0], [0, 984, 212, 328, 0, 0, 0], [212, 984, 212, 328, 0, 0, 0], [424, 984, 212, 328, 0, 0, 0], [636, 984, 212, 328, 0, 0, 0], [0, 1312, 212, 328, 0, 0, 0], [212, 1312, 213, 328, 0, 0, 0], [425, 1312, 213, 328, 0, 0, 0], [638, 1312, 213, 328, 0, 0, 0], [0, 1640, 213, 328, 0, 0, 0]]
        });
        var IQ_sheet = new createjs.SpriteSheet({
            images: [ResManager.getRes("brain")],
            frames: [[213, 1640, 120, 119, 0, 0, 0], [333, 1640, 120, 119, 0, 0, 0], [453, 1640, 120, 119, 0, 0, 0], [573, 1640, 121, 119, 0, 0, 0]]
        });


        this.bg = ToolUtils.createSprite(this, this.flag_sheet, 1, 26, 20);
        this.brian = ToolUtils.createSprite(this, brain_sheet, 0, 220, 44);

        this.IQ = ToolUtils.createSprite(this, IQ_sheet, 1, 260, 65);
        this.IQ.visible = false;

        //setInterval(function(){_this.IQ.gotoAndStop(_this.IQ.currentFrame+1)},4000);

        this.start_btn = new Button(this, 11, 680, "start", 0, ToolUtils.createSprite(this, this.flag_sheet, 2),
            ToolUtils.createSprite(this, this.flag_sheet, 2), null, clickHandler);
        this.share_btn = new Button(this, 326, 680, "share", 1, ToolUtils.createSprite(this, this.flag_sheet, 3),
            ToolUtils.createSprite(this, this.flag_sheet, 3), null, clickHandler)
        this.app_btn = new Button(this, 14, 832, "app", 1, ToolUtils.createSprite(this, this.flag_sheet, 4),
            ToolUtils.createSprite(this, this.flag_sheet, 4), null, clickHandler);

        this.judge = ToolUtils.createSprite(this, this.flag_sheet, 5, 26, 440);

        var rct = this.judge.getBounds();
        this.judge.regX = rct.width / 2;
        this.judge.regY = rct.height / 2;
        //console.log(this.width)
        this.percent = ToolUtils.createText(this,"恭喜你击败了全球 80% 的小伙伴唷~","24px Arial","#fff",150,480);
        this.scoreNum = ToolUtils.createText(this,"20","120px Arial","#D96482",280,580);
        this.score = ToolUtils.createText(this,"score","30px Verdana","#D96482",
            this.scoreNum.x ,this.percent.y+10)

        var _bounds = this.getBounds();
        this.modal = new createjs.Shape();
        this.modal.graphics.beginFill("#342C42").drawRect(0, 0,_bounds.width,_bounds.height);
        this.addChild(this.modal);
        this.modal.alpha = 0.94;
        this.modal.visible = false;

        this.shareIcon = ToolUtils.createSprite(this,this.flag_sheet,10,520,40);
        this.shareIcon.visible = false;
        this.modal.on("click", function(){
            showShareIcon(false)
        })

        this.shareInfo = ToolUtils.createBitmap(this, "res/next.png", 100, 100);


    }

    this.scoreNum.text = GlobalModel.score.toString();
    var bounds = this.scoreNum.getBounds();
    this.scoreNum.regX = bounds.width/2;
    this.scoreNum.regY = bounds.height/2;

    this.score.x = this.scoreNum.x + bounds.width/2+40;
    this.score.y = this.scoreNum.y-35;

    bounds = this.score.getBounds();
    this.score.regX = bounds.width/2;
    this.score.regY = bounds.height/2;

    this.brian.y = -340;
    this.start_btn.container.y = 1886;
    this.share_btn.container.y = 1886;
    this.app_btn.container.y = 1886;
    this.judge.alpha = 0;
    this.judge.x = 320;
    this.judge.scaleX = this.judge.scaleY = 0;

    this.score.scaleX = this.score.scaleY = 0;
    this.scoreNum.scaleX = this.scoreNum.scaleY = 0;
    this.percent.alpha = 0;
    this.percent.y = 460;

    this.shareInfo.visible = false;

    createjs.Tween.get(this.brian, {loop: false}).to({y: 44}, 1000,createjs.Ease.get(2))
        .call(function () {
            createjs.Tween.get(_this.judge, {loop: false})
                .to({alpha: 1, scaleX:1.2, scaleY:1.2}, 800,createjs.Ease.getBackInOut(2))
            createjs.Tween.get(_this.scoreNum, {loop: false})
                .wait(300)
                .to({alpha: 1, scaleX:1, scaleY:1}, 800,createjs.Ease.getBackInOut(1))
            createjs.Tween.get(_this.score, {loop: false})
                .wait(400)
                .to({alpha: 1, scaleX:1, scaleY:1}, 800,createjs.Ease.getBackInOut(1))
            createjs.Tween.get(_this.percent, {loop: false})
                .wait(400)
                .to({alpha: 1, y:480}, 1000,createjs.Ease.getBackInOut(2))

            _this.brian.play();

            _this.IQ.y = 100;
            _this.IQ.visible = true;
            /////////////////////////////等级和排名计算规则///////////////////////////////////////////////////////////
            var percents = ["0", "2", "4", "7", "10", "13", "16", "20", "24", "28",
                "32", "36", "40", "43", "46", "48", "50", "60", "65", "70", "75",
                "80", "85", "88", "90", "92", "95", "99"];
            var index = Math.max(0, Math.min(percents.length-1, GlobalModel.score));
            console.log("index:", index)
            var my_percent = percents[index];
            var my_range = "你击败了全球 " +  my_percent.toString()  + "% 的小伙伴唷~" ;
            _this.percent.text = my_range;
            var level = Math.min(3, parseInt(GlobalModel.score/8));
            _this.IQ.gotoAndStop(level);
            _this.judge.gotoAndStop(5+level);

            GlobalModel.shareTitle = GlobalModel.charges[level];

            createjs.Tween.get(_this.IQ, {loop: true})
                .to({y:65}, 500,createjs.Ease.getBackOut(3))
                .to({y:100}, 300,createjs.Ease.getPowIn(1))

        })
    createjs.Tween.get(this.start_btn.container, {loop: false}).wait(200).to({y: 660}, 1000,createjs.Ease.getBackInOut(0.6))
    createjs.Tween.get(this.share_btn.container, {loop: false}).wait(320).to({y: 660}, 1000,createjs.Ease.getBackInOut(0.6))
    createjs.Tween.get(this.app_btn.container, {loop: false}).wait(400).to({y: 815}, 1000,createjs.Ease.getBackInOut(0.8))


    function clickHandler(target){
        var btn = target;
        //console.log(btn.name);
        switch(btn.name){
            case "start" :
                GlobalEvent.dispatch(GlobalEvent.Event_ShowEntryScene);
                break;
            case "share" :

                //GlobalEvent.dispatch(GlobalEvent.Event_ShowEntryScene);
                //console.log("_this:", _this);
                showShareIcon(true);
                //app.gotoStore();
                break;
            case "app" :
                //GlobalEvent.dispatch(GlobalEvent.Event_ShowEntryScene);
                app.gotoStore();
                AudioManager.stop("loop")
                break;

        }

        _this.brian.stop();
        _this.IQ.visible = false;
        createjs.Tween.get(_this.IQ, {override: true})

        //AudioManager.play(GlobalModel.Sound_GameOver);
    }

    //this.scaleX = this.scaleY = 0.5;
    function showShareIcon(value){
        //console.log("this:", _this)
        //var _this = this;
        if(value){
            _this.shareIcon.x = 540;
            _this.shareIcon.y = 20;
            _this.shareIcon.alpha = 0;
            _this.shareInfo.x = -100;

            createjs.Tween.get(_this.shareInfo, {loop: false})
                .to({x:100}, 500,createjs.Ease.getPowInOut(2))

            createjs.Tween.get(_this.shareIcon, {loop: false})
                .wait(500)
                .to({alpha:1}, 1000,createjs.Ease.getPowInOut(3))

            createjs.Tween.get(_this.shareIcon, {loop: true})
                .to({x:540, y: 20}, 500,createjs.Ease.getPowInOut(3))
                .to({x:520, y: 40}, 500,createjs.Ease.getPowInOut(2))
                .to({x:540, y: 20}, 500,createjs.Ease.getPowInOut(2))




            _this.modal.visible = true;
            _this.shareIcon.visible = true;
            _this.shareInfo.visible = true;
        }else{
            createjs.Tween.get(_this.shareIcon,{override:true})
            _this.modal.visible = false;
            _this.shareIcon.visible = false;
            _this.shareInfo.visible = false;
        }
    }

}