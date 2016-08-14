/**
 * Created by Administrator on 15-8-9.
 */
function TextLink(text, font, color, hoverColor) {
    // this super class constructor reference is automatically created by createjs.extends:
    this.Text_constructor(text, font, color);
    this.hoverColor = hoverColor;
    this.hover = false;
    this.hitArea = new createjs.Shape();
    this.textBaseline = "top";

    this.addEventListener("rollover", this);
    this.addEventListener("rollout", this);
}
createjs.extend(TextLink, createjs.Text);
//TextLink.prototype = new createjs.Text();

// use the same approach with draw:
TextLink.prototype.draw = function (ctx, ignoreCache) {
    // save default color, and overwrite it with the hover color if appropriate:
    var color = this.color;
    if (this.hover) {
        this.color = this.hoverColor;
    }

    // call Text's drawing method to do the real work of drawing to the canvas:
    // this super class method reference is automatically created by createjs.extends for methods overridden in the subclass:
    this.Text_draw(ctx, ignoreCache);

    // restore the default color value:
    this.color = color;

    // update hit area so the full text area is clickable, not just the characters:
    this.hitArea.graphics.clear().beginFill("#FFF").drawRect(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
};

// set up the handlers for mouseover / out:
TextLink.prototype.handleEvent = function (evt) {
    this.hover = (evt.type == "rollover");
};

// set up the inheritance relationship: TextLink extends Text.
createjs.promote(TextLink, "Text");
