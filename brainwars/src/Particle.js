function Particle() {
    this.x;
    this.y;
    this.vx;
    this.vy;
    this.life;
    this.size;

    this._count = 10;
    this.destroy = false;


    this.friction = 0.98 //0.99;
    this.vectx = -0.3;
    this.vecty = -0.3 //-0.8;
    this.xrandom = 0.3 //0.8;
    this.yrandom = 0.3;
    this.color = 0;
    this.radius = 0;

}




Particle.prototype.init = function () {
    this.radius = Math.random() * 10 //30;

    /*var red:uint = Math.floor(Math.random()*255);
			var blue:uint = Math.floor(Math.random()*255);
			var green:uint = Math.floor(Math.random()*255);
			*/
    this.color = parseInt(Math.random() * 16777215) //(red << 16) | (green << 8) | (blue);
    this.color = "#"+this.color.toString(16);

    this.vx = Math.random() * this.radius - this.radius / 2;
    this.vy = Math.random() * this.radius - this.radius / 2;
    this.life = Math.random() * this.radius + this.radius / 2;
    this._count = 1;
    this.destroy = false;
    this.scaleX = this.scaleY = 1;
    this.x = this.y = 0;
    //console.log(this.color.toString(16));
}


Particle.prototype.update = function () {
    this.vx -=0.01
    this.vy += .1
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    var offset = Math.random() * 0.05;
    this._count -= offset
        //this.alpha -= offset
    this.scaleX -= offset;
    this.scaleY -= offset;
    //console.log(this._count);
    if (this._count <= 0) {
        this.destroy = true;
        //console.log("distroy");
    }

}

