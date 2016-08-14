/**
 * Created by Administrator on 15-8-22.
 */
function Brain(){
    this.box;

}
Brain.prototype = new createjs.Container();
Brain.prototype.show = function(){
    if(!this.box){

        //bg
        this.box = ToolUtils.createBitmap(this,"res/loading/box.png")

        //words
        this.word1 = ToolUtils.createBitmap(this,"res/loading/word1.png",75, 92)
        this.word3 = ToolUtils.createBitmap(this,"res/loading/word3.png",111, 229)
        this.word2 = ToolUtils.createBitmap(this,"res/loading/word2.png",48, 304)
        this.word4 = ToolUtils.createBitmap(this,"res/loading/word4.png",235, 340)
        //tween
        createjs.Tween.get(this.word1, {loop: true})
            .to({y: 180}, 2000,createjs.Ease.getPowInOut(2))
            .to({y:92}, 2000,createjs.Ease.getPowInOut(2))
        createjs.Tween.get(this.word2, {loop: true})
            .to({y: 400}, 3000,createjs.Ease.getPowInOut(2))
            .to({y:304}, 3000,createjs.Ease.getPowInOut(2))
        createjs.Tween.get(this.word3, {loop: true})
            .to({x: 29}, 4000,createjs.Ease.getPowInOut(2))
            .to({x:111}, 4000,createjs.Ease.getPowInOut(2))
        createjs.Tween.get(this.word4, {loop: true})
            .to({y: 129}, 5000,createjs.Ease.getPowInOut(2))
            .to({y:340}, 5000,createjs.Ease.getPowInOut(2))
        //brain
        this.brain1 = ToolUtils.createBitmap(this,"res/loading/brain1.png",64, 364)
        this.brain2 = ToolUtils.createBitmap(this,"res/loading/brain2.png",190, 124)
        //tween
        createjs.Tween.get(this.brain1, {loop: true})
            .to({x: 180}, 2000,createjs.Ease.getPowInOut(2))
            .to({x:64}, 2000,createjs.Ease.getPowInOut(2))
        createjs.Tween.get(this.brain2, {loop: true})
            .to({x: 100}, 3000,createjs.Ease.getPowInOut(2))
            .to({x:190}, 3000,createjs.Ease.getPowInOut(2))
    }


}
