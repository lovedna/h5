/**
 * Created by Administrator on 15-8-22.
 */
/**
 * Created by Administrator on 15-8-22.
 */
function EntryScene(stage){
    this.stage = stage;
    this.curBtn = null;
    this.eng_btn = null;
    this.jp_btn = null;
    this.image = null;
    this.flag_sheet = null;
    this.bg = null;
    this.brian = null;
    this.logo = null;
    this.start_btn = null;
    this.chose_txt = null;

}
EntryScene.prototype = new createjs.Container();
EntryScene.prototype.show = function(){

    //console.log("show EntryScene")
    var _this = this;

    if(!this.eng_btn){
        this.image = ResManager.getRes("flag");
        this.flag_sheet = new createjs.SpriteSheet({
            images: [this.image],
            frames: [[0,0,126,90,0,0,0],[126,0,126,90,0,0,0],[252,0,126,90,0,0,0],[378,0,125,90,0,0,0],[503,0,211,329,0,0,0],[0,329,641,1009,0,0,0],[0,1338,594,127,0,0,0],[594,1338,409,88,0,0,0],[0,1465,244,25,0,0,0]]

        });
        this.bg = ToolUtils.createSprite(this,this.flag_sheet,5);
        this.brian = ToolUtils.createSprite(this,this.flag_sheet,4,218,-340);
        this.logo = ToolUtils.createSprite(this,this.flag_sheet,7,132,-200);
        this.start_btn = new Button(this,25,-200,"start",0,ToolUtils.createSprite(this,this.flag_sheet,6),
            ToolUtils.createSprite(this,this.flag_sheet,6),null,selectLang);
        this.chose_txt = ToolUtils.createSprite(this,this.flag_sheet,8,200,1825);
        this.eng_btn = new Button(this,181,1886,"eng",1,ToolUtils.createSprite(this,this.flag_sheet,2),
            ToolUtils.createSprite(this,this.flag_sheet,3),null,selectLang)
        this.jp_btn = new Button(this,330,1886,"jp",1,ToolUtils.createSprite(this,this.flag_sheet,0),
            ToolUtils.createSprite(this,this.flag_sheet,1),null,selectLang);
    }

    this.brian.y = -340;
    this.logo.y = -200;
    this.start_btn.container.y = -200;
    this.chose_txt.y = 1825;
    this.eng_btn.container.y = 1886;
    this.jp_btn.container.y = 1886;
    createjs.Tween.removeAllTweens();
    createjs.Tween.get(this.brian, {loop: false}).to({y: 141}, 1000,createjs.Ease.getBackInOut(2));
    createjs.Tween.get(this.logo, {loop: false}).wait(200).to({y: 446}, 1000,createjs.Ease.getBackInOut(1))
    createjs.Tween.get(this.start_btn.container, {loop: false}).wait(120).to({y: 805}, 1000,createjs.Ease.getBackInOut(1))
    createjs.Tween.get(this.chose_txt, {loop: false}).wait(300).to({y: 600}, 1000,createjs.Ease.getBackInOut(1))
        .call(function () {

            createjs.Tween.get(_this.brian, {loop: true})
                .to({y: 100}, 3000,createjs.Ease.getPowInOut(1))
                .to({y: 141}, 3000,createjs.Ease.getPowInOut(1))

        })
    createjs.Tween.get(this.eng_btn.container, {loop: false}).wait(400).to({y: 664}, 1000,createjs.Ease.getBackInOut(0.5))
    createjs.Tween.get(this.jp_btn.container, {loop: false}).wait(450).to({y: 664}, 1000,createjs.Ease.getBackInOut(0.5))

    //this.scaleX = this.scaleY = 0.5;

    //console.log("Enter Scene!!!!!!!!!!!!!")


    function selectLang(target){
        var btn = target;
        AudioManager.play("loop")
        //SoundManager.play(GlobalModel.Sound_Btn)

        if(btn.name == "start"){
            //var myapp = new myNameSpace.MyApp();
            if(!GlobalModel.language){
                createjs.Tween.get(_this.eng_btn.container, {loop: false})
                    .to({scaleX: 1.1, scaleY: 1.1}, 300,createjs.Ease.getBackInOut(1))
                    .to({scaleX: 1, scaleY: 1}, 300,createjs.Ease.getBackInOut(1));
                createjs.Tween.get(_this.jp_btn.container, {loop: false})
                    .to({scaleX: 1.1, scaleY: 1.1}, 350,createjs.Ease.getBackInOut(1))
                    .to({scaleX: 1, scaleY: 1}, 330,createjs.Ease.getBackInOut(1));
                //createjs.Sound.play("gamestart")
            }else{
                GlobalEvent.dispatch(GlobalEvent.Event_ShowStartScene);
                AudioManager.play(GlobalModel.Sound_GameEntry);
            }
            console.log("start ", GlobalModel.language);
        }else{
            if(_this.curBtn && _this.curBtn!= btn){
                _this.curBtn.setState(0);

            }
            _this.curBtn = btn;
            GlobalModel.language = btn.name;

        }

    }
}