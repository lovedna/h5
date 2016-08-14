var Fireworks2 = function (width,height) {
    
    this.x = 0;
    this.y = 0;
    this.balls = [];
    this.intervalId_firework;
    this.shape;
    this.height = height;
    this.width = width;
}

Fireworks2.prototype = new createjs.Shape();

Fireworks2.prototype.createBalls = function () {
    while (this.balls.length < 100) {
        var ball = new Particle();
        ball.init();
        ball.endR = 7 //* Math.random();
        this.balls.push(ball)
    }
    //this.cache(0,0,this.width, this.height)
}

Fireworks2.prototype.drawBalls = function () {
    if (!this.balls.length) {
        this.clear();
        return;
    }
    this.graphics.clear();
    /*var img = ResManager.getRes("logo")
    var iw = img.width;
    var ih = img.height;
    this.graphics.beginBitmapFill(img);*/
    //console.log("logo:", img.width)
    for (var i = 0; i < this.balls.length; i++) {
        var ball = this.balls[i];
        //画实心圆
        ball.update();
        //console.log(ball.x, ball.y, ball.radius);
        if (ball.destroy) {
            this.balls.splice(i, 1);
            i--;
            continue;
        }
        
        this.graphics.beginFill(ball.color).drawCircle(
            this.x+ ball.x, this.y + ball.y, ball.radius * ball.scaleX);
        
        /*this.graphics.drawRect(
            this.x + ball.x, this.y + ball.y, iw , ih  );*/
        
    }
    
}

Fireworks2.prototype.clear = function () {
    clearInterval(this.intervalId_firework);
    this.intervalId_firework = null;
}



Fireworks2.prototype.create = function () {
    /*if(!this.shape){
        this.shape = new createjs.Shape();
        this.addChild(this.shape);
        console.log("shape create");
    }*/
    this.clear();
    this.createBalls();
    this.drawBalls();
    this.intervalId_firework = setInterval(this.drawBalls.bind(this), 10);
}


//return Fireworks;