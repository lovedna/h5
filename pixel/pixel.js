(function ($hx_exports) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.preloader = null;
ApplicationMain.embed = $hx_exports.openfl.embed = function(elementName,width,height,background) {
	var element = null;
	if(elementName != null) element = window.document.getElementById(elementName);
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	openfl.Lib.create(element,width,height,color);
	ApplicationMain.preloader = new NMEPreloader();
	openfl.Lib.current.addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var sounds = [];
	var id;
	if(ApplicationMain.total == 0) ApplicationMain.start(); else {
		var $it0 = ApplicationMain.urlLoaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new openfl.net.URLRequest(path));
		}
		var _g = 0;
		while(_g < sounds.length) {
			var soundName = sounds[_g];
			++_g;
			var sound = new openfl.media.Sound();
			sound.addEventListener(openfl.events.Event.COMPLETE,ApplicationMain.sound_onComplete);
			sound.addEventListener(openfl.events.IOErrorEvent.IO_ERROR,ApplicationMain.sound_onIOError);
			sound.load(new openfl.net.URLRequest(soundName + ".ogg"));
		}
	}
};
ApplicationMain.main = function() {
};
ApplicationMain.start = function() {
	ApplicationMain.preloader.addEventListener(openfl.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
};
ApplicationMain.image_onLoad = function(_) {
	ApplicationMain.assetsLoaded++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.assetsLoaded,ApplicationMain.total);
	if(ApplicationMain.assetsLoaded == ApplicationMain.total) ApplicationMain.start();
};
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.assetsLoaded++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.assetsLoaded,ApplicationMain.total);
	if(ApplicationMain.assetsLoaded == ApplicationMain.total) ApplicationMain.start();
};
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(openfl.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	openfl.Lib.current.removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	var hasMain = false;
	var _g = 0;
	var _g1 = Type.getClassFields(Main);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	if(hasMain) Reflect.callMethod(Main,Reflect.field(Main,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(instance,openfl.display.DisplayObject)) openfl.Lib.current.addChild(instance); else {
			haxe.Log.trace("Error: No entry point found",{ fileName : "ApplicationMain.hx", lineNumber : 180, className : "ApplicationMain", methodName : "preloader_onComplete"});
			haxe.Log.trace("If you are using DCE with a static main, you may need to @:keep the function",{ fileName : "ApplicationMain.hx", lineNumber : 181, className : "ApplicationMain", methodName : "preloader_onComplete"});
		}
	}
};
ApplicationMain.sound_onComplete = function(event) {
	ApplicationMain.assetsLoaded++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.assetsLoaded,ApplicationMain.total);
	if(ApplicationMain.assetsLoaded == ApplicationMain.total) ApplicationMain.start();
};
ApplicationMain.sound_onIOError = function(event) {
	ApplicationMain.assetsLoaded++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.assetsLoaded,ApplicationMain.total);
	if(ApplicationMain.assetsLoaded == ApplicationMain.total) ApplicationMain.start();
};
var openfl = {};
openfl.events = {};
openfl.events.IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl.events.IEventDispatcher;
openfl.events.IEventDispatcher.__name__ = ["openfl","events","IEventDispatcher"];
openfl.events.IEventDispatcher.prototype = {
	__class__: openfl.events.IEventDispatcher
};
openfl.events.EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl.events.EventDispatcher;
openfl.events.EventDispatcher.__name__ = ["openfl","events","EventDispatcher"];
openfl.events.EventDispatcher.__interfaces__ = [openfl.events.IEventDispatcher];
openfl.events.EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl.events.EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) this.__eventMap = new haxe.ds.StringMap();
		if(!this.__eventMap.exists(type)) {
			var list = new Array();
			list.push(new openfl.events._EventDispatcher.Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1 = this.__eventMap.get(type);
			list1.push(new openfl.events._EventDispatcher.Listener(listener,useCapture,priority));
			list1.sort(openfl.events.EventDispatcher.__sortByPriority);
		}
	}
	,dispatchEvent: function(event) {
		if(this.__eventMap == null || event == null) return false;
		var list = this.__eventMap.get(event.type);
		if(list == null) return false;
		if(event.target == null) {
			if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		}
		event.currentTarget = this;
		var capture = event.eventPhase == 0;
		var index = 0;
		var listener;
		while(index < list.length) {
			listener = list[index];
			if(listener.useCapture == capture) {
				listener.callback(event);
				if(event.__isCancelledNow) return true;
			}
			if(listener == list[index]) index++;
		}
		return true;
	}
	,hasEventListener: function(type) {
		if(this.__eventMap == null) return false;
		return this.__eventMap.exists(type);
	}
	,removeEventListener: function(type,listener,capture) {
		if(capture == null) capture = false;
		if(this.__eventMap == null) return;
		var list = this.__eventMap.get(type);
		if(list == null) return;
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].match(listener,capture)) {
				list.splice(i,1);
				break;
			}
		}
		if(list.length == 0) this.__eventMap.remove(type);
		if(!this.__eventMap.iterator().hasNext()) this.__eventMap = null;
	}
	,toString: function() {
		var full = Type.getClassName(Type.getClass(this));
		var $short = full.split(".").pop();
		return "[object " + $short + "]";
	}
	,willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,__class__: openfl.events.EventDispatcher
};
openfl.display = {};
openfl.display.IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl.display.IBitmapDrawable;
openfl.display.IBitmapDrawable.__name__ = ["openfl","display","IBitmapDrawable"];
openfl.display.IBitmapDrawable.prototype = {
	__class__: openfl.display.IBitmapDrawable
};
openfl.display.DisplayObject = function() {
	openfl.events.EventDispatcher.call(this);
	this.set_alpha(1);
	this.set_rotation(0);
	this.set_scaleX(1);
	this.set_scaleY(1);
	this.set_visible(true);
	this.set_x(0);
	this.set_y(0);
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl.geom.Matrix();
	this.set_name("instance" + ++openfl.display.DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl.display.DisplayObject;
openfl.display.DisplayObject.__name__ = ["openfl","display","DisplayObject"];
openfl.display.DisplayObject.__interfaces__ = [openfl.display.IBitmapDrawable];
openfl.display.DisplayObject.__super__ = openfl.events.EventDispatcher;
openfl.display.DisplayObject.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	dispatchEvent: function(event) {
		var result = openfl.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
		if(event.__isCancelled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = 2;
			this.parent.dispatchEvent(event);
		}
		return result;
	}
	,getBounds: function(targetCoordinateSpace) {
		var matrix = this.__getTransform();
		if(targetCoordinateSpace != null) {
			matrix = new openfl.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			matrix.concat(targetCoordinateSpace.__worldTransform.clone().invert());
		}
		var bounds = new openfl.geom.Rectangle();
		this.__getBounds(bounds,matrix);
		return bounds;
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,globalToLocal: function(pos) {
		return this.__getTransform().clone().invert().transformPoint(pos);
	}
	,hitTestObject: function(obj) {
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		return false;
	}
	,localToGlobal: function(point) {
		return this.__getTransform().transformPoint(point);
	}
	,__applyStyle: function(renderSession,setTransform,setAlpha,setClip) {
		if(setTransform && this.__worldTransformChanged) this.__style.setProperty(renderSession.transformProperty,this.__worldTransform.to3DString(renderSession.roundPixels),null);
		if(this.__worldZ != ++renderSession.z) {
			this.__worldZ = renderSession.z;
			this.__style.setProperty("z-index",Std.string(this.__worldZ),null);
		}
		if(setAlpha && this.__worldAlphaChanged) {
			if(this.__worldAlpha < 1) this.__style.setProperty("opacity",Std.string(this.__worldAlpha),null); else this.__style.removeProperty("opacity");
		}
		if(setClip && this.__worldClipChanged) {
			if(this.__worldClip == null) this.__style.removeProperty("clip"); else {
				var clip = this.__worldClip.transform(this.__worldTransform.clone().invert());
				this.__style.setProperty("clip","rect(" + clip.y + "px, " + clip.get_right() + "px, " + clip.get_bottom() + "px, " + clip.x + "px)",null);
			}
		}
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
			if(event.__isCancelled) return true;
			return result;
		}
		return false;
	}
	,__getBounds: function(rect,matrix) {
	}
	,__getInteractive: function(stack) {
	}
	,__getLocalBounds: function(rect) {
		this.__getTransform();
		this.__getBounds(rect,new openfl.geom.Matrix());
	}
	,__getTransform: function() {
		if(openfl.display.DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			while(current.parent != null) {
				list.push(current);
				current = current.parent;
				if(current.__transformDirty) transformDirty = true;
			}
			if(transformDirty) {
				var i = list.length;
				while(--i >= 0) list[i].__update(true,false);
			}
		}
		return this.__worldTransform;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		return false;
	}
	,__initializeElement: function(element,renderSession) {
		this.__style = element.style;
		this.__style.setProperty("position","absolute",null);
		this.__style.setProperty("top","0",null);
		this.__style.setProperty("left","0",null);
		this.__style.setProperty(renderSession.transformOriginProperty,"0 0 0",null);
		renderSession.element.appendChild(element);
		this.__worldAlphaChanged = true;
		this.__worldClipChanged = true;
		this.__worldTransformChanged = true;
		this.__worldVisibleChanged = true;
		this.__worldZ = -1;
	}
	,__renderCanvas: function(renderSession) {
	}
	,__renderDOM: function(renderSession) {
	}
	,__renderMask: function(renderSession) {
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
		}
	}
	,__setRenderDirty: function() {
		if(!this.__renderDirty) {
			this.__renderDirty = true;
			openfl.display.DisplayObject.__worldRenderDirty++;
		}
	}
	,__setTransformDirty: function() {
		if(!this.__transformDirty) {
			this.__transformDirty = true;
			openfl.display.DisplayObject.__worldTransformDirty++;
		}
	}
	,__update: function(transformOnly,updateChildren) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(this.get_rotation() != this.__rotationCache) {
			this.__rotationCache = this.get_rotation();
			var radians = this.get_rotation() * (Math.PI / 180);
			this.__rotationSine = Math.sin(radians);
			this.__rotationCosine = Math.cos(radians);
		}
		if(this.parent != null) {
			var parentTransform = this.parent.__worldTransform;
			var a00 = this.__rotationCosine * this.get_scaleX();
			var a01 = this.__rotationSine * this.get_scaleX();
			var a10 = -this.__rotationSine * this.get_scaleY();
			var a11 = this.__rotationCosine * this.get_scaleY();
			var b00 = parentTransform.a;
			var b01 = parentTransform.b;
			var b10 = parentTransform.c;
			var b11 = parentTransform.d;
			this.__worldTransform.a = a00 * b00 + a01 * b10;
			this.__worldTransform.b = a00 * b01 + a01 * b11;
			this.__worldTransform.c = a10 * b00 + a11 * b10;
			this.__worldTransform.d = a10 * b01 + a11 * b11;
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x() * b00 + this.get_y() * b10 + parentTransform.tx;
				this.__worldTransform.ty = this.get_x() * b01 + this.get_y() * b11 + parentTransform.ty;
			} else {
				this.__worldTransform.tx = (this.get_x() - this.get_scrollRect().x) * b00 + (this.get_y() - this.get_scrollRect().y) * b10 + parentTransform.tx;
				this.__worldTransform.ty = (this.get_x() - this.get_scrollRect().x) * b01 + (this.get_y() - this.get_scrollRect().y) * b11 + parentTransform.ty;
			}
		} else {
			this.__worldTransform.a = this.__rotationCosine * this.get_scaleX();
			this.__worldTransform.c = -this.__rotationSine * this.get_scaleY();
			this.__worldTransform.b = this.__rotationSine * this.get_scaleX();
			this.__worldTransform.d = this.__rotationCosine * this.get_scaleY();
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x();
				this.__worldTransform.ty = this.get_y();
			} else {
				this.__worldTransform.tx = this.get_y() - this.get_scrollRect().x;
				this.__worldTransform.ty = this.get_y() - this.get_scrollRect().y;
			}
		}
		if(updateChildren && this.__transformDirty) {
			this.__transformDirty = false;
			openfl.display.DisplayObject.__worldTransformDirty--;
		}
		if(!transformOnly) {
			if(this.parent != null) this.__worldAlpha = this.get_alpha() * this.parent.__worldAlpha; else this.__worldAlpha = this.get_alpha();
			if(updateChildren && this.__renderDirty) this.__renderDirty = false;
		}
	}
	,__updateChildren: function(transformOnly) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(!this.__renderable && !this.__isMask) return;
		this.__worldAlpha = this.get_alpha();
		if(this.__transformDirty) {
			this.__transformDirty = false;
			openfl.display.DisplayObject.__worldTransformDirty--;
		}
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,set_alpha: function(value) {
		if(value != this.__alpha) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__alpha = value;
	}
	,get_filters: function() {
		if(this.__filters == null) return new Array(); else return this.__filters.slice();
	}
	,set_filters: function(value) {
		return value;
	}
	,get_height: function() {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		return bounds.height * this.get_scaleY();
	}
	,set_height: function(value) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		if(value != bounds.height) this.set_scaleY(value / bounds.height); else this.set_scaleY(1);
		return value;
	}
	,get_mask: function() {
		return this.__mask;
	}
	,set_mask: function(value) {
		if(value != this.__mask) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		if(this.__mask != null) this.__mask.__isMask = false;
		if(value != null) value.__isMask = true;
		return this.__mask = value;
	}
	,get_mouseX: function() {
		if(this.stage != null) return this.globalToLocal(new openfl.geom.Point(this.stage.__mouseX,0)).x;
		return 0;
	}
	,get_mouseY: function() {
		if(this.stage != null) return this.globalToLocal(new openfl.geom.Point(0,this.stage.__mouseY)).y;
		return 0;
	}
	,get_name: function() {
		return this.__name;
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_root: function() {
		if(this.stage != null) return openfl.Lib.current;
		return null;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,set_rotation: function(value) {
		if(value != this.__rotation) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__rotation = value;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_scaleX: function(value) {
		if(value != this.__scaleX) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleX = value;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,set_scaleY: function(value) {
		if(this.__scaleY != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleY = value;
	}
	,get_scrollRect: function() {
		return this.__scrollRect;
	}
	,set_scrollRect: function(value) {
		if(value != this.__scrollRect) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scrollRect = value;
	}
	,get_transform: function() {
		if(this.__transform == null) this.__transform = new openfl.geom.Transform(this);
		return this.__transform;
	}
	,set_transform: function(value) {
		if(value == null) throw new openfl.errors.TypeError("Parameter transform must be non-null.");
		if(this.__transform == null) this.__transform = new openfl.geom.Transform(this);
		if(!this.__transformDirty) {
			this.__transformDirty = true;
			openfl.display.DisplayObject.__worldTransformDirty++;
		}
		this.__transform.set_matrix(value.get_matrix().clone());
		this.__transform.colorTransform = new openfl.geom.ColorTransform(value.colorTransform.redMultiplier,value.colorTransform.greenMultiplier,value.colorTransform.blueMultiplier,value.colorTransform.alphaMultiplier,value.colorTransform.redOffset,value.colorTransform.greenOffset,value.colorTransform.blueOffset,value.colorTransform.alphaOffset);
		return this.__transform;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_visible: function(value) {
		if(value != this.__visible) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__visible = value;
	}
	,get_width: function() {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		return bounds.width * this.get_scaleX();
	}
	,set_width: function(value) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		if(value != bounds.width) this.set_scaleX(value / bounds.width); else this.set_scaleX(1);
		return value;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(value) {
		if(value != this.__x) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__x = value;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(value) {
		if(value != this.__y) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__y = value;
	}
	,__class__: openfl.display.DisplayObject
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_width:"set_width",get_width:"get_width",set_visible:"set_visible",get_visible:"get_visible",set_transform:"set_transform",get_transform:"get_transform",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_rotation:"set_rotation",get_rotation:"get_rotation",get_root:"get_root",set_name:"set_name",get_name:"get_name",get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",set_mask:"set_mask",get_mask:"get_mask",set_height:"set_height",get_height:"get_height",set_filters:"set_filters",get_filters:"get_filters",set_alpha:"set_alpha",get_alpha:"get_alpha"}
});
openfl.display.InteractiveObject = function() {
	openfl.display.DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.tabEnabled = true;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl.display.InteractiveObject;
openfl.display.InteractiveObject.__name__ = ["openfl","display","InteractiveObject"];
openfl.display.InteractiveObject.__super__ = openfl.display.DisplayObject;
openfl.display.InteractiveObject.prototype = $extend(openfl.display.DisplayObject.prototype,{
	requestSoftKeyboard: function() {
		openfl.Lib.notImplemented("InteractiveObject.requestSoftKeyboard");
		return false;
	}
	,__getInteractive: function(stack) {
		stack.push(this);
		if(this.parent != null) this.parent.__getInteractive(stack);
	}
	,__class__: openfl.display.InteractiveObject
});
openfl.display.DisplayObjectContainer = function() {
	openfl.display.InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = new Array();
	this.__removedChildren = new Array();
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl.display.DisplayObjectContainer;
openfl.display.DisplayObjectContainer.__name__ = ["openfl","display","DisplayObjectContainer"];
openfl.display.DisplayObjectContainer.__super__ = openfl.display.InteractiveObject;
openfl.display.DisplayObjectContainer.prototype = $extend(openfl.display.InteractiveObject.prototype,{
	addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED,true));
		}
		return child;
	}
	,addChildAt: function(child,index) {
		if(index > this.__children.length || index < 0) throw "Invalid index position " + index;
		if(child.parent == this) HxOverrides.remove(this.__children,child); else {
			if(child.parent != null) child.parent.removeChild(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED,true));
		}
		this.__children.splice(index,0,child);
		return child;
	}
	,areInaccessibleObjectsUnderPoint: function(point) {
		return false;
	}
	,contains: function(child) {
		return HxOverrides.indexOf(this.__children,child,0) > -1;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__children[index];
		return null;
	}
	,getChildByName: function(name) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_name() == name) return child;
		}
		return null;
	}
	,getChildIndex: function(child) {
		var _g1 = 0;
		var _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__children[i] == child) return i;
		}
		return -1;
	}
	,getObjectsUnderPoint: function(point) {
		point = this.localToGlobal(point);
		var stack = new Array();
		this.__hitTest(point.x,point.y,false,stack,false);
		stack.shift();
		return stack;
	}
	,removeChild: function(child) {
		if(child != null && child.parent == this) {
			if(this.stage != null) child.__setStageReference(null);
			child.parent = null;
			HxOverrides.remove(this.__children,child);
			this.__removedChildren.push(child);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED,true));
		}
		return child;
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.removeChild(this.__children[index]);
		return null;
	}
	,removeChildren: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 2147483647;
		if(beginIndex == null) beginIndex = 0;
		if(endIndex == 2147483647) {
			endIndex = this.__children.length - 1;
			if(endIndex < 0) return;
		}
		if(beginIndex > this.__children.length - 1) return; else if(endIndex < beginIndex || beginIndex < 0 || endIndex > this.__children.length) throw new openfl.errors.RangeError("The supplied index is out of bounds.");
		var numRemovals = endIndex - beginIndex;
		while(numRemovals >= 0) {
			this.removeChildAt(beginIndex);
			numRemovals--;
		}
	}
	,setChildIndex: function(child,index) {
		if(index >= 0 && index <= this.__children.length && child.parent == this) {
			HxOverrides.remove(this.__children,child);
			this.__children.splice(index,0,child);
		}
	}
	,swapChildren: function(child1,child2) {
		if(child1.parent == this && child2.parent == this) {
			var index1 = HxOverrides.indexOf(this.__children,child1,0);
			var index2 = HxOverrides.indexOf(this.__children,child2,0);
			this.__children[index1] = child2;
			this.__children[index2] = child1;
		}
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.__children[child1];
		this.__children[child1] = this.__children[child2];
		this.__children[child2] = swap;
		swap = null;
	}
	,__broadcast: function(event,notifyChilden) {
		if(event.target == null) event.target = this;
		if(notifyChilden) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__broadcast(event,true);
				if(event.__isCancelled) return true;
			}
		}
		return openfl.display.InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
	}
	,__getBounds: function(rect,matrix) {
		if(this.__children.length == 0) return;
		var matrixCache = null;
		if(matrix != null) {
			matrixCache = this.__worldTransform;
			this.__worldTransform = matrix;
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(!child.__renderable) continue;
			child.__getBounds(rect,null);
		}
		if(matrix != null) {
			this.__worldTransform = matrixCache;
			this.__updateChildren(true);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var i = this.__children.length;
		if(interactiveOnly && (stack == null || !this.mouseChildren)) {
			while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,null,interactiveOnly)) {
				if(stack != null) stack.push(this);
				return true;
			}
		} else if(stack != null) {
			var length = stack.length;
			while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,stack,interactiveOnly)) {
				stack.splice(length,0,this);
				return true;
			}
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.get_scrollRect() != null) renderSession.maskManager.pushRect(this.get_scrollRect(),this.__worldTransform);
		if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) renderSession.maskManager.popMask();
		if(this.get_scrollRect() != null) renderSession.maskManager.popMask();
	}
	,__renderDOM: function(renderSession) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderDOM(renderSession);
		}
		var _g2 = 0;
		var _g11 = this.__removedChildren;
		while(_g2 < _g11.length) {
			var orphan = _g11[_g2];
			++_g2;
			if(orphan.stage == null) orphan.__renderDOM(renderSession);
		}
		this.__removedChildren = [];
	}
	,__renderMask: function(renderSession) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		renderSession.context.rect(0,0,bounds.width,bounds.height);
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__setStageReference(stage);
			}
		}
	}
	,__update: function(transformOnly,updateChildren) {
		openfl.display.InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren);
		if(!this.__renderable) return;
		if(updateChildren) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__update(transformOnly,true);
			}
		}
	}
	,__updateChildren: function(transformOnly) {
		openfl.display.InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__update(transformOnly,true);
		}
	}
	,get_numChildren: function() {
		return this.__children.length;
	}
	,__class__: openfl.display.DisplayObjectContainer
	,__properties__: $extend(openfl.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
openfl.display.Sprite = function() {
	openfl.display.DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
};
$hxClasses["openfl.display.Sprite"] = openfl.display.Sprite;
openfl.display.Sprite.__name__ = ["openfl","display","Sprite"];
openfl.display.Sprite.__super__ = openfl.display.DisplayObjectContainer;
openfl.display.Sprite.prototype = $extend(openfl.display.DisplayObjectContainer.prototype,{
	startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		openfl.Lib.notImplemented("Sprite.startDrag");
	}
	,stopDrag: function() {
		openfl.Lib.notImplemented("Sprite.stopDrag");
	}
	,__getBounds: function(rect,matrix) {
		openfl.display.DisplayObjectContainer.prototype.__getBounds.call(this,rect,matrix);
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix != null?matrix:this.__worldTransform);
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var length = 0;
		if(stack != null) length = stack.length;
		if(openfl.display.DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly)) return true; else if(this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__worldTransform)) {
			if(stack != null) stack.splice(length,0,this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) {
			this.__graphics.__render();
			if(this.__graphics.__canvas != null) {
				if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
				var context = renderSession.context;
				context.globalAlpha = this.__worldAlpha;
				var transform = this.__worldTransform;
				if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
				if(this.get_scrollRect() == null) context.drawImage(this.__graphics.__canvas,this.__graphics.__bounds.x,this.__graphics.__bounds.y); else context.drawImage(this.__graphics.__canvas,this.get_scrollRect().x - this.__graphics.__bounds.x,this.get_scrollRect().y - this.__graphics.__bounds.y,this.get_scrollRect().width,this.get_scrollRect().height,this.__graphics.__bounds.x + this.get_scrollRect().x,this.__graphics.__bounds.y + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
				if(this.__mask != null) renderSession.maskManager.popMask();
			}
		}
		openfl.display.DisplayObjectContainer.prototype.__renderCanvas.call(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable && this.__graphics != null) {
			if(this.__graphics.__dirty || this.__worldAlphaChanged || this.__canvas == null && this.__graphics.__canvas != null) {
				this.__graphics.__render();
				if(this.__graphics.__canvas != null) {
					if(this.__canvas == null) {
						this.__canvas = window.document.createElement("canvas");
						this.__canvasContext = this.__canvas.getContext("2d");
						this.__initializeElement(this.__canvas,renderSession);
					}
					this.__canvas.width = this.__graphics.__canvas.width;
					this.__canvas.height = this.__graphics.__canvas.height;
					this.__canvasContext.globalAlpha = this.__worldAlpha;
					this.__canvasContext.drawImage(this.__graphics.__canvas,0,0);
				} else if(this.__canvas != null) {
					renderSession.element.removeChild(this.__canvas);
					this.__canvas = null;
					this.__style = null;
				}
			}
			if(this.__canvas != null) {
				if(this.__worldTransformChanged) {
					var transform = new openfl.geom.Matrix();
					transform.translate(this.__graphics.__bounds.x,this.__graphics.__bounds.y);
					transform = transform.mult(this.__worldTransform);
					this.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
				}
				this.__applyStyle(renderSession,false,false,true);
			}
		} else if(this.__canvas != null) {
			renderSession.element.removeChild(this.__canvas);
			this.__canvas = null;
			this.__style = null;
		}
		openfl.display.DisplayObjectContainer.prototype.__renderDOM.call(this,renderSession);
	}
	,__renderMask: function(renderSession) {
		if(this.__graphics != null) this.__graphics.__renderMask(renderSession); else openfl.display.DisplayObjectContainer.prototype.__renderMask.call(this,renderSession);
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl.display.Graphics();
		return this.__graphics;
	}
	,__class__: openfl.display.Sprite
	,__properties__: $extend(openfl.display.DisplayObjectContainer.prototype.__properties__,{get_graphics:"get_graphics"})
});
var Main = function() {
	openfl.display.Sprite.call(this);
	this.addEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.added));
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	openfl.Lib.current.stage.align = openfl.display.StageAlign.TOP_LEFT;
	openfl.Lib.current.stage.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
	openfl.Lib.current.addChild(new Main());
};
Main.__super__ = openfl.display.Sprite;
Main.prototype = $extend(openfl.display.Sprite.prototype,{
	resize: function(e) {
		if(!this.inited) this.init();
	}
	,init: function() {
		if(this.inited) return;
		this.inited = true;
		new game.client.ClientContext(this);
	}
	,added: function(e) {
		this.removeEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.added));
		this.stage.addEventListener(openfl.events.Event.RESIZE,$bind(this,this.resize));
		this.init();
	}
	,__class__: Main
});
var DocumentClass = function() {
	this.stage = openfl.Lib.current.stage;
	Main.call(this);
	this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	__class__: DocumentClass
});
openfl.AssetLibrary = function() {
};
$hxClasses["openfl.AssetLibrary"] = openfl.AssetLibrary;
openfl.AssetLibrary.__name__ = ["openfl","AssetLibrary"];
openfl.AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getBitmapData: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getMovieClip: function(id) {
		return null;
	}
	,getMusic: function(id) {
		return this.getSound(id);
	}
	,getPath: function(id) {
		return null;
	}
	,getSound: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		return null;
	}
	,load: function(handler) {
		handler(this);
	}
	,loadBitmapData: function(id,handler) {
		handler(this.getBitmapData(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadMovieClip: function(id,handler) {
		handler(this.getMovieClip(id));
	}
	,loadMusic: function(id,handler) {
		handler(this.getMusic(id));
	}
	,loadSound: function(id,handler) {
		handler(this.getSound(id));
	}
	,loadText: function(id,handler) {
		var callback = function(bytes) {
			if(bytes == null) handler(null); else handler(bytes.readUTFBytes(bytes.length));
		};
		this.loadBytes(id,callback);
	}
	,__class__: openfl.AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe.ds.StringMap();
	this.path = new haxe.ds.StringMap();
	this.className = new haxe.ds.StringMap();
	openfl.AssetLibrary.call(this);
	var id;
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = openfl.AssetLibrary;
DefaultAssetLibrary.prototype = $extend(openfl.AssetLibrary.prototype,{
	exists: function(id,type) {
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == type || (type == openfl.AssetType.SOUND || type == openfl.AssetType.MUSIC) && (assetType == openfl.AssetType.MUSIC || assetType == openfl.AssetType.SOUND)) return true;
			if(type == openfl.AssetType.BINARY || type == null) return true;
		}
		return false;
	}
	,getBitmapData: function(id) {
		return openfl.display.BitmapData.fromImage((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = ApplicationMain.images.get(key);
			return $r;
		}(this)));
	}
	,getBytes: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = ApplicationMain.urlLoaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			bytes = new openfl.utils.ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,openfl.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getFont: function(id) {
		return js.Boot.__cast(Type.createInstance(this.className.get(id),[]) , openfl.text.Font);
	}
	,getMusic: function(id) {
		var sound = new openfl.media.Sound();
		sound.__buffer = true;
		sound.load(new openfl.net.URLRequest(this.path.get(id)));
		return sound;
	}
	,getPath: function(id) {
		return this.path.get(id);
	}
	,getSound: function(id) {
		return new openfl.media.Sound(new openfl.net.URLRequest(this.path.get(id)));
	}
	,getText: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = ApplicationMain.urlLoaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") return data; else if(js.Boot.__instanceof(data,openfl.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes.readUTFBytes(bytes.length);
		} else return null;
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		var items = [];
		var $it0 = this.type.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			if(type == null || this.exists(id,type)) items.push(id);
		}
		return items;
	}
	,loadBitmapData: function(id,handler) {
		if(this.path.exists(id)) {
			var loader = new openfl.display.Loader();
			loader.contentLoaderInfo.addEventListener(openfl.events.Event.COMPLETE,function(event) {
				handler((js.Boot.__cast(event.currentTarget.content , openfl.display.Bitmap)).bitmapData);
			});
			loader.load(new openfl.net.URLRequest(this.path.get(id)));
		} else handler(this.getBitmapData(id));
	}
	,loadBytes: function(id,handler) {
		if(this.path.exists(id)) {
			var loader = new openfl.net.URLLoader();
			loader.addEventListener(openfl.events.Event.COMPLETE,function(event) {
				var bytes = new openfl.utils.ByteArray();
				bytes.writeUTFBytes(event.currentTarget.data);
				bytes.position = 0;
				handler(bytes);
			});
			loader.load(new openfl.net.URLRequest(this.path.get(id)));
		} else handler(this.getBytes(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadMusic: function(id,handler) {
		handler(this.getMusic(id));
	}
	,loadSound: function(id,handler) {
		handler(this.getSound(id));
	}
	,loadText: function(id,handler) {
		if(this.path.exists(id)) {
			var loader = new openfl.net.URLLoader();
			loader.addEventListener(openfl.events.Event.COMPLETE,function(event) {
				handler(event.currentTarget.data);
			});
			loader.load(new openfl.net.URLRequest(this.path.get(id)));
		} else handler(this.getText(id));
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var NMEPreloader = function() {
	openfl.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new openfl.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = openfl.display.Sprite;
NMEPreloader.prototype = $extend(openfl.display.Sprite.prototype,{
	getBackgroundColor: function() {
		return 11259375;
	}
	,getHeight: function() {
		var height = 512;
		if(height > 0) return height; else return openfl.Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 288;
		if(width > 0) return width; else return openfl.Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var format = {};
format.tools = {};
format.tools.Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["format.tools.Adler32"] = format.tools.Adler32;
format.tools.Adler32.__name__ = ["format","tools","Adler32"];
format.tools.Adler32.read = function(i) {
	var a = new format.tools.Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
format.tools.Adler32.prototype = {
	update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: format.tools.Adler32
};
format.tools.Huffman = $hxClasses["format.tools.Huffman"] = { __ename__ : ["format","tools","Huffman"], __constructs__ : ["Found","NeedBit","NeedBits"] };
format.tools.Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.HuffTools = function() {
};
$hxClasses["format.tools.HuffTools"] = format.tools.HuffTools;
format.tools.HuffTools.__name__ = ["format","tools","HuffTools"];
format.tools.HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw "assert";
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return format.tools.Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw "assert";
		}
		var size = 1 << d;
		var table = new Array();
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(format.tools.Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return format.tools.Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw "Invalid huffman";
		var idx = v << 5 | len;
		if(bits.exists(idx)) return format.tools.Huffman.Found(bits.get(idx));
		v <<= 1;
		len += 1;
		return format.tools.Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = new Array();
		var tmp = new Array();
		if(maxbits > 32) throw "Invalid huffman";
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw "Invalid huffman";
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe.ds.IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.set(n << 5 | l,i3);
			}
		}
		return this.treeCompress(format.tools.Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: format.tools.HuffTools
};
format.tools.Inflate = function() { };
$hxClasses["format.tools.Inflate"] = format.tools.Inflate;
format.tools.Inflate.__name__ = ["format","tools","Inflate"];
format.tools.Inflate.run = function(bytes) {
	return format.tools.InflateImpl.run(new haxe.io.BytesInput(bytes));
};
format.tools._InflateImpl = {};
format.tools._InflateImpl.Window = function(hasCrc) {
	this.buffer = haxe.io.Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new format.tools.Adler32();
};
$hxClasses["format.tools._InflateImpl.Window"] = format.tools._InflateImpl.Window;
format.tools._InflateImpl.Window.__name__ = ["format","tools","_InflateImpl","Window"];
format.tools._InflateImpl.Window.prototype = {
	slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe.io.Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: format.tools._InflateImpl.Window
};
format.tools._InflateImpl.State = $hxClasses["format.tools._InflateImpl.State"] = { __ename__ : ["format","tools","_InflateImpl","State"], __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
format.tools._InflateImpl.State.Head = ["Head",0];
format.tools._InflateImpl.State.Head.toString = $estr;
format.tools._InflateImpl.State.Head.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Block = ["Block",1];
format.tools._InflateImpl.State.Block.toString = $estr;
format.tools._InflateImpl.State.Block.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.CData = ["CData",2];
format.tools._InflateImpl.State.CData.toString = $estr;
format.tools._InflateImpl.State.CData.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Flat = ["Flat",3];
format.tools._InflateImpl.State.Flat.toString = $estr;
format.tools._InflateImpl.State.Flat.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Crc = ["Crc",4];
format.tools._InflateImpl.State.Crc.toString = $estr;
format.tools._InflateImpl.State.Crc.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Dist = ["Dist",5];
format.tools._InflateImpl.State.Dist.toString = $estr;
format.tools._InflateImpl.State.Dist.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.DistOne = ["DistOne",6];
format.tools._InflateImpl.State.DistOne.toString = $estr;
format.tools._InflateImpl.State.DistOne.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Done = ["Done",7];
format.tools._InflateImpl.State.Done.toString = $estr;
format.tools._InflateImpl.State.Done.__enum__ = format.tools._InflateImpl.State;
format.tools.InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new format.tools.HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = format.tools._InflateImpl.State.Head; else this.state = format.tools._InflateImpl.State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = new Array();
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new format.tools._InflateImpl.Window(crc);
};
$hxClasses["format.tools.InflateImpl"] = format.tools.InflateImpl;
format.tools.InflateImpl.__name__ = ["format","tools","InflateImpl"];
format.tools.InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) bufsize = 65536;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var output = new haxe.io.BytesBuffer();
	var inflate = new format.tools.InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) break;
	}
	return output.getBytes();
};
format.tools.InflateImpl.prototype = {
	buildFixedHuffman: function() {
		if(format.tools.InflateImpl.FIXED_HUFFMAN != null) return format.tools.InflateImpl.FIXED_HUFFMAN;
		var a = new Array();
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		format.tools.InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return format.tools.InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw "Invalid data";
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw "Invalid data";
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw "Invalid data";
				break;
			default:
				throw "Invalid data";
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8 || cinfo != 7) throw "Invalid data";
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw "Invalid data";
			if(fdict) throw "Unsupported dictionary";
			this.state = format.tools._InflateImpl.State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = format.tools._InflateImpl.State.Done;
				return true;
			}
			var crc = format.tools.Adler32.read(this.input);
			if(!calc.equals(crc)) throw "Invalid CRC";
			this.state = format.tools._InflateImpl.State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw "Invalid data";
				this.state = format.tools._InflateImpl.State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = format.tools._InflateImpl.State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[format.tools.InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[format.tools.InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = new Array();
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = format.tools._InflateImpl.State.CData;
				return true;
			default:
				throw "Invalid data";
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = format.tools._InflateImpl.State.Crc; else this.state = format.tools._InflateImpl.State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = format.tools._InflateImpl.State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = format.tools._InflateImpl.State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = format.tools._InflateImpl.State.Crc; else this.state = format.tools._InflateImpl.State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = format.tools.InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw "Invalid data";
				this.len = format.tools.InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = format.tools.InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw "Invalid data";
				this.dist = format.tools.InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw "Invalid data";
				if(this.dist == 1) this.state = format.tools._InflateImpl.State.DistOne; else this.state = format.tools._InflateImpl.State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: format.tools.InflateImpl
};
var lovedna = {};
lovedna.framework = {};
lovedna.framework.core = {};
lovedna.framework.core.IRegister = function() { };
$hxClasses["lovedna.framework.core.IRegister"] = lovedna.framework.core.IRegister;
lovedna.framework.core.IRegister.__name__ = ["lovedna","framework","core","IRegister"];
lovedna.framework.core.IRegister.prototype = {
	__class__: lovedna.framework.core.IRegister
};
lovedna.framework.core.IActor = function() { };
$hxClasses["lovedna.framework.core.IActor"] = lovedna.framework.core.IActor;
lovedna.framework.core.IActor.__name__ = ["lovedna","framework","core","IActor"];
lovedna.framework.core.IActor.__interfaces__ = [lovedna.framework.core.IRegister];
lovedna.framework.core.IActor.prototype = {
	__class__: lovedna.framework.core.IActor
};
lovedna.framework.Actor = function() {
};
$hxClasses["lovedna.framework.Actor"] = lovedna.framework.Actor;
lovedna.framework.Actor.__name__ = ["lovedna","framework","Actor"];
lovedna.framework.Actor.__interfaces__ = [lovedna.framework.core.IActor];
lovedna.framework.Actor.prototype = {
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		this._actorEvent.addEventListener(type,listener,useCapture,priority,useWeakReference);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		this._actorEvent.removeEventListener(type,listener,useCapture);
	}
	,dispatchEvent: function(event) {
		return this._actorEvent.dispatchEvent(event);
	}
	,onRegister: function() {
	}
	,getInstance: function(value,name) {
		if(name == null) name = "";
		return this._singleton.getInstance(value,name);
	}
	,inject: function(value) {
		this._singleton.inject(value);
	}
	,__class__: lovedna.framework.Actor
};
lovedna.framework.Context = function(stage) {
	lovedna.framework.Actor.call(this);
	if(stage == null) {
		haxe.Log.trace("DisplayObjectContainer not set",{ fileName : "Context.hx", lineNumber : 48, className : "lovedna.framework.Context", methodName : "new"});
		return;
	}
	this._typeClassMap = new haxe.ds.StringMap();
	this._oneshotMap = new haxe.ds.StringMap();
	this._followMap = new haxe.ds.StringMap();
	this._singleton = new lovedna.injector.Singleton();
	this._singleton.setInstance(lovedna.injector.Singleton,this._singleton);
	this._singleton.setInstance(openfl.display.DisplayObjectContainer,stage);
	this._singleton.setInstance(lovedna.framework.Context,this);
	this._singleton.setInstance(openfl.events.EventDispatcher,new openfl.events.EventDispatcher());
	this._singleton.inject(this);
	this._singleton.setCreateHandler($bind(this,this.singletonCreate));
	this.onRegister();
};
$hxClasses["lovedna.framework.Context"] = lovedna.framework.Context;
lovedna.framework.Context.__name__ = ["lovedna","framework","Context"];
lovedna.framework.Context.__super__ = lovedna.framework.Actor;
lovedna.framework.Context.prototype = $extend(lovedna.framework.Actor.prototype,{
	mapCommand: function(type,commandClass,eventClass,oneshot) {
		if(oneshot == null) oneshot = false;
		if(eventClass == null) eventClass = openfl.events.Event;
		var type_map;
		if(!this._typeClassMap.exists(type)) {
			type_map = new haxe.ds.StringMap();
			this._typeClassMap.set(type,type_map);
		} else type_map = this._typeClassMap.get(type);
		var list;
		var name = lovedna.rtti.Description.getQCN(eventClass);
		if(!type_map.exists(name)) {
			list = [];
			type_map.set(name,list);
		} else list = type_map.get(name);
		if(!Lambda.has(list,eventClass)) list.push(commandClass);
		if(oneshot) {
			var key = type + "#" + lovedna.rtti.Description.getQCN(eventClass) + "#" + lovedna.rtti.Description.getQCN(commandClass);
			this._oneshotMap.set(key,true);
		}
		this.addEventListener(type,$bind(this,this.eventhandler));
	}
	,unmapCommand: function(type,commandClass,eventClass) {
		if(eventClass == null) eventClass = openfl.events.Event;
		var type_map;
		if(this._typeClassMap.exists(type)) {
			type_map = this._typeClassMap.get(type);
			var list;
			var name = lovedna.rtti.Description.getQCN(eventClass);
			if(type_map.exists(name)) {
				list = type_map.get(name);
				var len = list.length;
				while(len-- > 0) {
					var cmdClass = list[len];
					if(cmdClass == commandClass) list.splice(len,1);
				}
			}
		}
	}
	,mapInstance: function(start,follow) {
		var qcn = lovedna.rtti.Description.getQCN(start);
		if(!this._followMap.exists(qcn)) this._followMap.set(qcn,[follow]); else {
			var list = this._followMap.get(qcn);
			if(Lambda.indexOf(list,follow) == -1) list.push(follow);
		}
	}
	,singletonCreate: function(classType,instance,name) {
		if(js.Boot.__instanceof(instance,lovedna.framework.core.IRegister)) {
			var actor;
			actor = js.Boot.__cast(instance , lovedna.framework.core.IRegister);
			actor.onRegister();
		}
		var qcn = lovedna.rtti.Description.getQCN(classType);
		if(this._followMap.exists(qcn)) {
			var list = this._followMap.get(qcn);
			this._followMap.remove(qcn);
			var len = list.length;
			while(len-- > 0) this.getInstance(list[len]);
			list = null;
		}
	}
	,eventhandler: function(e) {
		var type = e.type;
		var type_map;
		if(this._typeClassMap.exists(type)) {
			type_map = this._typeClassMap.get(type);
			var list;
			var eventclass = lovedna.rtti.Description.getClass(e);
			var name = lovedna.rtti.Description.getQCN(eventclass);
			if(type_map.exists(name)) {
				list = type_map.get(name);
				var len = list.length;
				this._singleton.setInstance(eventclass,e);
				var oneshot = type + "#" + lovedna.rtti.Description.getQCN(eventclass) + "#";
				while(len-- > 0) {
					var commandClass = list[len];
					oneshot += lovedna.rtti.Description.getQCN(commandClass);
					var remove = false;
					if(this._oneshotMap.exists(oneshot)) remove = true;
					var cmd = this.getInstance(commandClass);
					if(js.Boot.__instanceof(cmd,lovedna.framework.core.ICommand)) {
						this._singleton.inject(cmd);
						var icommand;
						icommand = js.Boot.__cast(cmd , lovedna.framework.core.ICommand);
						icommand.execute();
					}
					if(remove) list.splice(len,1);
				}
				if(list.length == 0) this._typeClassMap.remove(type);
			}
		}
	}
	,__class__: lovedna.framework.Context
});
var game = {};
game.client = {};
game.client.ClientContext = function(stage) {
	lovedna.framework.Context.call(this,stage);
};
$hxClasses["game.client.ClientContext"] = game.client.ClientContext;
game.client.ClientContext.__name__ = ["game","client","ClientContext"];
game.client.ClientContext.__super__ = lovedna.framework.Context;
game.client.ClientContext.prototype = $extend(lovedna.framework.Context.prototype,{
	onRegister: function() {
		lovedna.framework.Context.prototype.onRegister.call(this);
		var canvas = this._camera._canvas;
		this._container.addChild(canvas);
		canvas.setSafeCut(0,0,60,30);
		lovedna.utils.Log.init(this._container);
		lovedna.utils.Log.showPackage = false;
		this._container.addChild(new openfl.display.FPS());
		game.client.config.AppConfig.flashStage = this._container;
		var flashstage = this._container.stage;
		flashstage.addEventListener(openfl.events.KeyboardEvent.KEY_DOWN,$bind(this,this.keyDownhandler));
		flashstage.addEventListener(openfl.events.KeyboardEvent.KEY_UP,$bind(this,this.keyUphandler));
		lovedna.utils.ResizeUtil.add(canvas,288,512);
		this.mapCommand("gameStart",game.client.command.GameStartCommand,game.client.event.GameEvent,true);
		this.mapCommand("data_export",game.client.command.ExportDataCommand,game.client.event.GameEvent);
		this.mapCommand("dataComplete",game.client.command.GameDataCompleteCommand,game.client.event.GameEvent,true);
		this.mapCommand("ad_status",game.client.command.AdStatusCommand,game.client.event.ADEvent);
		this.dispatchEvent(new game.client.event.GameEvent("gameStart"));
	}
	,keyDownhandler: function(e) {
		if(e.keyCode == 27) {
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	}
	,keyUphandler: function(e) {
		var code = e.keyCode;
		if((function($this) {
			var $r;
			var $int = code;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) == 27) {
			e.stopPropagation();
			e.stopImmediatePropagation();
			if(this._stageService == null) this._stageService = this.getInstance(game.client.service.StageService);
			var count = this._stageService.exit();
			if(count == 0) {
			}
		} else if((function($this) {
			var $r;
			var int1 = code;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)) == 32) {
			if(this._draw == null) this._draw = this.getInstance(game.client.module.draw.DrawStage);
			this._draw.changeMode();
		} else if((function($this) {
			var $r;
			var int2 = code;
			$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
			return $r;
		}(this)) == 13) this.dispatchEvent(new game.client.event.GameEvent("data_export")); else if((function($this) {
			var $r;
			var aNeg = code < 0;
			var bNeg = 49 < 0;
			$r = aNeg != bNeg?aNeg:code >= 49;
			return $r;
		}(this)) && (function($this) {
			var $r;
			var aNeg1 = 53 < 0;
			var bNeg1 = code < 0;
			$r = aNeg1 != bNeg1?aNeg1:53 >= code;
			return $r;
		}(this))) this.dispatchEvent(new game.client.event.ADEvent(code - 48));
	}
	,__class__: game.client.ClientContext
});
lovedna.framework.core.ICommand = function() { };
$hxClasses["lovedna.framework.core.ICommand"] = lovedna.framework.core.ICommand;
lovedna.framework.core.ICommand.__name__ = ["lovedna","framework","core","ICommand"];
lovedna.framework.core.ICommand.__interfaces__ = [lovedna.framework.core.IActor];
lovedna.framework.core.ICommand.prototype = {
	__class__: lovedna.framework.core.ICommand
};
lovedna.framework.Command = function() {
	lovedna.framework.Actor.call(this);
};
$hxClasses["lovedna.framework.Command"] = lovedna.framework.Command;
lovedna.framework.Command.__name__ = ["lovedna","framework","Command"];
lovedna.framework.Command.__interfaces__ = [lovedna.framework.core.ICommand];
lovedna.framework.Command.__super__ = lovedna.framework.Actor;
lovedna.framework.Command.prototype = $extend(lovedna.framework.Actor.prototype,{
	addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
	}
	,execute: function() {
	}
	,__class__: lovedna.framework.Command
});
game.client.command = {};
game.client.command.AdStatusCommand = function() {
	lovedna.framework.Command.call(this);
};
$hxClasses["game.client.command.AdStatusCommand"] = game.client.command.AdStatusCommand;
game.client.command.AdStatusCommand.__name__ = ["game","client","command","AdStatusCommand"];
game.client.command.AdStatusCommand.__super__ = lovedna.framework.Command;
game.client.command.AdStatusCommand.prototype = $extend(lovedna.framework.Command.prototype,{
	execute: function() {
		lovedna.framework.Command.prototype.execute.call(this);
		if(this._stageService.isOpen(this._stageConfig.day)) {
			var day = this._stageService.getInstance(game.client.module.day.DayStage);
			day.adStatus(this._event.getStatus());
		}
	}
	,__class__: game.client.command.AdStatusCommand
});
game.client.command.ExportDataCommand = function() {
	lovedna.framework.Command.call(this);
};
$hxClasses["game.client.command.ExportDataCommand"] = game.client.command.ExportDataCommand;
game.client.command.ExportDataCommand.__name__ = ["game","client","command","ExportDataCommand"];
game.client.command.ExportDataCommand.__super__ = lovedna.framework.Command;
game.client.command.ExportDataCommand.prototype = $extend(lovedna.framework.Command.prototype,{
	execute: function() {
		if(!this._stageService.hasOpen(this._drawstage)) return;
		var ba = this._drawstage.getNameImage();
		if(ba == null) return;
		this._name = ba;
		this._list = this._drawstage.getResult();
		new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.create)).start(600,true);
	}
	,create: function() {
		var list = this._list;
		var row = list._width;
		var col = list._height;
		var rightstart = row;
		var count = 0;
		var cols;
		var len;
		while(rightstart-- > 0) {
			cols = list.getCol(rightstart);
			len = cols.length;
			count = 0;
			while(len-- > 0) if(cols[len]) count += 1; else count += 0;
			if(count > 0) break;
		}
		rightstart++;
		var leftstart = 0;
		var _g = 0;
		while(_g < row) {
			var i = _g++;
			cols = list.getCol(i);
			len = cols.length;
			count = 0;
			while(len-- > 0) if(cols[len]) count += 1; else count += 0;
			if(count > 0) {
				leftstart = i;
				break;
			}
		}
		var startop = 0;
		var _g1 = 0;
		while(_g1 < col) {
			var i1 = _g1++;
			cols = list.getRow(i1);
			len = cols.length;
			count = 0;
			while(len-- > 0) if(cols[len]) count += 1; else count += 0;
			if(count > 0) {
				startop = i1;
				break;
			}
		}
		var startbottom = col;
		while(startbottom-- > 0) {
			cols = list.getRow(startbottom);
			len = cols.length;
			count = 0;
			while(len-- > 0) if(cols[len]) count += 1; else count += 0;
			if(count > 0) break;
		}
		startbottom++;
		var w = rightstart - leftstart;
		var h = startbottom - startop;
		if(w < 1 || h < 1) return;
		var arr2 = new lovedna.utils.Array2(w,h);
		var _g2 = 0;
		while(_g2 < w) {
			var i2 = _g2++;
			var _g11 = 0;
			while(_g11 < h) {
				var j = _g11++;
				var v = list._list[(j + startop) * list._width + (i2 + leftstart)];
				arr2._list[j * arr2._width + i2] = v;
			}
		}
		var ba = new openfl.utils.ByteArray();
		ba.writeByte(w);
		ba.writeByte(h);
		len = arr2._length;
		var bits = new lovedna.utils.BitArray(len);
		var _g3 = 0;
		while(_g3 < len) {
			var i3 = _g3++;
			var v1 = arr2._list[i3];
			if(v1) bits.open(i3);
		}
		var vlist = bits.getFields();
		len = vlist.length;
		var _g4 = 0;
		while(_g4 < len) {
			var i4 = _g4++;
			ba.writeInt(vlist[i4]);
		}
		var png = new lovedna.utils.png.PngReader();
		png.read(this._name);
		var data = new lovedna.utils.png.Chunk(ba,1716666723);
		png.addChunk(data);
		var save = png.encode();
	}
	,__class__: game.client.command.ExportDataCommand
});
game.client.command.GameDataCompleteCommand = function() {
	lovedna.framework.Command.call(this);
};
$hxClasses["game.client.command.GameDataCompleteCommand"] = game.client.command.GameDataCompleteCommand;
game.client.command.GameDataCompleteCommand.__name__ = ["game","client","command","GameDataCompleteCommand"];
game.client.command.GameDataCompleteCommand.__super__ = lovedna.framework.Command;
game.client.command.GameDataCompleteCommand.prototype = $extend(lovedna.framework.Command.prototype,{
	execute: function() {
		this._stageService.start(this._stageConfig.start);
	}
	,__class__: game.client.command.GameDataCompleteCommand
});
game.client.command.GameStartCommand = function() {
	lovedna.framework.Command.call(this);
};
$hxClasses["game.client.command.GameStartCommand"] = game.client.command.GameStartCommand;
game.client.command.GameStartCommand.__name__ = ["game","client","command","GameStartCommand"];
game.client.command.GameStartCommand.__super__ = lovedna.framework.Command;
game.client.command.GameStartCommand.prototype = $extend(lovedna.framework.Command.prototype,{
	execute: function() {
		lovedna.canvas.net.NetStorage.setGlobalURL("v0/");
		this._stageService.start(this._stageConfig.start);
		return;
		this._loader = new lovedna.canvas.net.NetStorage();
		this._loader.setDataCompleteHandler($bind(this,this.loadComplete));
		this._loader.loadData("version.csvs");
	}
	,loadComplete: function(url,data) {
		if(data == null) return;
		var csv = new lovedna.utils.csv.CSVPacker();
		csv.decode(data);
		var list = csv.getCsvList();
		var len = list.length;
		while(len-- > 0) {
			var name = list[len];
			var csvData = csv.getCsv(name);
			this._csvConfig.load(name,csvData);
		}
		csv.dispose();
		this._loader.dispose();
		this._loader = null;
		this._complete = true;
		this.dispatchEvent(new game.client.event.GameEvent("dataComplete"));
	}
	,onAdShow: function(state) {
	}
	,__class__: game.client.command.GameStartCommand
});
game.client.config = {};
game.client.config.AppConfig = function() {
};
$hxClasses["game.client.config.AppConfig"] = game.client.config.AppConfig;
game.client.config.AppConfig.__name__ = ["game","client","config","AppConfig"];
game.client.config.AppConfig.flashStage = null;
game.client.config.AppConfig.version = null;
game.client.config.AppConfig.rect = null;
game.client.config.AppConfig.prototype = {
	__class__: game.client.config.AppConfig
};
game.client.config.CsvConfig = function() {
	lovedna.framework.Actor.call(this);
	this._map = new haxe.ds.StringMap();
};
$hxClasses["game.client.config.CsvConfig"] = game.client.config.CsvConfig;
game.client.config.CsvConfig.__name__ = ["game","client","config","CsvConfig"];
game.client.config.CsvConfig.__super__ = lovedna.framework.Actor;
game.client.config.CsvConfig.prototype = $extend(lovedna.framework.Actor.prototype,{
	load: function(name,data) {
		if(this._map.exists(name)) {
			var cls = this._map.get(name);
			if(cls != null) {
				var csv = this.getInstance(cls);
				csv.parse(data);
			}
		}
	}
	,onRegister: function() {
		lovedna.framework.Actor.prototype.onRegister.call(this);
		this.mapCsv("version.csv",game.client.csv.ExcelVersion);
	}
	,mapCsv: function(name,csv) {
		this._map.set(name,csv);
	}
	,__class__: game.client.config.CsvConfig
});
game.client.config.StageConfig = function() {
	this.day = game.client.module.day.DayStage;
	this.edit = game.client.module.draw.EditStage;
	this.draw = game.client.module.draw.DrawStage;
	this.menu = game.client.module.menu.MenuStage;
	this.start = game.client.module.start.StartStage;
};
$hxClasses["game.client.config.StageConfig"] = game.client.config.StageConfig;
game.client.config.StageConfig.__name__ = ["game","client","config","StageConfig"];
game.client.config.StageConfig.prototype = {
	__class__: game.client.config.StageConfig
};
game.client.config.UserConfig = function() {
};
$hxClasses["game.client.config.UserConfig"] = game.client.config.UserConfig;
game.client.config.UserConfig.__name__ = ["game","client","config","UserConfig"];
game.client.config.UserConfig._result = null;
game.client.config.UserConfig.complete = function() {
	if(game.client.config.UserConfig.currentLevel == game.client.config.UserConfig.maxLevel) {
		game.client.config.UserConfig.maxLevel++;
		game.client.util.SaveUtil.save("currentLevel",game.client.config.UserConfig.maxLevel);
	}
};
game.client.config.UserConfig.setResult = function(value) {
	if(game.client.config.UserConfig._result == null) game.client.config.UserConfig._result = [];
	var data = game.client.config.UserConfig._result[game.client.config.UserConfig.currentLevel];
	if(data == null && value != null) {
		value.position = 0;
		game.client.util.SaveUtil.save("level_" + game.client.config.UserConfig.currentLevel,value);
	}
};
game.client.config.UserConfig.getResult = function(level) {
	if(game.client.config.UserConfig._result == null) game.client.config.UserConfig._result = [];
	var data = game.client.config.UserConfig._result[level];
	if(data == null) {
		var d = game.client.util.SaveUtil.get("level_" + level);
		if(d != null && js.Boot.__instanceof(d,openfl.utils.ByteArray)) {
			var read = d;
			read = lovedna.utils.ByteArrayUtil.reloadByteArray(read);
			game.client.config.UserConfig._result[level] = read;
			data = read;
		}
	}
	return data;
};
game.client.config.UserConfig.prototype = {
	__class__: game.client.config.UserConfig
};
lovedna.canvas = {};
lovedna.canvas.core = {};
lovedna.canvas.core.Camera = function(width,height,canvasBuff) {
	if(canvasBuff == null) canvasBuff = false;
	this._updateIndex = 0;
	this._renderIndex = 0;
	this.cameraY = -1;
	this.cameraX = -1;
	this.mouseY = -1;
	this.mouseX = -1;
	this._frameTime = 0;
	this._defaultFlag = 24;
	this._RGBFlag = 28;
	this._tempMat = lovedna.canvas.ImageHelper.matrix;
	this._tempPoint = lovedna.canvas.ImageHelper.point;
	this._tempColorTransform = lovedna.canvas.ImageHelper.color;
	this._width = width;
	this._height = height;
	this._canvas = new lovedna.canvas.core.Canvas(this._width,this._height,canvasBuff);
	this._renderList = [];
	this.left = this.top = 0;
	this.right = this._width;
	this.bottom = this._height;
	this._halfw = this._width * 0.5;
	this._halfh = this._height * 0.5;
	this.focusX = this._halfw;
	this.focusY = this._halfh;
	this.zoom = 1;
	this.setMaxSize(this._width,this._height);
	lovedna.canvas.core.EnterFrame.init();
	this._renderComplete = true;
	this._updateList = [];
	this._updateComplete = false;
	this._mouse = new lovedna.canvas.mouse.CameraMouse(this);
	this.mouseEnable = true;
	this._defaultMouseHandler = new lovedna.canvas.mouse.MouseHandler();
	this.setMouseHandler(this._defaultMouseHandler);
};
$hxClasses["lovedna.canvas.core.Camera"] = lovedna.canvas.core.Camera;
lovedna.canvas.core.Camera.__name__ = ["lovedna","canvas","core","Camera"];
lovedna.canvas.core.Camera.prototype = {
	setMouseHandler: function(handler) {
		if(handler == null) handler = this._defaultMouseHandler;
		this._mouse.setMouseHandler(handler);
	}
	,setMaxSize: function(width,height) {
		if(height == null) height = 0;
		if(width == null) width = 0;
		if(width >= this._width) this._maxw = width;
		if(height >= this._height) this._maxh = height;
	}
	,dispose: function() {
	}
	,getCanvas: function() {
		return this._canvas;
	}
	,tick: function(time,tick) {
		if(!this.hasMouseObject) this._mouse.update();
		if(!this._updateComplete) {
			if(this._updateIndex > 0) {
				while(this._updateIndex-- > 0) {
					var child = this._updateList[this._updateIndex];
					child.time = this._time;
					child.tick = this._tick;
					child.hasVisit = false;
					child.update(this);
					if(child.render) {
						this._renderList[this._renderIndex++] = child;
						child.render = false;
					}
					if(this._frameTime > 0) {
						if(new Date().getTime() - time > this._frameTime) break;
					}
				}
				if(this._updateIndex <= 0) {
					this._updateComplete = true;
					this._updateIndex = 0;
					this._renderIndex = this._renderList.length;
					this._renderList.reverse();
					this._renderComplete = this._renderIndex == 0;
					this._updateList.splice(0,this._updateList.length);
				}
			}
		}
		if(this._updateComplete) {
			if(this._renderIndex > 0) {
				while(this._renderIndex-- > 0) {
					var child1 = this._renderList[this._renderIndex];
					this.renderChild(child1);
					child1.render = false;
					if(this._frameTime > 0) {
						if(new Date().getTime() - time > this._frameTime) break;
					}
				}
				if(this._renderIndex <= 0) {
					this._renderComplete = true;
					this._renderIndex = 0;
					if((function($this) {
						var $r;
						var $int = $this._lastColor;
						$r = $int < 0?4294967296.0 + $int:$int + 0.0;
						return $r;
					}(this)) != 0) {
						this._canvas.setPixel32(this.mouseX,this.mouseY,this._lastColor,true);
						this._lastColor = 0;
					}
					this._mouse.localX = this.globalToLocalX(null);
					this._mouse.localY = this.globalToLocalY(null);
					this._mouse.renderComplete(this._under);
					this._canvas.unlock();
				}
			} else {
				this._renderComplete = true;
				this._renderIndex = 0;
			}
		}
	}
	,addChild: function(value) {
		if(value != null) {
			if(this._renderComplete) {
				if(!value.hasVisit) {
					if(!this.hasMouseObject) {
						if(value.stageMouseEnable) this.hasMouseObject = true;
					}
					value.hasVisit = true;
					this._updateList[this._updateIndex++] = value;
				}
			}
		}
	}
	,clear: function(time,tick) {
		this.right = this._canvas._width;
		this.bottom = this._canvas._height;
		var len = this._renderList.length;
		if(len > 0) this._renderList.splice(0,len);
		this._renderComplete = false;
		this._updateIndex = this._updateList.length;
		this._updateComplete = this._updateIndex == 0;
		var p = this._mouse.getCameraMouse();
		this.mouseX = p.x | 0;
		this.mouseY = p.y | 0;
		this.cameraX = this.globalToLocalX(null);
		this.cameraY = this.globalToLocalY(null);
		this._lastColor = this._newColor = 0;
		this._under = null;
		this._canvas.clear();
		if(!this._updateComplete) null;
		this._tick = tick;
		this._time = time;
		if(this.zoom > 0) {
			var focusx = this.focusX;
			var focusy = this.focusY;
			var w = this._width / this.zoom;
			var h = this._height / this.zoom;
			var w2 = w * 0.5;
			var h2 = h * 0.5;
			var xinc = this.focusX - w2;
			var yinc = this.focusY - h2;
			if(xinc < 0) xinc = 0;
			if(yinc < 0) yinc = 0;
			var maxx = this._maxw - w;
			var maxy = this._maxh - h;
			if(xinc > maxx) xinc = maxx;
			if(yinc > maxy) yinc = maxy;
			focusx = xinc + w2;
			focusy = yinc + h2;
			var xz = focusx * this.zoom;
			var yz = focusy * this.zoom;
			this.left = xz - this._halfw;
			this.right = xz + this._halfw;
			this.top = yz - this._halfh;
			this.bottom = yz + this._halfh;
		}
	}
	,checkInView: function(value) {
		var x = value.stageX;
		var y = value.stageY;
		var l = value.left;
		var t = value.top;
		var r = value.right;
		var b = value.bottom;
		if(x + r > this.left - this._halfw && x + l < this.right + this._halfw) {
			if(y + b > this.top - this._halfh && y + t < this.bottom + this._halfh) return true;
		}
		return false;
	}
	,renderChild: function(value) {
		var imagedata = value.image;
		if(imagedata != null) {
			var stageScaleX = value.stageScaleX;
			var stageScaleY = value.stageScaleY;
			var stageRotation = value.stageRotation;
			var stageAlpha = value.stageAlpha;
			var stageX = value.stageX;
			var stageY = value.stageY;
			var rgb = false;
			var pivotx = value.pivotX;
			var pivoty = value.pivotY;
			var smooth = value.stageSmooth;
			var tile = imagedata.tileSheet;
			if(tile != null) {
				this._tempMat.identity();
				this._tempMat.translate(-pivotx,-pivoty);
				this._tempMat.rotate(stageRotation);
				this._tempMat.scale(stageScaleX,stageScaleY);
				var px = stageX - this.left + this._tempMat.tx;
				var py = stageY - this.left + this._tempMat.ty;
				tile.drawTiles(this._canvas._currentGraphics,[px,py,imagedata.index,this._tempMat.a,this._tempMat.b,this._tempMat.c,this._tempMat.d,stageAlpha],smooth,this._defaultFlag);
				tile = null;
				this.renderChildComplete(value);
			}
			imagedata = null;
		}
	}
	,hasRenderComplete: function() {
		return this._renderComplete;
	}
	,localToGlobalX: function(localX) {
		return localX - this.left;
	}
	,localToGlobalY: function(localY) {
		return localY - this.top;
	}
	,globalToLocalX: function(stageX) {
		if(stageX == null) stageX = this.mouseX;
		return stageX + this.left;
	}
	,globalToLocalY: function(stageY) {
		if(stageY == null) stageY = this.mouseY;
		return stageY + this.top;
	}
	,set_stage: function(value) {
		if(this.stage != value) {
			if(this.stage != null) this.stage.set_camera(null);
		}
		this.zoom = 1;
		this.focusX = this._halfw;
		this.focusY = this._halfh;
		this._time = new Date().getTime();
		return this.stage = value;
	}
	,set_cpu: function(value) {
		if(value < 0) value = -value;
		if(value > 1) value = 0;
		this._frameTime = lovedna.canvas.core.EnterFrame.frameTime * value;
		return value;
	}
	,renderChildComplete: function(value) {
		if(!value.stageMouseEnable) return;
		if(this.mouseEnable) {
			var cx = value.stageX;
			var cy = value.stageY;
			if(this.cameraX < cx + value.right && this.cameraX > cx + value.left && this.cameraY < cy + value.bottom && this.cameraY > cy + value.top) {
				this._under = value;
				return;
				if(!value.mouseCheckPixel) this._under = value; else {
					this._canvas.snapshot(this.mouseX,this.mouseY);
					this._newColor = this._canvas._checkBmd.getPixel32(0,0);
					this._under = value;
				}
			}
		}
	}
	,__class__: lovedna.canvas.core.Camera
	,__properties__: {set_cpu:"set_cpu",set_stage:"set_stage"}
};
game.client.core = {};
game.client.core.GameCamera = function(width,height,canvasBuff) {
	if(canvasBuff == null) canvasBuff = false;
	lovedna.canvas.core.Camera.call(this,288,512,true);
};
$hxClasses["game.client.core.GameCamera"] = game.client.core.GameCamera;
game.client.core.GameCamera.__name__ = ["game","client","core","GameCamera"];
game.client.core.GameCamera.__super__ = lovedna.canvas.core.Camera;
game.client.core.GameCamera.prototype = $extend(lovedna.canvas.core.Camera.prototype,{
	__class__: game.client.core.GameCamera
});
lovedna.utils = {};
lovedna.utils.IPoolObject = function() { };
$hxClasses["lovedna.utils.IPoolObject"] = lovedna.utils.IPoolObject;
lovedna.utils.IPoolObject.__name__ = ["lovedna","utils","IPoolObject"];
lovedna.utils.IPoolObject.prototype = {
	__class__: lovedna.utils.IPoolObject
};
lovedna.canvas.Image = function() {
	this._imageId = -1;
	this.__p = lovedna.canvas.ImageHelper.point;
	this.__rect = lovedna.canvas.ImageHelper.rectangle;
	this.__mat = lovedna.canvas.ImageHelper.matrix;
	this.mouseEnabled = this.mouseChildren = false;
	this._relativeFlags = new lovedna.utils.BitField();
};
$hxClasses["lovedna.canvas.Image"] = lovedna.canvas.Image;
lovedna.canvas.Image.__name__ = ["lovedna","canvas","Image"];
lovedna.canvas.Image.__interfaces__ = [lovedna.utils.IPoolObject];
lovedna.canvas.Image.getInstance = function(type) {
	return lovedna.utils.Pool.getObject(type);
};
lovedna.canvas.Image.prototype = {
	load: function(url,rect,centerPoint) {
		var arr = url.split("#");
		if(arr.length >= 2) this.set_image(lovedna.canvas.ImageHelper.getGroupImage(arr[0],arr[1],centerPoint)); else this.set_image(lovedna.canvas.ImageHelper.getImageData(url,rect,centerPoint));
	}
	,addChild: function(value) {
		return this;
	}
	,addChildAt: function(value,index) {
		return this;
	}
	,removeChild: function(value) {
		return this;
	}
	,removeChildAt: function(index) {
		return this;
	}
	,getChildAt: function(index) {
		return null;
	}
	,getChildIndex: function(value) {
		return -1;
	}
	,contains: function(value) {
		return value == this;
	}
	,setRelative: function(flag,connect) {
		if(connect) this._relativeFlags.close(flag); else this._relativeFlags.open(flag);
	}
	,reset: function() {
		this.name = null;
		this.tick = 0;
		this.time = 0;
		this.x = this.y = this.pivotX = this.pivotY = this.left = this.top = this.right = this.bottom = 0;
		this.stageScaleX = this.stageScaleY = this.stageAlpha = 1;
		this.stageRotation = this.stageX = this.stageY = 0;
		this.stageRed = this.stageGreen = this.stageBlue = 1;
		this.stageSmooth = true;
		this.smooth = true;
		this.set_parent(null);
		this.__flag = 0;
		this.__inRenderView = false;
		this.__updateTime = 0;
		this.rotation = 0;
		this.scaleX = this.scaleY = this.alpha = 1;
		this.red = this.green = this.blue = 1;
		this._imageId = -1;
		this._pivotX = this._pivotY = 0;
		this.set_image(null);
		this.originalWidth = this.originalHeight = 0;
		this.mouseCheckPixel = false;
		this.mouseEnabled = false;
		this.hasVisit = false;
		this.render = false;
		this._relativeFlags.clear();
	}
	,getUpdateEnable: function() {
		return this.stageAlpha > 0 && this.image != null && this.image.enable;
	}
	,dispose: function() {
		if(this.get_parent() != null) this.get_parent().removeChild(this);
		lovedna.utils.Pool.returnObject(this);
	}
	,visit: function(camera) {
		camera.addChild(this);
	}
	,update: function(camera) {
		if(this.__updateTime < this.time) {
			if(this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0) {
				this.__updateTime = this.time;
				this.executeUpdate(camera);
			}
			return true;
		}
		return false;
	}
	,copyfrom: function(value,keep) {
		if(keep == null) keep = false;
		if(keep) {
			this.x = value.x;
			this.y = value.y;
			this.pivotX = value.pivotX;
			this.pivotY = value.pivotY;
			this.rotation = value.rotation;
			this.scaleX = value.scaleX;
			this.scaleY = value.scaleY;
			this.alpha = value.alpha;
			this.red = value.red;
			this.green = value.green;
			this.blue = value.blue;
			this.mouseEnabled = value.mouseEnabled;
			this.mouseChildren = value.mouseChildren;
		}
		this.set_image(value.image);
		return this;
	}
	,clone: function(keep) {
		if(keep == null) keep = false;
		return lovedna.utils.Pool.getObject(lovedna.canvas.Image).copyfrom(this,keep);
	}
	,imageInit: function() {
	}
	,set_image: function(value) {
		if(this.image != value) {
			this.__flag = 0;
			this._imageId = -1;
			this.image = value;
			this._imageInit = false;
			if(this.image != null && this.image.enable) {
				this.originalWidth = this.image.rect.width | 0;
				this.originalHeight = this.image.rect.height | 0;
				this._pivotX = this.image.pivot.x;
				this._pivotY = this.image.pivot.y;
				this._imageId = this.image.index;
				this._imageInit = true;
				this.imageInit();
			}
		}
		return value;
	}
	,getFlag: function() {
		var flag = this.x * 1000 + this.y * 3000 + this.scaleX * 7000 + this.scaleY * 10000 + this.alpha * 30000 + this.rotation * 70000;
		if(this.get_parent() != null) flag += this.get_parent().stageX * 1000 + this.get_parent().stageY * 3000 + this.get_parent().stageScaleX * 7000 + this.get_parent().stageScaleY * 10000 + this.get_parent().stageAlpha * 30000 + this.get_parent().stageRotation * 70000;
		return flag;
	}
	,set_parent: function(value) {
		if(this._parent != value) {
			if(this._parent != null) this._parent.removeChild(this);
			this._parent = value;
		}
		return value;
	}
	,get_parent: function() {
		return this._parent;
	}
	,getRadius: function() {
		var xinc = lovedna.utils.MathUtil.abs((this.originalWidth - this._pivotX) * this.stageScaleX);
		var yinc = lovedna.utils.MathUtil.abs((this.originalHeight - this._pivotY) * this.stageScaleY);
		if(this.width - xinc > xinc) xinc = this.width - xinc; else xinc = xinc;
		if(this.height - yinc > yinc) yinc = this.height - yinc; else yinc = yinc;
		if(xinc > yinc) return xinc; else return yinc;
	}
	,getRect: function(shape) {
		if(shape == null) shape = true;
		var x0 = -this._pivotX - this.pivotX;
		var y0 = -this._pivotY - this.pivotY;
		var x1 = this.originalWidth + x0;
		var y1 = this.originalHeight + y0;
		if(!shape) {
			this.left = x0 | 0;
			this.top = y0 | 0;
			this.right = x1 | 0;
			this.bottom = y1 | 0;
			this.width = this.right - this.left;
			this.height = this.bottom - this.top;
		} else {
			lovedna.canvas.Image._xlist.splice(0,lovedna.canvas.Image._xlist.length);
			lovedna.canvas.Image._ylist.splice(0,lovedna.canvas.Image._ylist.length);
			this.__mat.identity();
			this.__mat.rotate(this.stageRotation);
			this.__mat.scale(this.stageScaleX,this.stageScaleY);
			this.__p.x = x0;
			this.__p.y = y0;
			this.__p = lovedna.utils.MatrixUtil.deltaTransformPoint(this.__p,this.__mat);
			lovedna.canvas.Image._xlist.push(this.__p.x);
			lovedna.canvas.Image._ylist.push(this.__p.y);
			this.__p.x = x0;
			this.__p.y = y1;
			this.__p = lovedna.utils.MatrixUtil.deltaTransformPoint(this.__p,this.__mat);
			lovedna.canvas.Image._xlist.push(this.__p.x);
			lovedna.canvas.Image._ylist.push(this.__p.y);
			this.__p.x = x1;
			this.__p.y = y1;
			this.__p = lovedna.utils.MatrixUtil.deltaTransformPoint(this.__p,this.__mat);
			lovedna.canvas.Image._xlist.push(this.__p.x);
			lovedna.canvas.Image._ylist.push(this.__p.y);
			this.__p.x = x1;
			this.__p.y = y0;
			this.__p = lovedna.utils.MatrixUtil.deltaTransformPoint(this.__p,this.__mat);
			lovedna.canvas.Image._xlist.push(this.__p.x);
			lovedna.canvas.Image._ylist.push(this.__p.y);
			var minx = 2147483647.0;
			var maxx = -2147483648.0;
			var miny = 2147483647.0;
			var maxy = -2147483648.0;
			var len = 4;
			while(len-- > 0) {
				var x = lovedna.canvas.Image._xlist[len];
				var y = lovedna.canvas.Image._ylist[len];
				if(x < minx) minx = x;
				if(y < miny) miny = y;
				if(x > maxx) maxx = x;
				if(y > maxy) maxy = y;
			}
			this.left = minx | 0;
			this.top = miny | 0;
			this.right = maxx | 0;
			this.bottom = maxy | 0;
			this.width = this.right - this.left;
			this.height = this.bottom - this.top;
		}
	}
	,updateValues: function() {
		this.__updateTime = this.time;
		this.stageRotation = this.rotation;
		this.stageScaleX = this.scaleX;
		this.stageScaleY = this.scaleY;
		this.stageAlpha = this.alpha;
		this.stageSmooth = this.smooth;
		var parentRotation = 0;
		var parentScaleX = 1;
		var parentScaleY = 1;
		var parentAlpha = 1;
		var parentX = 0;
		var parentY = 0;
		var parentRed = 1;
		var parentGreen = 1;
		var parentBlue = 1;
		var parentSmooth = this.smooth;
		if(this.get_parent() != null) {
			parentRotation = this.get_parent().stageRotation;
			parentScaleX = this.get_parent().stageScaleX;
			parentScaleY = this.get_parent().stageScaleY;
			parentAlpha = this.get_parent().stageAlpha;
			parentSmooth = this.get_parent().stageSmooth;
			if(!this._relativeFlags.hasOpen(1)) parentX = this.get_parent().stageX;
			if(!this._relativeFlags.hasOpen(2)) parentY = this.get_parent().stageY;
			parentRed = this.get_parent().stageRed;
			parentGreen = this.get_parent().stageGreen;
			parentBlue = this.get_parent().stageBlue;
		}
		if(!this._relativeFlags.hasOpen(3)) this.stageRotation = (parentRotation + this.rotation) % 360;
		if(!this._relativeFlags.hasOpen(4)) this.stageScaleX = parentScaleX * this.scaleX;
		if(!this._relativeFlags.hasOpen(5)) this.stageScaleY = parentScaleY * this.scaleY;
		if(!this._relativeFlags.hasOpen(6)) this.stageAlpha = parentAlpha * this.alpha;
		if(!this._relativeFlags.hasOpen(7)) {
			this.stageRed = parentRed * this.red;
			this.stageBlue = parentBlue * this.blue;
			this.stageGreen = parentGreen * this.green;
		}
		if(!this._relativeFlags.hasOpen(8)) this.stageSmooth = parentSmooth;
		if(parentScaleX != 1 || parentScaleY != 1 || parentRotation != 0) {
			this.__mat.identity();
			this.__mat.rotate(parentRotation);
			this.__mat.scale(parentScaleX,parentScaleY);
			this.__p.x = this.x;
			this.__p.y = this.y;
			var p2 = lovedna.utils.MatrixUtil.deltaTransformPoint(this.__p,this.__mat);
			this.stageX = parentX + p2.x;
			this.stageY = parentY + p2.y;
		} else {
			this.stageX = parentX + this.x;
			this.stageY = parentY + this.y;
		}
	}
	,executeUpdate: function(camera) {
		if(this.image != null && this.image.enable) {
			if(this._imageId != this.image.dataId) {
				this._imageId = this.image.dataId;
				this._imageInit = true;
				this.imageInit();
				this.originalWidth = this.image.rect.width | 0;
				this.originalHeight = this.image.rect.height | 0;
				this._pivotX = this.image.pivot.x;
				this._pivotY = this.image.pivot.y;
			}
			if(this._imageInit) {
				var flag = this.getFlag();
				if(flag != this.__flag) {
					this.updateValues();
					this.__flag = flag;
					this.width = Std["int"](lovedna.utils.MathUtil.abs(this.originalWidth * this.stageScaleX));
					this.height = Std["int"](lovedna.utils.MathUtil.abs(this.originalHeight * this.stageScaleY));
					this.getRect(this.stageMouseEnable && camera.mouseEnable);
					if(camera.checkInView(this)) {
						this.render = true;
						this.__inRenderView = true;
					} else this.__inRenderView = false;
				} else if(this.__inRenderView) this.render = true;
			}
		}
	}
	,__class__: lovedna.canvas.Image
	,__properties__: {set_image:"set_image",set_parent:"set_parent",get_parent:"get_parent"}
};
lovedna.canvas.ImageContainer = function() {
	lovedna.canvas.Image.call(this);
	this._childs = [];
	this._childMap = new haxe.ds.StringMap();
};
$hxClasses["lovedna.canvas.ImageContainer"] = lovedna.canvas.ImageContainer;
lovedna.canvas.ImageContainer.__name__ = ["lovedna","canvas","ImageContainer"];
lovedna.canvas.ImageContainer.__super__ = lovedna.canvas.Image;
lovedna.canvas.ImageContainer.prototype = $extend(lovedna.canvas.Image.prototype,{
	removeAll: function() {
		var len = this._childs.length;
		while(len-- > 0) {
			var child = this._childs[len];
			child.set_parent(null);
			if(child.name != null) {
				if(this._childMap.exists(child.name)) this._childMap.remove(child.name);
			}
		}
		this._childs.splice(0,this._childs.length);
		this.numChildren = 0;
		return this;
	}
	,getChildByName: function(name) {
		if(name == null || name == "") return null;
		if(this._childMap.exists(name)) return this._childMap.get(name);
		return null;
	}
	,reset: function() {
		lovedna.canvas.Image.prototype.reset.call(this);
		if(this.numChildren > 0) this._childs.splice(0,this.numChildren);
		this._childMap = new haxe.ds.StringMap();
		this.mouseEnabled = false;
		this.mouseChildren = true;
		this.numChildren = 0;
	}
	,addChild: function(value) {
		return this.addChildAt(value,this._childs.length);
	}
	,addChildAt: function(value,index) {
		if(value != null && value != this) {
			var selfparent = value.get_parent();
			if(selfparent == this) {
				var id = Lambda.indexOf(this._childs,value);
				if(id != -1) this._childs.splice(id,1);
			} else {
				if(selfparent != null) selfparent.removeChild(value);
				if(js.Boot.__instanceof(value,lovedna.canvas.ImageContainer)) {
					selfparent = this.get_parent();
					while(selfparent != null) {
						if(selfparent == value) {
							throw "can't add parent";
							return this;
						}
						selfparent = selfparent.get_parent();
					}
				}
			}
			if(value.name != null) this._childMap.set(value.name,value);
			value.set_parent(this);
			this._childs.splice(index,0,value);
			this.numChildren = this._childs.length;
		}
		return this;
	}
	,removeChild: function(value) {
		if(value != null) {
			if(value.get_parent() == this) {
				var id = Lambda.indexOf(this._childs,value);
				if(id != -1) this.removeChildAt(id);
				this.numChildren = this._childs.length;
			}
		}
		return this;
	}
	,removeChildAt: function(index) {
		var child = this._childs[index];
		if(child != null) {
			this._childs.splice(index,1);
			if(child.get_parent() == this) child.set_parent(null);
			this.numChildren = this._childs.length;
			if(child.name != null) {
				if(this._childMap.exists(child.name)) this._childMap.remove(child.name);
			}
		}
		return this;
	}
	,getChildAt: function(index) {
		return this._childs[index];
	}
	,getChildIndex: function(value) {
		if(value == null) return -1;
		return Lambda.indexOf(this._childs,value);
	}
	,visit: function(camera) {
		if(this.getUpdateEnable()) {
			this.executeUpdate(camera);
			lovedna.canvas.Image.prototype.visit.call(this,camera);
		}
		var len = this._childs.length;
		while(len-- > 0) {
			var child = this._childs[len];
			if(child != null) {
				child.stageAlpha = child.alpha * this.alpha;
				if(child.getUpdateEnable()) {
					child.stageMouseEnable = this.stageMouseEnable && this.mouseEnabled && child.mouseEnabled;
					child.visit(camera);
				}
			}
		}
	}
	,update: function(camera) {
		if(this.__updateTime < this.time) {
			this.__updateTime = this.time;
			this.render = true;
			return true;
		}
		return false;
	}
	,getUpdateEnable: function() {
		return this.numChildren > 0;
	}
	,clone: function(keep) {
		if(keep == null) keep = false;
		return lovedna.utils.Pool.getObject(lovedna.canvas.ImageContainer).copyfrom(this,keep);
	}
	,copyfrom: function(value,keep) {
		if(keep == null) keep = false;
		lovedna.canvas.Image.prototype.copyfrom.call(this,value,keep);
		if(js.Boot.__instanceof(value,lovedna.canvas.ImageContainer)) {
			this.removeAll();
			var con = value;
			var list = con._childs;
			var len = list.length;
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				this.addChild(list[i].clone(keep));
			}
		}
		return this;
	}
	,contains: function(value) {
		var len = this._childs.length;
		while(len-- > 0) if(this._childs[len].contains(value)) return true;
		return false;
	}
	,executeUpdate: function(camera) {
		if(this.image == null) this.updateValues();
		lovedna.canvas.Image.prototype.executeUpdate.call(this,camera);
	}
	,__class__: lovedna.canvas.ImageContainer
});
lovedna.utils.tick = {};
lovedna.utils.tick.ITick = function() { };
$hxClasses["lovedna.utils.tick.ITick"] = lovedna.utils.tick.ITick;
lovedna.utils.tick.ITick.__name__ = ["lovedna","utils","tick","ITick"];
lovedna.utils.tick.ITick.prototype = {
	__class__: lovedna.utils.tick.ITick
};
lovedna.canvas.core.IEnterFrame = function() { };
$hxClasses["lovedna.canvas.core.IEnterFrame"] = lovedna.canvas.core.IEnterFrame;
lovedna.canvas.core.IEnterFrame.__name__ = ["lovedna","canvas","core","IEnterFrame"];
lovedna.canvas.core.IEnterFrame.__interfaces__ = [lovedna.utils.tick.ITick];
lovedna.canvas.core.IEnterFrame.prototype = {
	__class__: lovedna.canvas.core.IEnterFrame
};
lovedna.canvas.ImageStage = function() {
	lovedna.canvas.ImageContainer.call(this);
	this._active = true;
	this.reset();
};
$hxClasses["lovedna.canvas.ImageStage"] = lovedna.canvas.ImageStage;
lovedna.canvas.ImageStage.__name__ = ["lovedna","canvas","ImageStage"];
lovedna.canvas.ImageStage.__interfaces__ = [lovedna.canvas.core.IEnterFrame];
lovedna.canvas.ImageStage.__super__ = lovedna.canvas.ImageContainer;
lovedna.canvas.ImageStage.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	activate: function(time,tick) {
		this._active = true;
		if(this._camera != null) {
		}
	}
	,deactivate: function(time) {
		this._active = false;
		return true;
	}
	,tickTime: function(time,tick) {
		if(tick == null) tick = 0;
		if(time == null) time = 0;
		if(this.numChildren > 0 && this._camera != null && this._canvas.stage != null) {
			if(this._camera != null && this._active) {
				this._camera.hasMouseObject = false;
				if(this._camera._renderComplete) {
					this.time = time;
					this.tick = tick;
					this.stageX = this.stageY = 0;
					this.stageMouseEnable = this.mouseChildren = this.mouseEnabled = true;
					this.visit(this._camera);
					if(this._camera != null) {
						this.scaleX = this.scaleY = this._camera.zoom;
						this.updateValues();
						this._camera.clear(time,tick);
					}
				}
				if(this._camera != null) this._camera.tick(time,tick);
				if(this._camera != null) this.update(this._camera);
			}
		}
	}
	,getUpdateEnable: function() {
		return false;
	}
	,update: function(camera) {
		return true;
	}
	,set_camera: function(value) {
		if(this._camera != value) {
			if(value != null) value.set_stage(this);
		}
		this._camera = value;
		if(this._camera != null) this._canvas = this._camera._canvas;
		this.checkCamera();
		return value;
	}
	,checkCamera: function() {
		if(this._camera == null) lovedna.canvas.core.EnterFrame.remove(this); else lovedna.canvas.core.EnterFrame.add(this);
	}
	,__class__: lovedna.canvas.ImageStage
	,__properties__: $extend(lovedna.canvas.ImageContainer.prototype.__properties__,{set_camera:"set_camera"})
});
game.client.core.GameStage = function() {
	lovedna.canvas.ImageStage.call(this);
};
$hxClasses["game.client.core.GameStage"] = game.client.core.GameStage;
game.client.core.GameStage.__name__ = ["game","client","core","GameStage"];
game.client.core.GameStage.__super__ = lovedna.canvas.ImageStage;
game.client.core.GameStage.prototype = $extend(lovedna.canvas.ImageStage.prototype,{
	start: function() {
	}
	,end: function() {
	}
	,resize: function(rect) {
	}
	,__class__: game.client.core.GameStage
});
lovedna.utils.csv = {};
lovedna.utils.csv.CSVData = function() {
};
$hxClasses["lovedna.utils.csv.CSVData"] = lovedna.utils.csv.CSVData;
lovedna.utils.csv.CSVData.__name__ = ["lovedna","utils","csv","CSVData"];
lovedna.utils.csv.CSVData.prototype = {
	parse: function(value) {
		if(this.itemClass == null) return;
		if(value != null) {
			this.start();
			var keylen = value.readByte();
			var keys = [];
			var _g = 0;
			while(_g < keylen) {
				var i = _g++;
				keys.push(lovedna.utils.csv.CSVPacker.readString(value));
			}
			var types = [];
			var _g1 = 0;
			while(_g1 < keylen) {
				var i1 = _g1++;
				types.push(lovedna.utils.csv.CSVPacker.readString(value));
			}
			var len = value.readInt();
			var _g2 = 0;
			while(_g2 < len) {
				var i2 = _g2++;
				var item = Type.createInstance(this.itemClass,[]);
				if(js.Boot.__instanceof(item,this.itemClass)) {
					var _g11 = 0;
					while(_g11 < keylen) {
						var j = _g11++;
						var key = keys[j];
						var type = types[j];
						if(type == "int") Reflect.setField(item,key,value.readInt()); else if(type == "float") Reflect.setField(item,key,value.readFloat()); else if(type == "uint") Reflect.setField(item,key,value.readUnsignedInt()); else if(type == "double") Reflect.setField(item,key,value.readDouble()); else Reflect.setField(item,key,lovedna.utils.csv.CSVPacker.readString(value));
					}
					this.addItem(item);
				}
			}
			this.end();
		}
	}
	,start: function() {
	}
	,addItem: function(value) {
	}
	,end: function() {
	}
	,__class__: lovedna.utils.csv.CSVData
};
game.client.csv = {};
game.client.csv.ExcelVersion = function() {
	lovedna.utils.csv.CSVData.call(this);
	this.itemClass = game.client.csv.ExcelVersionItem;
	game.client.csv.ExcelVersion._map = new haxe.ds.StringMap();
};
$hxClasses["game.client.csv.ExcelVersion"] = game.client.csv.ExcelVersion;
game.client.csv.ExcelVersion.__name__ = ["game","client","csv","ExcelVersion"];
game.client.csv.ExcelVersion._map = null;
game.client.csv.ExcelVersion.getsrc = function(id) {
	if(game.client.csv.ExcelVersion._map.exists("id" + id)) {
		var item = game.client.csv.ExcelVersion._map.get("id" + id);
		return item.src;
	}
	return "";
};
game.client.csv.ExcelVersion.__super__ = lovedna.utils.csv.CSVData;
game.client.csv.ExcelVersion.prototype = $extend(lovedna.utils.csv.CSVData.prototype,{
	getSrc: function(id) {
		if(game.client.csv.ExcelVersion._map.exists("id" + id)) {
			var item = game.client.csv.ExcelVersion._map.get("id" + id);
			return item.src;
		}
		return "";
	}
	,addItem: function(value) {
		var item = value;
		var key = "id" + Std.string((function($this) {
			var $r;
			var $int = item.id;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)));
		game.client.csv.ExcelVersion._map.set(key,item);
		lovedna.canvas.net.NetStorage.setVersion(item.src,(function($this) {
			var $r;
			var int1 = item.version;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)));
	}
	,__class__: game.client.csv.ExcelVersion
});
game.client.csv.ExcelVersionItem = function() {
};
$hxClasses["game.client.csv.ExcelVersionItem"] = game.client.csv.ExcelVersionItem;
game.client.csv.ExcelVersionItem.__name__ = ["game","client","csv","ExcelVersionItem"];
game.client.csv.ExcelVersionItem.prototype = {
	__class__: game.client.csv.ExcelVersionItem
};
openfl.events.Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = 1;
};
$hxClasses["openfl.events.Event"] = openfl.events.Event;
openfl.events.Event.__name__ = ["openfl","events","Event"];
openfl.events.Event.prototype = {
	clone: function() {
		var event = new openfl.events.Event(this.type,this.bubbles,this.cancelable);
		event.eventPhase = this.eventPhase;
		event.target = this.target;
		event.currentTarget = this.currentTarget;
		return event;
	}
	,isDefaultPrevented: function() {
		return this.__isCancelled || this.__isCancelledNow;
	}
	,stopImmediatePropagation: function() {
		this.__isCancelled = true;
		this.__isCancelledNow = true;
	}
	,stopPropagation: function() {
		this.__isCancelled = true;
	}
	,toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,__class__: openfl.events.Event
};
game.client.event = {};
game.client.event.ADEvent = function(status) {
	openfl.events.Event.call(this,"ad_status");
	this._status = status;
};
$hxClasses["game.client.event.ADEvent"] = game.client.event.ADEvent;
game.client.event.ADEvent.__name__ = ["game","client","event","ADEvent"];
game.client.event.ADEvent.__super__ = openfl.events.Event;
game.client.event.ADEvent.prototype = $extend(openfl.events.Event.prototype,{
	getStatus: function() {
		return this._status;
	}
	,__class__: game.client.event.ADEvent
});
game.client.event.GameEvent = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["game.client.event.GameEvent"] = game.client.event.GameEvent;
game.client.event.GameEvent.__name__ = ["game","client","event","GameEvent"];
game.client.event.GameEvent.__super__ = openfl.events.Event;
game.client.event.GameEvent.prototype = $extend(openfl.events.Event.prototype,{
	__class__: game.client.event.GameEvent
});
game.client.module = {};
game.client.module.day = {};
game.client.module.day.DayStage = function() {
	game.client.core.GameStage.call(this);
	this._hasshow = false;
	this._hasclick = false;
	this._clickCount = 0;
	this._list = ["如果能再点一下,我会非常高兴的","请问还能再点一下广告吗","谢谢你的支持,请再点一下广告吧","无耻的请求你点上边的广告","点广告是我的最爱"];
	this._list2 = ["好喜欢你哟","承蒙厚爱","真想和你一起点","不胜感激","非常感谢","你是绝无仅有的好人","不知道说什么谢你了","这样要求你真不好意思","咱们成为好朋友啦","你这是真情奉献啊","我会更加努力哒","谢谢关照","亲你一口","谢谢你哟"];
};
$hxClasses["game.client.module.day.DayStage"] = game.client.module.day.DayStage;
game.client.module.day.DayStage.__name__ = ["game","client","module","day","DayStage"];
game.client.module.day.DayStage.__super__ = game.client.core.GameStage;
game.client.module.day.DayStage.prototype = $extend(game.client.core.GameStage.prototype,{
	adStatus: function(value) {
		if(value == 2) {
			this._boy.set_action("hi");
			if(!this._hasshow) this._guide.showTip("点一下广告吧"); else if(!this._hasclick) this._guide.showTip("请和我玩点广告游戏嘛");
			this._hasshow = true;
		} else if(value == 1) {
			this._boy.set_action("say");
			if(this._hasshow) {
				var msg = this._list[Std["int"](Math.random() * this._list.length)];
				this._guide.showTip(msg);
			}
		} else if(value == 5) {
			this._boy.set_action("hi");
			var msg1 = this._list2[Std["int"](Math.random() * this._list2.length)];
			this._guide.showTip(msg1);
			this._hasclick = true;
			this._clickCount++;
			if(this._clickCount > 20) {
				this._clickCount -= 10;
				this._guide.showTip("休息一下吧");
				this._java.javaShowAD(false);
			}
		} else if(value == 3) {
		}
	}
	,start: function() {
		game.client.core.GameStage.prototype.start.call(this);
		this._java.javaAdInit();
		this._java.javaShowAD(true);
		this.addChild(this._guide);
		this._guide.init();
		this._boy = this._guide.getBoy();
		this._boy.set_action("hi");
		this._guide.showTip("这里啥都没有");
	}
	,end: function() {
		game.client.core.GameStage.prototype.end.call(this);
		this._java.javaShowAD(false);
		this._clickCount -= 5;
		if(this._clickCount < 0) this._clickCount = 0;
	}
	,resize: function(rect) {
		game.client.core.GameStage.prototype.resize.call(this,rect);
		this._guide.x = rect.width * 0.5;
		this._guide.y = rect.y + rect.height * 0.5;
	}
	,__class__: game.client.module.day.DayStage
});
game.client.module.draw = {};
game.client.module.draw.BreakCell = function() {
	this._life = 0;
	this._g = 0.4;
	lovedna.canvas.Image.call(this);
};
$hxClasses["game.client.module.draw.BreakCell"] = game.client.module.draw.BreakCell;
game.client.module.draw.BreakCell.__name__ = ["game","client","module","draw","BreakCell"];
game.client.module.draw.BreakCell.__super__ = lovedna.canvas.Image;
game.client.module.draw.BreakCell.prototype = $extend(lovedna.canvas.Image.prototype,{
	reset: function() {
		lovedna.canvas.Image.prototype.reset.call(this);
		this.load("ui2.png#" + "mark.png");
		this._life = 0;
		this._life = Math.random() * 600 * 0.5;
		this._xinc = Math.random() * 6 - 3;
		this._yinc = -Math.random() * 5;
		this._r = Math.random() * 0.2 - 0.1;
	}
	,update: function(camera) {
		if(lovedna.canvas.Image.prototype.update.call(this,camera)) {
			var p = this.tick / 16.666666666666668;
			this.x += this._xinc * p;
			this.y += this._yinc * p;
			this._yinc += this._g * p;
			this._life += this.tick;
			this.alpha = 1 - this._life / 600 + 0.3;
			this.rotation += this._r * p;
			if(this._life > 600) {
				var p1 = this.get_parent();
				this.dispose();
				if(p1.getChildAt(0) == null) p1.dispose();
			}
		}
		return true;
	}
	,__class__: game.client.module.draw.BreakCell
});
game.client.module.draw.BreakEffect = function() {
	lovedna.canvas.ImageContainer.call(this);
};
$hxClasses["game.client.module.draw.BreakEffect"] = game.client.module.draw.BreakEffect;
game.client.module.draw.BreakEffect.__name__ = ["game","client","module","draw","BreakEffect"];
game.client.module.draw.BreakEffect.__super__ = lovedna.canvas.ImageContainer;
game.client.module.draw.BreakEffect.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		var scale = game.client.module.draw.Cell.size / 10 * 0.25;
		var size = game.client.module.draw.Cell.size * 0.25;
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			var _g1 = 0;
			while(_g1 < 4) {
				var j = _g1++;
				var img = lovedna.utils.Pool.getObject(game.client.module.draw.BreakCell);
				img.scaleX = img.scaleY = scale;
				this.addChild(img);
				img.x = i * size;
				img.y = j * size;
			}
		}
	}
	,__class__: game.client.module.draw.BreakEffect
});
game.client.module.draw.Cell = function() {
	lovedna.canvas.Image.call(this);
};
$hxClasses["game.client.module.draw.Cell"] = game.client.module.draw.Cell;
game.client.module.draw.Cell.__name__ = ["game","client","module","draw","Cell"];
game.client.module.draw.Cell.restart = function() {
	game.client.module.draw.Cell._count = 0;
};
game.client.module.draw.Cell.hasComplete = function() {
	return game.client.module.draw.Cell._count < 1;
};
game.client.module.draw.Cell.__super__ = lovedna.canvas.Image;
game.client.module.draw.Cell.prototype = $extend(lovedna.canvas.Image.prototype,{
	init: function(value) {
		this._value = value;
		this.load("ui2.png#" + "empty.png");
		if(!value) game.client.module.draw.Cell._count++;
	}
	,draw: function(mark) {
		if(this._fail) return;
		if(this._break) return;
		if(this._mark == mark) return;
		if(mark) this.load("ui2.png#" + "mark.png"); else this.load("ui2.png#" + "empty.png");
		this._mark = mark;
	}
	,hasMark: function() {
		return this._mark;
	}
	,hasBreak: function() {
		return this._break;
	}
	,hasFail: function() {
		return this._fail;
	}
	,'delete': function() {
		if(this._mark) return false;
		if(this._break) return false;
		if(this._fail) return false;
		if(!this._value) {
			this.alpha = 0;
			this.dispose();
			this._break = true;
			game.client.module.draw.Cell._count--;
			if(game.client.module.draw.Cell._count < 0) game.client.module.draw.Cell._count = 0;
		} else {
			this._break = true;
			this.load("ui2.png#" + "miss.png");
			this._fail = true;
		}
		return this._value == true;
	}
	,showResult: function() {
		if(this._value == true) this.load("ui2.png#" + "mark.png");
	}
	,reset: function() {
		lovedna.canvas.Image.prototype.reset.call(this);
		this._mark = false;
		this._break = false;
		this._fail = false;
		this.smooth = false;
		this._relativeFlags.open(8);
	}
	,__class__: game.client.module.draw.Cell
});
lovedna.canvas.bone = {};
lovedna.canvas.bone.ImageBone = function() {
	lovedna.canvas.ImageContainer.call(this);
};
$hxClasses["lovedna.canvas.bone.ImageBone"] = lovedna.canvas.bone.ImageBone;
lovedna.canvas.bone.ImageBone.__name__ = ["lovedna","canvas","bone","ImageBone"];
lovedna.canvas.bone.ImageBone._loader = null;
lovedna.canvas.bone.ImageBone._loadMap = null;
lovedna.canvas.bone.ImageBone.dataCompleteHandler = function(url,bmd,loadType,data) {
	var action = null;
	var error = false;
	if(data == null || bmd == null) error = true; else {
		var png = new lovedna.utils.png.PngReader();
		png.read(data);
		var chunk = png.getChunk(1716666723);
		if(chunk == null) {
			png.dispose();
			error = true;
		} else {
			action = new lovedna.canvas.bone.data.BoneActionConfig();
			action.init(url,chunk.get_content());
		}
	}
	if(!error) lovedna.canvas.ImageHelper.setImageSheet(url,bmd);
	var list = lovedna.canvas.bone.ImageBone._loadMap.get(url);
	if(list != null) {
		var len = list.length;
		while(len-- > 0) {
			var bone = list[len];
			if(!error) {
				bone._config = action;
				bone._lastAlpha = bone.alpha;
				bone.alpha = 0;
				bone._init = false;
				action.create(bone);
				bone._hasConfig = true;
				bone.updateSkin();
				action.setAction(bone);
			}
			if(bone._loadedHandler != null) bone._loadedHandler(bone,!error);
		}
	}
};
lovedna.canvas.bone.ImageBone.__super__ = lovedna.canvas.ImageContainer;
lovedna.canvas.bone.ImageBone.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	restart: function() {
		var len = this._childs.length;
		while(len-- > 0) {
			var img = this._childs[len];
			if(js.Boot.__instanceof(img,lovedna.canvas.bone.BoneChild)) {
				var child = this._childs[len];
				if(child != null) child.restart();
			}
		}
	}
	,setSkin: function(name,image) {
		if(image == null) {
			if(this._skinConfig.exists(name)) this._skinConfig.remove(name);
		} else this._skinConfig.set(name,image);
		if(this._hasConfig) {
			var img = this.getChildByName(name);
			if(img != null) {
				img.mouseEnabled = this.mouseEnabled;
				if(js.Boot.__instanceof(img,lovedna.canvas.ImageContainer)) {
					var con = img;
					con.addChild(image);
					con.set_image(null);
				} else img.set_image(image.image);
			}
		}
	}
	,setLoadedHandler: function(handler) {
		this._loadedHandler = handler;
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this._skinConfig = new haxe.ds.StringMap();
		this._timeScale = 1;
		this._url = null;
		this._init = false;
		this._lastAlpha = 1;
		this._hasConfig = false;
		this.playing = true;
		this._loadedHandler = null;
	}
	,addChildAt: function(value,index) {
		if(js.Boot.__instanceof(value,lovedna.canvas.bone.BoneChild)) {
			var child = value;
			child.setTimeScale(this._timeScale);
		}
		return lovedna.canvas.ImageContainer.prototype.addChildAt.call(this,value,index);
	}
	,dispose: function() {
		lovedna.canvas.ImageContainer.prototype.dispose.call(this);
		this._url = null;
		this._action = null;
		this._config = null;
		this._skinConfig = null;
		this._loadedHandler = null;
	}
	,update: function(camera) {
		if(this.root != null) {
			if(!this._init) {
				this._init = true;
				if(this.alpha == 0) this.alpha = this._lastAlpha;
			}
			this.root.playing = this.playing;
			this.root.update(camera);
		}
		return lovedna.canvas.ImageContainer.prototype.update.call(this,camera);
	}
	,load: function(url,rect,centerPoint) {
		if(url != "") {
			var hasload = true;
			if(url != this._url) {
				this._url = url;
				var config = lovedna.canvas.bone.data.BoneActionConfig.getConfig(this._url);
				if(config != null) {
					this._init = false;
					this._config = config;
					this._lastAlpha = this.alpha;
					this.alpha = 0;
					config.create(this);
					this._hasConfig = true;
					this.updateSkin();
					if(this._action != null) config.setAction(this);
				} else {
					hasload = false;
					this._hasConfig = false;
					if(lovedna.canvas.bone.ImageBone._loader == null) {
						lovedna.canvas.bone.ImageBone._loader = new lovedna.canvas.net.NetStorage();
						lovedna.canvas.bone.ImageBone._loader.setImageCompleteHandler(lovedna.canvas.bone.ImageBone.dataCompleteHandler);
					}
					if(lovedna.canvas.bone.ImageBone._loadMap == null) lovedna.canvas.bone.ImageBone._loadMap = new haxe.ds.StringMap();
					var list = lovedna.canvas.bone.ImageBone._loadMap.get(url);
					if(list == null) {
						list = [];
						lovedna.canvas.bone.ImageBone._loadMap.set(url,list);
						list.push(this);
						lovedna.canvas.bone.ImageBone._loader.loadImage(url,-1,true,this.loadType);
					} else {
						var id = Lambda.indexOf(list,this);
						if(id == -1) list.push(this);
					}
				}
			}
			this._url = url;
			if(hasload) {
				if(this._loadedHandler != null) this._loadedHandler(this,true);
			}
		}
	}
	,hasAction: function(action) {
		if(this._config != null) return this._config.hasAction(action);
		return false;
	}
	,get_action: function() {
		return this._action;
	}
	,set_action: function(value) {
		if(value != null) {
			if(value != this._action) {
				this._action = value;
				if(this._config != null) this._config.setAction(this);
			}
		}
		return value;
	}
	,get_timeScale: function() {
		return this._timeScale;
	}
	,set_timeScale: function(value) {
		var len = this._childs.length;
		while(len-- > 0) {
			var child = this._childs[len];
			if(child != null) child.setTimeScale(value);
		}
		return this._timeScale = value;
	}
	,updateSkin: function() {
		if(this._skinConfig != null) {
			var iter = this._skinConfig.keys();
			while(iter.hasNext()) {
				var name = iter.next();
				var img = this._skinConfig.get(name);
				var child = this.getChildByName(name);
				if(child != null) {
					child.mouseEnabled = this.mouseEnabled;
					if(js.Boot.__instanceof(child,lovedna.canvas.ImageContainer)) {
						var con = child;
						con.addChild(img);
						img.x = 0;
						img.y = 0;
						child.set_image(null);
					} else child.set_image(img.image);
				}
			}
		}
	}
	,__class__: lovedna.canvas.bone.ImageBone
	,__properties__: $extend(lovedna.canvas.ImageContainer.prototype.__properties__,{set_action:"set_action",get_action:"get_action",set_timeScale:"set_timeScale",get_timeScale:"get_timeScale"})
});
game.client.module.draw.Chicken = function() {
	lovedna.canvas.bone.ImageBone.call(this);
	this._moving = false;
};
$hxClasses["game.client.module.draw.Chicken"] = game.client.module.draw.Chicken;
game.client.module.draw.Chicken.__name__ = ["game","client","module","draw","Chicken"];
game.client.module.draw.Chicken.__super__ = lovedna.canvas.bone.ImageBone;
game.client.module.draw.Chicken.prototype = $extend(lovedna.canvas.bone.ImageBone.prototype,{
	showError: function() {
		this._moving = true;
		this.set_action("run");
		this.set_timeScale(0.4);
	}
	,reset: function() {
		lovedna.canvas.bone.ImageBone.prototype.reset.call(this);
		this._moving = false;
		this.load("chicken.png");
		this.set_action("eat");
		this.set_timeScale(0.1);
	}
	,update: function(camera) {
		if(lovedna.canvas.bone.ImageBone.prototype.update.call(this,camera)) {
			if(this._moving) {
				this.x -= 1;
				if(this.x < 0) {
					this._moving = false;
					this.alpha = 0;
				}
			}
			return true;
		}
		return false;
	}
	,__class__: game.client.module.draw.Chicken
});
lovedna.canvas.mouse = {};
lovedna.canvas.mouse.IMouseHandler = function() { };
$hxClasses["lovedna.canvas.mouse.IMouseHandler"] = lovedna.canvas.mouse.IMouseHandler;
lovedna.canvas.mouse.IMouseHandler.__name__ = ["lovedna","canvas","mouse","IMouseHandler"];
lovedna.canvas.mouse.IMouseHandler.prototype = {
	__class__: lovedna.canvas.mouse.IMouseHandler
};
lovedna.canvas.mouse.MouseHandler = function() {
	this.__activeList = [];
};
$hxClasses["lovedna.canvas.mouse.MouseHandler"] = lovedna.canvas.mouse.MouseHandler;
lovedna.canvas.mouse.MouseHandler.__name__ = ["lovedna","canvas","mouse","MouseHandler"];
lovedna.canvas.mouse.MouseHandler.__interfaces__ = [lovedna.canvas.mouse.IMouseHandler];
lovedna.canvas.mouse.MouseHandler.prototype = {
	onUnderMouse: function(value,x,y) {
		value = this.getTopObject(value);
		this.__x = x;
		this.__y = y;
		this._active = value;
		if(this._active != null) {
			if(this._active != this._over) {
				this.out(this._over);
				this.over(this._active);
			}
		} else this.out(this._over);
		this._over = this._active;
	}
	,getTopObject: function(value) {
		if(value != null) {
			var top = value;
			var parent = value.get_parent();
			while(parent != null) {
				if(parent.mouseEnabled && !parent.mouseChildren) top = parent;
				parent = parent.get_parent();
			}
			value = top;
			if(!value.mouseEnabled) value = null;
		}
		return value;
	}
	,down: function(value,user) {
		if(user == null) user = false;
		if(value != null) {
			if(js.Boot.__instanceof(value,lovedna.canvas.mouse.IMouseObject)) {
				var mouseobj = value;
				mouseobj.mouseDown(this.__x,this.__y,user);
			}
			this._down = value;
		}
	}
	,up: function(value,user) {
		if(user == null) user = false;
		if(value != null) {
			if(js.Boot.__instanceof(value,lovedna.canvas.mouse.IMouseObject)) {
				var mouseobj = value;
				mouseobj.mouseUp(this.__x,this.__y,user);
			}
			this.over(value);
		}
		this._down = null;
	}
	,over: function(value,user) {
		if(user == null) user = false;
		if(value != null) {
			if(js.Boot.__instanceof(value,lovedna.canvas.mouse.IMouseObject)) {
				var mouseobj = value;
				if(this._down == value) mouseobj.mouseDown(this.__x,this.__y); else mouseobj.mouseOver(this.__x,this.__y,user);
			}
		}
	}
	,out: function(value,user) {
		if(user == null) user = false;
		if(value != null) {
			if(js.Boot.__instanceof(value,lovedna.canvas.mouse.IMouseObject)) {
				var mouseobj = value;
				mouseobj.mouseOut(this.__x,this.__y,user);
			}
		}
	}
	,upOutSide: function(value) {
		if(value != null) {
			if(js.Boot.__instanceof(value,lovedna.canvas.mouse.IMouseObject)) {
				var mouseobj = value;
				mouseobj.mouseUpOutSide(this.__x,this.__y);
			}
		}
	}
	,onMouseEvent: function(value) {
		var type = value.type;
		var id = value.touchId;
		if(type == 2) {
		} else if(type == 1) {
			this.__activeList[id] = this._active;
			this.down(this._active,true);
		} else if(type == 3) {
			var obj = this.__activeList[id];
			if(obj == this._active) this.up(obj,true); else this.upOutSide(obj);
			this._down = null;
		}
	}
	,onLongPress: function(id) {
		var active = this.getObject(id);
		if(active != null) {
			if(js.Boot.__instanceof(active,lovedna.canvas.mouse.IMouseObject)) {
				var mouseobj = active;
				mouseobj.longPress(this.__x,this.__y);
			}
		}
	}
	,begin: function() {
	}
	,end: function() {
		this._active = null;
		this._over = null;
		this._down = null;
		this.__activeList = [];
	}
	,getLongPressTime: function() {
		return 0;
	}
	,getObject: function(id) {
		return this.__activeList[id];
	}
	,__class__: lovedna.canvas.mouse.MouseHandler
};
game.client.module.draw.DrawMouseHandler = function() {
	lovedna.canvas.mouse.MouseHandler.call(this);
	this._hasdown = false;
};
$hxClasses["game.client.module.draw.DrawMouseHandler"] = game.client.module.draw.DrawMouseHandler;
game.client.module.draw.DrawMouseHandler.__name__ = ["game","client","module","draw","DrawMouseHandler"];
game.client.module.draw.DrawMouseHandler.__super__ = lovedna.canvas.mouse.MouseHandler;
game.client.module.draw.DrawMouseHandler.prototype = $extend(lovedna.canvas.mouse.MouseHandler.prototype,{
	stopDraw: function() {
		this._hasdown = false;
	}
	,onMouseEvent: function(value) {
		lovedna.canvas.mouse.MouseHandler.prototype.onMouseEvent.call(this,value);
		if(value.type == 2) {
			if(this._hasdown) this._draw.draw(this.__x,this.__y);
		} else if(value.type == 1) {
			this._hasdown = this._draw.startDraw(this.__x,this.__y,this._active);
			if(this._hasdown) this._draw.draw(this.__x,this.__y);
		} else if(value.type == 3) {
			this._draw.complete();
			this._hasdown = false;
		}
	}
	,__class__: game.client.module.draw.DrawMouseHandler
});
game.client.module.draw.DrawStage = function() {
	game.client.core.GameStage.call(this);
	this._tableData = new game.client.module.draw.data.TableData();
	this.drawing = true;
	this._loader = new lovedna.canvas.net.NetStorage();
	this._loader.setImageCompleteHandler($bind(this,this.imageComplete));
	this._showNumberCell = true;
	this._swapMode = true;
	this._hasData = false;
	this._loadDelay = new lovedna.utils.tick.Delay();
	this._loadDelay.setCompleteHandler($bind(this,this.delayLoad));
	this._hasShowComplete = false;
};
$hxClasses["game.client.module.draw.DrawStage"] = game.client.module.draw.DrawStage;
game.client.module.draw.DrawStage.__name__ = ["game","client","module","draw","DrawStage"];
game.client.module.draw.DrawStage.__super__ = game.client.core.GameStage;
game.client.module.draw.DrawStage.prototype = $extend(game.client.core.GameStage.prototype,{
	startDraw: function(px,py,target) {
		if(this._hasShowComplete) {
			this._stageService.start(this._stageConfig.menu);
			return false;
		}
		if(!this._hasData) return false;
		if(this._hasGuide) {
			if(this._guide != null && target == null) {
				var finish = this._guide.next();
				var type = this._guide.getType();
				var step = this._guide.getStep();
				if(finish) this._hasGuide = false;
				if(type == 2) {
					if(step == 1) this.setDrawMode(true); else if(step == 2) this.markAll(); else if(step == 3) this.setDrawMode(false); else if(step == 4) {
						this.markAll();
						this._hasGuide = false;
					}
				} else if(type == 3) {
					if(step == 3) {
						this.setDrawMode(true);
						this.mark1();
					} else if(step == 5) this.mark2();
				}
			}
			return false;
		}
		if(this._complete) return false;
		var tx = px - this._container.x;
		var ty = py - this._container.y;
		var row;
		var col;
		row = Math.floor(tx / game.client.module.draw.Cell.size);
		col = Math.floor(ty / game.client.module.draw.Cell.size);
		var w = this._tableData._width;
		var h = this._tableData._height;
		var hastouch = false;
		if(row >= 0 && col >= 0 && row < w && col < h) {
			var id = col * this._tableData._list._width + row;
			var image = this._cellMap.get(id);
			if(image != null) {
				if(image.hasFail()) return false;
				if(!image.hasBreak()) {
					this._markx = row;
					this._marky = col;
					this._mark = !image.hasMark();
					return true;
				}
			}
		}
		if(target == null) {
			if(this._swapMode) this.setDrawMode(!this.drawing);
		}
		return false;
	}
	,draw: function(px,py) {
		if(this._complete) return false;
		var tx = px - this._container.x;
		var ty = py - this._container.y;
		var row;
		var col;
		row = Math.floor(tx / game.client.module.draw.Cell.size);
		col = Math.floor(ty / game.client.module.draw.Cell.size);
		var w = this._tableData._width;
		var h = this._tableData._height;
		if(row >= w || col >= h) return false;
		if(row >= 0 && col >= 0) {
			if(row != this._markx && col != this._marky) return false;
			var id = col * this._tableData._list._width + row;
			var image = this._cellMap.get(id);
			if(image != null) {
				if(this.drawing) image.draw(this._mark); else if(!image.hasMark()) {
					var hasbreak = image.hasBreak();
					if(hasbreak) return false;
					var err = image["delete"]();
					if(err) {
						this._mosue.stopDraw();
						this.check(row,col);
						this._container.shake();
						return false;
					}
					this._result.set(row,col,false);
					this.check(row,col);
					if(!hasbreak) {
						var effect = lovedna.utils.Pool.getObject(game.client.module.draw.BreakEffect);
						effect.x = image.stageX;
						effect.y = image.stageY;
						this.addChild(effect);
					}
				} else if(this._guide != null) {
					if(this._guide.getType() == 2) this._guide.next(5);
				}
				return true;
			}
		}
		return false;
	}
	,complete: function() {
	}
	,changeMode: function() {
		if(this._swapMode) this.setDrawMode(!this.drawing);
	}
	,load: function(url,rect,centerPoint) {
		this._level = url;
		this._url = this._level + ".png";
		this._loadDelay.start(500);
	}
	,getResult: function() {
		var iter = this._cellMap.iterator();
		while(iter.hasNext()) {
			var image = iter.next();
			if(!image.hasMark()) {
				var hasbreak = image.hasBreak();
				if(hasbreak) continue;
				var err = image["delete"]();
				if(!err) {
					var row = image.row;
					var col = image.col;
					this._result.set(row,col,false);
					this.check(row,col);
				}
				if(!hasbreak) {
					var effect = lovedna.utils.Pool.getObject(game.client.module.draw.BreakEffect);
					effect.x = image.stageX;
					effect.y = image.stageY;
					this.addChild(effect);
				}
			}
		}
		return this._result;
	}
	,edit: function() {
		this._level = "0";
		var arr = new lovedna.utils.Array2(10,10);
		arr.fill(0);
	}
	,start: function() {
		game.client.core.GameStage.prototype.start.call(this);
		this.addChild(this._container);
		this._camera.setMouseHandler(this._mosue);
		this._drawBtn.load("ui2.png#" + "brush.png");
		this._breakBtn.load("ui2.png#" + "hammer.png");
		this.addChild(this._drawBtn);
		this.addChild(this._breakBtn);
		this._drawBtn.setPressHandler($bind(this,this.btnpress));
		this._breakBtn.setPressHandler($bind(this,this.btnpress));
		this._drawBtn.alpha = this._breakBtn.alpha = 0;
		this._bone = lovedna.utils.Pool.getObject(lovedna.canvas.bone.ImageBone);
		this._container.setMoveEndHandler($bind(this,this.moveEnd));
		this._title = lovedna.utils.Pool.getObject(game.client.module.draw.TitleName);
		this._showNumberCell = true;
		this._swapMode = true;
		this._complete = false;
		this._chicken = lovedna.utils.Pool.getObject(game.client.module.draw.Chicken);
		this.addChild(this._chicken);
		this._chicken.x = 144.;
		this._chicken.y = game.client.config.AppConfig.rect.y + game.client.config.AppConfig.rect.height * 0.5;
		this._hasShowComplete = false;
	}
	,end: function() {
		game.client.core.GameStage.prototype.end.call(this);
		this.clearStage();
		if(this._guide != null) this.removeChild(this._guide);
		this._guide = null;
		if(this._bone != null) {
			this._bone.dispose();
			this._bone = null;
		}
		if(this._chicken != null) {
			this._chicken.dispose();
			this._chicken = null;
		}
		this._title.dispose();
		this._title = null;
		this._loadDelay.stop();
		lovedna.canvas.ImageHelper.disposeImageSheet(this._url);
		this._url = "";
		this._hasGuide = false;
	}
	,resize: function(rect) {
		game.client.core.GameStage.prototype.resize.call(this,rect);
		var px = rect.x;
		var py = rect.y;
		var screenW = rect.width;
		var screenH = rect.height;
		var row = this._tableData._width;
		var col = this._tableData._height;
		var xn = this._tableData._maxXCount;
		var yn = this._tableData._maxYCount;
		var numberw = yn * 0.6 * game.client.module.draw.Cell.size;
		var numberh = xn * 0.9 * game.client.module.draw.Cell.size;
		if(!this._showNumberCell || this._complete) {
			numberw = 0;
			numberh = 0;
		}
		var buttonH = 50;
		var conh = col * game.client.module.draw.Cell.size + numberh;
		var conx = numberw + (screenW - numberw - row * game.client.module.draw.Cell.size) * 0.5;
		var cony = numberh + (screenH - conh - buttonH) * 0.5 + py + buttonH;
		var h = (screenH - col * game.client.module.draw.Cell.size - numberh) * 0.5;
		this._container.x = conx;
		this._container.y = cony;
		this._drawBtn.x = px + (screenW - buttonH) * 0.5;
		this._drawBtn.y = py;
		this._breakBtn.x = this._drawBtn.x;
		this._breakBtn.y = this._drawBtn.y;
		if(this._guide != null) this._guide.resize();
		if(this._title != null) {
			this._title.x = px + screenW * 0.5;
			this._title.y = py + screenH - 6;
		}
	}
	,reset: function() {
		game.client.core.GameStage.prototype.reset.call(this);
		this._drawBtn = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton);
		this._breakBtn = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton);
	}
	,setDrawMode: function(value) {
		if(this._complete) return;
		if(!this._hasData) return;
		this.drawing = value;
		if(this.drawing) {
			this._breakBtn.alpha = 0;
			this._drawBtn.alpha = 1;
		} else {
			this._breakBtn.alpha = 1;
			this._drawBtn.alpha = 0;
		}
	}
	,btnpress: function(btn) {
		if(btn == this._breakBtn) this.setDrawMode(true); else if(btn == this._drawBtn) this.setDrawMode(false);
	}
	,check: function(row,col) {
		var result;
		var n;
		var ok;
		result = this._result.getCol(row);
		var nd = this._tableData.getXNumberData(row);
		if(this._showNumberCell) {
			n = this._XNumber[row];
			ok = n.check(result);
		} else ok = nd.math(result);
		if(ok) {
		}
		result = this._result.getRow(col);
		nd = this._tableData.getYNumberData(col);
		if(this._showNumberCell) {
			n = this._YNumber[col];
			ok = n.check(result);
		} else ok = nd.math(result);
		if(ok) {
		}
		if(game.client.module.draw.Cell.hasComplete()) {
			this._complete = true;
			this.showComplete();
		}
	}
	,showComplete: function() {
		this.showResult();
		game.client.config.UserConfig.complete();
		var screenW = game.client.config.AppConfig.rect.width;
		var screenH = game.client.config.AppConfig.rect.height;
		var py = game.client.config.AppConfig.rect.y;
		var buttonH = 50;
		var row = this._tableData._width;
		var col = this._tableData._height;
		var numberw = 0;
		var numberh = 0;
		var tx = numberw + (screenW - numberw - row * game.client.module.draw.Cell.size) * 0.5;
		var ty = numberh + (screenH - numberh - buttonH - col * game.client.module.draw.Cell.size) * 0.5 + py;
		this._container.moveTo(tx,ty);
		this.hideTool();
		if(this._level == "1" || this._level == "2") this.moveEnd();
	}
	,moveEnd: function() {
		this._title.show();
		this._hasShowComplete = true;
		var point = this._tableData.getAnimationPoint();
		if(point != null) {
			this._bone.setLoadedHandler($bind(this,this.boneLoadedHandler));
			this._bone.load(this._level + ".png");
			this.addChild(this._bone);
			this._bone.x = this._container.x + point.x;
			this._bone.y = this._container.y + point.y;
		}
		if(this._guide != null) {
			if(this._level == "1") {
				this._hasGuide = true;
				this._guide.next(3);
			} else if(this._level == "2") this._guide.next(10); else if(this._level == "3") this._guide.next(10);
		}
	}
	,boneLoadedHandler: function(bone,success) {
		if(success) {
			bone.set_action("play");
			this.clearStage();
			this.breakAll();
		} else {
		}
	}
	,imageComplete: function(url,bmd,loadType,data) {
		this._hasData = false;
		if(this._url != url) return;
		if(bmd == null || data == null) {
			if(this._chicken != null) this._chicken.showError();
			return;
		}
		var png = new lovedna.utils.png.PngReader();
		png.read(data);
		var chunk = png.getChunk(1716666723);
		if(chunk == null) return;
		lovedna.canvas.ImageHelper.setImageSheet(url,bmd);
		this._title.load(url,null,new openfl.geom.Point(0.5,1));
		this._title.bmdwidth = bmd.width;
		this.addChild(this._title);
		this._title.alpha = 0;
		var bytes = chunk.get_content();
		if(bytes == null) return;
		if(this._level == "1") {
			if(this._guide == null) this._guide = this._stageService.getInstance(game.client.module.guide.Guide);
			this.addChild(this._guide);
			this._guide.start(1);
			this._showNumberCell = false;
			this._swapMode = false;
			this._hasGuide = true;
			this.parseData(game.client.module.guide.Guide.guideData);
			this.hideTool();
			this.drawing = false;
		} else if(this._level == "2") {
			if(this._guide == null) this._guide = this._stageService.getInstance(game.client.module.guide.Guide);
			this.addChild(this._guide);
			this._guide.start(2);
			this._showNumberCell = false;
			this._swapMode = false;
			bytes = game.client.module.guide.Guide.guideData;
			this._hasGuide = true;
			this.drawing = false;
			this.parseData(game.client.module.guide.Guide.guideData);
			this.hideTool();
			this.drawing = false;
		} else if(this._level == "3") {
			if(this._guide == null) this._guide = this._stageService.getInstance(game.client.module.guide.Guide);
			this.addChild(this._guide);
			this._guide.start(3);
			this._swapMode = false;
			this._hasGuide = true;
			this.parseData(bytes);
		} else this.parseData(bytes);
	}
	,parseData: function(value) {
		this._chicken.dispose();
		this._chicken = null;
		this.clearStage();
		this._cellMap = new haxe.ds.IntMap();
		this._tableData.decode(value);
		game.client.config.UserConfig.setResult(this._tableData._resultData);
		var w = this._tableData._width;
		var h = this._tableData._height;
		this._result = new lovedna.utils.Array2(w,h);
		this._result.fill(true);
		this._container.start();
		this._complete = false;
		this._hasData = true;
		this.setDrawMode(true);
		var xn = this._tableData._maxXCount;
		var yn = this._tableData._maxYCount;
		var xx = w + yn * 0.6;
		var yy = h + xn * 0.9;
		var rect = lovedna.utils.ResizeUtil.getSize(xx,yy,game.client.config.AppConfig.rect.width - w,game.client.config.AppConfig.rect.height - h);
		var cellSize = lovedna.utils.MathUtil.min(rect.width,rect.height);
		var size = cellSize | 0;
		if(size > 36) size = 36;
		game.client.module.draw.Cell.restart();
		var scale = (size - 1) / 10;
		game.client.module.draw.Cell.size = size;
		var data = this._tableData._list;
		var _g = 0;
		while(_g < w) {
			var i = _g++;
			var _g1 = 0;
			while(_g1 < h) {
				var j = _g1++;
				var img = lovedna.utils.Pool.getObject(game.client.module.draw.Cell);
				img.row = i;
				img.col = j;
				this._container.addChild(img);
				img.init(data._list[j * data._width + i]);
				img.x = i * size;
				img.y = j * size;
				var key = j * data._width + i;
				this._cellMap.set(key,img);
				img.scaleX = img.scaleY = scale;
			}
		}
		this._XNumber = [];
		this._YNumber = [];
		if(this._showNumberCell) {
			var _g2 = 0;
			while(_g2 < w) {
				var i1 = _g2++;
				var nd = this._tableData.getXNumberData(i1);
				var n = lovedna.utils.Pool.getObject(game.client.module.draw.TipNumber);
				n.setData(nd);
				n.check(this._result.getCol(i1));
				this._XNumber[i1] = n;
				this._container.addChild(n);
				if(nd.number == 10) n.setNumber(nd.number); else n.setNumber(nd.number,false);
				n.x = i1 * size + (size - n._width * scale) * 0.5;
				n.scaleX = n.scaleY = scale;
				n.y = -n._heigh * scale;
			}
			var _g3 = 0;
			while(_g3 < h) {
				var i2 = _g3++;
				var nd1 = this._tableData.getYNumberData(i2);
				var n1 = lovedna.utils.Pool.getObject(game.client.module.draw.TipNumber);
				n1.setData(nd1);
				n1.check(this._result.getRow(i2));
				this._YNumber[i2] = n1;
				this._container.addChild(n1);
				n1.setNumber(nd1.number);
				n1.x = -n1._width * scale;
				n1.y = i2 * size + (size - n1._heigh * scale) * 0.5;
				n1.scaleX = n1.scaleY = scale;
			}
		}
		this.resize(game.client.config.AppConfig.rect);
	}
	,clearStage: function() {
		var len = this._container.numChildren;
		while(len-- > 0) this._container.getChildAt(len).dispose();
	}
	,breakAll: function() {
		var iter = this._cellMap.iterator();
		while(iter.hasNext()) {
			var image = iter.next();
			var hasbreak = image.hasBreak();
			if(hasbreak) continue;
			if(!hasbreak) {
				var effect = lovedna.utils.Pool.getObject(game.client.module.draw.BreakEffect);
				effect.x = image.stageX;
				effect.y = image.stageY;
				this.addChild(effect);
			}
		}
	}
	,showResult: function() {
		var len = this._container.numChildren;
		while(len-- > 0) {
			var child = this._container.getChildAt(len);
			if(js.Boot.__instanceof(child,game.client.module.draw.Cell)) {
				var cell = child;
				cell.showResult();
			} else if(js.Boot.__instanceof(child,game.client.module.draw.TipNumber)) child.alpha = 0;
		}
	}
	,markAll: function() {
		var iter = this._cellMap.iterator();
		while(iter.hasNext()) {
			var image = iter.next();
			image.draw(true);
		}
	}
	,unmarkAll: function() {
		var iter = this._cellMap.iterator();
		while(iter.hasNext()) {
			var image = iter.next();
			image.draw(false);
		}
	}
	,hideTool: function() {
		this._breakBtn.alpha = this._drawBtn.alpha = 0;
	}
	,mark1: function() {
		var iter = this._cellMap.iterator();
		while(iter.hasNext()) {
			var image = iter.next();
			if(image.col == 0) image.draw(true);
		}
	}
	,mark2: function() {
		var iter = this._cellMap.iterator();
		while(iter.hasNext()) {
			var image = iter.next();
			if(image.row == 1) image.draw(true);
		}
	}
	,delayLoad: function() {
		this._hasShowComplete = false;
		this._loader.loadImage(this._url,1,true);
	}
	,__class__: game.client.module.draw.DrawStage
});
game.client.module.draw.EditMouseHandler = function() {
	lovedna.canvas.mouse.MouseHandler.call(this);
	this._hasdown = false;
};
$hxClasses["game.client.module.draw.EditMouseHandler"] = game.client.module.draw.EditMouseHandler;
game.client.module.draw.EditMouseHandler.__name__ = ["game","client","module","draw","EditMouseHandler"];
game.client.module.draw.EditMouseHandler.__super__ = lovedna.canvas.mouse.MouseHandler;
game.client.module.draw.EditMouseHandler.prototype = $extend(lovedna.canvas.mouse.MouseHandler.prototype,{
	stopDraw: function() {
		this._hasdown = false;
	}
	,onMouseEvent: function(value) {
		lovedna.canvas.mouse.MouseHandler.prototype.onMouseEvent.call(this,value);
		if(value.type == 2) {
			if(this._hasdown) this._draw.draw(this.__x,this.__y);
		} else if(value.type == 1) {
			this._hasdown = this._draw.startDraw(this.__x,this.__y,this._active);
			if(this._hasdown) this._draw.draw(this.__x,this.__y);
		} else if(value.type == 3) {
			this._draw.complete();
			this._hasdown = false;
		}
	}
	,__class__: game.client.module.draw.EditMouseHandler
});
game.client.module.draw.EditStage = function() {
	game.client.module.draw.DrawStage.call(this);
	this._empty = new openfl.utils.ByteArray();
	this._empty.writeByte(10);
	this._empty.writeByte(10);
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		this._empty.writeInt(0);
	}
	this._txt = new openfl.text.TextField();
	this._tmp = new openfl.text.TextField();
	this._tmp.set_autoSize(openfl.text.TextFieldAutoSize.LEFT);
	this._tmp.set_background(false);
};
$hxClasses["game.client.module.draw.EditStage"] = game.client.module.draw.EditStage;
game.client.module.draw.EditStage.__name__ = ["game","client","module","draw","EditStage"];
game.client.module.draw.EditStage.__super__ = game.client.module.draw.DrawStage;
game.client.module.draw.EditStage.prototype = $extend(game.client.module.draw.DrawStage.prototype,{
	getName: function() {
		return this._txt.get_text();
	}
	,getNameImage: function() {
		var name = this._txt.get_text();
		name = StringTools.trim(name);
		if(name != "") {
			this._tmp.set_text(name);
			var w = Std["int"](this._tmp.get_textWidth()) + 1;
			var h = Std["int"](this._tmp.get_textHeight()) + 1;
			var bmd = new openfl.display.BitmapData(w,h,true,0);
			bmd.draw(this._tmp);
			var png = lovedna.utils.images.PNGEncoder.encode(bmd);
			return png;
		}
		return null;
	}
	,start: function() {
		game.client.module.draw.DrawStage.prototype.start.call(this);
		this._camera.setMouseHandler(this._editmosue);
		this._showNumberCell = false;
		this._swapMode = false;
		this.flashStage.addChild(this._txt);
		this.parseData(this._empty);
		this.setDrawMode(true);
		this._drawBtn.alpha = this._breakBtn.alpha = 0;
	}
	,end: function() {
		game.client.module.draw.DrawStage.prototype.end.call(this);
		this.flashStage.removeChild(this._txt);
	}
	,__class__: game.client.module.draw.EditStage
});
game.client.module.draw.TableContainer = function() {
	lovedna.canvas.ImageContainer.call(this);
	this.reset();
};
$hxClasses["game.client.module.draw.TableContainer"] = game.client.module.draw.TableContainer;
game.client.module.draw.TableContainer.__name__ = ["game","client","module","draw","TableContainer"];
game.client.module.draw.TableContainer.__super__ = lovedna.canvas.ImageContainer;
game.client.module.draw.TableContainer.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	moveTo: function(px,py) {
		this._px = px;
		this._py = py;
		this._shakeX = this._px;
		this._shakeY = this._py;
		this._moveing = true;
		this._shaking = false;
	}
	,shake: function(time) {
		if(time == null) time = 300;
		this._shakeX = this.x;
		this._shakeY = this.y;
		this._shakeTime = time;
		this._shaking = true;
	}
	,setMoveEndHandler: function(handler) {
		this._moveEndHandler = handler;
	}
	,start: function() {
		this._moveing = false;
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this._moveing = false;
		this._shaking = false;
	}
	,update: function(camera) {
		if(lovedna.canvas.ImageContainer.prototype.update.call(this,camera)) {
			if(this._moveing) {
				var xinc = (this._px - this.x) * 0.1;
				var yinc = (this._py - this.y) * 0.1;
				this.x += xinc;
				this.y += yinc;
				if((xinc < 0?-xinc:xinc) < 0.1 && (yinc < 0?-yinc:yinc) < 0.1) {
					this._moveing = false;
					this._shaking = false;
					this.x = this._px;
					this.y = this._py;
					if(this._moveEndHandler != null) this._moveEndHandler();
				}
			} else if(this._shaking) {
				this.x = this._shakeX + Math.random() * 6 - 3;
				this.y = this._shakeY + Math.random() * 6 - 3;
				this._shakeTime -= this.tick;
				if(this._shakeTime <= 0) {
					this._shaking = false;
					this.x = this._shakeX;
					this.y = this._shakeY;
				}
			}
		}
		return true;
	}
	,__class__: game.client.module.draw.TableContainer
});
game.client.module.numbers = {};
game.client.module.numbers.ImageNumber = function() {
	lovedna.canvas.ImageContainer.call(this);
};
$hxClasses["game.client.module.numbers.ImageNumber"] = game.client.module.numbers.ImageNumber;
game.client.module.numbers.ImageNumber.__name__ = ["game","client","module","numbers","ImageNumber"];
game.client.module.numbers.ImageNumber.__super__ = lovedna.canvas.ImageContainer;
game.client.module.numbers.ImageNumber.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	setNumber: function(value,landscape) {
		if(landscape == null) landscape = true;
		this.clear();
		var arr = (value == null?"null":"" + value).split("");
		var len = arr.length;
		this._width = 6;
		this._heigh = 9;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var img = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
			this.addChild(img);
			var v = arr[i];
			img.load("ui2.png#" + v + ".png");
			if(landscape) {
				img.x = i * 6;
				img.y = 0;
			} else {
				img.y = i * 9;
				img.x = 0;
			}
		}
		if(landscape) this._width = len * 6; else this._heigh = len * 9;
	}
	,getWidth: function() {
		return this._width;
	}
	,getHeight: function() {
		return this._heigh;
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this.smooth = false;
		this._relativeFlags.open(8);
	}
	,dispose: function() {
		this.clear();
		lovedna.canvas.ImageContainer.prototype.dispose.call(this);
	}
	,clear: function() {
		var len = this.numChildren;
		while(len-- > 0) this.getChildAt(len).dispose();
		this.removeAll();
	}
	,__class__: game.client.module.numbers.ImageNumber
});
game.client.module.draw.TipNumber = function() {
	game.client.module.numbers.ImageNumber.call(this);
};
$hxClasses["game.client.module.draw.TipNumber"] = game.client.module.draw.TipNumber;
game.client.module.draw.TipNumber.__name__ = ["game","client","module","draw","TipNumber"];
game.client.module.draw.TipNumber.__super__ = game.client.module.numbers.ImageNumber;
game.client.module.draw.TipNumber.prototype = $extend(game.client.module.numbers.ImageNumber.prototype,{
	setData: function(value) {
		this._data = value;
	}
	,check: function(list) {
		var _list = this._data.getList();
		var len = _list.length;
		while(len-- > 0) if(_list[len] != list[len]) {
			this.alpha = 1;
			return false;
		}
		this.alpha = 0.1;
		return true;
	}
	,__class__: game.client.module.draw.TipNumber
});
game.client.module.draw.TitleName = function() {
	lovedna.canvas.Image.call(this);
	this._tween = new lovedna.motion.LMotion();
};
$hxClasses["game.client.module.draw.TitleName"] = game.client.module.draw.TitleName;
game.client.module.draw.TitleName.__name__ = ["game","client","module","draw","TitleName"];
game.client.module.draw.TitleName.__super__ = lovedna.canvas.Image;
game.client.module.draw.TitleName.prototype = $extend(lovedna.canvas.Image.prototype,{
	show: function() {
		this._swingTime = 500;
		this._maxScale = 2;
		this._dieoff = 0.001;
		this._tween.start(this._swingTime);
		this._currentSwing = 2;
		this._minSwing = this._currentSwing * 0.001;
		this.alpha = 1;
	}
	,reset: function() {
		lovedna.canvas.Image.prototype.reset.call(this);
		this._currentSwing = 0;
		this.smooth = false;
		this._relativeFlags.open(8);
	}
	,update: function(camera) {
		if(!lovedna.canvas.Image.prototype.update.call(this,camera)) return false;
		if(this._currentSwing > this._minSwing) {
			this._currentSwing -= this._dieoff * this.tick;
			this._tween.tickTime(this.time,this.tick);
			var p = this._tween.timep;
			var pi = p * 6.28318530717959;
			var sin = Math.sin(pi);
			this.scaleX = this._maxScale - sin * this._currentSwing;
			this.scaleY = this.scaleX;
		}
		return true;
	}
	,__class__: game.client.module.draw.TitleName
});
game.client.module.draw.data = {};
game.client.module.draw.data.NumberData = function() {
};
$hxClasses["game.client.module.draw.data.NumberData"] = game.client.module.draw.data.NumberData;
game.client.module.draw.data.NumberData.__name__ = ["game","client","module","draw","data","NumberData"];
game.client.module.draw.data.NumberData.prototype = {
	setData: function(list) {
		this._number = [];
		this._list = list;
		var len = this._list.length;
		var count = 0;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var v = this._list[i];
			if(v) count++;
			if(!v && count > 0) {
				this._number.push(count);
				count = 0;
			}
		}
		if(count > 0) this._number.push(count);
		this.number = Std.parseInt(this._number.join(""));
		return this._number.length;
	}
	,getNumbers: function() {
		return this._number;
	}
	,math: function(list) {
		var len = this._list.length;
		while(len-- > 0) if(this._list[len] != list[len]) return false;
		return true;
	}
	,getList: function() {
		return this._list;
	}
	,__class__: game.client.module.draw.data.NumberData
};
game.client.module.draw.data.TableData = function() {
	this._list = new lovedna.utils.Array2(0,0);
	this._maxXCount = this._maxYCount = 1;
	this._width = this._height = this._size = 0;
	this._animationPoint = new openfl.geom.Point();
};
$hxClasses["game.client.module.draw.data.TableData"] = game.client.module.draw.data.TableData;
game.client.module.draw.data.TableData.__name__ = ["game","client","module","draw","data","TableData"];
game.client.module.draw.data.TableData.prototype = {
	decode: function(data) {
		data.position = 0;
		this._width = data.readByte();
		this._height = data.readByte();
		this._size = this._width * this._height;
		var len = lovedna.utils.BitArray.getUseCount(this._size);
		var datalen = 2 + len * 4;
		var vlist = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			vlist.push(data.readInt());
		}
		var bitarr = new lovedna.utils.BitArray(this._size);
		bitarr.parse(vlist);
		this._list.resize(this._width,this._height);
		len = this._size;
		while(len-- > 0) this._list.setFromIndex(len,bitarr.hasOpen(len));
		this._xNumber = [];
		this._yNumber = [];
		this._maxXCount = this._maxYCount = 1;
		len = this._width;
		var nd;
		var count = 0;
		while(len-- > 0) {
			nd = this._xNumber[len];
			if(nd == null) {
				nd = new game.client.module.draw.data.NumberData();
				this._xNumber[len] = nd;
			}
			count = nd.setData(this._list.getCol(len));
			if(count > this._maxXCount) this._maxXCount = count;
		}
		len = this._height;
		while(len-- > 0) {
			nd = this._yNumber[len];
			if(nd == null) {
				nd = new game.client.module.draw.data.NumberData();
				this._yNumber[len] = nd;
			}
			count = nd.setData(this._list.getRow(len));
			if(count > this._maxYCount) this._maxYCount = count;
		}
		this._showAnimation = false;
		this.parseTag(data);
		data.position = 0;
		this._resultData = new openfl.utils.ByteArray();
		data.readBytes(this._resultData,0,datalen);
	}
	,getResult: function() {
		return this._resultData;
	}
	,hasCell: function(x,y) {
		return this._list.get(x,y);
	}
	,getXNumberData: function(x) {
		return this._xNumber[x];
	}
	,getYNumberData: function(y) {
		return this._yNumber[y];
	}
	,getWidth: function() {
		return this._width;
	}
	,getHeight: function() {
		return this._height;
	}
	,getXNumberCount: function() {
		return this._maxXCount;
	}
	,getYNumberCount: function() {
		return this._maxYCount;
	}
	,getList: function() {
		return this._list;
	}
	,getAnimationPoint: function() {
		if(this._showAnimation) return this._animationPoint;
		return null;
	}
	,parseTag: function(data) {
	}
	,__class__: game.client.module.draw.data.TableData
};
game.client.module.guide = {};
game.client.module.guide.Guide = function() {
	lovedna.canvas.ImageContainer.call(this);
	game.client.module.guide.Guide.guideData = new openfl.utils.ByteArray();
	game.client.module.guide.Guide.guideData.writeByte(3);
	game.client.module.guide.Guide.guideData.writeByte(3);
	var bf = new lovedna.utils.BitField();
	bf.open(4);
	game.client.module.guide.Guide.guideData.writeInt(0);
	this.reset();
};
$hxClasses["game.client.module.guide.Guide"] = game.client.module.guide.Guide;
game.client.module.guide.Guide.__name__ = ["game","client","module","guide","Guide"];
game.client.module.guide.Guide.guideData = null;
game.client.module.guide.Guide.__super__ = lovedna.canvas.ImageContainer;
game.client.module.guide.Guide.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	init: function() {
		this.addChild(this._boy);
		this.addChild(this._tip);
	}
	,start: function(type) {
		this._type = type;
		this._step = 0;
		if(this._type == 0) this._current = $bind(this,this.guide0); else if(this._type == 1) this._current = $bind(this,this.guide1); else if(this._type == 2) this._current = $bind(this,this.guide2); else if(this._type == 3) this._current = $bind(this,this.guide3);
		if(this._current != null) this._current(this._step);
	}
	,next: function(step) {
		if(step == null) step = 0;
		if(step == 0) this._step++; else this._step = step;
		if(this._current != null) return this._current(this._step);
		return false;
	}
	,getType: function() {
		return this._type;
	}
	,getStep: function() {
		return this._step;
	}
	,complete: function() {
	}
	,resize: function() {
		if(this._current != null) this._current(this._step);
	}
	,getBoy: function() {
		return this._boy;
	}
	,showTip: function(msg) {
		this._tip.setMsg(msg);
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this._tip = lovedna.utils.Pool.getObject(game.client.module.guide.MsgText);
		this._boy = lovedna.utils.Pool.getObject(lovedna.canvas.bone.ImageBone);
		this._boy.load("boy.png");
		this._tip.y = -100;
		this.x = 70;
		this.y = 300;
	}
	,guide0: function(step) {
		if(step == 0) {
			this.x = 144.;
			var lv = 0;
			var obj = game.client.util.SaveUtil.get("currentLevel");
			if(obj != null) lv = obj;
			var num = this._configData.maxLevel - lv + 1;
			if(num < 1) {
				this.x = 50;
				this.y = game.client.config.AppConfig.rect.height * 0.5 + game.client.config.AppConfig.rect.y;
				this.showTip("太棒了,全部完成");
				this._boy.set_action("bye");
			} else {
				this.x = 144.;
				this.y = game.client.config.AppConfig.rect.height * 0.9 + game.client.config.AppConfig.rect.y;
				this.showTip("还有" + num + "关未完成哟");
				this._boy.set_action("hi");
			}
			this.init();
		}
		return false;
	}
	,guide1: function(step) {
		this.x = 144.;
		this.y = game.client.config.AppConfig.rect.height * 0.4 + game.client.config.AppConfig.rect.y;
		if(step == 0) {
			this.showTip("我在这儿");
			this.init();
			this._boy.set_action("hi");
		} else if(step == 1) {
			this.showTip("听说阁下要成为雕刻大师");
			this._boy.set_action("say");
		} else if(step == 2) {
			this.showTip("我来告诉你一个诀窍");
			this._boy.set_action("say");
		} else if(step == 3) {
			this.showTip("敲碎没用的方块\n把下边的白色方块敲掉吧");
			this._boy.set_action("idle");
			return true;
		} else if(step == 4) {
			this.showTip("不错 你很有天分");
			this._boy.set_action("say");
		} else if(step == 5) {
			var backstr;
			backstr = "ESC键";
			this.showTip("点击" + backstr + "选择第二关\n第二关见");
			this._boy.set_action("bye");
		}
		return false;
	}
	,guide2: function(step) {
		this.x = 144.;
		this.y = game.client.config.AppConfig.rect.height * 0.4 + game.client.config.AppConfig.rect.y;
		if(step == 0) {
			this.showTip("怎样保护白色方块不被敲碎呢");
			this.init();
			this._boy.set_action("say");
		} else if(step == 1) {
			this.showTip("那就是用画笔标记成黑色");
			this._boy.set_action("say");
		} else if(step == 2) {
			this.showTip("我现在把方块全标记为黑色");
			this._boy.set_action("say");
		} else if(step == 3) {
			this.showTip("点击正上方的工具切换到画笔状态\n再点击方块可把黑色变为白色");
			this._boy.set_action("say");
			return true;
		} else if(step == 4) {
			this.showTip("接下来还是把所有的方块敲碎");
			this._boy.set_action("idle");
		} else if(step == 5) {
			this.showTip("只有白色的方块可以敲碎哟");
			this._boy.set_action("hi");
			return true;
		} else if(step == 10) {
			this.showTip("你以后要习惯使用画笔哟");
			this._boy.set_action("bye");
		}
		return false;
	}
	,guide3: function(step) {
		this.x = 144.;
		this.y = game.client.config.AppConfig.rect.height * 0.4 + game.client.config.AppConfig.rect.y;
		if(step == 0) {
			this.init();
			this.showTip("注意到数字了吗");
			this._boy.set_action("hi");
		} else if(step == 1) {
			this.showTip("左边的数字3代表这一行要保留3个方块");
			this._boy.set_action("say");
		} else if(step == 2) {
			this.showTip("使用画笔把这一行全部标记起来");
			this._boy.set_action("hi");
		} else if(step == 3) {
			this.showTip("上边的数字3代码这一列要保留3个方块");
			this._boy.set_action("say");
		} else if(step == 4) {
			this.showTip("使用画笔把这一列全部标记起来");
			this._boy.set_action("hi");
		} else if(step == 5) {
			this.showTip("剩下的数字1代表对应的\n行列里保留的方块数量为1");
			this._boy.set_action("say");
		} else if(step == 6) {
			this.showTip("现在点击画笔按钮切换为敲击状态\n然后把所有白色方块敲碎吧");
			this._boy.set_action("idle");
			return true;
		} else if(step == 10) {
			this.showTip("如果出现了两个数字\n就代表对应的行列里\n有不连续的方块要保留");
			this._boy.set_action("bye");
		}
		return false;
	}
	,__class__: game.client.module.guide.Guide
});
game.client.module.guide.MsgText = function() {
	lovedna.canvas.ImageContainer.call(this);
};
$hxClasses["game.client.module.guide.MsgText"] = game.client.module.guide.MsgText;
game.client.module.guide.MsgText.__name__ = ["game","client","module","guide","MsgText"];
game.client.module.guide.MsgText.__super__ = lovedna.canvas.ImageContainer;
game.client.module.guide.MsgText.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	setMsg: function(txt) {
		this._txt.set_text(txt);
		this._txt.x = -this._txt.textWidth * 0.5;
		this._txt.y = -this._txt.textHeight;
		this._bg.x = this._txt.x;
		this._bg.y = this._txt.y;
		this._bg.scaleX = (this._txt.textWidth + 4) / 10;
		this._bg.scaleY = (this._txt.textHeight + 4) / 10;
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this._bg = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
		this._txt = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageText);
		this.addChild(this._bg);
		this.addChild(this._txt);
		this._bg.load("ui2.png#" + "mark.png");
		this.smooth = false;
		this._relativeFlags.open(8);
	}
	,__class__: game.client.module.guide.MsgText
});
lovedna.canvas.mouse.IMouseObject = function() { };
$hxClasses["lovedna.canvas.mouse.IMouseObject"] = lovedna.canvas.mouse.IMouseObject;
lovedna.canvas.mouse.IMouseObject.__name__ = ["lovedna","canvas","mouse","IMouseObject"];
lovedna.canvas.mouse.IMouseObject.prototype = {
	__class__: lovedna.canvas.mouse.IMouseObject
};
lovedna.canvas.ui = {};
lovedna.canvas.ui.ImageButton = function() {
	lovedna.canvas.ImageContainer.call(this);
};
$hxClasses["lovedna.canvas.ui.ImageButton"] = lovedna.canvas.ui.ImageButton;
lovedna.canvas.ui.ImageButton.__name__ = ["lovedna","canvas","ui","ImageButton"];
lovedna.canvas.ui.ImageButton.__interfaces__ = [lovedna.canvas.mouse.IMouseObject];
lovedna.canvas.ui.ImageButton.__super__ = lovedna.canvas.ImageContainer;
lovedna.canvas.ui.ImageButton.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	setUpState: function(value) {
		var change = value != this._upState;
		if(change && this._upState != null) this.removeChild(this._upState);
		this._upState = value;
		if(change) this.addChild(this._upState);
		if(this._upState != null) this._upState.alpha = 0;
		this.updateState();
	}
	,loadUpState: function(imageData) {
		var image = this._upState;
		if(this._upState == null) image = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
		image.set_image(imageData);
		this.setUpState(image);
	}
	,setOverState: function(value) {
		var change = value != this._overState;
		if(change && this._overState != null) this.removeChild(this._overState);
		this._overState = value;
		if(change) this.addChild(this._overState);
		if(this._overState != null) this._overState.alpha = 0;
		this.updateState();
	}
	,loadOverState: function(imageData) {
		var image = this._overState;
		if(this._overState == null) image = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
		image.set_image(imageData);
		this.setOverState(image);
	}
	,setDownState: function(value) {
		var change = value != this._downState;
		if(change && this._downState != null) this.removeChild(this._downState);
		this._downState = value;
		if(change) this.addChild(this._downState);
		if(this._downState != null) this._downState.alpha = 0;
		this.updateState();
	}
	,loadDownState: function(imageData) {
		var image = this._downState;
		if(this._downState == null) image = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
		image.set_image(imageData);
		this.setDownState(image);
	}
	,setPressHandler: function(handler) {
		this._onPressHandler = handler;
	}
	,setReleaseHandler: function(handler) {
		this._onReleaseHandler = handler;
	}
	,setLongPressHandler: function(handler) {
		this._onLongPressHandler = handler;
	}
	,mouseOver: function(x,y,user) {
		if(user == null) user = false;
		if(!this.enable) return;
		if(this._overState == null) this._displayState = 3; else this._displayState = 4;
		this.updateState();
	}
	,mouseOut: function(x,y,user) {
		if(user == null) user = false;
		if(!this.enable) return;
		this._displayState = 3;
		this.updateState();
	}
	,mouseDown: function(x,y,user) {
		if(user == null) user = false;
		if(!this.enable) return;
		if(this._downState == null) this._displayState = 3; else this._displayState = 1;
		this.updateState();
		if(user) {
			if(this._onPressHandler != null) this._onPressHandler(this);
		}
	}
	,mouseUp: function(x,y,user) {
		if(user == null) user = false;
		if(!this.enable) return;
		this._displayState = 3;
		this.updateState();
		if(user) {
			if(this._onReleaseHandler != null) this._onReleaseHandler(this);
		}
	}
	,mouseUpOutSide: function(x,y) {
		if(!this.enable) return;
		this._displayState = 3;
		this.updateState();
	}
	,longPress: function(x,y) {
		if(!this.enable) return;
		this._displayState = 3;
		this.updateState();
		if(this._onLongPressHandler != null) this._onLongPressHandler(this);
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this.removeAll();
		this._upState = null;
		this._overState = null;
		this._downState = null;
		this._lastState = null;
		this._displayState = 3;
		this.mouseChildren = false;
		this.mouseEnabled = true;
		this._onPressHandler = null;
		this._onReleaseHandler = null;
		this._onLongPressHandler = null;
		this.buttonMode = true;
		this.set_enable(true);
	}
	,visit: function(camera) {
		if(this._upState != null) {
			this._upState.mouseEnabled = true;
			this._upState.mouseCheckPixel = this.mouseCheckPixel;
		}
		if(this._overState != null) {
			this._overState.mouseEnabled = true;
			this._overState.mouseCheckPixel = this.mouseCheckPixel;
		}
		if(this._downState != null) {
			this._downState.mouseEnabled = true;
			this._downState.mouseCheckPixel = this.mouseCheckPixel;
		}
		lovedna.canvas.ImageContainer.prototype.visit.call(this,camera);
	}
	,clone: function(keep) {
		if(keep == null) keep = false;
		return lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton).copyfrom(this,keep);
	}
	,copyfrom: function(value,keep) {
		if(keep == null) keep = false;
		lovedna.canvas.ImageContainer.prototype.copyfrom.call(this,value,keep);
		if(js.Boot.__instanceof(this,lovedna.canvas.ui.ImageButton)) {
			var btn = value;
			if(btn._upState != null) this._upState = btn._upState.clone(keep);
			if(btn._overState != null) this._overState = btn._overState.clone(keep);
			if(btn._downState != null) this._downState = btn._downState.clone(keep);
		}
		return this;
	}
	,load: function(url,rect,centerPoint) {
		var arr = url.split("#");
		var image = null;
		if(arr.length >= 2) image = lovedna.canvas.ImageHelper.getGroupImage(arr[0],arr[1],centerPoint); else image = lovedna.canvas.ImageHelper.getImageData(url,rect,centerPoint);
		this.loadUpState(image);
	}
	,updateState: function() {
		if(!this.enable) return;
		var state = null;
		if(this._displayState == 3) state = this._upState; else if(this._displayState == 1) state = this._downState; else if(this._displayState == 4) state = this._overState;
		if(state == null) state = this._upState;
		if(this._lastState != null) {
			if(this._lastState != state) this._lastState.alpha = 0;
		}
		this._lastState = state;
		if(this._lastState != null) this._lastState.alpha = 1;
	}
	,set_enable: function(value) {
		if(this.enable != value) {
			this.enable = value;
			this.updateState();
		}
		return value;
	}
	,__class__: lovedna.canvas.ui.ImageButton
	,__properties__: $extend(lovedna.canvas.ImageContainer.prototype.__properties__,{set_enable:"set_enable"})
});
game.client.module.menu = {};
game.client.module.menu.LevelButton = function() {
	lovedna.canvas.ui.ImageButton.call(this);
	this._list = new lovedna.utils.Array2(0,0);
};
$hxClasses["game.client.module.menu.LevelButton"] = game.client.module.menu.LevelButton;
game.client.module.menu.LevelButton.__name__ = ["game","client","module","menu","LevelButton"];
game.client.module.menu.LevelButton._empty = null;
game.client.module.menu.LevelButton._go = null;
game.client.module.menu.LevelButton.__super__ = lovedna.canvas.ui.ImageButton;
game.client.module.menu.LevelButton.prototype = $extend(lovedna.canvas.ui.ImageButton.prototype,{
	setResult: function(data) {
		if(data == null) data = game.client.module.menu.LevelButton._empty;
		var len = this._con.numChildren;
		while(len-- > 0) this._con.getChildAt(len).dispose();
		if(data == null) return;
		data.position = 0;
		if(data.length - data.position < 3) return;
		var w = data.readByte();
		var h = data.readByte();
		var size = w * h;
		len = lovedna.utils.BitArray.getUseCount(size);
		var vlist = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			vlist.push(data.readInt());
		}
		var bitarr = new lovedna.utils.BitArray(size);
		bitarr.parse(vlist);
		this._list.resize(w,h);
		len = size;
		while(len-- > 0) this._list.setFromIndex(len,bitarr.hasOpen(len));
		var _g1 = 0;
		while(_g1 < h) {
			var i1 = _g1++;
			var _g11 = 0;
			while(_g11 < w) {
				var j = _g11++;
				var b = this._list.get(j,i1);
				if(b) {
					var img = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
					img.load("ui2.png#" + "mark.png");
					img.scaleX = img.scaleY = 0.4;
					img.x = j * 5;
					img.y = i1 * 5;
					this._con.addChild(img);
					img.smooth = false;
					img._relativeFlags.open(8);
				}
			}
		}
		this._con.x = (10 - w) * 5 * 0.5 | 0;
		this._con.y = (10 - h) * 5 * 0.5 | 0;
	}
	,setLevel: function(value) {
		this._level = value;
		if(this._level == game.client.config.UserConfig.maxLevel) {
			this.setResult(game.client.module.menu.LevelButton._go);
			if(this._arrow == null) {
				this._arrow = lovedna.utils.Pool.getObject(lovedna.canvas.bone.ImageBone);
				this._arrow.smooth = false;
				this._arrow.load("arrow.png");
				this._arrow.x = 25.;
				this._arrow.y = 25.;
				this._arrow.set_action("go");
				this.addChild(this._arrow);
			}
		} else if(this._level > game.client.config.UserConfig.maxLevel) this.setResult(game.client.module.menu.LevelButton._empty); else this.setResult(game.client.config.UserConfig.getResult(this._level));
	}
	,getLevel: function() {
		return this._level;
	}
	,reset: function() {
		lovedna.canvas.ui.ImageButton.prototype.reset.call(this);
		this.smooth = false;
		this._relativeFlags.open(8);
		this._bg = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
		this._bg.load("ui2.png#" + "empty.png");
		this._bg.scaleX = this._bg.scaleY = 5;
		this.setUpState(this._bg);
		this.smooth = false;
		this._relativeFlags.open(8);
		this._con = lovedna.utils.Pool.getObject(lovedna.canvas.ImageContainer);
		this.addChild(this._con);
		this._con.smooth = false;
		this._con.setRelative(8,false);
		if(game.client.module.menu.LevelButton._empty == null) {
			game.client.module.menu.LevelButton._empty = new openfl.utils.ByteArray();
			game.client.module.menu.LevelButton._empty.writeByte(3);
			game.client.module.menu.LevelButton._empty.writeByte(5);
			var len = 15;
			var bit = new lovedna.utils.BitField();
			bit.open(0);
			bit.open(1);
			bit.open(2);
			bit.open(5);
			bit.open(7);
			bit.open(8);
			bit.open(13);
			game.client.module.menu.LevelButton._empty.writeInt(bit.getValue());
		}
		if(game.client.module.menu.LevelButton._go == null) {
			game.client.module.menu.LevelButton._go = new openfl.utils.ByteArray();
			game.client.module.menu.LevelButton._go.writeByte(10);
			game.client.module.menu.LevelButton._go.writeByte(10);
			var len1 = 100;
			var bit1 = new lovedna.utils.BitArray(100);
			bit1.open(0);
			bit1.open(1);
			bit1.open(2);
			bit1.open(3);
			bit1.open(4);
			bit1.open(5);
			bit1.open(6);
			bit1.open(7);
			bit1.open(8);
			bit1.open(9);
			bit1.open(10);
			bit1.open(20);
			bit1.open(30);
			bit1.open(40);
			bit1.open(50);
			bit1.open(60);
			bit1.open(70);
			bit1.open(80);
			bit1.open(90);
			bit1.open(19);
			bit1.open(29);
			bit1.open(39);
			bit1.open(49);
			bit1.open(59);
			bit1.open(69);
			bit1.open(79);
			bit1.open(89);
			bit1.open(91);
			bit1.open(92);
			bit1.open(93);
			bit1.open(94);
			bit1.open(95);
			bit1.open(96);
			bit1.open(97);
			bit1.open(98);
			bit1.open(99);
			var len2 = lovedna.utils.BitArray.getUseCount(100);
			var list = bit1.getFields();
			var _g = 0;
			while(_g < len2) {
				var i = _g++;
				game.client.module.menu.LevelButton._go.writeInt(list[i]);
			}
		}
	}
	,dispose: function() {
		lovedna.canvas.ui.ImageButton.prototype.dispose.call(this);
		this._bg.dispose();
		this._bg = null;
		if(this._arrow != null) {
			this._arrow.dispose();
			this._arrow = null;
		}
	}
	,__class__: game.client.module.menu.LevelButton
});
game.client.module.menu.MenuMouseHandler = function() {
	lovedna.canvas.mouse.MouseHandler.call(this);
};
$hxClasses["game.client.module.menu.MenuMouseHandler"] = game.client.module.menu.MenuMouseHandler;
game.client.module.menu.MenuMouseHandler.__name__ = ["game","client","module","menu","MenuMouseHandler"];
game.client.module.menu.MenuMouseHandler.__super__ = lovedna.canvas.mouse.MouseHandler;
game.client.module.menu.MenuMouseHandler.prototype = $extend(lovedna.canvas.mouse.MouseHandler.prototype,{
	onMouseEvent: function(value) {
		lovedna.canvas.mouse.MouseHandler.prototype.onMouseEvent.call(this,value);
		if(value.type == 3) {
			var mx = lovedna.utils.MathUtil.abs(value.movementX);
			var my = lovedna.utils.MathUtil.abs(value.movementY);
			if(mx > my) this._menu.mouseMove(value.movementX,this._active);
		}
	}
	,up: function(value,user) {
		if(user == null) user = false;
		lovedna.canvas.mouse.MouseHandler.prototype.up.call(this,value,user);
		if(user) this._menu.mouseUp(value);
	}
	,__class__: game.client.module.menu.MenuMouseHandler
});
game.client.module.menu.MenuStage = function() {
	game.client.core.GameStage.call(this);
	this._levelContainer = lovedna.utils.Pool.getObject(lovedna.canvas.ImageContainer);
	this._page = -1;
};
$hxClasses["game.client.module.menu.MenuStage"] = game.client.module.menu.MenuStage;
game.client.module.menu.MenuStage.__name__ = ["game","client","module","menu","MenuStage"];
game.client.module.menu.MenuStage.__super__ = game.client.core.GameStage;
game.client.module.menu.MenuStage.prototype = $extend(game.client.core.GameStage.prototype,{
	mouseUp: function(target) {
		if(target == null) return;
		if(js.Boot.__instanceof(target,game.client.module.menu.LevelButton)) {
			var btn = target;
			var lv = btn.getLevel();
			if(lv <= this._currentLevel) {
				game.client.config.UserConfig.currentLevel = lv;
				this._draw.load(lv + "");
				this._stageService.start(this._stageConfig.draw);
			}
		}
	}
	,mouseMove: function(xinc,under) {
		return;
		if(under != null) return;
		if(xinc < 0) this.btnRelease(this._rightBtn); else if(xinc > 0) this.btnRelease(this._leftBtn);
	}
	,reset: function() {
		game.client.core.GameStage.prototype.reset.call(this);
		this._pageNumber = lovedna.utils.Pool.getObject(game.client.module.numbers.ImageNumber);
		this.addChild(this._pageNumber);
	}
	,start: function() {
		game.client.core.GameStage.prototype.start.call(this);
		this._camera.setMouseHandler(this._mosue);
		this._leftBtn = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton);
		this._rightBtn = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton);
		this.addChild(this._leftBtn);
		this.addChild(this._rightBtn);
		this._leftBtn.load("ui2.png#" + "left.png");
		this._rightBtn.load("ui2.png#" + "right.png");
		this._leftBtn.setReleaseHandler($bind(this,this.btnRelease));
		this._rightBtn.setReleaseHandler($bind(this,this.btnRelease));
		this.addChild(this._levelContainer);
		this._levelContainer.mouseEnabled = true;
		var d = game.client.util.SaveUtil.get("currentLevel");
		var max = 1;
		if(d != null) max = d;
		if(max < 1) max = 1;
		if(this._page == -1) {
			this._page = max / 25 | 0;
			if(max % 25 == 0) this._page--;
			if(this._page < 0) this._page = 0;
		}
		this._maxLevel = this._configData.maxLevel;
		this._maxPage = this._maxLevel / 25 | 0;
		if(this._maxLevel % 25 == 0) this._maxPage--;
		if(this._maxPage < 0) this._maxPage = 0;
		game.client.config.UserConfig.maxLevel = max;
		this.showPage();
	}
	,end: function() {
		game.client.core.GameStage.prototype.end.call(this);
		this._leftBtn.dispose();
		this._rightBtn.dispose();
	}
	,resize: function(rect) {
		game.client.core.GameStage.prototype.resize.call(this,rect);
		var px = rect.x;
		var py = rect.y;
		var screenW = rect.width;
		var screenH = rect.height;
		var buttonH = 50;
		var buttonX = px + (screenW - 5 - buttonH * 2) * 0.5;
		this._leftBtn.x = buttonX;
		this._rightBtn.x = buttonX + buttonH + 5;
		this._leftBtn.y = screenH - buttonH + py - 5;
		this._rightBtn.y = this._leftBtn.y;
		this._levelContainer.x = px + (screenW - 270) * 0.5;
		this._levelContainer.y = py + (screenH - 270) * 0.5;
		this._pageNumber.x = (screenW - this._pageNumber._width * 4) * 0.5 + px;
		this._pageNumber.y = this._levelContainer.y - this._pageNumber._heigh * 4;
	}
	,btnRelease: function(btn) {
		if(btn == this._leftBtn) {
			if(this._page > 0) {
				this._page--;
				this.showPage();
			}
		} else if(btn == this._rightBtn) {
			if(this._page < this._maxPage) {
				this._page++;
				this.showPage();
			}
		}
	}
	,showPage: function() {
		this._currentLevel = game.client.config.UserConfig.maxLevel;
		var len = this._levelContainer.numChildren;
		while(len-- > 0) this._levelContainer.getChildAt(len).dispose();
		if(this._page < 0) this._page = 0;
		if(this._page > this._maxPage) this._page = this._maxPage;
		this._pageNumber.setNumber(this._page + 1);
		this._pageNumber.scaleX = this._pageNumber.scaleY = 4;
		if(this._page > 0) this._leftBtn.alpha = 1; else this._leftBtn.alpha = 0.5;
		if(this._page < this._maxPage) this._rightBtn.alpha = 1; else this._rightBtn.alpha = 0.5;
		this._leftBtn.set_enable(this._page > 0);
		this._rightBtn.set_enable(this._page < this._maxPage);
		var k = this._page * 25;
		var _g = 0;
		while(_g < 5) {
			var i = _g++;
			var _g1 = 0;
			while(_g1 < 5) {
				var j = _g1++;
				k++;
				if(k <= this._maxLevel) {
					var lv = lovedna.utils.Pool.getObject(game.client.module.menu.LevelButton);
					lv.x = j * 54;
					lv.y = i * 54;
					lv.setLevel(k);
					this._levelContainer.addChild(lv);
				}
			}
		}
		this.resize(game.client.config.AppConfig.rect);
	}
	,__class__: game.client.module.menu.MenuStage
});
game.client.module.start = {};
game.client.module.start.StartStage = function() {
	game.client.core.GameStage.call(this);
};
$hxClasses["game.client.module.start.StartStage"] = game.client.module.start.StartStage;
game.client.module.start.StartStage.__name__ = ["game","client","module","start","StartStage"];
game.client.module.start.StartStage.__super__ = game.client.core.GameStage;
game.client.module.start.StartStage.prototype = $extend(game.client.core.GameStage.prototype,{
	start: function() {
		game.client.core.GameStage.prototype.start.call(this);
		this._startBtn = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton);
		this._dayBtn = lovedna.utils.Pool.getObject(lovedna.canvas.ui.ImageButton);
		this._startBtn.load("ui2.png#" + "start.png");
		this._dayBtn.load("ui2.png#" + "day.png");
		this.addChild(this._startBtn);
		this.addChild(this._dayBtn);
		this._startBtn.x = 94.;
		this._dayBtn.x = 94.;
		this._startBtn.setReleaseHandler($bind(this,this.btnRelease));
		this._dayBtn.setReleaseHandler($bind(this,this.btnRelease));
		var localVersion = game.client.util.SaveUtil.get("local_version");
		var lv = 0;
		var obj = game.client.util.SaveUtil.get("currentLevel");
		if(obj != null) lv = obj;
		if(this._configData.localVersion != localVersion) {
			game.client.util.SaveUtil.clear();
			game.client.util.SaveUtil.save("local_version",this._configData.localVersion);
			game.client.util.SaveUtil.save("currentLevel",lv);
		}
		this._num = lovedna.utils.Pool.getObject(game.client.module.numbers.ImageNumber);
		this.addChild(this._num);
		var n = this._configData.maxLevel - lv + 1;
		if(n < 1) n = 0;
		this._num.setNumber(n);
		this.addChild(this._guide);
		this._guide.start(0);
	}
	,end: function() {
		game.client.core.GameStage.prototype.end.call(this);
		this.removeAll();
		this._startBtn.dispose();
		this._dayBtn.dispose();
		this._num.dispose();
		this._num = null;
		this.removeChild(this._guide);
	}
	,resize: function(rect) {
		game.client.core.GameStage.prototype.resize.call(this,rect);
		var px = rect.x;
		var py = rect.y;
		var screenW = rect.width;
		var screenH = rect.height;
		this._startBtn.y = py + screenH * 0.5;
		this._dayBtn.y = this._startBtn.y - 100;
		this._num.x = this._startBtn.x + 100 - this._num._width - 4;
		this._num.y = this._startBtn.y + 62 - this._num._heigh - 4;
		this._guide.y = py + screenH - 4;
	}
	,btnRelease: function(btn) {
		if(btn == this._dayBtn) this._stageService.start(this._stageConfig.day); else if(btn == this._startBtn) this._stageService.start(this._stageConfig.menu);
	}
	,__class__: game.client.module.start.StartStage
});
game.client.service = {};
game.client.service.JavaService = function() {
	lovedna.framework.Actor.call(this);
};
$hxClasses["game.client.service.JavaService"] = game.client.service.JavaService;
game.client.service.JavaService.__name__ = ["game","client","service","JavaService"];
game.client.service.JavaService._javaADInit = null;
game.client.service.JavaService._javaExit = null;
game.client.service.JavaService._javaShowAD = null;
game.client.service.JavaService.__super__ = lovedna.framework.Actor;
game.client.service.JavaService.prototype = $extend(lovedna.framework.Actor.prototype,{
	javaAdInit: function() {
	}
	,javaExit: function() {
	}
	,javaShowAD: function(show) {
	}
	,javaCall: function(status) {
	}
	,hasADShowint: function() {
		return game.client.service.JavaService._ADShowing;
	}
	,__class__: game.client.service.JavaService
});
game.client.service.StageService = function() {
	lovedna.framework.Actor.call(this);
	this._list = [];
	this._back = false;
};
$hxClasses["game.client.service.StageService"] = game.client.service.StageService;
game.client.service.StageService.__name__ = ["game","client","service","StageService"];
game.client.service.StageService.__super__ = lovedna.framework.Actor;
game.client.service.StageService.prototype = $extend(lovedna.framework.Actor.prototype,{
	start: function(stageClass) {
		if(stageClass == null) return;
		if(stageClass == this._stageConfig.start) this._list = [stageClass]; else if(!this._back) {
			var id = Lambda.indexOf(this._list,stageClass);
			if(id != -1) this._list.splice(id + 1,1); else this._list.push(stageClass);
		}
		this._back = false;
		var stage = this.getInstance(stageClass);
		if(this._lastStage == stage) return;
		if(this._lastStage != null) {
			this._lastStage.end();
			this._lastStage.set_camera(null);
			this._camera.setMouseHandler();
		}
		this._lastStage = stage;
		if(this._lastStage != null) {
			this._lastStage.set_camera(this._camera);
			this._lastStage.flashStage = this._display;
			this._lastStage.start();
			if(game.client.config.AppConfig.rect != null) this._lastStage.resize(game.client.config.AppConfig.rect);
		}
	}
	,exit: function() {
		var len = this._list.length;
		if(len > 1) {
			this._back = true;
			this._list.pop();
			var stage = this._list[this._list.length - 1];
			this.start(stage);
		} else return 0;
		return this._list.length;
	}
	,hasOpen: function(value) {
		return value == this._lastStage;
	}
	,isOpen: function(stage) {
		if(stage == Type.getClass(this._lastStage)) return true;
		return false;
	}
	,onRegister: function() {
		lovedna.framework.Actor.prototype.onRegister.call(this);
		this._camera._canvas.setResizeHandler($bind(this,this.resizeHandler));
	}
	,resizeHandler: function(rect) {
		game.client.config.AppConfig.rect = rect;
		if(this._lastStage != null) this._lastStage.resize(rect);
	}
	,__class__: game.client.service.StageService
});
game.client.util = {};
game.client.util.SaveUtil = function() {
	if(game.client.util.SaveUtil._instance == null) {
		game.client.util.SaveUtil._instance = this;
		this._localSave = new lovedna.net.LocalCache("pixel");
	}
};
$hxClasses["game.client.util.SaveUtil"] = game.client.util.SaveUtil;
game.client.util.SaveUtil.__name__ = ["game","client","util","SaveUtil"];
game.client.util.SaveUtil._instance = null;
game.client.util.SaveUtil.save = function(name,data) {
	if(game.client.util.SaveUtil._instance == null) new game.client.util.SaveUtil();
	game.client.util.SaveUtil._instance._localSave.addCache(name,data);
};
game.client.util.SaveUtil.get = function(name) {
	if(game.client.util.SaveUtil._instance == null) new game.client.util.SaveUtil();
	return game.client.util.SaveUtil._instance._localSave.getCache(name);
};
game.client.util.SaveUtil.clear = function() {
	if(game.client.util.SaveUtil._instance == null) new game.client.util.SaveUtil();
	game.client.util.SaveUtil._instance._localSave.clear();
};
game.client.util.SaveUtil.prototype = {
	__class__: game.client.util.SaveUtil
};
game.common = {};
game.common.data = {};
game.common.data.ConfigData = function() {
	this.localVersion = 3;
	this.maxLevel = 43;
};
$hxClasses["game.common.data.ConfigData"] = game.common.data.ConfigData;
game.common.data.ConfigData.__name__ = ["game","common","data","ConfigData"];
game.common.data.ConfigData.prototype = {
	__class__: game.common.data.ConfigData
};
var haxe = {};
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(Math.isNaN(v2)) this.buf.b += "k"; else if(!Math.isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.crypto = {};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe.crypto.BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe.io.Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.crypto.Crc32 = function() { };
$hxClasses["haxe.crypto.Crc32"] = haxe.crypto.Crc32;
haxe.crypto.Crc32.__name__ = ["haxe","crypto","Crc32"];
haxe.crypto.Crc32.make = function(data) {
	var init = -1;
	var crc = init;
	var b = data.b;
	var _g1 = 0;
	var _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp = (crc ^ b[i]) & 255;
		var _g2 = 0;
		while(_g2 < 8) {
			var j = _g2++;
			if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
		}
		crc = crc >>> 8 ^ tmp;
	}
	return crc ^ init;
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.ds._Vector = {};
haxe.ds._Vector.Vector_Impl_ = function() { };
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe.ds._Vector.Vector_Impl_;
haxe.ds._Vector.Vector_Impl_.__name__ = ["haxe","ds","_Vector","Vector_Impl_"];
haxe.ds._Vector.Vector_Impl_.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
haxe.ds._Vector.Vector_Impl_.toArray = function(this1) {
	var a = new Array();
	var len = this1.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		a[i] = this1[i];
	}
	return a;
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			b1[i1 + pos] = b2[i1 + srcpos];
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g11 = 0;
		var _g2 = this.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var c = this.b[i1];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
};
haxe.io.BytesBuffer = function() {
	this.b = new Array();
};
$hxClasses["haxe.io.BytesBuffer"] = haxe.io.BytesBuffer;
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype = {
	addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,__class__: haxe.io.BytesBuffer
};
haxe.io.Input = function() { };
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	readByte: function() {
		throw "Not implemented";
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readFloat: function() {
		var bytes = [];
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		if(!this.bigEndian) bytes.reverse();
		var sign = 1 - (bytes[0] >> 7 << 1);
		var exp = (bytes[0] << 1 & 255 | bytes[1] >> 7) - 127;
		var sig = (bytes[1] & 127) << 16 | bytes[2] << 8 | bytes[3];
		if(sig == 0 && exp == -127) return 0.0;
		return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp);
	}
	,readDouble: function() {
		var bytes = [];
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		bytes.push(this.readByte());
		if(!this.bigEndian) bytes.reverse();
		var sign = 1 - (bytes[0] >> 7 << 1);
		var exp = (bytes[0] << 4 & 2047 | bytes[1] >> 4) - 1023;
		var sig = this.getDoubleSig(bytes);
		if(sig == 0 && exp == -1023) return 0.0;
		return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) return n - 256;
		return n;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n;
		if(this.bigEndian) n = ch2 | ch1 << 8; else n = ch1 | ch2 << 8;
		if((n & 32768) != 0) return n - 65536;
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) return ch2 | ch1 << 8; else return ch1 | ch2 << 8;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24; else return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readString: function(len) {
		var b = haxe.io.Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,getDoubleSig: function(bytes) {
		return ((bytes[1] & 15) << 16 | bytes[2] << 8 | bytes[3]) * 4294967296. + (bytes[4] >> 7) * 2147483648 + ((bytes[4] & 127) << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7]);
	}
	,__class__: haxe.io.Input
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
haxe.io.BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe.io.BytesInput;
haxe.io.BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	set_position: function(p) {
		if(p < 0) p = 0; else if(p > this.totlen) p = this.totlen;
		this.len = this.totlen - p;
		return this.pos = p;
	}
	,readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe.io.BytesInput
	,__properties__: $extend(haxe.io.Input.prototype.__properties__,{set_position:"set_position"})
});
haxe.io.Output = function() { };
$hxClasses["haxe.io.Output"] = haxe.io.Output;
haxe.io.Output.__name__ = ["haxe","io","Output"];
haxe.io.Output.prototype = {
	writeByte: function(c) {
		throw "Not implemented";
	}
	,writeBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			this.writeByte(b[pos]);
			pos++;
			k--;
		}
		return len;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeFloat: function(x) {
		if(x == 0.0) {
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			return;
		}
		var exp = Math.floor(Math.log(Math.abs(x)) / haxe.io.Output.LN2);
		var sig = Math.floor(Math.abs(x) / Math.pow(2,exp) * 8388608) & 8388607;
		var b4;
		b4 = exp + 127 >> 1 | (exp > 0?x < 0?128:64:x < 0?128:0);
		var b3 = exp + 127 << 7 & 255 | sig >> 16 & 127;
		var b2 = sig >> 8 & 255;
		var b1 = sig & 255;
		if(this.bigEndian) {
			this.writeByte(b4);
			this.writeByte(b3);
			this.writeByte(b2);
			this.writeByte(b1);
		} else {
			this.writeByte(b1);
			this.writeByte(b2);
			this.writeByte(b3);
			this.writeByte(b4);
		}
	}
	,writeDouble: function(x) {
		if(x == 0.0) {
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			this.writeByte(0);
			return;
		}
		var exp = Math.floor(Math.log(Math.abs(x)) / haxe.io.Output.LN2);
		var sig = Math.floor(Math.abs(x) / Math.pow(2,exp) * Math.pow(2,52));
		var sig_h = sig & 34359738367;
		var sig_l = Math.floor(sig / Math.pow(2,32));
		var b8;
		b8 = exp + 1023 >> 4 | (exp > 0?x < 0?128:64:x < 0?128:0);
		var b7 = exp + 1023 << 4 & 255 | sig_l >> 16 & 15;
		var b6 = sig_l >> 8 & 255;
		var b5 = sig_l & 255;
		var b4 = sig_h >> 24 & 255;
		var b3 = sig_h >> 16 & 255;
		var b2 = sig_h >> 8 & 255;
		var b1 = sig_h & 255;
		if(this.bigEndian) {
			this.writeByte(b8);
			this.writeByte(b7);
			this.writeByte(b6);
			this.writeByte(b5);
			this.writeByte(b4);
			this.writeByte(b3);
			this.writeByte(b2);
			this.writeByte(b1);
		} else {
			this.writeByte(b1);
			this.writeByte(b2);
			this.writeByte(b3);
			this.writeByte(b4);
			this.writeByte(b5);
			this.writeByte(b6);
			this.writeByte(b7);
			this.writeByte(b8);
		}
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) throw haxe.io.Error.Overflow;
		this.writeByte(x & 255);
	}
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) throw haxe.io.Error.Overflow;
		this.writeUInt16(x & 65535);
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) throw haxe.io.Error.Overflow;
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,writeString: function(s) {
		var b = haxe.io.Bytes.ofString(s);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe.io.Output
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
haxe.io.BytesOutput = function() {
	this.b = new haxe.io.BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe.io.BytesOutput;
haxe.io.BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe.io.BytesOutput.__super__ = haxe.io.Output;
haxe.io.BytesOutput.prototype = $extend(haxe.io.Output.prototype,{
	writeByte: function(c) {
		this.b.b.push(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe.io.BytesOutput
});
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };
haxe.io.Path = function(path) {
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe.io.Path;
haxe.io.Path.__name__ = ["haxe","io","Path"];
haxe.io.Path.withoutExtension = function(path) {
	var s = new haxe.io.Path(path);
	s.ext = null;
	return s.toString();
};
haxe.io.Path.prototype = {
	toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe.io.Path
};
haxe.rtti = {};
haxe.rtti.Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
};
openfl.geom = {};
openfl.geom.ColorTransform = function(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset) {
	if(alphaOffset == null) alphaOffset = 0;
	if(blueOffset == null) blueOffset = 0;
	if(greenOffset == null) greenOffset = 0;
	if(redOffset == null) redOffset = 0;
	if(alphaMultiplier == null) alphaMultiplier = 1;
	if(blueMultiplier == null) blueMultiplier = 1;
	if(greenMultiplier == null) greenMultiplier = 1;
	if(redMultiplier == null) redMultiplier = 1;
	this.redMultiplier = redMultiplier;
	this.greenMultiplier = greenMultiplier;
	this.blueMultiplier = blueMultiplier;
	this.alphaMultiplier = alphaMultiplier;
	this.redOffset = redOffset;
	this.greenOffset = greenOffset;
	this.blueOffset = blueOffset;
	this.alphaOffset = alphaOffset;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl.geom.ColorTransform;
openfl.geom.ColorTransform.__name__ = ["openfl","geom","ColorTransform"];
openfl.geom.ColorTransform.prototype = {
	concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,__class__: openfl.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
};
openfl.text = {};
openfl.text.TextField = function() {
	openfl.display.InteractiveObject.call(this);
	this.__width = 100;
	this.__height = 100;
	this.__text = "";
	this.set_type(openfl.text.TextFieldType.DYNAMIC);
	this.set_autoSize(openfl.text.TextFieldAutoSize.NONE);
	this.displayAsPassword = false;
	this.embedFonts = false;
	this.selectable = true;
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
	this.gridFitType = openfl.text.GridFitType.PIXEL;
	this.maxChars = 0;
	this.multiline = false;
	this.sharpness = 0;
	this.scrollH = 0;
	this.scrollV = 1;
	this.set_wordWrap(false);
	if(openfl.text.TextField.__defaultTextFormat == null) {
		openfl.text.TextField.__defaultTextFormat = new openfl.text.TextFormat("Times New Roman",12,0,false,false,false,"","",openfl.text.TextFormatAlign.LEFT,0,0,0,0);
		openfl.text.TextField.__defaultTextFormat.blockIndent = 0;
		openfl.text.TextField.__defaultTextFormat.bullet = false;
		openfl.text.TextField.__defaultTextFormat.letterSpacing = 0;
		openfl.text.TextField.__defaultTextFormat.kerning = false;
	}
	this.__textFormat = openfl.text.TextField.__defaultTextFormat.clone();
};
$hxClasses["openfl.text.TextField"] = openfl.text.TextField;
openfl.text.TextField.__name__ = ["openfl","text","TextField"];
openfl.text.TextField.__defaultTextFormat = null;
openfl.text.TextField.__super__ = openfl.display.InteractiveObject;
openfl.text.TextField.prototype = $extend(openfl.display.InteractiveObject.prototype,{
	appendText: function(text) {
		var _g = this;
		_g.set_text(_g.get_text() + text);
	}
	,getCharBoundaries: function(a) {
		openfl.Lib.notImplemented("TextField.getCharBoundaries");
		return null;
	}
	,getCharIndexAtPoint: function(x,y) {
		openfl.Lib.notImplemented("TextField.getCharIndexAtPoint");
		return 0;
	}
	,getLineIndexAtPoint: function(x,y) {
		openfl.Lib.notImplemented("TextField.getLineIndexAtPoint");
		return 0;
	}
	,getLineMetrics: function(lineIndex) {
		openfl.Lib.notImplemented("TextField.getLineMetrics");
		return null;
	}
	,getLineOffset: function(lineIndex) {
		openfl.Lib.notImplemented("TextField.getLineOffset");
		return 0;
	}
	,getLineText: function(lineIndex) {
		openfl.Lib.notImplemented("TextField.getLineText");
		return "";
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		return this.__textFormat.clone();
	}
	,setSelection: function(beginIndex,endIndex) {
		openfl.Lib.notImplemented("TextField.setSelection");
	}
	,setTextFormat: function(format,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(format.font != null) this.__textFormat.font = format.font;
		if(format.size != null) this.__textFormat.size = format.size;
		if(format.color != null) this.__textFormat.color = format.color;
		if(format.bold != null) this.__textFormat.bold = format.bold;
		if(format.italic != null) this.__textFormat.italic = format.italic;
		if(format.underline != null) this.__textFormat.underline = format.underline;
		if(format.url != null) this.__textFormat.url = format.url;
		if(format.target != null) this.__textFormat.target = format.target;
		if(format.align != null) this.__textFormat.align = format.align;
		if(format.leftMargin != null) this.__textFormat.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.__textFormat.rightMargin = format.rightMargin;
		if(format.indent != null) this.__textFormat.indent = format.indent;
		if(format.leading != null) this.__textFormat.leading = format.leading;
		if(format.blockIndent != null) this.__textFormat.blockIndent = format.blockIndent;
		if(format.bullet != null) this.__textFormat.bullet = format.bullet;
		if(format.kerning != null) this.__textFormat.kerning = format.kerning;
		if(format.letterSpacing != null) this.__textFormat.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.__textFormat.tabStops = format.tabStops;
		this.__dirty = true;
	}
	,__getBounds: function(rect,matrix) {
		var bounds = new openfl.geom.Rectangle(0,0,this.__width,this.__height);
		bounds.transform(this.__worldTransform);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__getFont: function(format) {
		var font;
		if(format.italic) font = "italic "; else font = "normal ";
		font += "normal ";
		if(format.bold) font += "bold "; else font += "normal ";
		font += format.size + "px";
		font += "/" + (format.size + format.leading + 4) + "px ";
		font += "'" + (function($this) {
			var $r;
			var _g = format.font;
			$r = (function($this) {
				var $r;
				switch(_g) {
				case "_sans":
					$r = "sans-serif";
					break;
				case "_serif":
					$r = "serif";
					break;
				case "_typewriter":
					$r = "monospace";
					break;
				default:
					$r = format.font;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		font += "'";
		return font;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var point = this.globalToLocal(new openfl.geom.Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.__width && point.y <= this.__height) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__measureText: function() {
		if(this.__ranges == null) {
			this.__context.font = this.__getFont(this.__textFormat);
			return [this.__context.measureText(this.__text).width];
		} else {
			var measurements = [];
			var _g = 0;
			var _g1 = this.__ranges;
			while(_g < _g1.length) {
				var range = _g1[_g];
				++_g;
				this.__context.font = this.__getFont(range.format);
				measurements.push(this.__context.measureText(this.get_text().substring(range.start,range.end)).width);
			}
			return measurements;
		}
	}
	,__measureTextWithDOM: function() {
		var div = this.__div;
		if(this.__div == null) {
			div = window.document.createElement("div");
			div.innerHTML = this.__text;
			div.style.setProperty("font",this.__getFont(this.__textFormat),null);
			div.style.position = "absolute";
			div.style.top = "110%";
			window.document.body.appendChild(div);
		}
		this.__measuredWidth = div.clientWidth;
		if(this.__div == null) div.style.width = Std.string(this.__width) + "px";
		this.__measuredHeight = div.clientHeight;
		if(this.__div == null) window.document.body.removeChild(div);
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__dirty) {
			if((this.__text == null || this.__text == "") && !this.background && !this.border || (this.get_width() <= 0 || this.get_height() <= 0) && this.autoSize != openfl.text.TextFieldAutoSize.LEFT) {
				this.__canvas = null;
				this.__context = null;
			} else {
				if(this.__canvas == null) {
					this.__canvas = window.document.createElement("canvas");
					this.__context = this.__canvas.getContext("2d");
				}
				if(this.__text != null && this.__text != "") {
					var measurements = this.__measureText();
					var textWidth = 0.0;
					var _g = 0;
					while(_g < measurements.length) {
						var measurement = measurements[_g];
						++_g;
						textWidth += measurement;
					}
					if(this.autoSize == openfl.text.TextFieldAutoSize.LEFT) this.__width = textWidth + 4;
					this.__canvas.width = Math.ceil(this.__width);
					this.__canvas.height = Math.ceil(this.__height);
					if(this.border || this.background) {
						this.__context.rect(0.5,0.5,this.__width - 1,this.__height - 1);
						if(this.background) {
							this.__context.fillStyle = "#" + StringTools.hex(this.backgroundColor,6);
							this.__context.fill();
						}
						if(this.border) {
							this.__context.lineWidth = 1;
							this.__context.strokeStyle = "#" + StringTools.hex(this.borderColor,6);
							this.__context.stroke();
						}
					}
					if(this.__ranges == null) this.__renderText(this.get_text(),this.__textFormat,0); else {
						var currentIndex = 0;
						var range;
						var offsetX = 0.0;
						var _g1 = 0;
						var _g2 = this.__ranges.length;
						while(_g1 < _g2) {
							var i = _g1++;
							range = this.__ranges[i];
							this.__renderText(this.get_text().substring(range.start,range.end),range.format,offsetX);
							offsetX += measurements[i];
						}
					}
				} else {
					if(this.autoSize == openfl.text.TextFieldAutoSize.LEFT) this.__width = 4;
					this.__canvas.width = Math.ceil(this.__width);
					this.__canvas.height = Math.ceil(this.__height);
					if(this.border || this.background) {
						if(this.border) this.__context.rect(0.5,0.5,this.__width - 1,this.__height - 1); else this.__context.rect(0,0,this.__width,this.__height);
						if(this.background) {
							this.__context.fillStyle = "#" + StringTools.hex(this.backgroundColor,6);
							this.__context.fill();
						}
						if(this.border) {
							this.__context.lineWidth = 1;
							this.__context.lineCap = "square";
							this.__context.strokeStyle = "#" + StringTools.hex(this.borderColor,6);
							this.__context.stroke();
						}
					}
				}
			}
			this.__dirty = false;
		}
		if(this.__canvas != null) {
			var context = renderSession.context;
			context.globalAlpha = this.__worldAlpha;
			var transform = this.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(this.get_scrollRect() == null) context.drawImage(this.__canvas,0,0); else context.drawImage(this.__canvas,this.get_scrollRect().x,this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height,this.get_scrollRect().x,this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
		}
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable) {
			if(this.__dirty || this.__div == null) {
				if(this.__text != "" || this.background || this.border) {
					if(this.__div == null) {
						this.__div = window.document.createElement("div");
						this.__initializeElement(this.__div,renderSession);
						this.__style.setProperty("cursor","inherit",null);
					}
					this.__div.innerHTML = this.__text;
					if(this.background) this.__style.setProperty("background-color","#" + StringTools.hex(this.backgroundColor,6),null); else this.__style.removeProperty("background-color");
					if(this.border) this.__style.setProperty("border","solid 1px #" + StringTools.hex(this.borderColor,6),null); else this.__style.removeProperty("border");
					this.__style.setProperty("font",this.__getFont(this.__textFormat),null);
					this.__style.setProperty("color","#" + StringTools.hex(this.__textFormat.color,6),null);
					if(this.autoSize != openfl.text.TextFieldAutoSize.NONE) this.__style.setProperty("width","auto",null); else this.__style.setProperty("width",this.__width + "px",null);
					this.__style.setProperty("height",this.__height + "px",null);
					var _g = this.__textFormat.align;
					switch(_g[1]) {
					case 3:
						this.__style.setProperty("text-align","center",null);
						break;
					case 1:
						this.__style.setProperty("text-align","right",null);
						break;
					default:
						this.__style.setProperty("text-align","left",null);
					}
					this.__dirty = false;
				} else if(this.__div != null) {
					renderSession.element.removeChild(this.__div);
					this.__div = null;
				}
			}
			if(this.__div != null) this.__applyStyle(renderSession,true,true,false);
		} else if(this.__div != null) {
			renderSession.element.removeChild(this.__div);
			this.__div = null;
			this.__style = null;
		}
	}
	,__renderText: function(text,format,offsetX) {
		this.__context.font = this.__getFont(format);
		this.__context.textBaseline = "top";
		this.__context.fillStyle = "#" + StringTools.hex(format.color,6);
		var _g = format.align;
		switch(_g[1]) {
		case 3:
			this.__context.textAlign = "center";
			this.__context.fillText(text,this.__width / 2,2,this.__width - 4);
			break;
		case 1:
			this.__context.textAlign = "end";
			this.__context.fillText(text,this.__width - 2,2,this.__width - 4);
			break;
		default:
			this.__context.textAlign = "start";
			this.__context.fillText(text,2 + offsetX,2,this.__width - 4);
		}
	}
	,set_autoSize: function(value) {
		if(value != this.autoSize) this.__dirty = true;
		return this.autoSize = value;
	}
	,set_background: function(value) {
		if(value != this.background) this.__dirty = true;
		return this.background = value;
	}
	,set_backgroundColor: function(value) {
		if(value != this.backgroundColor) this.__dirty = true;
		return this.backgroundColor = value;
	}
	,set_border: function(value) {
		if(value != this.border) this.__dirty = true;
		return this.border = value;
	}
	,set_borderColor: function(value) {
		if(value != this.borderColor) this.__dirty = true;
		return this.borderColor = value;
	}
	,get_bottomScrollV: function() {
		return this.get_numLines();
	}
	,get_caretPos: function() {
		return 0;
	}
	,get_defaultTextFormat: function() {
		return this.__textFormat.clone();
	}
	,set_defaultTextFormat: function(value) {
		this.__textFormat.__merge(value);
		return value;
	}
	,get_height: function() {
		return this.__height * this.get_scaleY();
	}
	,set_height: function(value) {
		if(this.get_scaleY() != 1 || value != this.__height) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			this.__dirty = true;
		}
		this.set_scaleY(1);
		return this.__height = value;
	}
	,get_htmlText: function() {
		return this.__text;
	}
	,set_htmlText: function(value) {
		if(!this.__isHTML || this.__text != value) this.__dirty = true;
		this.__ranges = null;
		this.__isHTML = true;
		if(this.__div == null) {
			value = new EReg("<br>","g").replace(value,"\n");
			value = new EReg("<br/>","g").replace(value,"\n");
			var segments = value.split("<font");
			if(segments.length == 1) {
				value = new EReg("<.*?>","g").replace(value,"");
				return this.__text = value;
			} else {
				value = "";
				this.__ranges = [];
				var _g = 0;
				while(_g < segments.length) {
					var segment = segments[_g];
					++_g;
					if(segment == "") continue;
					var closeFontIndex = segment.indexOf("</font>");
					if(closeFontIndex > -1) {
						var start = segment.indexOf(">") + 1;
						var end = closeFontIndex;
						var format = this.__textFormat.clone();
						var faceIndex = segment.indexOf("face=");
						var colorIndex = segment.indexOf("color=");
						var sizeIndex = segment.indexOf("size=");
						if(faceIndex > -1 && faceIndex < start) {
							var len = segment.indexOf("\"",faceIndex);
							format.font = HxOverrides.substr(segment,faceIndex + 6,len);
						}
						if(colorIndex > -1 && colorIndex < start) format.color = Std.parseInt("0x" + HxOverrides.substr(segment,colorIndex + 8,6));
						if(sizeIndex > -1 && sizeIndex < start) format.size = Std.parseInt((function($this) {
							var $r;
							var len1 = segment.indexOf("\"",sizeIndex);
							$r = HxOverrides.substr(segment,sizeIndex + 6,len1);
							return $r;
						}(this)));
						var sub = segment.substring(start,end);
						sub = new EReg("<.*?>","g").replace(sub,"");
						this.__ranges.push(new openfl.text.TextFormatRange(format,value.length,value.length + sub.length));
						value += sub;
						if(closeFontIndex + 7 < segment.length) {
							sub = HxOverrides.substr(segment,closeFontIndex + 7,null);
							this.__ranges.push(new openfl.text.TextFormatRange(this.__textFormat,value.length,value.length + sub.length));
							value += sub;
						}
					} else {
						this.__ranges.push(new openfl.text.TextFormatRange(this.__textFormat,value.length,value.length + segment.length));
						value += segment;
					}
				}
			}
		}
		return this.__text = value;
	}
	,get_maxScrollH: function() {
		return 0;
	}
	,get_maxScrollV: function() {
		return 1;
	}
	,get_numLines: function() {
		if(this.get_text() != "" && this.get_text() != null) {
			var count = this.get_text().split("\n").length;
			if(this.__isHTML) count += this.get_text().split("<br>").length - 1;
			return count;
		}
		return 1;
	}
	,get_text: function() {
		if(this.__isHTML) {
		}
		return this.__text;
	}
	,set_text: function(value) {
		if(this.__isHTML || this.__text != value) this.__dirty = true;
		this.__ranges = null;
		this.__isHTML = false;
		return this.__text = value;
	}
	,get_textColor: function() {
		return this.__textFormat.color;
	}
	,set_textColor: function(value) {
		if(value != this.__textFormat.color) this.__dirty = true;
		if(this.__ranges != null) {
			var _g = 0;
			var _g1 = this.__ranges;
			while(_g < _g1.length) {
				var range = _g1[_g];
				++_g;
				range.format.color = value;
			}
		}
		return this.__textFormat.color = value;
	}
	,get_textWidth: function() {
		if(this.__canvas != null) {
			var sizes = this.__measureText();
			var total = 0;
			var _g = 0;
			while(_g < sizes.length) {
				var size = sizes[_g];
				++_g;
				total += size;
			}
			return total;
		} else if(this.__div != null) return this.__div.clientWidth; else {
			this.__measureTextWithDOM();
			return this.__measuredWidth;
		}
	}
	,get_textHeight: function() {
		if(this.__canvas != null) return this.__textFormat.size * 1.185; else if(this.__div != null) return this.__div.clientHeight; else {
			this.__measureTextWithDOM();
			return this.__measuredHeight + this.__textFormat.size * 0.185;
		}
	}
	,set_type: function(value) {
		return this.type = value;
	}
	,get_width: function() {
		if(this.autoSize == openfl.text.TextFieldAutoSize.LEFT) return (this.get_textWidth() + 4) * this.get_scaleX(); else return this.__width * this.get_scaleX();
	}
	,set_width: function(value) {
		if(this.get_scaleX() != 1 || this.__width != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			this.__dirty = true;
		}
		this.set_scaleX(1);
		return this.__width = value;
	}
	,get_wordWrap: function() {
		return this.wordWrap;
	}
	,set_wordWrap: function(value) {
		return this.wordWrap = value;
	}
	,__class__: openfl.text.TextField
	,__properties__: $extend(openfl.display.InteractiveObject.prototype.__properties__,{set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_type:"set_type",get_textWidth:"get_textWidth",get_textHeight:"get_textHeight",set_textColor:"set_textColor",get_textColor:"get_textColor",set_text:"set_text",get_text:"get_text",get_numLines:"get_numLines",get_maxScrollV:"get_maxScrollV",get_maxScrollH:"get_maxScrollH",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",get_caretPos:"get_caretPos",get_bottomScrollV:"get_bottomScrollV",set_borderColor:"set_borderColor",set_border:"set_border",set_backgroundColor:"set_backgroundColor",set_background:"set_background",set_autoSize:"set_autoSize"})
});
openfl.text.TextFieldType = $hxClasses["openfl.text.TextFieldType"] = { __ename__ : ["openfl","text","TextFieldType"], __constructs__ : ["DYNAMIC","INPUT"] };
openfl.text.TextFieldType.DYNAMIC = ["DYNAMIC",0];
openfl.text.TextFieldType.DYNAMIC.toString = $estr;
openfl.text.TextFieldType.DYNAMIC.__enum__ = openfl.text.TextFieldType;
openfl.text.TextFieldType.INPUT = ["INPUT",1];
openfl.text.TextFieldType.INPUT.toString = $estr;
openfl.text.TextFieldType.INPUT.__enum__ = openfl.text.TextFieldType;
openfl.text.TextFieldAutoSize = $hxClasses["openfl.text.TextFieldAutoSize"] = { __ename__ : ["openfl","text","TextFieldAutoSize"], __constructs__ : ["CENTER","LEFT","NONE","RIGHT"] };
openfl.text.TextFieldAutoSize.CENTER = ["CENTER",0];
openfl.text.TextFieldAutoSize.CENTER.toString = $estr;
openfl.text.TextFieldAutoSize.CENTER.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldAutoSize.LEFT = ["LEFT",1];
openfl.text.TextFieldAutoSize.LEFT.toString = $estr;
openfl.text.TextFieldAutoSize.LEFT.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldAutoSize.NONE = ["NONE",2];
openfl.text.TextFieldAutoSize.NONE.toString = $estr;
openfl.text.TextFieldAutoSize.NONE.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.TextFieldAutoSize.RIGHT = ["RIGHT",3];
openfl.text.TextFieldAutoSize.RIGHT.toString = $estr;
openfl.text.TextFieldAutoSize.RIGHT.__enum__ = openfl.text.TextFieldAutoSize;
openfl.text.GridFitType = $hxClasses["openfl.text.GridFitType"] = { __ename__ : ["openfl","text","GridFitType"], __constructs__ : ["NONE","PIXEL","SUBPIXEL"] };
openfl.text.GridFitType.NONE = ["NONE",0];
openfl.text.GridFitType.NONE.toString = $estr;
openfl.text.GridFitType.NONE.__enum__ = openfl.text.GridFitType;
openfl.text.GridFitType.PIXEL = ["PIXEL",1];
openfl.text.GridFitType.PIXEL.toString = $estr;
openfl.text.GridFitType.PIXEL.__enum__ = openfl.text.GridFitType;
openfl.text.GridFitType.SUBPIXEL = ["SUBPIXEL",2];
openfl.text.GridFitType.SUBPIXEL.toString = $estr;
openfl.text.GridFitType.SUBPIXEL.__enum__ = openfl.text.GridFitType;
openfl.text.TextFormatAlign = $hxClasses["openfl.text.TextFormatAlign"] = { __ename__ : ["openfl","text","TextFormatAlign"], __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] };
openfl.text.TextFormatAlign.LEFT = ["LEFT",0];
openfl.text.TextFormatAlign.LEFT.toString = $estr;
openfl.text.TextFormatAlign.LEFT.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormatAlign.RIGHT = ["RIGHT",1];
openfl.text.TextFormatAlign.RIGHT.toString = $estr;
openfl.text.TextFormatAlign.RIGHT.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
openfl.text.TextFormatAlign.JUSTIFY.toString = $estr;
openfl.text.TextFormatAlign.JUSTIFY.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormatAlign.CENTER = ["CENTER",3];
openfl.text.TextFormatAlign.CENTER.toString = $estr;
openfl.text.TextFormatAlign.CENTER.__enum__ = openfl.text.TextFormatAlign;
openfl.text.TextFormat = function(font,size,color,bold,italic,underline,url,target,align,leftMargin,rightMargin,indent,leading) {
	this.font = font;
	this.size = size;
	this.color = color;
	this.bold = bold;
	this.italic = italic;
	this.underline = underline;
	this.url = url;
	this.target = target;
	this.align = align;
	this.leftMargin = leftMargin;
	this.rightMargin = rightMargin;
	this.indent = indent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextFormat"] = openfl.text.TextFormat;
openfl.text.TextFormat.__name__ = ["openfl","text","TextFormat"];
openfl.text.TextFormat.prototype = {
	clone: function() {
		var newFormat = new openfl.text.TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__merge: function(format) {
		if(format.font != null) this.font = format.font;
		if(format.size != null) this.size = format.size;
		if(format.color != null) this.color = format.color;
		if(format.bold != null) this.bold = format.bold;
		if(format.italic != null) this.italic = format.italic;
		if(format.underline != null) this.underline = format.underline;
		if(format.url != null) this.url = format.url;
		if(format.target != null) this.target = format.target;
		if(format.align != null) this.align = format.align;
		if(format.leftMargin != null) this.leftMargin = format.leftMargin;
		if(format.rightMargin != null) this.rightMargin = format.rightMargin;
		if(format.indent != null) this.indent = format.indent;
		if(format.leading != null) this.leading = format.leading;
		if(format.blockIndent != null) this.blockIndent = format.blockIndent;
		if(format.bullet != null) this.bullet = format.bullet;
		if(format.kerning != null) this.kerning = format.kerning;
		if(format.letterSpacing != null) this.letterSpacing = format.letterSpacing;
		if(format.tabStops != null) this.tabStops = format.tabStops;
	}
	,__class__: openfl.text.TextFormat
};
openfl.geom.Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["openfl.geom.Matrix"] = openfl.geom.Matrix;
openfl.geom.Matrix.__name__ = ["openfl","geom","Matrix"];
openfl.geom.Matrix.prototype = {
	clone: function() {
		return new openfl.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyColumnFrom: function(column,vector3D) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			this.a = vector3D.x;
			this.c = vector3D.y;
		} else if(column == 1) {
			this.b = vector3D.x;
			this.d = vector3D.y;
		} else {
			this.tx = vector3D.x;
			this.ty = vector3D.y;
		}
	}
	,copyColumnTo: function(column,vector3D) {
		if(column > 2) throw "Column " + column + " out of bounds (2)"; else if(column == 0) {
			vector3D.x = this.a;
			vector3D.y = this.c;
			vector3D.z = 0;
		} else if(column == 1) {
			vector3D.x = this.b;
			vector3D.y = this.d;
			vector3D.z = 0;
		} else {
			vector3D.x = this.tx;
			vector3D.y = this.ty;
			vector3D.z = 1;
		}
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,copyRowFrom: function(row,vector3D) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			this.a = vector3D.x;
			this.c = vector3D.y;
		} else if(row == 1) {
			this.b = vector3D.x;
			this.d = vector3D.y;
		} else {
			this.tx = vector3D.x;
			this.ty = vector3D.y;
		}
	}
	,copyRowTo: function(row,vector3D) {
		if(row > 2) throw "Row " + row + " out of bounds (2)"; else if(row == 0) {
			vector3D.x = this.a;
			vector3D.y = this.b;
			vector3D.z = this.tx;
		} else if(row == 1) {
			vector3D.x = this.c;
			vector3D.y = this.d;
			vector3D.z = this.ty;
		} else {
			vector3D.x = 0;
			vector3D.y = 0;
			vector3D.z = 1;
		}
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation;
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,equals: function(matrix) {
		return matrix != null && this.tx == matrix.tx && this.ty == matrix.ty && this.a == matrix.a && this.b == matrix.b && this.c == matrix.c && this.d == matrix.d;
	}
	,deltaTransformPoint: function(point) {
		return new openfl.geom.Point(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new openfl.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		result.concat(m);
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformPoint: function(pos) {
		return new openfl.geom.Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new openfl.geom.Matrix();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__transformX: function(pos) {
		return pos.x * this.a + pos.y * this.c + this.tx;
	}
	,__transformY: function(pos) {
		return pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.x * this.a + pos.y * this.c + this.tx;
		this.ty = pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__class__: openfl.geom.Matrix
};
openfl.geom.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl.geom.Point;
openfl.geom.Point.__name__ = ["openfl","geom","Point"];
openfl.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
openfl.geom.Point.interpolate = function(pt1,pt2,f) {
	return new openfl.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
openfl.geom.Point.polar = function(len,angle) {
	return new openfl.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
};
openfl.geom.Point.prototype = {
	add: function(v) {
		return new openfl.geom.Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new openfl.geom.Point(this.x,this.y);
	}
	,equals: function(toCompare) {
		return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,subtract: function(v) {
		return new openfl.geom.Point(this.x - v.x,this.y - v.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: openfl.geom.Point
	,__properties__: {get_length:"get_length"}
};
openfl.geom.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl.geom.Rectangle;
openfl.geom.Rectangle.__name__ = ["openfl","geom","Rectangle"];
openfl.geom.Rectangle.prototype = {
	clone: function() {
		return new openfl.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return toCompare != null && this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new openfl.geom.Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new openfl.geom.Rectangle();
		return new openfl.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new openfl.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		if(this.width == 0 || this.height == 0) return toUnion.clone(); else if(toUnion.width == 0 || toUnion.height == 0) return this.clone();
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new openfl.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,__contract: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) return;
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x < x) this.x = x;
		if(this.y < y) this.y = y;
		if(this.get_right() > x + width) this.width = x + width - this.x;
		if(this.get_bottom() > y + height) this.height = y + height - this.y;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) this.x = x;
		if(this.y > y) this.y = y;
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new openfl.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new openfl.geom.Point(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new openfl.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: openfl.geom.Rectangle
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
lovedna.canvas.ImageHelper = function() {
};
$hxClasses["lovedna.canvas.ImageHelper"] = lovedna.canvas.ImageHelper;
lovedna.canvas.ImageHelper.__name__ = ["lovedna","canvas","ImageHelper"];
lovedna.canvas.ImageHelper._imageLoader = null;
lovedna.canvas.ImageHelper.trace = function(msg) {
	if(lovedna.canvas.ImageHelper.log.get_numLines() > 20) lovedna.canvas.ImageHelper.log.set_text("");
	lovedna.canvas.ImageHelper.log.appendText(msg + "\n");
};
lovedna.canvas.ImageHelper.getImageData = function(imageUrl,rect,centerPoint) {
	if(imageUrl == null) throw "error imageUrl";
	var imageKey = lovedna.canvas.ImageHelper.getImageKey(imageUrl,rect,centerPoint);
	var tile = lovedna.canvas.ImageHelper._tileMap.get(imageKey);
	var newload = false;
	if(tile == null) {
		var sheet = lovedna.canvas.ImageHelper._sheetMap.get(imageUrl);
		if(sheet != null) tile = sheet.addImage(rect,centerPoint); else {
			tile = lovedna.utils.Pool.getObject(lovedna.canvas.core.ImageData);
			tile.enable = false;
			if(lovedna.canvas.ImageHelper._imageLoader == null) {
				lovedna.canvas.ImageHelper._imageLoader = new lovedna.canvas.net.NetStorage();
				lovedna.canvas.ImageHelper._imageLoader.setImageCompleteHandler(lovedna.canvas.ImageHelper.imageLoaded);
			}
			var loadData = new lovedna.canvas.LoadImageData();
			loadData.url = imageUrl;
			if(rect != null) {
				loadData.x = rect.x | 0;
				loadData.y = rect.y | 0;
				loadData.width = rect.width | 0;
				loadData.height = rect.height | 0;
			}
			if(centerPoint != null) {
				loadData.centerX = centerPoint.x;
				loadData.centerY = centerPoint.y;
			}
			var list = lovedna.canvas.ImageHelper._loaderListMap.get(imageUrl);
			if(list == null) {
				list = new Array();
				lovedna.canvas.ImageHelper._loaderListMap.set(imageUrl,list);
				newload = true;
			}
			list.push(loadData);
			loadData = null;
			list = null;
		}
		if(tile != null) lovedna.canvas.ImageHelper._tileMap.set(imageKey,tile);
		if(newload) lovedna.canvas.ImageHelper._imageLoader.loadImage(imageUrl);
		sheet = null;
	}
	return tile;
};
lovedna.canvas.ImageHelper.getGroupImage = function(url,name,centerPoint) {
	var group = lovedna.canvas.ImageHelper._groupMap.get(url);
	if(group == null) {
		group = new lovedna.canvas.core.ImageGroup(url);
		lovedna.canvas.ImageHelper._groupMap.set(url,group);
		if(lovedna.canvas.ImageHelper._imageLoader == null) {
			lovedna.canvas.ImageHelper._imageLoader = new lovedna.canvas.net.NetStorage();
			lovedna.canvas.ImageHelper._imageLoader.setImageCompleteHandler(lovedna.canvas.ImageHelper.imageLoaded);
		}
		lovedna.canvas.ImageHelper._imageLoader.loadImage(url,-1,true);
	}
	return group.getImage(name,centerPoint);
};
lovedna.canvas.ImageHelper.disposeCache = function() {
	lovedna.canvas.animation.ImageAnimation.disposeAnimation();
	var key;
	var iter = lovedna.canvas.ImageHelper._sheetMap.keys();
	while(iter.hasNext()) {
		key = iter.next();
		lovedna.canvas.ImageHelper.disposeImageSheet(key);
	}
	lovedna.canvas.ImageHelper._sheetMap = new haxe.ds.StringMap();
	if(lovedna.canvas.ImageHelper._loaderListMap != null) {
		iter = lovedna.canvas.ImageHelper._loaderListMap.keys();
		while(iter.hasNext()) {
			key = iter.next();
			var lst = lovedna.canvas.ImageHelper._loaderListMap.get(key);
			lst.splice(0,lst.length);
		}
		lovedna.canvas.ImageHelper._loaderListMap = new haxe.ds.StringMap();
	}
	if(lovedna.canvas.ImageHelper._tileMap != null) {
		iter = lovedna.canvas.ImageHelper._tileMap.keys();
		while(iter.hasNext()) {
			key = iter.next();
			lovedna.canvas.ImageHelper._tileMap.get(key).dispose();
		}
		lovedna.canvas.ImageHelper._tileMap = new haxe.ds.StringMap();
	}
	if(lovedna.canvas.ImageHelper._groupMap != null) {
		iter = lovedna.canvas.ImageHelper._groupMap.keys();
		while(iter.hasNext()) {
			key = iter.next();
			lovedna.canvas.ImageHelper._groupMap.get(key).dispose();
		}
		lovedna.canvas.ImageHelper._groupMap = new haxe.ds.StringMap();
	}
	if(lovedna.canvas.ImageHelper._tempSheetList != null) {
		var len = lovedna.canvas.ImageHelper._tempSheetList.length;
		while(len-- > 0) {
			var t = lovedna.canvas.ImageHelper._tempSheetList[len];
			t.dispose();
			if(t.loadType != lovedna.net.LoadType.LOCAL) lovedna.canvas.ImageHelper._tempSheetList.splice(len,1);
		}
	}
};
lovedna.canvas.ImageHelper.getImageSheet = function(url) {
	return lovedna.canvas.ImageHelper._sheetMap.get(url);
};
lovedna.canvas.ImageHelper.hasImageSheet = function(url) {
	return lovedna.canvas.ImageHelper._sheetMap.exists(url);
};
lovedna.canvas.ImageHelper.setImageSheet = function(url,bmd) {
	if(!lovedna.canvas.ImageHelper._sheetMap.exists(url)) {
		var sheet = new lovedna.canvas.core.ImageSheet(bmd);
		lovedna.canvas.ImageHelper._sheetMap.set(url,sheet);
		return sheet;
	} else return null;
};
lovedna.canvas.ImageHelper.createImageData = function(bitmapData,rect,centerPoint,loadType,cache) {
	if(cache == null) cache = true;
	var sheet = null;
	var len = lovedna.canvas.ImageHelper._tempSheetList.length;
	while(len-- > 0) {
		var temp = lovedna.canvas.ImageHelper._tempSheetList[len];
		if(temp.bitmapData == bitmapData) {
			sheet = temp;
			break;
		}
	}
	if(sheet == null) {
		sheet = new lovedna.canvas.core.ImageSheet(bitmapData);
		if(cache) lovedna.canvas.ImageHelper._tempSheetList.push(sheet);
		if(loadType == null) loadType = lovedna.net.LoadType.NET;
		sheet.loadType = loadType;
	}
	return sheet.addImage(rect,centerPoint);
};
lovedna.canvas.ImageHelper.disposeImageSheet = function(url) {
	if(lovedna.canvas.ImageHelper._sheetMap.exists(url)) {
		var sheet = lovedna.canvas.ImageHelper._sheetMap.get(url);
		if(lovedna.canvas.ImageHelper._tileMap != null) {
			var keys = lovedna.canvas.ImageHelper._tileMap.keys();
			var iter = lovedna.canvas.ImageHelper._tileMap.iterator();
			while(keys.hasNext()) {
				var key = keys.next();
				var data = lovedna.canvas.ImageHelper._tileMap.get(key);
				if(data.tileSheet == sheet) lovedna.canvas.ImageHelper._tileMap.remove(key);
			}
		}
		if(sheet != null) sheet.dispose();
		lovedna.canvas.ImageHelper._sheetMap.remove(url);
	}
};
lovedna.canvas.ImageHelper.getImageKey = function(url,rect,point) {
	url += "#";
	if(rect != null) url += (rect.x | 0) + "," + (rect.y | 0) + "," + (rect.width | 0) + "," + (rect.height | 0); else url += "0,0,0,0";
	url += "#";
	if(point != null) {
		if(point.x >= -1 && point.x <= 1) if(point.x == null) url += "null"; else url += "" + point.x; else url += point.x | 0;
		url += ",";
		if(point.y >= -1 && point.y <= 1) if(point.y == null) url += "null"; else url += "" + point.y; else url += point.y | 0;
	} else url += "0,0";
	return url;
};
lovedna.canvas.ImageHelper.imageLoaded = function(url,bmd,loadType,data) {
	var group = lovedna.canvas.ImageHelper._groupMap.get(url);
	if(group != null) {
		group.init(bmd,data);
		return;
	}
	var sheet = null;
	var error = bmd == null;
	if(!error) {
		sheet = new lovedna.canvas.core.ImageSheet(bmd);
		sheet.loadType = loadType;
		lovedna.canvas.ImageHelper._sheetMap.set(url,sheet);
	}
	var list = lovedna.canvas.ImageHelper._loaderListMap.get(url);
	if(list == null) {
		if(loadType == lovedna.net.LoadType.NET) bmd.dispose();
		return;
	}
	var len = list.length;
	var usefull = false;
	while(len-- > 0) {
		var loadData = list[len];
		if(!error) {
			if(loadData.width > bmd.width) loadData.width = bmd.width;
			if(loadData.height > bmd.height) loadData.height = bmd.height;
		}
		var rect = new openfl.geom.Rectangle(loadData.x,loadData.y,loadData.width,loadData.height);
		var p = new openfl.geom.Point(loadData.centerX,loadData.centerY);
		var key = lovedna.canvas.ImageHelper.getImageKey(loadData.url,rect,p);
		var tile = lovedna.canvas.ImageHelper._tileMap.get(key);
		if(!error) {
			if(rect.width == 0 || rect.height == 0) {
				rect.width = bmd.width;
				rect.height = bmd.height;
				usefull = true;
			}
			var newtile = sheet.addImage(rect,p);
			if(newtile != null && tile != null) tile.copyfrom(newtile);
			tile.enable = true;
			newtile = null;
			if(!usefull) {
				if(rect.x == 0 && rect.y == 0 && rect.width == bmd.width && rect.height == bmd.height) usefull = true;
			}
		} else tile.dispose();
		loadData = null;
		rect = null;
		p = null;
		tile = null;
	}
};
lovedna.canvas.ImageHelper.prototype = {
	__class__: lovedna.canvas.ImageHelper
};
lovedna.canvas.LoadImageData = function(x,y,width,height,centerX,centerY) {
	if(centerY == null) centerY = 0;
	if(centerX == null) centerX = 0;
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x | 0;
	this.y = y | 0;
	this.width = width | 0;
	this.height = height | 0;
	this.centerX = centerX;
	this.centerY = centerY;
};
$hxClasses["lovedna.canvas.LoadImageData"] = lovedna.canvas.LoadImageData;
lovedna.canvas.LoadImageData.__name__ = ["lovedna","canvas","LoadImageData"];
lovedna.canvas.LoadImageData.prototype = {
	toString: function() {
		return this.x + "," + this.y + "," + this.width + "," + this.height + "," + this.centerX + "," + this.centerY;
	}
	,__class__: lovedna.canvas.LoadImageData
};
lovedna.canvas.animation = {};
lovedna.canvas.animation.ImageFrame = function() {
	lovedna.canvas.Image.call(this);
	this._frames = [];
	this._currentFrame = -1;
	this.totalFrame = 0;
};
$hxClasses["lovedna.canvas.animation.ImageFrame"] = lovedna.canvas.animation.ImageFrame;
lovedna.canvas.animation.ImageFrame.__name__ = ["lovedna","canvas","animation","ImageFrame"];
lovedna.canvas.animation.ImageFrame.__super__ = lovedna.canvas.Image;
lovedna.canvas.animation.ImageFrame.prototype = $extend(lovedna.canvas.Image.prototype,{
	addFrameAt: function(value,index) {
		this._frames.splice(index,0,value);
		this.totalFrame = this._frames.length;
		this.checkchange();
		return this;
	}
	,addFrame: function(value) {
		return this.addFrameAt(value,this.totalFrame);
	}
	,addFrames: function(frames) {
		this._frames = this._frames.concat(frames);
		this.totalFrame = this._frames.length;
		return this;
	}
	,getFrame: function(index) {
		return this._frames[index];
	}
	,removeFrame: function(index,len) {
		if(len == null) len = 1;
		this._frames.splice(index,len);
		this.totalFrame = this._frames.length;
		this.checkchange();
		return this;
	}
	,reset: function() {
		lovedna.canvas.Image.prototype.reset.call(this);
		this._showFrame = 0;
		this.removeFrame(0,this._frames.length);
	}
	,clone: function(keep) {
		if(keep == null) keep = false;
		return lovedna.utils.Pool.getObject(lovedna.canvas.animation.ImageFrame).copyfrom(this,keep);
	}
	,copyfrom: function(value,keep) {
		if(keep == null) keep = false;
		lovedna.canvas.Image.prototype.copyfrom.call(this,value,keep);
		if(js.Boot.__instanceof(value,lovedna.canvas.animation.ImageFrame)) {
			var frame = value;
			this.removeFrame(0,this._frames.length);
			if(keep) this.addFrames(frame._frames.concat([])); else this.addFrames(frame._frames);
		}
		return this;
	}
	,set_image: function(value) {
		return value;
	}
	,dispose: function() {
		lovedna.canvas.Image.prototype.dispose.call(this);
		this._frames = [];
		this._currentFrame = -1;
		this.totalFrame = 0;
	}
	,set_currentFrame: function(value) {
		this._showFrame = value;
		this.checkchange();
		this._currentFrame = this._showFrame;
		return value;
	}
	,get_currentFrame: function() {
		return this._currentFrame;
	}
	,checkchange: function() {
		if(this._showFrame != this._currentFrame) {
			if(this._showFrame >= 0 && this._showFrame < this.totalFrame) {
				this._currentFrame = this._showFrame;
				lovedna.canvas.Image.prototype.set_image.call(this,this._frames[this._currentFrame].image);
			} else lovedna.canvas.Image.prototype.set_image.call(this,null);
		}
	}
	,__class__: lovedna.canvas.animation.ImageFrame
	,__properties__: $extend(lovedna.canvas.Image.prototype.__properties__,{set_currentFrame:"set_currentFrame",get_currentFrame:"get_currentFrame"})
});
lovedna.canvas.animation.ImageAnimation = function() {
	lovedna.canvas.animation.ImageFrame.call(this);
	this.playing = true;
};
$hxClasses["lovedna.canvas.animation.ImageAnimation"] = lovedna.canvas.animation.ImageAnimation;
lovedna.canvas.animation.ImageAnimation.__name__ = ["lovedna","canvas","animation","ImageAnimation"];
lovedna.canvas.animation.ImageAnimation._loader = null;
lovedna.canvas.animation.ImageAnimation._loadMap = null;
lovedna.canvas.animation.ImageAnimation.disposeAnimation = function() {
	if(lovedna.canvas.animation.ImageAnimation._loadMap != null) {
		var $it0 = lovedna.canvas.animation.ImageAnimation._loadMap.iterator();
		while( $it0.hasNext() ) {
			var list = $it0.next();
			var len = list.length;
			while(len-- > 0) list[len].dispose();
		}
		lovedna.canvas.animation.ImageAnimation._loadMap = new haxe.ds.StringMap();
	}
	if(lovedna.canvas.animation.ImageAnimation._cache != null) {
		var iter = lovedna.canvas.animation.ImageAnimation._cache.iterator();
		if(iter.hasNext()) iter.next().dispose();
		lovedna.canvas.animation.ImageAnimation._cache = new haxe.ds.StringMap();
	}
};
lovedna.canvas.animation.ImageAnimation.dataCompleteHandler = function(url,bmd,loadType,data) {
	if(data != null && bmd != null) {
		data.position = 0;
		var png = new lovedna.utils.png.PngReader();
		png.read(data);
		var chunk = png.getChunk(1716666723);
		var config;
		if(chunk != null) {
			config = chunk.get_content();
			config.uncompress();
			config.position = 0;
		} else {
			png.dispose();
			var len = data.length;
			data.position = len - 4;
			var datalen = data.readInt();
			data.position = len - datalen - 4;
			config = new openfl.utils.ByteArray();
			data.readBytes(config,0,datalen);
			config.position = 0;
		}
		var frameRate = config.readByte();
		var delay = 1000;
		if(frameRate > 0) delay = 1000 / frameRate;
		var framelen = config.readByte();
		lovedna.canvas.ImageHelper.setImageSheet(url,bmd);
		var ani = lovedna.utils.Pool.getObject(lovedna.canvas.animation.ImageAnimation);
		lovedna.canvas.animation.ImageAnimation._cache.set(url,ani);
		ani.set_delay(delay);
		var frames = [];
		var _g = 0;
		while(_g < framelen) {
			var i = _g++;
			var x = config.readShort();
			var y = config.readShort();
			var w = config.readShort();
			var h = config.readShort();
			var cx = config.readShort();
			var cy = config.readShort();
			if(cx >= -1 && cx <= 1) cx = 0;
			if(cy >= -1 && cy <= 1) cy = 0;
			var rect = new openfl.geom.Rectangle(x,y,w,h);
			var center = new openfl.geom.Point(cx,cy);
			var image = lovedna.utils.Pool.getObject(lovedna.canvas.Image);
			image.set_image(lovedna.canvas.ImageHelper.getImageData(url,rect,center));
			frames.push(image);
		}
		ani.addFrames(frames);
		while(config.length - config.position > 0) {
			var namelen = config.readByte();
			var name = config.readUTFBytes(namelen);
			var len1 = config.readByte();
			var list = [];
			while(len1-- > 0) list.push(config.readByte());
			var actionRate = config.readByte();
			ani.setActionFrame(name,list,actionRate);
		}
		var list1 = lovedna.canvas.animation.ImageAnimation._loadMap.get(url);
		if(list1 != null) {
			var len2 = list1.length;
			while(len2-- > 0) {
				var child = list1[len2];
				child.copyfrom(ani);
			}
		}
	}
};
lovedna.canvas.animation.ImageAnimation.__super__ = lovedna.canvas.animation.ImageFrame;
lovedna.canvas.animation.ImageAnimation.prototype = $extend(lovedna.canvas.animation.ImageFrame.prototype,{
	setActionFrame: function(action,frameIndex,frameRate) {
		if(frameRate == null) frameRate = -1;
		if(this._actions == null) {
			this._actions = new haxe.ds.StringMap();
			this._actionFrameRate = new haxe.ds.StringMap();
		}
		this._actions.set(action,frameIndex);
		this._actionFrameRate.set(action,frameRate);
	}
	,setTrigger: function(handler) {
		this._trigger = handler;
	}
	,dispose: function() {
		lovedna.canvas.animation.ImageFrame.prototype.dispose.call(this);
		if(this._motion != null) lovedna.utils.Pool.returnObject(this._motion);
		this._trigger = null;
		this._action = null;
		this._actions = null;
		this._actionFrameRate = null;
		this._actionFrames = [];
	}
	,reset: function() {
		lovedna.canvas.animation.ImageFrame.prototype.reset.call(this);
		this._actionTotalFrame = 0;
		this.playing = true;
		this._timeScale = 1;
		if(this._motion == null) this._motion = lovedna.utils.Pool.getObject(lovedna.motion.LMotion);
		this._action = null;
		this._trigger = null;
		this._url = "";
	}
	,clone: function(keep) {
		if(keep == null) keep = false;
		return lovedna.utils.Pool.getObject(lovedna.canvas.animation.ImageAnimation).copyfrom(this,keep);
	}
	,copyfrom: function(value,keep) {
		if(keep == null) keep = false;
		lovedna.canvas.animation.ImageFrame.prototype.copyfrom.call(this,value,keep);
		if(js.Boot.__instanceof(value,lovedna.canvas.animation.ImageAnimation)) {
			var ani = value;
			this._url = ani._url;
			this.set_delay(ani._delay);
			if(keep) {
				this._timeScale = ani._timeScale;
				this._motion.set_timeScale(this._timeScale);
			}
			this._actions = ani._actions;
			this._actionFrameRate = ani._actionFrameRate;
			this.dataInit();
			this._currentFrame = -1;
			this.set_currentFrame(0);
		}
		return this;
	}
	,update: function(camera) {
		if(this.playing) {
			if(this._actionFrames != null && this._actionFrames.length >= 1) {
				this._motion.tickTime(this.time,this.tick);
				var p = this._motion.timep;
				var pf = p * this._actionTotalFrame | 0;
				var cf = this._actionFrames[pf];
				if(this._trigger != null) {
					if(cf < this._currentFrame || pf >= this._actionTotalFrame - 1) this._trigger(-1,p);
					if(this._trigger != null) this._trigger(cf,p);
				}
				this.set_currentFrame(cf);
			}
		}
		return lovedna.canvas.animation.ImageFrame.prototype.update.call(this,camera);
	}
	,load: function(url,rect,centerPoint) {
		if(url != "") {
			if(url != this._url) {
				if(lovedna.canvas.animation.ImageAnimation._cache.exists(url)) this.copyfrom(lovedna.canvas.animation.ImageAnimation._cache.get(url)); else {
					if(lovedna.canvas.animation.ImageAnimation._loader == null) {
						lovedna.canvas.animation.ImageAnimation._loader = new lovedna.canvas.net.NetStorage();
						lovedna.canvas.animation.ImageAnimation._loader.setImageCompleteHandler(lovedna.canvas.animation.ImageAnimation.dataCompleteHandler);
					}
					if(lovedna.canvas.animation.ImageAnimation._loadMap == null) lovedna.canvas.animation.ImageAnimation._loadMap = new haxe.ds.StringMap();
					var list = lovedna.canvas.animation.ImageAnimation._loadMap.get(url);
					if(list != null) {
						var id = Lambda.indexOf(list,this);
						if(id != -1) list.splice(id,1);
					} else {
						list = [];
						lovedna.canvas.animation.ImageAnimation._loadMap.set(url,list);
						list.push(this);
						lovedna.canvas.animation.ImageAnimation._loader.loadImage(url,null,true);
					}
					list.push(this);
				}
			}
			this._url = url;
		}
	}
	,dataInit: function() {
		var act = this._action;
		this._action = null;
		this.set_action(act);
	}
	,get_delay: function() {
		return this._delay;
	}
	,set_delay: function(value) {
		if(value < 0) value = -value;
		this._delay = value;
		if(this._actionFrames != null) this._motion.start(this._delay * this._actionTotalFrame);
		return value;
	}
	,get_action: function() {
		return this._action;
	}
	,set_action: function(value) {
		if(value != null) {
			if(value != this._action) {
				var actionDelay = this._delay;
				if(this._actions != null) {
					if(this._actions.exists(value)) {
						this._actionFrames = this._actions.get(value);
						var fps = this._actionFrameRate.get(value);
						if(fps > 0) actionDelay = 1000 / fps;
					}
				}
				if(this._actionFrames != null && this._actionFrames.length > 0) {
					this._actionTotalFrame = this._actionFrames.length;
					this.set_currentFrame(this._actionFrames[0]);
					this.set_delay(actionDelay);
				}
			}
		}
		return this._action = value;
	}
	,get_timeScale: function() {
		return this._timeScale;
	}
	,set_timeScale: function(value) {
		if(this._motion != null) this._motion.set_timeScale(value);
		return this._timeScale = value;
	}
	,__class__: lovedna.canvas.animation.ImageAnimation
	,__properties__: $extend(lovedna.canvas.animation.ImageFrame.prototype.__properties__,{set_timeScale:"set_timeScale",get_timeScale:"get_timeScale",set_action:"set_action",get_action:"get_action",set_delay:"set_delay",get_delay:"get_delay"})
});
lovedna.canvas.bone.BoneChild = function() {
	lovedna.canvas.ImageContainer.call(this);
	this._boneName = "root";
	this._parentX = this._parentY = 0;
};
$hxClasses["lovedna.canvas.bone.BoneChild"] = lovedna.canvas.bone.BoneChild;
lovedna.canvas.bone.BoneChild.__name__ = ["lovedna","canvas","bone","BoneChild"];
lovedna.canvas.bone.BoneChild.__super__ = lovedna.canvas.ImageContainer;
lovedna.canvas.bone.BoneChild.prototype = $extend(lovedna.canvas.ImageContainer.prototype,{
	addNode: function(name,x,y) {
		var node;
		if(this._nodes.exists(name)) node = this._nodes.get(name); else {
			node = lovedna.utils.Pool.getObject(lovedna.canvas.bone.BoneNode);
			node.name = name;
			this._nodes.set(name,node);
		}
		node.x = x;
		node.y = y;
		if(this._binds.exists(name)) {
			var bone = this._binds.get(name);
			bone.x = node.x;
			bone.y = node.y;
			bone._parentX = node.x;
			bone._parentY = node.y;
		}
	}
	,bind: function(name,bone) {
		if(bone == null) return;
		bone._boneName = name;
		var id = HxOverrides.indexOf(this._bones,bone,0);
		if(id != -1) this._bones[id] = bone; else this._bones.push(bone);
		this._binds.set(name,bone);
		if(this._nodes.exists(name)) {
			var node = this._nodes.get(name);
			bone.x = node.x;
			bone.y = node.y;
			bone._parentX = node.x;
			bone._parentY = node.y;
		}
		bone._parentBone = this;
	}
	,setTimeLine: function(value) {
		if(this._timeline != null) this._timeline.dispose();
		this._timeline = value;
		if(this._timeline != null) {
			this._timeline.timeScale = this._timeScale;
			this.rotation = this._timeline.rotation;
			this.scaleX = this._timeline.scaleX;
			this.scaleY = this._timeline.scaleY;
			this.x = this._parentX + this._timeline.x;
			this.y = this._parentY + this._timeline.y;
		}
	}
	,setTimeScale: function(scale) {
		this._timeScale = scale;
		if(this._timeline != null) this._timeline.timeScale = scale;
	}
	,restart: function() {
		if(this._timeline != null) this._timeline.restart();
	}
	,getBoneName: function() {
		return this._boneName;
	}
	,reset: function() {
		lovedna.canvas.ImageContainer.prototype.reset.call(this);
		this._nodes = new haxe.ds.StringMap();
		this._binds = new haxe.ds.StringMap();
		this._bones = [];
		this._timeScale = 1;
		this.playing = false;
	}
	,dispose: function() {
		lovedna.canvas.ImageContainer.prototype.dispose.call(this);
		this._timeline.dispose();
		this._timeline = null;
		this._parentBone = null;
		this._nodes = null;
		this._binds = null;
		this._bones = null;
	}
	,update: function(camera) {
		if(lovedna.canvas.ImageContainer.prototype.update.call(this,camera)) {
			if(this._timeline != null) {
				if(this.playing) this._timeline.tick(this.time,this.tick);
				this.rotation = this._timeline.rotation;
				this.scaleX = this._timeline.scaleX;
				this.scaleY = this._timeline.scaleY;
				this.x = this._parentX + this._timeline.x;
				this.y = this._parentY + this._timeline.y;
			}
			var len = this._bones.length;
			while(len-- > 0) {
				var child = this._bones[len];
				child.playing = this.playing;
				child.updateValues();
			}
			return true;
		}
		return false;
	}
	,get_parent: function() {
		if(this._parentBone != null) return this._parentBone;
		return lovedna.canvas.ImageContainer.prototype.get_parent.call(this);
	}
	,getUpdateEnable: function() {
		return true;
	}
	,__class__: lovedna.canvas.bone.BoneChild
});
lovedna.canvas.bone.BoneFrame = function() {
	this.rotation = 0;
	this.scaleX = this.scaleY = 1;
	this.x = this.y = 0;
	this.progress = 0;
	this.time = 500;
	this._rotationInc = 0;
	this._scaleXInc = this._scaleYInc = 0;
	this._xInc = this._yInc = 0;
	this.id = 0;
};
$hxClasses["lovedna.canvas.bone.BoneFrame"] = lovedna.canvas.bone.BoneFrame;
lovedna.canvas.bone.BoneFrame.__name__ = ["lovedna","canvas","bone","BoneFrame"];
lovedna.canvas.bone.BoneFrame.prototype = {
	setNext: function(value) {
		this.next = value;
		if(this.next != null) {
			this.next.id = this.id++;
			this._rotationInc = value._rotation - this._rotation;
			this._scaleXInc = value._scaleX - this._scaleX;
			this._scaleYInc = value._scaleY - this._scaleY;
			this._xInc = value._x - this._x;
			this._yInc = value._y - this._y;
		}
	}
	,getTotalTime: function() {
		var time = 0;
		var cf = this;
		while(cf.next != null) {
			time += cf.time;
			cf = cf.next;
		}
		return time;
	}
	,init: function(rotation,scaleX,scaleY,x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		if(scaleY == null) scaleY = 1;
		if(scaleX == null) scaleX = 1;
		if(rotation == null) rotation = 0;
		this.clear();
		this._rotation = rotation;
		this._scaleX = scaleX;
		this._scaleY = scaleY;
		this._x = x;
		this._y = y;
		rotation = this._rotation;
		scaleX = this._scaleX;
		scaleY = this._scaleY;
		x = this._x;
		y = this._y;
	}
	,setTween: function(type,wave) {
		if(wave == null) wave = true;
		if(type == null) type = "linear";
		if(type != null) this._ease = lovedna.utils.Ease.getEaseByName(type);
		this._wave = wave;
	}
	,tick: function(current) {
		if(this.next != null) {
			this.progress = current / this.time;
			if(this.progress > 1) this.progress = 1;
			if(this.progress < 0) this.progress = 0;
			if(this._ease != null) this.progress = this._ease(this.progress);
			if(this._wave) {
				this.progress = lovedna.utils.Ease.MathCos(this.progress * 6.28318530717959);
				this.progress = (1 - this.progress) * 0.5;
			}
			this.scaleX = this._scaleX + this._scaleXInc * this.progress;
			this.scaleY = this._scaleY + this._scaleYInc * this.progress;
			this.rotation = this._rotation + this._rotationInc * this.progress;
			this.x = this._x + this._xInc * this.progress;
			this.y = this._y + this._yInc * this.progress;
		}
	}
	,dispose: function() {
		this._ease = null;
		if(this.next != null) {
			this.next.dispose();
			this.next = null;
		}
		lovedna.utils.Pool.returnObject(this);
	}
	,clone: function() {
		var frame = lovedna.utils.Pool.getObject(lovedna.canvas.bone.BoneFrame);
		frame.clear();
		frame.id = this.id;
		frame.time = this.time;
		frame.init(this._rotation,this._scaleX,this._scaleY,this._x,this._y);
		frame._ease = this._ease;
		frame._wave = this._wave;
		if(this.next != null) frame.setNext(this.next.clone());
		return frame;
	}
	,toString: function() {
		return "<frame time='" + this.time + "' x='" + this.x + "' y='" + this.y + "' rotation='" + this.rotation + "' scaleX='" + this.scaleX + "' scaleY='" + this.scaleY + "' ease='linear' wave='" + (this._wave?1:0) + "' />";
	}
	,fix: function() {
		this.progress = lovedna.utils.Ease.MathCos(this.progress * 6.28318530717959);
		this.progress = (1 - this.progress) * 0.5;
	}
	,clear: function() {
		this.rotation = 0;
		this.scaleX = this.scaleY = 1;
		this._rotationInc = this._scaleXInc = this._scaleYInc = this._xInc = this._yInc = this._rotation = 0;
		this._scaleX = this._scaleY = 1;
		this._x = this._y = 0;
	}
	,__class__: lovedna.canvas.bone.BoneFrame
};
lovedna.canvas.bone.BoneNode = function() {
	this.x = this.y = 0;
};
$hxClasses["lovedna.canvas.bone.BoneNode"] = lovedna.canvas.bone.BoneNode;
lovedna.canvas.bone.BoneNode.__name__ = ["lovedna","canvas","bone","BoneNode"];
lovedna.canvas.bone.BoneNode.prototype = {
	__class__: lovedna.canvas.bone.BoneNode
};
lovedna.canvas.bone.BoneTimeLine = function() {
	this.rotation = 0;
	this.scaleX = this.scaleY = 1;
	this._time = 0;
	this._nextTime = 0;
	this.timeScale = 1;
	this.loop = true;
};
$hxClasses["lovedna.canvas.bone.BoneTimeLine"] = lovedna.canvas.bone.BoneTimeLine;
lovedna.canvas.bone.BoneTimeLine.__name__ = ["lovedna","canvas","bone","BoneTimeLine"];
lovedna.canvas.bone.BoneTimeLine.prototype = {
	dispose: function() {
		if(this._first != null) {
			this._first.dispose();
			this._trigger = null;
			this._current = null;
			this._first = null;
		}
		lovedna.utils.Pool.returnObject(this);
	}
	,init: function(first) {
		if(first != null) {
			this.clear();
			this._first = first;
			this.restart();
		}
	}
	,restart: function() {
		if(this._first != null) {
			this._current = this._first;
			this._nextTime = this._current.time;
			this._time = 0;
			this.rotation = this._first.rotation;
			this.scaleX = this._first.scaleX;
			this.scaleY = this._first.scaleY;
			this.rotation = this._first.rotation;
			this.x = this._first.x;
			this.y = this._first.y;
		}
	}
	,tick: function(time,tick) {
		if(this._current != null && this._first != null) {
			if(this._current.next == null) return;
			this._time += tick * this.timeScale;
			if(this._time >= this._nextTime) {
				this._time -= this._nextTime;
				this._current = this._current.next;
				if(this._current == null || this._current.next == null) {
					if(this.loop) {
						if(this._trigger != null) this._trigger(-1,1);
						this._current = this._first;
					}
				}
				if(this._current != null) this._nextTime = this._current.time;
			}
			if(this._current == null) return;
			this._current.tick(this._time);
			this.rotation = this._current.rotation;
			this.scaleX = this._current.scaleX;
			this.scaleY = this._current.scaleY;
			this.x = this._current.x;
			this.y = this._current.y;
			if(this._trigger != null) this._trigger(this._current.id,this._current.progress);
		}
	}
	,clone: function() {
		var timeline = new lovedna.canvas.bone.BoneTimeLine();
		if(this._first != null) timeline.init(this._first.clone());
		return timeline;
	}
	,clear: function() {
		this.rotation = 0;
		this.scaleX = this.scaleY = 1;
	}
	,__class__: lovedna.canvas.bone.BoneTimeLine
};
lovedna.canvas.bone.data = {};
lovedna.canvas.bone.data.BoneAction = function() {
};
$hxClasses["lovedna.canvas.bone.data.BoneAction"] = lovedna.canvas.bone.data.BoneAction;
lovedna.canvas.bone.data.BoneAction.__name__ = ["lovedna","canvas","bone","data","BoneAction"];
lovedna.canvas.bone.data.BoneAction.prototype = {
	readData: function(config) {
		var bonenamelen = config.readByte();
		this.name = config.readUTFBytes(bonenamelen);
		this.lockRotation = config.readByte() == 1;
		this.lockScaleX = config.readByte() == 1;
		this.lockScaleY = config.readByte() == 1;
		var framecount = config.readByte();
		var current = null;
		while(framecount-- > 0) {
			var time = config.readShort();
			var x = config.readInt();
			var y = config.readInt();
			var r = config.readShort();
			var sx = config.readShort();
			var sy = config.readShort();
			var wave = config.readByte();
			var easelen = config.readByte();
			var ease = config.readUTFBytes(easelen);
			var boneFrame = new lovedna.canvas.bone.BoneFrame();
			boneFrame.time = time;
			boneFrame.init(r / 10000,sx / 10000,sy / 10000,x / 10000,y / 10000);
			boneFrame.setTween(ease,wave == 1?true:false);
			if(current != null) current.setNext(boneFrame);
			if(this._first == null) this._first = boneFrame;
			current = boneFrame;
		}
	}
	,create: function(value) {
		var img = value.getChildByName(this.name);
		if(img != null) {
			if(js.Boot.__instanceof(img,lovedna.canvas.bone.BoneChild)) {
				var child = img;
				if(this.lockRotation) child._relativeFlags.close(3); else child._relativeFlags.open(3);
				if(this.lockScaleX) child._relativeFlags.close(4); else child._relativeFlags.open(4);
				if(this.lockScaleY) child._relativeFlags.close(5); else child._relativeFlags.open(5);
				var timeline = lovedna.utils.Pool.getObject(lovedna.canvas.bone.BoneTimeLine);
				timeline.init(this._first.clone());
				child.setTimeLine(timeline);
			}
		}
	}
	,dispose: function() {
		if(this._first != null) {
			this._first.dispose();
			this._first = null;
		}
	}
	,__class__: lovedna.canvas.bone.data.BoneAction
};
lovedna.canvas.bone.data.BoneActionConfig = function() {
};
$hxClasses["lovedna.canvas.bone.data.BoneActionConfig"] = lovedna.canvas.bone.data.BoneActionConfig;
lovedna.canvas.bone.data.BoneActionConfig.__name__ = ["lovedna","canvas","bone","data","BoneActionConfig"];
lovedna.canvas.bone.data.BoneActionConfig._configMap = null;
lovedna.canvas.bone.data.BoneActionConfig.getConfig = function(url) {
	if(lovedna.canvas.bone.data.BoneActionConfig._configMap != null) return lovedna.canvas.bone.data.BoneActionConfig._configMap.get(url);
	return null;
};
lovedna.canvas.bone.data.BoneActionConfig.prototype = {
	init: function(url,config) {
		if(config == null) return;
		if(lovedna.canvas.bone.data.BoneActionConfig._configMap == null) lovedna.canvas.bone.data.BoneActionConfig._configMap = new haxe.ds.StringMap();
		if(lovedna.canvas.bone.data.BoneActionConfig._configMap.exists(url)) return;
		lovedna.canvas.bone.data.BoneActionConfig._configMap.set(url,this);
		this._url = url;
		config.uncompress();
		this._textureMap = new haxe.ds.StringMap();
		this._childNodeMap = new haxe.ds.StringMap();
		this._textureList = [];
		var count = config.readByte();
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			var textureframe = new lovedna.canvas.bone.data.TextureFrame();
			textureframe.readData(config);
			textureframe.id = i;
			var name = textureframe.name;
			var parent = textureframe.parent;
			if(parent == "" || parent == null) this._rootName = name;
			if(parent == null) parent = "null";
			var list = this._childNodeMap.get(parent);
			if(list == null) {
				list = [];
				this._childNodeMap.set(parent,list);
			}
			list.push(name);
			this._textureList.push(textureframe);
			this._textureMap.set(textureframe.name,textureframe);
		}
		this._actions = new haxe.ds.StringMap();
		while(config.length - config.position > 0) {
			var actionnamelen = config.readByte();
			var actionname = config.readUTFBytes(actionnamelen);
			var bonecount = config.readByte();
			var list1 = this._actions.get(actionname);
			if(list1 == null) {
				list1 = [];
				this._actions.set(actionname,list1);
			}
			while(bonecount-- > 0) {
				var action = new lovedna.canvas.bone.data.BoneAction();
				action.readData(config);
				list1.push(action);
			}
		}
	}
	,create: function(value) {
		if(value == null) return;
		var len = this._textureList.length;
		var frame;
		var bone;
		while(len-- > 0) {
			frame = this._textureList[len];
			bone = lovedna.utils.Pool.getObject(lovedna.canvas.bone.BoneChild);
			bone.mouseEnabled = value.mouseEnabled;
			bone.name = frame.name;
			value.addChildAt(bone,0);
			bone.set_image(lovedna.canvas.ImageHelper.getImageData(this._url,new openfl.geom.Rectangle(frame.x,frame.y,frame.width,frame.height),new openfl.geom.Point(frame.pivotX,frame.pivotY)));
		}
		var iter = this._childNodeMap.keys();
		var img;
		while(iter.hasNext()) {
			var parentName = iter.next();
			img = value.getChildByName(parentName);
			if(img == null) continue;
			if(!js.Boot.__instanceof(img,lovedna.canvas.bone.BoneChild)) continue;
			var parent = img;
			var list = this._childNodeMap.get(parentName);
			len = list.length;
			while(len-- > 0) {
				var name = list[len];
				img = value.getChildByName(name);
				if(img == null) continue;
				if(!js.Boot.__instanceof(img,lovedna.canvas.bone.BoneChild)) continue;
				var child = img;
				frame = this._textureMap.get(name);
				if(parent != null) {
					parent.addNode(name,frame.parentX,frame.parentY);
					parent.bind(name,child);
				} else {
					child.x = frame.x;
					child.y = frame.y;
				}
			}
		}
		value.root = value.getChildByName(this._rootName);
	}
	,setAction: function(value) {
		if(value == null) return;
		var action = value.get_action();
		if(action != null && this._actions.exists(action)) {
			var list = this._actions.get(action);
			if(list == null) return;
			var len = list.length;
			while(len-- > 0) {
				var act = list[len];
				act.create(value);
			}
		}
	}
	,getRootName: function() {
		return this._rootName;
	}
	,hasAction: function(action) {
		return this._actions.exists(action);
	}
	,dispose: function() {
		if(this._actions != null) {
			var iter = this._actions.iterator();
			while(iter.hasNext()) {
				var list = iter.next();
				var len = list.length;
				while(len-- > 0) list[len].dispose();
			}
			this._actions = null;
		}
		this._textureMap = null;
		this._textureList = null;
		lovedna.canvas.ImageHelper.disposeImageSheet(this._url);
	}
	,__class__: lovedna.canvas.bone.data.BoneActionConfig
};
lovedna.canvas.bone.data.TextureFrame = function() {
};
$hxClasses["lovedna.canvas.bone.data.TextureFrame"] = lovedna.canvas.bone.data.TextureFrame;
lovedna.canvas.bone.data.TextureFrame.__name__ = ["lovedna","canvas","bone","data","TextureFrame"];
lovedna.canvas.bone.data.TextureFrame.prototype = {
	writeData: function(data) {
		data.writeByte(this.name.length);
		data.writeUTFBytes(this.name);
		data.writeByte(this.parent.length);
		if(this.parent.length > 0) data.writeUTFBytes(this.parent);
		data.writeShort(this.x);
		data.writeShort(this.y);
		data.writeShort(this.width);
		data.writeShort(this.height);
		data.writeShort(this.pivotX);
		data.writeShort(this.pivotY);
		data.writeShort(this.parentX);
		data.writeShort(this.parentY);
	}
	,readData: function(data) {
		var len = data.readByte();
		this.name = data.readUTFBytes(len);
		len = data.readByte();
		if(len > 0) this.parent = data.readUTFBytes(len);
		this.x = data.readShort();
		this.y = data.readShort();
		this.width = data.readShort();
		this.height = data.readShort();
		this.pivotX = data.readShort();
		this.pivotY = data.readShort();
		this.parentX = data.readShort();
		this.parentY = data.readShort();
	}
	,toString: function() {
		if(this.parent == null || this.parent == "null") this.parent = "";
		return "<frame id='" + this.id + "' name='" + this.name + "' parent='" + this.parent + "' x='" + this.x + "' y='" + this.y + "' width='" + this.width + "' height='" + this.height + "' pivotX='" + this.pivotX + "' pivotY='" + this.pivotY + "' parentX='" + this.parentX + "' parentY='" + this.parentY + "' />";
	}
	,__class__: lovedna.canvas.bone.data.TextureFrame
};
lovedna.utils.IDisplayResize = function() { };
$hxClasses["lovedna.utils.IDisplayResize"] = lovedna.utils.IDisplayResize;
lovedna.utils.IDisplayResize.__name__ = ["lovedna","utils","IDisplayResize"];
lovedna.utils.IDisplayResize.prototype = {
	__class__: lovedna.utils.IDisplayResize
};
lovedna.canvas.core.Canvas = function(width,height,useBuffer) {
	if(useBuffer == null) useBuffer = false;
	openfl.display.Sprite.call(this);
	this.zoom = true;
	this._usebuffer = useBuffer;
	this.mouseChildren = this.mouseEnabled = false;
	this._rect = new openfl.geom.Rectangle();
	this._scrollRect = new openfl.geom.Rectangle();
	this._resizeRect = new openfl.geom.Rectangle();
	this._mat = new openfl.geom.Matrix();
	this._shape1 = new openfl.display.Shape();
	this._graphics1 = this._shape1.get_graphics();
	this.addChild(this._shape1);
	if(this._usebuffer) {
		this._shape2 = new openfl.display.Shape();
		this._graphics2 = this._shape2.get_graphics();
		this.addChild(this._shape2);
	} else {
		this._shape2 = this._shape1;
		this._graphics2 = this._graphics1;
	}
	this._currentShape = this._shape1;
	this._currentGraphics = this._graphics1;
	this._shape1.set_visible(this._shape2.set_visible(false));
	if(!this._usebuffer) this._currentShape.set_visible(true);
	this.resize(width,height);
	this._developRect = new openfl.geom.Rectangle(0,0,width,height);
	this._cutRect = new openfl.geom.Rectangle(0,0,width,height);
	this._resizeRect = new openfl.geom.Rectangle(0,0,width,height);
};
$hxClasses["lovedna.canvas.core.Canvas"] = lovedna.canvas.core.Canvas;
lovedna.canvas.core.Canvas.__name__ = ["lovedna","canvas","core","Canvas"];
lovedna.canvas.core.Canvas.__interfaces__ = [lovedna.utils.IDisplayResize];
lovedna.canvas.core.Canvas.__super__ = openfl.display.Sprite;
lovedna.canvas.core.Canvas.prototype = $extend(openfl.display.Sprite.prototype,{
	getWidth: function() {
		return this._width;
	}
	,getHeight: function() {
		return this._height;
	}
	,setSafeCut: function(left,right,top,bottom) {
		if(bottom == null) bottom = 0;
		if(top == null) top = 0;
		if(right == null) right = 0;
		if(left == null) left = 0;
		var w = this._developRect.width;
		var h = this._developRect.height;
		var tleft = 0;
		var tright = w;
		var ttop = 0;
		var tbottom = h;
		if(left >= 0 && left < w) tleft = left;
		if(right > 0 && right < w) tright = w - right;
		if(top >= 0 && top < h) ttop = top;
		if(bottom > 0 && bottom < h) tbottom = h - bottom;
		if(tleft < tright) {
			this._cutRect.set_left(tleft);
			this._cutRect.set_right(tright);
		}
		if(ttop < tbottom) {
			this._cutRect.set_top(ttop);
			this._cutRect.set_bottom(tbottom);
		}
	}
	,setResizeHandler: function(handler) {
		this._resizeHandler = handler;
		if(this._resizeHandler != null) this._resizeHandler(this._resizeRect);
	}
	,resize: function(width,height) {
		this._rect.width = width;
		this._rect.height = height;
		this._scrollRect.width = width;
		this._scrollRect.height = height;
		this._width = width;
		this._height = height;
		openfl.display.Sprite.prototype.set_scrollRect.call(this,this._scrollRect);
		this._checkBmd = new openfl.display.BitmapData(1,1,true,0);
	}
	,clear: function() {
		if(this._usebuffer) {
			if(this._currentShape == this._shape1) {
				this._currentShape = this._shape2;
				this._currentGraphics = this._graphics2;
			} else {
				this._currentShape = this._shape1;
				this._currentGraphics = this._graphics1;
			}
		}
		this._currentGraphics.clear();
	}
	,lock: function() {
	}
	,unlock: function() {
		if(this._usebuffer) {
			this._currentShape.set_visible(true);
			if(this._currentShape == this._shape1) this._shape2.set_visible(false); else this._shape1.set_visible(false);
		}
	}
	,snapshot: function(x,y) {
		this._mat.tx = -x;
		this._mat.ty = -y;
		this._checkBmd.draw(this,this._mat);
	}
	,clearSnapshot: function() {
		this._checkBmd.setPixel32(0,0,0);
	}
	,dispose: function() {
		if(this.contains(this._bitmap)) this.removeChild(this._bitmap);
		this._rect = null;
		this._mat = null;
		this._checkBmd.dispose();
		this._checkBmd = null;
	}
	,getPixel32: function(x,y) {
		return this._checkBmd.getPixel32(0,0);
	}
	,setPixel32: function(x,y,color,checkColor) {
		if(checkColor == null) checkColor = false;
		if(checkColor) {
			if((color >> 24 & 255) > 0) color = (color >> 16 & 255 & 255) << 16 | (color >> 8 & 255 & 255) << 8 | color & 255 & 255;
		}
		this._currentGraphics.beginFill(color,1);
		this._currentGraphics.drawRect(x,y,1,1);
		this._currentGraphics.endFill();
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this._currentBmd.draw(source,matrix,colorTransform,blendMode,clipRect,smoothing);
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		this._currentBmd.copyPixels(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha);
	}
	,drawTiles: function(tileSheet,tileData,smooth,flags) {
		if(smooth == null) smooth = false;
		tileSheet.drawTiles(this._currentGraphics,tileData,smooth,flags);
	}
	,getGraphics: function() {
		return this._currentGraphics;
	}
	,getBitmapData: function() {
		return null;
	}
	,displayResize: function(width,height) {
		if(height == null) height = 0;
		if(width == null) width = 0;
		if(this.zoom) {
			openfl.display.Sprite.prototype.set_scrollRect.call(this,this._developRect);
			this._scrollRect.width = this._rect.width * this.get_scaleX();
			this._scrollRect.height = this._rect.height * this.get_scaleY();
			if(!this._developRect.equals(this._cutRect)) {
				var dw = this._developRect.width;
				var dh = this._developRect.height;
				this._resizeRect.width = dw;
				this._resizeRect.height = dh;
				var dp = dw / dh;
				var np = width / height;
				var rp = this._cutRect.width / this._cutRect.height;
				if(np < 1) {
					if(dp < 1) {
						if(np < rp) {
							dh = dw / np;
							var inc = 0;
							var n1 = this._cutRect.get_top();
							var n2 = this._developRect.get_bottom() - this._cutRect.get_bottom();
							if(n1 + n2 > 0) inc = (this._developRect.height - dh) * n1 / (n1 + n2);
							if(inc < 0) inc = 0;
							var rect = lovedna.utils.ResizeUtil.getSize(dw,dh,width,height);
							if(dh < this._developRect.height) this._resizeRect.height = dh;
							this.set_scaleX(rect.width);
							this.set_scaleY(rect.height);
							if(inc != 0) this.set_y(-inc * rect.height);
							this.set_x(rect.x);
						}
					}
				} else if(dp > 1) {
					if(np > rp) {
						dw = dh * np;
						var inc1 = 0;
						var n11 = this._cutRect.get_left();
						var n21 = this._developRect.get_right() - this._cutRect.get_right();
						if(n11 + n21 > 0) inc1 = (this._developRect.width - dw) * n11 / (n11 + n21);
						if(inc1 < 0) inc1 = 0;
						var rect1 = lovedna.utils.ResizeUtil.getSize(dw,dh,width,height);
						if(dw < this._developRect.width) this._resizeRect.width = dw;
						this.set_scaleX(rect1.width);
						this.set_scaleY(rect1.height);
						this.set_y(rect1.y);
						if(inc1 != 0) this.set_x(-inc1 * rect1.width);
					}
				}
				if(this.get_x() < 0) this._resizeRect.x = -this.get_x() / this.get_scaleX(); else this._resizeRect.x = 0;
				if(this.get_y() < 0) this._resizeRect.y = -this.get_y() / this.get_scaleY(); else this._resizeRect.y = 0;
				if(this._resizeHandler != null) this._resizeHandler(this._resizeRect);
			}
			this.set_width(Std["int"](this.get_width()));
			this.set_height(Std["int"](this.get_height()));
		} else this.resize(width | 0,height | 0);
	}
	,__class__: lovedna.canvas.core.Canvas
});
lovedna.canvas.core.EnterFrame = function() { };
$hxClasses["lovedna.canvas.core.EnterFrame"] = lovedna.canvas.core.EnterFrame;
lovedna.canvas.core.EnterFrame.__name__ = ["lovedna","canvas","core","EnterFrame"];
lovedna.canvas.core.EnterFrame.frameTime = null;
lovedna.canvas.core.EnterFrame._tick = null;
lovedna.canvas.core.EnterFrame._childs = null;
lovedna.canvas.core.EnterFrame._deactivateChilds = null;
lovedna.canvas.core.EnterFrame._init = null;
lovedna.canvas.core.EnterFrame._stage = null;
lovedna.canvas.core.EnterFrame._frameRate = null;
lovedna.canvas.core.EnterFrame._sleep = null;
lovedna.canvas.core.EnterFrame._defaulstFrameRate = null;
lovedna.canvas.core.EnterFrame.init = function() {
	if(lovedna.canvas.core.EnterFrame._init) return;
	lovedna.canvas.core.EnterFrame._sleep = false;
	lovedna.canvas.core.EnterFrame._init = true;
	lovedna.canvas.core.EnterFrame._stage = openfl.Lib.current.stage;
	if(lovedna.canvas.core.EnterFrame._stage != null) {
		lovedna.canvas.core.EnterFrame._frameRate = lovedna.canvas.core.EnterFrame._stage.frameRate;
		lovedna.canvas.core.EnterFrame._defaulstFrameRate = lovedna.canvas.core.EnterFrame._frameRate;
		lovedna.canvas.core.EnterFrame.frameTime = 1000 / lovedna.canvas.core.EnterFrame._frameRate;
		lovedna.canvas.core.EnterFrame._stage.addEventListener(openfl.events.Event.ACTIVATE,lovedna.canvas.core.EnterFrame.activatehandler);
		lovedna.canvas.core.EnterFrame._stage.addEventListener(openfl.events.Event.DEACTIVATE,lovedna.canvas.core.EnterFrame.deactivatehandler);
		lovedna.canvas.core.EnterFrame._stage.addEventListener(openfl.events.Event.MOUSE_LEAVE,lovedna.canvas.core.EnterFrame.stage_mouseLeave);
	}
	lovedna.canvas.core.EnterFrame._childs = new Array();
	lovedna.canvas.core.EnterFrame._deactivateChilds = new Array();
	if(lovedna.canvas.core.EnterFrame._tick == null) {
		lovedna.canvas.core.EnterFrame._tick = new lovedna.utils.tick.Tick();
		lovedna.canvas.core.EnterFrame._tick.set_delay(Math.floor(800 / Math.floor(openfl.Lib.current.stage.frameRate)));
		lovedna.canvas.core.EnterFrame._tick.pause = false;
	}
};
lovedna.canvas.core.EnterFrame.stage_mouseLeave = function(e) {
	if(lovedna.canvas.core.EnterFrame.mouseLeaveEnable) {
		lovedna.canvas.core.EnterFrame._mouseLeave = true;
		lovedna.canvas.core.EnterFrame.checkState();
		lovedna.canvas.core.EnterFrame._stage.removeEventListener(openfl.events.Event.MOUSE_LEAVE,lovedna.canvas.core.EnterFrame.stage_mouseLeave);
		lovedna.canvas.core.EnterFrame._stage.addEventListener(openfl.events.MouseEvent.MOUSE_MOVE,lovedna.canvas.core.EnterFrame.stage_mouseMove);
	}
};
lovedna.canvas.core.EnterFrame.stage_mouseMove = function(e) {
	if(lovedna.canvas.core.EnterFrame.mouseLeaveEnable) {
		lovedna.canvas.core.EnterFrame._mouseLeave = false;
		lovedna.canvas.core.EnterFrame.checkState();
		lovedna.canvas.core.EnterFrame._stage.addEventListener(openfl.events.Event.MOUSE_LEAVE,lovedna.canvas.core.EnterFrame.stage_mouseLeave);
		lovedna.canvas.core.EnterFrame._stage.removeEventListener(openfl.events.MouseEvent.MOUSE_MOVE,lovedna.canvas.core.EnterFrame.stage_mouseMove);
	}
};
lovedna.canvas.core.EnterFrame.setFrameRate = function(value) {
	if(value < 1) value = 1;
	if(value > lovedna.canvas.core.EnterFrame._defaulstFrameRate) value = lovedna.canvas.core.EnterFrame._defaulstFrameRate;
	lovedna.canvas.core.EnterFrame._frameRate = value;
	lovedna.canvas.core.EnterFrame.init();
	var delay = Math.floor(800 / value);
	lovedna.canvas.core.EnterFrame._tick.set_delay(delay);
};
lovedna.canvas.core.EnterFrame.stop = function() {
	if(lovedna.canvas.core.EnterFrame._init) lovedna.canvas.core.EnterFrame._tick.pause = true;
};
lovedna.canvas.core.EnterFrame.add = function(value) {
	if(lovedna.canvas.core.EnterFrame._init && value != null) {
		if(lovedna.canvas.core.EnterFrame._deactivate && value.deactivate(new Date().getTime())) {
			var id = Lambda.indexOf(lovedna.canvas.core.EnterFrame._deactivateChilds,value);
			if(id == -1) lovedna.canvas.core.EnterFrame._deactivateChilds.push(value);
		} else if(lovedna.canvas.core.EnterFrame._tick.add(value)) lovedna.canvas.core.EnterFrame._childs.push(value);
	}
};
lovedna.canvas.core.EnterFrame.sleep = function() {
	if(!lovedna.canvas.core.EnterFrame._sleep) {
		lovedna.canvas.core.EnterFrame._sleep = true;
		lovedna.canvas.core.EnterFrame.checkState();
	}
};
lovedna.canvas.core.EnterFrame.wake = function() {
	if(lovedna.canvas.core.EnterFrame._sleep) {
		lovedna.canvas.core.EnterFrame._sleep = false;
		lovedna.canvas.core.EnterFrame.checkState();
	}
};
lovedna.canvas.core.EnterFrame.remove = function(value) {
	if(lovedna.canvas.core.EnterFrame._init && value != null) {
		var id = lovedna.canvas.core.EnterFrame._tick.remove(value);
		if(id != -1) lovedna.canvas.core.EnterFrame._childs.splice(id,1);
		var id1 = Lambda.indexOf(lovedna.canvas.core.EnterFrame._deactivateChilds,value);
		if(id1 != -1) lovedna.canvas.core.EnterFrame._deactivateChilds.splice(id1,1);
	}
};
lovedna.canvas.core.EnterFrame.clear = function() {
	if(lovedna.canvas.core.EnterFrame._init) {
		lovedna.canvas.core.EnterFrame._childs = new Array();
		lovedna.canvas.core.EnterFrame._deactivateChilds = new Array();
		lovedna.canvas.core.EnterFrame._tick.clear();
	}
};
lovedna.canvas.core.EnterFrame.deactivatehandler = function(e) {
	if(lovedna.canvas.core.EnterFrame.deactivateEnable) {
		if(!lovedna.canvas.core.EnterFrame._deactivate) {
			lovedna.canvas.core.EnterFrame._deactivate = true;
			lovedna.canvas.core.EnterFrame.checkState();
		}
	}
};
lovedna.canvas.core.EnterFrame.activatehandler = function(e) {
	if(lovedna.canvas.core.EnterFrame.deactivateEnable) {
		if(lovedna.canvas.core.EnterFrame._deactivate) {
			lovedna.canvas.core.EnterFrame._deactivate = false;
			lovedna.canvas.core.EnterFrame.checkState();
		}
	}
};
lovedna.canvas.core.EnterFrame.checkState = function() {
	var enable = !lovedna.canvas.core.EnterFrame._deactivate && !lovedna.canvas.core.EnterFrame._mouseLeave && !lovedna.canvas.core.EnterFrame._sleep;
	if(enable != lovedna.canvas.core.EnterFrame._enable) {
		lovedna.canvas.core.EnterFrame._enable = enable;
		if(lovedna.canvas.core.EnterFrame._enable) {
			lovedna.canvas.core.EnterFrame._stage.frameRate = lovedna.canvas.core.EnterFrame._frameRate;
			var len = lovedna.canvas.core.EnterFrame._deactivateChilds.length;
			while(len-- > 0) {
				var obj = lovedna.canvas.core.EnterFrame._deactivateChilds[len];
				if(lovedna.canvas.core.EnterFrame._tick.add(obj)) lovedna.canvas.core.EnterFrame._childs.push(obj);
			}
			len = lovedna.canvas.core.EnterFrame._childs.length;
			lovedna.canvas.core.EnterFrame._tick.resetTime();
			var time = new Date().getTime();
			var tick = time - lovedna.canvas.core.EnterFrame._tick.get_time();
			while(len-- > 0) lovedna.canvas.core.EnterFrame._childs[len].activate(time,tick);
		} else {
			lovedna.canvas.core.EnterFrame._stage.frameRate = 1;
			var len1 = lovedna.canvas.core.EnterFrame._childs.length;
			var time1 = new Date().getTime();
			while(len1-- > 0) {
				var enter = lovedna.canvas.core.EnterFrame._childs[len1];
				if(enter.deactivate(time1)) {
					if(Lambda.indexOf(lovedna.canvas.core.EnterFrame._deactivateChilds,enter) == -1) lovedna.canvas.core.EnterFrame._deactivateChilds.push(enter);
					var id = lovedna.canvas.core.EnterFrame._tick.remove(enter);
					if(id != -1) lovedna.canvas.core.EnterFrame._childs.splice(id,1);
				}
			}
		}
	}
};
lovedna.canvas.core.ImageData = function() {
	this.enable = true;
	this.dataId = lovedna.canvas.core.ImageData.__id++;
};
$hxClasses["lovedna.canvas.core.ImageData"] = lovedna.canvas.core.ImageData;
lovedna.canvas.core.ImageData.__name__ = ["lovedna","canvas","core","ImageData"];
lovedna.canvas.core.ImageData.__interfaces__ = [lovedna.utils.IPoolObject];
lovedna.canvas.core.ImageData.prototype = {
	init: function(sheet,index) {
		this.tileSheet = sheet;
		this.index = index;
	}
	,dispose: function() {
		this.enable = false;
		this.tileSheet = null;
	}
	,copyfrom: function(value) {
		if(value != null) {
			this.index = value.index;
			this.enable = value.enable;
			this.tileSheet = value.tileSheet;
			this.rect = value.rect;
			this.pivot = value.pivot;
			this.dataId = value.dataId;
		} else {
			this.enable = false;
			this.tileSheet = null;
		}
	}
	,reset: function() {
		this.enable = true;
	}
	,__class__: lovedna.canvas.core.ImageData
};
lovedna.canvas.core.ImageGroup = function(name) {
	this._name = name;
	this._init = false;
	this._cacheMap = new haxe.ds.StringMap();
	this._rectMap = new haxe.ds.StringMap();
};
$hxClasses["lovedna.canvas.core.ImageGroup"] = lovedna.canvas.core.ImageGroup;
lovedna.canvas.core.ImageGroup.__name__ = ["lovedna","canvas","core","ImageGroup"];
lovedna.canvas.core.ImageGroup.prototype = {
	init: function(bmd,bytes) {
		if(this._init) return;
		if(bmd != null && bytes != null) {
			this._sheet = lovedna.canvas.ImageHelper.setImageSheet(this._name,bmd);
			this._init = true;
			if(this._sheet == null) this._init = false; else {
				var png = new lovedna.utils.png.PngReader();
				png.read(bytes);
				var chunk = png.getChunk(1716666723);
				var config;
				if(chunk != null) {
					config = chunk.get_content();
					config.uncompress();
					config.position = 0;
				} else {
					png.dispose();
					var len = bytes.length;
					bytes.position = len - 4;
					var datalen = bytes.readInt();
					bytes.position = len - datalen - 4;
					config = new openfl.utils.ByteArray();
					bytes.readBytes(config,0,datalen);
					config.position = 0;
				}
				while(config.length - config.position > 0) {
					var urllen = config.readByte();
					var url = config.readUTFBytes(urllen);
					var xinc = config.readShort();
					var yinc = config.readShort();
					var w = config.readShort();
					var h = config.readShort();
					var rect;
					if(lovedna.canvas.core.ImageGroup._rectpool.length > 0) {
						rect = lovedna.canvas.core.ImageGroup._rectpool.pop();
						rect.x = xinc;
						rect.y = yinc;
						rect.width = w;
						rect.height = h;
					} else rect = new openfl.geom.Rectangle(xinc,yinc,w,h);
					this._rectMap.set(url,rect);
				}
				var keys = this._cacheMap.keys();
				while(keys.hasNext()) {
					var key = keys.next();
					var name = key.split(":").shift();
					var data = this._cacheMap.get(key);
					var p = data.pivot;
					var rect1 = this._rectMap.get(name);
					var image = this._sheet.addImage(rect1,data.pivot);
					data.copyfrom(image);
				}
			}
		}
	}
	,getImage: function(name,centerPoint) {
		if(this._init) {
			var rect = this._rectMap.get(name);
			if(rect != null) return this._sheet.addImage(rect,centerPoint);
		} else {
			var key = this.getkey(name,centerPoint);
			if(this._cacheMap.exists(key)) return this._cacheMap.get(key); else {
				var image = lovedna.utils.Pool.getObject(lovedna.canvas.core.ImageData);
				image.enable = false;
				image.pivot = centerPoint;
				this._cacheMap.set(key,image);
				return image;
			}
		}
		return null;
	}
	,dispose: function() {
		if(this._sheet != null) {
			this._sheet.dispose();
			this._sheet = null;
		}
		var keys;
		var key = null;
		if(this._cacheMap != null) {
			keys = this._cacheMap.keys();
			while(keys.hasNext()) {
				key = keys.next();
				this._cacheMap.get(key).dispose();
			}
			this._cacheMap = null;
		}
		if(this._rectMap != null) {
			keys = this._rectMap.keys();
			while(keys.hasNext()) {
				key = keys.next();
				lovedna.canvas.core.ImageGroup._rectpool.push(this._rectMap.get(key));
			}
			this._rectMap = null;
		}
	}
	,getkey: function(name,centerPoint) {
		var key = name + ":";
		if(centerPoint == null) key += "0,0"; else key += (centerPoint.x | 0) + "," + (centerPoint.y | 0);
		return key;
	}
	,__class__: lovedna.canvas.core.ImageGroup
};
openfl.display.Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = new Array();
	this.__tileRects = new Array();
	this.__tileUVs = new Array();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new openfl.geom.Point();
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new openfl.geom.Rectangle(rectangle.get_left() / this.__bitmap.width,rectangle.get_top() / this.__bitmap.height,rectangle.get_right() / this.__bitmap.width,rectangle.get_bottom() / this.__bitmap.height));
		return this.__tileRects.length - 1;
	}
	,drawTiles: function(graphics,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags);
	}
	,getTileCenter: function(index) {
		return this.__centerPoints[index];
	}
	,getTileRect: function(index) {
		return this.__tileRects[index];
	}
	,getTileUVs: function(index) {
		return this.__tileUVs[index];
	}
	,__class__: openfl.display.Tilesheet
};
lovedna.canvas.core.ImageSheet = function(bitmapData) {
	this._images = [];
	this._flags = new haxe.ds.StringMap();
	openfl.display.Tilesheet.call(this,bitmapData);
	this.bitmapData = bitmapData;
};
$hxClasses["lovedna.canvas.core.ImageSheet"] = lovedna.canvas.core.ImageSheet;
lovedna.canvas.core.ImageSheet.__name__ = ["lovedna","canvas","core","ImageSheet"];
lovedna.canvas.core.ImageSheet.__super__ = openfl.display.Tilesheet;
lovedna.canvas.core.ImageSheet.prototype = $extend(openfl.display.Tilesheet.prototype,{
	dispose: function() {
		if(this.loadType == lovedna.net.LoadType.NET) {
			if(this.bitmapData != null) {
				this.bitmapData.dispose();
				this.bitmapData = null;
			}
			this.loadType = null;
		}
		if(this._images != null) {
			var len = this._images.length;
			while(len-- > 0) this._images[len].dispose();
			this._images.splice(0,this._images.length);
		}
		this._flags = new haxe.ds.StringMap();
	}
	,addImage: function(rectangle,pivot) {
		if(this.bitmapData != null) {
			if(rectangle == null) rectangle = this.bitmapData.rect; else {
				var maxW = this.bitmapData.width | 0;
				var maxH = this.bitmapData.height | 0;
				var x = rectangle.x | 0;
				var y = rectangle.y | 0;
				var w = rectangle.width | 0;
				var h = rectangle.height | 0;
				if(w == 0) rectangle.width = w = maxW;
				if(h == 0) rectangle.height = h = maxH;
				if(x > maxW) x = 0;
				if(y > maxH) y = 0;
				if(x + w > maxW) rectangle.width = w = maxW - x;
				if(y + h > maxH) rectangle.height = h = maxH - y;
			}
			if(pivot == null) {
				pivot = lovedna.utils.Pool.getObject(openfl.geom.Point);
				pivot.x = pivot.y = 0;
			}
			var id = this._images.length;
			if(pivot.x >= -1 && pivot.x <= 1) pivot.x = rectangle.width * pivot.x;
			if(pivot.y >= -1 && pivot.y <= 1) pivot.y = rectangle.height * pivot.y;
			rectangle.x = rectangle.x | 0;
			rectangle.y = rectangle.y | 0;
			rectangle.width = rectangle.width | 0;
			rectangle.height = rectangle.height | 0;
			pivot.x = pivot.x | 0;
			pivot.y = pivot.y | 0;
			var flag = lovedna.canvas.ImageHelper.getImageKey("",rectangle,pivot);
			var imagedata = null;
			if(!this._flags.exists(flag)) {
				this._flags.set(flag,this._images.length);
				openfl.display.Tilesheet.prototype.addTileRect.call(this,rectangle,pivot);
				imagedata = lovedna.utils.Pool.getObject(lovedna.canvas.core.ImageData);
				this._images.push(imagedata);
				imagedata.rect = rectangle;
				imagedata.pivot = pivot;
				imagedata.init(this,id);
			} else imagedata = this._images[this._flags.get(flag)];
			return imagedata;
		} else return null;
	}
	,__class__: lovedna.canvas.core.ImageSheet
});
lovedna.canvas.mouse.CameraMouse = function(camera) {
	this.localY = 0;
	this.localX = 0;
	this.longPressTime = 500;
	this._point = new openfl.geom.Point(-10,-10);
	this._pointList = [];
	if(camera == null) return;
	this._camera = camera;
	this._canvas = this._camera._canvas;
	this._stage = openfl.Lib.current.stage;
	if(this._stage == null) return;
	this._touchStatus = [];
	this._hasMove = [];
	this._hasLongPress = [];
	this._touchMouseEvent = [];
	this._multiTouch = false;
	this._touchCount = 0;
	if(this._multiTouch) {
		openfl.ui.Multitouch.set_inputMode(openfl.ui.MultitouchInputMode.TOUCH_POINT);
		this._stage.addEventListener("touchBegin",$bind(this,this.onTouchBegin));
		this._stage.addEventListener("touchMove",$bind(this,this.onTouchMove));
		this._stage.addEventListener("touchEnd",$bind(this,this.onTouchEnd));
	} else {
		this._stage.addEventListener(openfl.events.MouseEvent.MOUSE_DOWN,$bind(this,this.onMouseDown));
		this._stage.addEventListener(openfl.events.MouseEvent.MOUSE_MOVE,$bind(this,this.onMouseMove));
		this._stage.addEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.onMouseUp));
	}
	this.addTouchPoint(0);
};
$hxClasses["lovedna.canvas.mouse.CameraMouse"] = lovedna.canvas.mouse.CameraMouse;
lovedna.canvas.mouse.CameraMouse.__name__ = ["lovedna","canvas","mouse","CameraMouse"];
lovedna.canvas.mouse.CameraMouse.prototype = {
	dispose: function() {
		if(this._stage != null) {
			if(this._multiTouch) {
				this._stage.removeEventListener("touchBegin",$bind(this,this.onTouchBegin));
				this._stage.removeEventListener("touchMove",$bind(this,this.onTouchMove));
				this._stage.removeEventListener("touchEnd",$bind(this,this.onTouchEnd));
			} else {
				this._stage.removeEventListener(openfl.events.MouseEvent.MOUSE_DOWN,$bind(this,this.onMouseDown));
				this._stage.removeEventListener(openfl.events.MouseEvent.MOUSE_MOVE,$bind(this,this.onMouseMove));
				this._stage.removeEventListener(openfl.events.MouseEvent.MOUSE_UP,$bind(this,this.onMouseUp));
			}
		}
		this._stage = null;
		this._camera = null;
		this._canvas = null;
		this._touchStatus = null;
		this._hasMove = null;
		this._touchMouseEvent = null;
		this._mouseHandler = null;
		this._point = null;
	}
	,getCameraMouse: function() {
		if(this._canvas != null) return this._point;
		return this._point;
	}
	,renderComplete: function(target) {
		if(this._mouseHandler != null) {
			this._mouseHandler.onUnderMouse(target,this.localX,this.localY);
			if(this._camera.hasMouseObject) this.update();
		}
	}
	,reset: function() {
	}
	,setMouseHandler: function(value) {
		if(value == this._mouseHandler) return;
		if(this._mouseHandler != null) this._mouseHandler.end();
		this._mouseHandler = value;
		if(this._mouseHandler != null) {
			this._mouseHandler.begin();
			this.longPressTime = this._mouseHandler.getLongPressTime();
		}
	}
	,global2local: function(p) {
		p.x = (p.x - this._canvas.get_x()) / this._canvas.get_scaleX();
		p.y = (p.y - this._canvas.get_y()) / this._canvas.get_scaleY();
	}
	,updateMouse: function(type,data) {
		var time = new Date().getTime();
		var touchId = data.touchId;
		var lasttype = data.type;
		var p = this._pointList[touchId];
		var px = p.x;
		var py = p.y;
		px = (px - this._canvas.get_x()) / this._canvas.get_scaleX();
		py = (py - this._canvas.get_y()) / this._canvas.get_scaleY();
		this._point.x = px;
		this._point.y = py;
		if(type == 2) {
			if(data.timeMove == 0) data.timeMove = time;
			data.tickMove = time - data.timeMove;
			data.timeMove = time;
			data.movementX = (px - data.moveX + data.movementX) * 0.5;
			data.movementY = (py - data.moveY + data.movementY) * 0.5;
			if(lasttype == 1 || lasttype == -1) this._hasMove[touchId] = true;
		} else if(type == 1) {
			if(data.timeDown == 0) data.timeDown = time;
			data.tickDown = time - data.timeDown;
			data.timeDown = time;
			data.downX = px;
			data.downY = py;
			data.movementX = 0;
			data.movementY = 0;
			this._hasMove[touchId] = false;
			this._hasLongPress[touchId] = false;
		} else if(type == 3) {
			if(data.timeUp == 0) data.timeUp = this._touchTime;
			data.tickUp = this._touchTime - data.timeUp;
			data.timeUp = this._touchTime;
			data.upX = px;
			data.upY = py;
			this._hasLongPress[touchId] = false;
			this._hasMove[touchId] = false;
		} else if(type == 0) {
			data.downX = data.downY = 0;
			this._hasMove[touchId] = false;
			this._hasLongPress[touchId] = false;
		}
		data.moveX = px;
		data.moveY = py;
		type = -type;
		data.type = type;
		this._touchStatus[touchId] = type;
	}
	,onMouseDown: function(e) {
		if(this._stage != null) {
			var touchId = 0;
			if(touchId >= this._touchCount) this.addTouchPoint(touchId);
			var p = this._pointList[touchId];
			p.x = e.localX;
			p.y = e.localY;
			this.updateMouse(1,this._touchMouseEvent[touchId]);
		}
		if(!this._camera.hasMouseObject) this.update();
	}
	,onMouseMove: function(e) {
		if(this._stage != null) {
			var touchId = 0;
			var status = this._touchStatus[touchId];
			var p = this._pointList[touchId];
			p.x = e.localX;
			p.y = e.localY;
			if(status != -3 && status != -1) this.updateMouse(2,this._touchMouseEvent[touchId]);
			if(!this._camera.hasMouseObject) this.update();
		}
	}
	,onMouseUp: function(e) {
		if(this._stage != null) {
			var touchId = 0;
			var status = this._touchStatus[touchId];
			if(status != 0) {
				var p = this._pointList[touchId];
				p.x = e.localX;
				p.y = e.localY;
				this.updateMouse(3,this._touchMouseEvent[touchId]);
			}
		}
		if(!this._camera.hasMouseObject) this.update();
	}
	,onTouchBegin: function(e) {
		if(this._stage != null) {
			var touchId = e.touchPointID;
			if(touchId >= this._touchCount) this.addTouchPoint(touchId);
			var p = this._pointList[touchId];
			p.x = e.localX;
			p.y = e.localY;
			this.updateMouse(1,this._touchMouseEvent[touchId]);
		}
		if(!this._camera.hasMouseObject) this.update();
	}
	,onTouchMove: function(e) {
		if(this._stage != null) {
			var touchId = e.touchPointID;
			var status = this._touchStatus[touchId];
			var mouseData = this._touchMouseEvent[touchId];
			var p = this._pointList[touchId];
			var px = e.localX;
			var py = e.localY;
			if(p.x != px || p.y != py) {
				p.x = px;
				p.y = py;
				this.updateMouse(2,mouseData);
				if(status == 1) this._hasMove[touchId] = true;
				if(!this._camera.hasMouseObject) this.update();
			}
		}
	}
	,onTouchEnd: function(e) {
		if(this._stage != null) {
			var touchId = e.touchPointID;
			var status = this._touchStatus[touchId];
			if(status != 0) {
				var p = this._pointList[touchId];
				p.x = e.localX;
				p.y = e.localY;
				this.updateMouse(3,this._touchMouseEvent[touchId]);
			}
		}
		if(!this._camera.hasMouseObject) this.update();
	}
	,addTouchPoint: function(touchId) {
		var i = touchId;
		this._touchStatus[i] = 0;
		this._hasMove[i] = false;
		this._hasLongPress[i] = false;
		var mousedata = new lovedna.canvas.mouse.MouseData();
		mousedata.touchId = i;
		this._touchMouseEvent[i] = mousedata;
		this._pointList.push(new openfl.geom.Point(0,0));
		if(i >= this._touchCount) this._touchCount = i + 1;
	}
	,update: function() {
		var len = this._touchCount;
		this._touchTime = new Date().getTime();
		while(len-- > 0) {
			var mousedata = this._touchMouseEvent[len];
			if(mousedata == null) {
				mousedata = new lovedna.canvas.mouse.MouseData();
				mousedata.touchId = len;
				this._touchMouseEvent[len] = mousedata;
			}
			var status = this._touchStatus[len];
			if(status < 0) {
				this._touchStatus[len] = status;
				this.updateMouse(status,mousedata);
				this._mouseHandler.onMouseEvent(mousedata);
			} else if(status == 1) {
				var moved = this._hasMove[len];
				if(!moved) {
					var haslong = this._hasLongPress[len];
					if(!haslong) {
						if(this.longPressTime > 0) {
							var lastTime = mousedata.timeDown;
							if(this._touchTime - lastTime > this.longPressTime) {
								this._hasLongPress[len] = true;
								this._mouseHandler.onLongPress(len);
								this.updateMouse(0,mousedata);
							}
						} else this._hasLongPress[len] = true;
					}
				}
			}
		}
	}
	,__class__: lovedna.canvas.mouse.CameraMouse
};
lovedna.canvas.mouse.MouseData = function() {
	this.timeDown = this.timeMove = this.timeUp = 0;
	this.tickDown = this.tickUp = this.tickMove = 0;
	this.downX = this.downY = this.upX = this.upY = this.moveX = this.moveY = this.movementX = this.movementY = 0;
	this.touchId = 0;
};
$hxClasses["lovedna.canvas.mouse.MouseData"] = lovedna.canvas.mouse.MouseData;
lovedna.canvas.mouse.MouseData.__name__ = ["lovedna","canvas","mouse","MouseData"];
lovedna.canvas.mouse.MouseData.prototype = {
	__class__: lovedna.canvas.mouse.MouseData
};
lovedna.utils.worker = {};
lovedna.utils.worker.IJob = function() { };
$hxClasses["lovedna.utils.worker.IJob"] = lovedna.utils.worker.IJob;
lovedna.utils.worker.IJob.__name__ = ["lovedna","utils","worker","IJob"];
lovedna.utils.worker.IJob.prototype = {
	__class__: lovedna.utils.worker.IJob
};
lovedna.utils.worker.Job = function() {
};
$hxClasses["lovedna.utils.worker.Job"] = lovedna.utils.worker.Job;
lovedna.utils.worker.Job.__name__ = ["lovedna","utils","worker","Job"];
lovedna.utils.worker.Job.__interfaces__ = [lovedna.utils.worker.IJob];
lovedna.utils.worker.Job.prototype = {
	jobAdd: function() {
	}
	,jobExecute: function() {
	}
	,jobEnd: function() {
	}
	,__class__: lovedna.utils.worker.Job
};
lovedna.canvas.net = {};
lovedna.canvas.net.GetCacheJob = function(gethandler,jobSuccess) {
	this.dataFirst = false;
	this.version = 0;
	lovedna.utils.worker.Job.call(this);
	this._getHandler = gethandler;
	this._jobSuccess = jobSuccess;
};
$hxClasses["lovedna.canvas.net.GetCacheJob"] = lovedna.canvas.net.GetCacheJob;
lovedna.canvas.net.GetCacheJob.__name__ = ["lovedna","canvas","net","GetCacheJob"];
lovedna.canvas.net.GetCacheJob.__super__ = lovedna.utils.worker.Job;
lovedna.canvas.net.GetCacheJob.prototype = $extend(lovedna.utils.worker.Job.prototype,{
	jobAdd: function() {
		this.success = false;
	}
	,jobExecute: function() {
		this.success = false;
		this.result = this._getHandler(this.url);
		if(this.result != null) {
			if(this.version != 0) {
				if(this.getFileVersion(this.result) == this.version) this.success = true;
			} else this.success = true;
		}
	}
	,jobEnd: function() {
		this._jobSuccess(this);
	}
	,getFileVersion: function(data) {
		if(data != null) return haxe.crypto.Crc32.make(lovedna.utils.ByteArrayUtil.ByteArrayToBytes(data)); else return 0;
	}
	,__class__: lovedna.canvas.net.GetCacheJob
});
lovedna.canvas.net.ILoadObserve = function() { };
$hxClasses["lovedna.canvas.net.ILoadObserve"] = lovedna.canvas.net.ILoadObserve;
lovedna.canvas.net.ILoadObserve.__name__ = ["lovedna","canvas","net","ILoadObserve"];
lovedna.canvas.net.ILoadObserve.prototype = {
	__class__: lovedna.canvas.net.ILoadObserve
};
lovedna.utils.worker.Worker = function(time) {
	if(time == null) time = 30;
};
$hxClasses["lovedna.utils.worker.Worker"] = lovedna.utils.worker.Worker;
lovedna.utils.worker.Worker.__name__ = ["lovedna","utils","worker","Worker"];
lovedna.utils.worker.Worker.prototype = {
	add: function(job) {
		if(job != null) {
			job.jobAdd();
			job.jobExecute();
			job.jobEnd();
		}
	}
	,__class__: lovedna.utils.worker.Worker
};
lovedna.net = {};
lovedna.net.LoadType = $hxClasses["lovedna.net.LoadType"] = { __ename__ : ["lovedna","net","LoadType"], __constructs__ : ["AUTO","LOCAL","NET"] };
lovedna.net.LoadType.AUTO = ["AUTO",0];
lovedna.net.LoadType.AUTO.toString = $estr;
lovedna.net.LoadType.AUTO.__enum__ = lovedna.net.LoadType;
lovedna.net.LoadType.LOCAL = ["LOCAL",1];
lovedna.net.LoadType.LOCAL.toString = $estr;
lovedna.net.LoadType.LOCAL.__enum__ = lovedna.net.LoadType;
lovedna.net.LoadType.NET = ["NET",2];
lovedna.net.LoadType.NET.toString = $estr;
lovedna.net.LoadType.NET.__enum__ = lovedna.net.LoadType;
lovedna.canvas.net.NetStorage = function() {
	this._cacheFile = true;
	this._url = "";
	this.imageLoaderCount = 1;
	this.dataLoaderCount = 1;
	this._url = lovedna.canvas.net.NetStorage._globalURL;
	this._cacheFile = true;
	this._loadType = lovedna.canvas.net.NetStorage.defaultLoadType;
	if(this._loadType == lovedna.net.LoadType.AUTO) {
		this._loadType = lovedna.net.LoadType.NET;
		this._cacheFile = false;
	}
	if(this._loadType == lovedna.net.LoadType.LOCAL) this._cacheFile = false;
	if(this._cacheFile) {
		if(lovedna.canvas.net.NetStorage._localStorage == null) lovedna.canvas.net.NetStorage._localStorage = new lovedna.net.storage.Storage();
	}
	lovedna.canvas.net.NetStorage._allStorage.push(this);
	this._hasload = new haxe.ds.StringMap();
};
$hxClasses["lovedna.canvas.net.NetStorage"] = lovedna.canvas.net.NetStorage;
lovedna.canvas.net.NetStorage.__name__ = ["lovedna","canvas","net","NetStorage"];
lovedna.canvas.net.NetStorage._localStorage = null;
lovedna.canvas.net.NetStorage.setGlobalURL = function(url) {
	lovedna.canvas.net.NetStorage._globalURL = url;
	var len = lovedna.canvas.net.NetStorage._allStorage.length;
	while(len-- > 0) lovedna.canvas.net.NetStorage._allStorage[len].setURL(url);
};
lovedna.canvas.net.NetStorage.setVersion = function(url,version) {
	lovedna.canvas.net.NetStorage._versionMap.set(url,version);
};
lovedna.canvas.net.NetStorage.getVersion = function(url) {
	if(lovedna.canvas.net.NetStorage._versionMap.exists(url)) return lovedna.canvas.net.NetStorage._versionMap.get(url);
	return 0;
};
lovedna.canvas.net.NetStorage.setLoadObserve = function(value,add) {
	if(add == null) add = true;
	var id = Lambda.indexOf(lovedna.canvas.net.NetStorage._loadObserve,value);
	if(add) {
		if(id == -1) lovedna.canvas.net.NetStorage._loadObserve.push(value);
	} else if(id != -1) lovedna.canvas.net.NetStorage._loadObserve.splice(id,1);
};
lovedna.canvas.net.NetStorage.getFileVersion = function(data) {
	if(data != null) return lovedna.utils.ByteArrayUtil.getCrc32(data); else return 0;
};
lovedna.canvas.net.NetStorage.prototype = {
	setURL: function(url,lock) {
		if(lock == null) lock = false;
		if(!this._lockURL) {
			this._url = url;
			this._lockURL = lock;
		}
	}
	,dispose: function() {
		lovedna.canvas.net.NetStorage._localLoadDelay = 1;
		this._dataHandler = null;
		this._imageHandler = null;
		if(this._dataLoader != null) this._dataLoader.dispose();
		if(this._imageLoader != null) this._imageLoader.dispose();
		var id = Lambda.indexOf(lovedna.canvas.net.NetStorage._allStorage,this);
		if(id != -1) lovedna.canvas.net.NetStorage._allStorage.splice(id,1);
	}
	,setDataCompleteHandler: function(handler) {
		this._dataHandler = handler;
	}
	,setImageCompleteHandler: function(handler) {
		this._imageHandler = handler;
	}
	,setSoundCompleteHandler: function(handler) {
		this._soundHandler = handler;
	}
	,jobSuccess: function(job) {
		var type = job.type;
		var url = job.url;
		var priority = job.priority;
		var dataFirst = job.dataFirst;
		var version = lovedna.canvas.net.NetStorage.getVersion(url);
		var success = job.success;
		if(!lovedna.utils.PathUtil.isHttp(url)) url = this._url + url;
		if(type == 0) {
			if(success) this.imageFromLocal(url,job.result); else {
				if(version != 0) {
					if(this._loadType != lovedna.net.LoadType.LOCAL) url = url + "?" + version;
				}
				if(dataFirst == true) this.loaddata(url,priority,"image",this._loadType); else this.loadimage(url,priority,null,this._loadType);
			}
		} else if(type == 1) {
			if(success) this.dataFromLocal(url,job.result); else {
				if(version != 0) {
					if(this._loadType != lovedna.net.LoadType.LOCAL) url = url + "?" + version;
				}
				this.loaddata(url,priority,"data",this._loadType);
			}
		} else if(type == 2) {
			if(success) this.soundFromLocal(url,job.result); else {
				if(version != 0) {
					if(this._loadType != lovedna.net.LoadType.LOCAL) url = url + "?" + version;
				}
				if(this._cacheFile) this.loaddata(url,priority,"sound"); else this.loadsound(url,priority,null,this._loadType);
			}
		}
	}
	,loadImage: function(url,priority,dataFirst,loadType) {
		if(dataFirst == null) dataFirst = false;
		if(priority == null) priority = -1;
		if(this.getLoadState(url)) return;
		if(loadType == null) loadType = this._loadType;
		this.changeLoadState(url,true);
		this.changeLoadStatus(url,0,0,0);
		var version = lovedna.canvas.net.NetStorage.getVersion(url);
		if(!lovedna.utils.PathUtil.isHttp(url)) url = this._url + url;
		var http = lovedna.utils.PathUtil.isHttp(url);
		if(http) {
			if(this._cacheFile) {
				var data = this.getCache(url);
				if(data != null) {
					if(version != 0) {
						var v = lovedna.canvas.net.NetStorage.getFileVersion(data);
						if((function($this) {
							var $r;
							var $int = v;
							$r = $int < 0?4294967296.0 + $int:$int + 0.0;
							return $r;
						}(this)) == version) {
							lovedna.canvas.net.NetStorage._localLoadDelay += 1;
							new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.imageFromLocal),[url,data]).start(lovedna.canvas.net.NetStorage._localLoadDelay,true);
							return;
						}
					} else {
						lovedna.canvas.net.NetStorage._localLoadDelay += 1;
						new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.imageFromLocal),[url,data]).start(lovedna.canvas.net.NetStorage._localLoadDelay,true);
						return;
					}
				}
			}
		}
		if(loadType != lovedna.net.LoadType.LOCAL) {
			if(!lovedna.canvas.net.NetStorage.useCache) version = Std["int"](Math.random() * 2147483647.0);
			if(version != 0) url = url + "?" + version;
		}
		if(dataFirst == true) this.loaddata(url,priority,"image",loadType); else this.loadimage(url,priority,null,loadType);
	}
	,loadData: function(url,priority,local,loadType) {
		if(local == null) local = true;
		if(priority == null) priority = -1;
		if(this.getLoadState(url)) return;
		if(loadType == null) loadType = this._loadType;
		this.changeLoadState(url,true);
		this.changeLoadStatus(url,0,0,0);
		var version = lovedna.canvas.net.NetStorage.getVersion(url);
		if(!lovedna.utils.PathUtil.isHttp(url)) url = this._url + url;
		var http = lovedna.utils.PathUtil.isHttp(url);
		if(local) {
			if(http) {
				if(this._cacheFile) {
					var data = this.getCache(url);
					if(data != null) {
						if(version != 0) {
							var v = lovedna.canvas.net.NetStorage.getFileVersion(data);
							if((function($this) {
								var $r;
								var $int = v;
								$r = $int < 0?4294967296.0 + $int:$int + 0.0;
								return $r;
							}(this)) == version) {
								lovedna.canvas.net.NetStorage._localLoadDelay += 1;
								new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.dataFromLocal),[url,data]).start(lovedna.canvas.net.NetStorage._localLoadDelay,true);
								return;
							}
						} else {
							lovedna.canvas.net.NetStorage._localLoadDelay += 1;
							new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.dataFromLocal),[url,data]).start(lovedna.canvas.net.NetStorage._localLoadDelay,true);
							return;
						}
					}
				}
			}
		}
		if(loadType != lovedna.net.LoadType.LOCAL) {
			if(!lovedna.canvas.net.NetStorage.useCache) version = Std["int"](Math.random() * 2147483647.0);
			if(version != 0) url = url + "?" + version;
		}
		this.loaddata(url,priority,"data",loadType);
	}
	,loadSound: function(url,priority) {
		if(priority == null) priority = -1;
		var version = lovedna.canvas.net.NetStorage.getVersion(url);
		if(!lovedna.utils.PathUtil.isHttp(url)) url = this._url + url;
		var http = lovedna.utils.PathUtil.isHttp(url);
		if(http) {
			if(this._cacheFile) {
				var data = this.getCache(url);
				if(data != null) {
					if(version != 0) {
						var v = lovedna.canvas.net.NetStorage.getFileVersion(data);
						if((function($this) {
							var $r;
							var $int = v;
							$r = $int < 0?4294967296.0 + $int:$int + 0.0;
							return $r;
						}(this)) == version) {
							lovedna.canvas.net.NetStorage._localLoadDelay += 1;
							new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.soundFromLocal),[url,data]).start(lovedna.canvas.net.NetStorage._localLoadDelay,true);
							return;
						}
					} else {
						lovedna.canvas.net.NetStorage._localLoadDelay += 1;
						new lovedna.utils.tick.Delay().setCompleteHandler($bind(this,this.soundFromLocal),[url,data]).start(lovedna.canvas.net.NetStorage._localLoadDelay,true);
						return;
					}
				}
			}
		}
		if(!lovedna.canvas.net.NetStorage.useCache) version = Std["int"](Math.random() * 2147483647.0);
		if(version != 0) url = url + "?" + version;
		if(this._cacheFile) this.loaddata(url,priority,"sound"); else this.loadsound(url,priority,null,this._loadType);
	}
	,loaddata: function(url,priority,data,loadtype) {
		if(priority == null) priority = -1;
		if(this._dataLoader == null) {
			this._dataLoader = new lovedna.net.QueueDataLoader(this.dataLoaderCount);
			this._dataLoader.setCompleteHandler($bind(this,this.dataloaded));
			this._dataLoader.setProgressHandler($bind(this,this.loadProgress));
			this._dataLoader.setErrorHandler($bind(this,this.dataError));
		}
		this._dataLoader.load(url,priority,data,loadtype);
	}
	,loadimage: function(url,priority,data,loadtype) {
		if(priority == null) priority = -1;
		if(this._imageLoader == null) {
			this._imageLoader = new lovedna.net.QueueImageLoader(this.imageLoaderCount);
			this._imageLoader.setCompleteHandler($bind(this,this.imageloaded));
			this._imageLoader.setProgressHandler($bind(this,this.loadProgress));
			this._imageLoader.setErrorHandler($bind(this,this.imageError));
		}
		this._imageLoader.load(url,priority,data,loadtype);
	}
	,loadsound: function(url,priority,data,loadtype) {
		if(priority == null) priority = -1;
		if(this._soundLoader == null) {
			this._soundLoader = new lovedna.net.QueueSoundLoader(this.imageLoaderCount);
			this._soundLoader.setCompleteHandler($bind(this,this.soundLoaded));
			this._soundLoader.setErrorHandler($bind(this,this.soundError));
		}
		this._soundLoader.load(url,priority,data,loadtype);
	}
	,dataloaded: function(loader) {
		var url = loader.getURL();
		var shorturl = this.getShortPath(url);
		var http = lovedna.utils.PathUtil.isHttp(url);
		if(this._cacheFile && http) this.setCache(url,loader.getContent());
		var userdata = loader.getUserData();
		var data = loader.getContent();
		if(userdata == "data") {
			if(this._dataHandler != null) this._dataHandler(shorturl,data);
			this.changeLoadStatus(shorturl,2,data.length,data.length);
			this.changeLoadState(shorturl,false);
		} else if(userdata == "image") {
			var request = new openfl.net.URLRequest(url);
			request.data = data;
			this.loadimage(request,-1,userdata,lovedna.net.LoadType.NET);
		} else if(userdata == "sound") this.soundFromLocal(url,data);
	}
	,dataError: function(loader) {
		var url = loader.getURL();
		url = this.getShortPath(url);
		this.changeLoadState(url,false);
		var userdata = loader.getUserData();
		this.changeLoadStatus(url,2,loader.getBytesLoaded(),loader.getBytesTotal());
		if(userdata == "data") {
			if(this._dataHandler != null) this._dataHandler(url,null);
		} else if(userdata == "image") {
			if(this._imageHandler != null) this._imageHandler(url,null,loader.getLoadType(),null);
		} else if(userdata == "sound") {
			if(this._soundHandler != null) this._soundHandler(url,null);
		}
	}
	,loadProgress: function(loader) {
		var url = loader.getURL();
		url = this.getShortPath(url);
		this.changeLoadStatus(url,1,loader.getBytesLoaded(),loader.getBytesTotal());
	}
	,imageloaded: function(loader) {
		var url = loader.getURL();
		var shorturl = this.getShortPath(url);
		this.changeLoadState(shorturl,false);
		var bmd = loader.getContent();
		var http = lovedna.utils.PathUtil.isHttp(url);
		if(this._cacheFile && http) {
			if(bmd != null && bmd.width != 0 && bmd.height != 0) {
				if(loader.getUserData() == null) this.setCache(shorturl,loader.getBytes());
			} else {
				this.deleteCache(shorturl);
				bmd = null;
			}
		}
		if(this._imageHandler != null) this._imageHandler(shorturl,bmd,loader.getLoadType(),loader.getBytes());
		this.changeLoadStatus(shorturl,2,loader.getBytesLoaded(),loader.getBytesTotal());
	}
	,imageError: function(loader) {
		var url = loader.getURL();
		var http = lovedna.utils.PathUtil.isHttp(url);
		url = this.getShortPath(url);
		if(this._cacheFile && http) this.deleteCache(url);
		haxe.Log.trace("erroe image " + url,{ fileName : "NetStorage.hx", lineNumber : 584, className : "lovedna.canvas.net.NetStorage", methodName : "imageError"});
		this.changeLoadState(url,false);
		this.changeLoadStatus(url,2,loader.getBytesLoaded(),loader.getBytesTotal());
		if(this._imageHandler != null) this._imageHandler(url,null,loader.getLoadType(),null);
	}
	,imageFromLocal: function(url,data) {
		this.loadimage(url,-1,data);
		lovedna.canvas.net.NetStorage._localLoadDelay -= 1;
		if(lovedna.canvas.net.NetStorage._localLoadDelay < 1) lovedna.canvas.net.NetStorage._localLoadDelay = 1;
	}
	,dataFromLocal: function(url,data) {
		url = this.getShortPath(url);
		if(this._dataHandler != null) this._dataHandler(url,data);
		lovedna.canvas.net.NetStorage._localLoadDelay -= 1;
		if(lovedna.canvas.net.NetStorage._localLoadDelay < 1) lovedna.canvas.net.NetStorage._localLoadDelay = 1;
		this.changeLoadState(url,false);
		this.changeLoadStatus(url,2,data.length,data.length);
	}
	,soundLoaded: function(loader) {
		var url = loader.getURL();
		var shorturl = this.getShortPath(url);
		var sound = loader.getContent();
		if(this._soundHandler != null) this._soundHandler(shorturl,sound);
		this.changeLoadStatus(shorturl,2,loader.getBytesLoaded(),loader.getBytesTotal());
	}
	,soundError: function(loader) {
		var url = loader.getURL();
		var shorturl = this.getShortPath(url);
		if(this._soundHandler != null) this._soundHandler(shorturl,null);
	}
	,soundFromLocal: function(url,data) {
		var shorturl = this.getShortPath(url);
		lovedna.canvas.net.NetStorage._localLoadDelay -= 1;
		if(lovedna.canvas.net.NetStorage._localLoadDelay < 1) lovedna.canvas.net.NetStorage._localLoadDelay = 1;
	}
	,setCache: function(url,data) {
	}
	,deleteCache: function(url) {
		return null;
	}
	,getCache: function(url) {
		return null;
	}
	,getShortPath: function(full) {
		var fixurl = lovedna.utils.PathUtil.getShortURL(full,this._url);
		fixurl = fixurl.split("?").shift();
		return fixurl;
	}
	,getname: function(url) {
		return lovedna.utils.PathUtil.getFixURL(this.getShortPath(url));
	}
	,changeLoadState: function(url,loading) {
		url = this.getShortPath(url);
		if(loading) this._hasload.set(url,true); else this._hasload.remove(url);
	}
	,getLoadState: function(url) {
		url = this.getShortPath(url);
		return this._hasload.exists(url);
	}
	,changeLoadStatus: function(url,type,bytesLoaded,bytesTotal) {
		var len = lovedna.canvas.net.NetStorage._loadObserve.length;
		if(len > 0) while(len-- > 0) lovedna.canvas.net.NetStorage._loadObserve[len].loadStatus(url,type,bytesLoaded,bytesTotal);
	}
	,__class__: lovedna.canvas.net.NetStorage
};
lovedna.canvas.ui.ImageText = function() {
	this._textField = new openfl.text.TextField();
	this._textField.set_autoSize(openfl.text.TextFieldAutoSize.LEFT);
	this._textField.mouseEnabled = false;
	this._textField.selectable = false;
	this._textField.multiline = true;
	this.length = 0;
	if(lovedna.canvas.ui.ImageText.defaultTextFormat == null) {
		lovedna.canvas.ui.ImageText.defaultTextFormat = new openfl.text.TextFormat();
		lovedna.canvas.ui.ImageText.defaultTextFormat.color = 16777215;
		lovedna.canvas.ui.ImageText.defaultTextFormat.align = openfl.text.TextFormatAlign.LEFT;
	}
	this._format = new openfl.text.TextFormat();
	this.copyFormat(this._format,lovedna.canvas.ui.ImageText.defaultTextFormat);
	this._changed = false;
	lovedna.canvas.Image.call(this);
	this._textField.set_defaultTextFormat(this._format);
};
$hxClasses["lovedna.canvas.ui.ImageText"] = lovedna.canvas.ui.ImageText;
lovedna.canvas.ui.ImageText.__name__ = ["lovedna","canvas","ui","ImageText"];
lovedna.canvas.ui.ImageText.defaultTextFormat = null;
lovedna.canvas.ui.ImageText.__super__ = lovedna.canvas.Image;
lovedna.canvas.ui.ImageText.prototype = $extend(lovedna.canvas.Image.prototype,{
	getTextField: function() {
		return this._textField;
	}
	,setStage: function(value) {
		this._parentContainer = value;
		if(this._parentContainer != null) {
			this._parentContainer.addChild(this._textField);
			this.updateTextField();
		} else if(this._textField.parent != null) this._textField.parent.removeChild(this._textField);
	}
	,updateTextField: function() {
		this._textField.set_x(this.stageX);
		this._textField.set_y(this.stageY);
		this._textField.set_alpha(this.stageAlpha);
	}
	,setTextFormat: function(value) {
		if(value == null) return;
		this._textField.set_defaultTextFormat(value);
		this._textField.setTextFormat(value);
		this._changed = true;
	}
	,setChangeHandler: function(handler) {
		this._chnageHandler = handler;
	}
	,update: function(camera) {
		if(this._changed) {
			this._changed = false;
			if(this.textWidth != 0 && this.textHeight != 0) {
				var w = this.textWidth + 2 | 0;
				var h = this.textHeight + 2 | 0;
				var resize = false;
				if(this._imageSheet == null) resize = true; else {
					this._bitmapData = this._imageSheet.bitmapData;
					if(this._bitmapData == null) resize = true; else if(w > this._bitmapData.width || h > this._bitmapData.height) resize = true;
				}
				if(resize) {
					if(this._imageSheet != null) this._imageSheet.dispose();
					if(w != 0 && h != 0) {
						this._bitmapData = new openfl.display.BitmapData(w,h,true,16711680);
						this._bitmapData.draw(this._textField);
						this.set_image(lovedna.canvas.ImageHelper.createImageData(this._bitmapData,null,null,lovedna.net.LoadType.NET,false));
						this._imageSheet = this.image.tileSheet;
					}
				} else if(this._bitmapData != null) {
					this._bitmapData.fillRect(this._bitmapData.rect,16711680);
					this._bitmapData.draw(this._textField);
				}
			}
			if(this._chnageHandler != null) this._chnageHandler(this);
		}
		this.updateTextField();
		return lovedna.canvas.Image.prototype.update.call(this,camera);
	}
	,getUpdateEnable: function() {
		if(this._changed) return true; else return lovedna.canvas.Image.prototype.getUpdateEnable.call(this);
	}
	,dispose: function() {
		lovedna.canvas.Image.prototype.dispose.call(this);
		this._chnageHandler = null;
		this._changed = false;
		this.setStage(null);
	}
	,reset: function() {
		lovedna.canvas.Image.prototype.reset.call(this);
		if(this._imageSheet != null) {
			this._imageSheet.dispose();
			this._imageSheet = null;
		}
		this.textWidth = this.textHeight = 0;
		this._textField.set_defaultTextFormat(lovedna.canvas.ui.ImageText.defaultTextFormat);
	}
	,set_parent: function(value) {
		lovedna.canvas.Image.prototype.set_parent.call(this,value);
		if(value == null) {
			if(this._textField.parent != null) this._textField.parent.removeChild(this._textField);
		} else if(this._parentContainer != null) {
			this._parentContainer.addChild(this._textField);
			this.updateTextField();
		}
		return this;
	}
	,get_text: function() {
		return this._text;
	}
	,set_text: function(value) {
		if(value != this._text) {
			if(this.maxChars > 0) {
				if(value.length > this.maxChars) value = HxOverrides.substr(value,0,this.maxChars);
			}
			if(value != this._text) {
				this._text = value;
				this._textField.set_htmlText(this._text);
				this.length = this._text.length;
				this.textHeight = this._textField.get_textHeight() + 1;
				this.textWidth = this._textField.get_textWidth();
				this._changed = true;
			}
		}
		return value;
	}
	,set_maxChars: function(value) {
		if(value < 0) value = 0; else this._textField.maxChars = value;
		this.maxChars = value;
		return value;
	}
	,set_displayAsPassword: function(value) {
		this._textField.displayAsPassword = value;
		this._changed = true;
		return value;
	}
	,set_multiline: function(value) {
		this._textField.multiline = value;
		this._changed = true;
		return value;
	}
	,set_textColor: function(value) {
		this._textField.set_textColor(value);
		this._changed = true;
		return value;
	}
	,set_background: function(value) {
		this._textField.set_background(value);
		this._changed = true;
		return value;
	}
	,set_backgroundColor: function(value) {
		this._textField.set_backgroundColor(value);
		this._changed = true;
		return value;
	}
	,copyFormat: function(to,from) {
		if(from != null && to != null) {
			to.align = from.align;
			to.blockIndent = from.blockIndent;
			to.bold = from.bold;
			to.bullet = from.bullet;
			to.color = from.color;
			to.font = from.font;
			to.kerning = from.kerning;
			to.leading = from.leading;
			to.leftMargin = from.leftMargin;
			to.letterSpacing = from.letterSpacing;
			to.rightMargin = from.rightMargin;
			to.size = from.size;
			to.tabStops = from.tabStops;
			to.target = from.target;
			to.underline = from.underline;
			to.url = from.url;
		}
	}
	,__class__: lovedna.canvas.ui.ImageText
	,__properties__: $extend(lovedna.canvas.Image.prototype.__properties__,{set_backgroundColor:"set_backgroundColor",set_background:"set_background",set_textColor:"set_textColor",set_multiline:"set_multiline",set_displayAsPassword:"set_displayAsPassword",set_maxChars:"set_maxChars",set_text:"set_text",get_text:"get_text"})
});
lovedna.injector = {};
lovedna.injector.Singleton = function() {
	this._dict = new haxe.ds.StringMap();
};
$hxClasses["lovedna.injector.Singleton"] = lovedna.injector.Singleton;
lovedna.injector.Singleton.__name__ = ["lovedna","injector","Singleton"];
lovedna.injector.Singleton.prototype = {
	getInstance: function(value,name) {
		if(name == null) name = "";
		if(value == null) return null;
		var qcn = this.getQCN(value,name);
		if(this._dict.exists(qcn)) return this._dict.get(qcn);
		var classname = Type.getClassName(value);
		var target = Type.createInstance(Type.resolveClass(classname),[]);
		if(target != null) {
			var value1 = target;
			this._dict.set(qcn,value1);
			this.inject(target);
			if(this._createHandler != null) this._createHandler(value,target,name);
		}
		return target;
	}
	,hasInstance: function(value,name) {
		if(name == null) name = "";
		var key = this.getQCN(value,name);
		return this._dict.exists(key);
	}
	,setInstance: function(key,value,name) {
		if(name == null) name = "";
		if(value == null) return;
		var qcn = this.getQCN(key,name);
		var exists = this._dict.exists(qcn);
		var value1 = value;
		this._dict.set(qcn,value1);
		if(!exists) {
			this.inject(value);
			if(this._createHandler != null) this._createHandler(key,value,name);
		}
	}
	,inject: function(value) {
		if(value == null) return false;
		var desc = lovedna.rtti.Description.getDescription(lovedna.rtti.Description.getClass(value));
		var list = desc.getMetaList();
		while(list.hasNext()) {
			var meta = list.next();
			if(meta.hasKey("inject")) {
				var typeclass = lovedna.rtti.Description.getClass(meta.get_type());
				var arg = meta.getArg("inject");
				var property = Reflect.getProperty(value,meta.get_name());
				if(Reflect.isFunction(property)) {
					var args = meta.getFunArg();
					var lst = [];
					if(args != null) {
						var len = args.length;
						var _g = 0;
						while(_g < len) {
							var i = _g++;
							var has = false;
							var obj = args[i];
							if(obj != null) {
								var type = Reflect.field(obj,"type");
								var cls = Type.resolveClass(type);
								if(cls != null) {
									has = true;
									lst.push(this.getInstance(cls));
								}
							}
							if(!has) lst.push(null);
						}
					}
					property.apply(value,lst);
				} else Reflect.setProperty(value,meta.get_name(),this.getInstance(typeclass,arg));
			}
		}
		return true;
	}
	,setCreateHandler: function(handler) {
		this._createHandler = handler;
	}
	,getQCN: function(value,name) {
		if(name == null) name = "";
		if(name == null) name = "";
		return lovedna.rtti.Description.getQCN(value) + "#" + name;
	}
	,__class__: lovedna.injector.Singleton
};
lovedna.motion = {};
lovedna.motion.LMotion = function(time) {
	if(time == null) time = 0;
	this.__time = 1000;
	this._timeScale = 1;
	this._timeOffset = 0;
	this.__timeOffset = 0;
	this.__durationTime = 0;
	this.__timeScaleOffset = 0;
	this.tickp = 0;
	this.timep = 0;
	this.start(time);
};
$hxClasses["lovedna.motion.LMotion"] = lovedna.motion.LMotion;
lovedna.motion.LMotion.__name__ = ["lovedna","motion","LMotion"];
lovedna.motion.LMotion.__interfaces__ = [lovedna.utils.tick.ITick];
lovedna.motion.LMotion.prototype = {
	resetTime: function() {
		this.__startTime = new Date().getTime();
		this.tickp = 0;
		this.timep = 0;
	}
	,dispose: function() {
		this._pause = true;
	}
	,start: function(time) {
		this.__startTime = new Date().getTime();
		if(time > 0) {
			this._pause = false;
			this.__time = time;
			this.__durationTime = this.__time;
			this.__timeOffset = this._timeOffset * this.__durationTime;
		} else this._pause = true;
		this.__currentTime = 0;
		this.tickp = 0;
		this.timep = 0;
		return this;
	}
	,copyFrom: function(value) {
		if(value != null) {
			this.__time = value.__time;
			this._timeOffset = value._timeOffset;
			this.__timeOffset = value.__timeOffset;
			this._timeScale = value._timeScale;
			this.__timeScaleOffset = value.__timeScaleOffset;
			this.__durationTime = value.__durationTime;
			this._pause = value._pause;
			this.__startTime = new Date().getTime();
		}
		return value;
	}
	,clone: function() {
		return this.newSelf().copyFrom(this);
	}
	,tickTime: function(time,tick) {
		if(tick == null) tick = 0;
		if(time == null) time = 0;
		if(!this._pause) {
			time -= this.__startTime;
			this.__currentTime += tick * this._timeScale;
			time += this.__timeOffset;
			time %= this.__durationTime;
			this.__currentTime %= this.__durationTime;
			this.timep = this.__currentTime / this.__durationTime;
			this.tickProgress(this.timep,this.timep);
		}
	}
	,tickProgress: function(timePercent,tickPercent) {
		if(tickPercent == null) tickPercent = 0;
		if(timePercent == null) timePercent = 0;
	}
	,newSelf: function() {
		return new lovedna.motion.LMotion();
	}
	,get_pause: function() {
		return this._pause;
	}
	,set_pause: function(value) {
		return this._pause = value;
	}
	,get_timeScale: function() {
		return this._timeScale;
	}
	,set_timeScale: function(value) {
		if(value < 0) value = 0;
		this.__durationTime = this.__time * value;
		this.__timeScaleOffset = this._timeOffset * value;
		return this._timeScale = value;
	}
	,get_timeOffset: function() {
		return this._timeOffset;
	}
	,set_timeOffset: function(value) {
		if(value > 1) value = 1;
		if(value < -1) value = -1;
		this.__timeOffset = value * this.__durationTime;
		this.__timeScaleOffset = value * this._timeScale;
		return this._timeOffset = value;
	}
	,__class__: lovedna.motion.LMotion
	,__properties__: {set_timeOffset:"set_timeOffset",get_timeOffset:"get_timeOffset",set_timeScale:"set_timeScale",get_timeScale:"get_timeScale",set_pause:"set_pause",get_pause:"get_pause"}
};
lovedna.net.BaseQueue = function(queueMax) {
	if(queueMax == null) queueMax = 2;
	this._nextLoadTime = 0;
	if(queueMax < 1) queueMax = 1;
	if(queueMax > 30) queueMax = 30;
	this._queueMax = queueMax;
	this._priorityIndex = 0;
	this._queueCount = 0;
	this._requestList = new Array();
	this._hasLoadMap = new haxe.ds.StringMap();
	this._count = 0;
	this._update = false;
	this._sortDelay = new lovedna.utils.tick.Delay();
	this._sortDelay.setCompleteHandler($bind(this,this.timerhandler));
	this._nextDelay = new lovedna.utils.tick.Delay();
	this._nextDelay.setCompleteHandler($bind(this,this.delayNextLoadHandler));
	this._loaders = [];
};
$hxClasses["lovedna.net.BaseQueue"] = lovedna.net.BaseQueue;
lovedna.net.BaseQueue.__name__ = ["lovedna","net","BaseQueue"];
lovedna.net.BaseQueue.prototype = {
	load: function(request,priority,userdata,loadtype) {
		if(priority == null) priority = -1;
		if(request != null) {
			var newrequest;
			var url;
			if(js.Boot.__instanceof(request,openfl.net.URLRequest)) {
				newrequest = request;
				url = newrequest.url;
			} else if(typeof(request) == "string") {
				url = request;
				newrequest = new openfl.net.URLRequest(url);
			} else return;
			if(url != null && url.length > 0) {
				if(!this._hasLoadMap.exists(url)) {
					this._hasLoadMap.set(url,true);
					if(priority == null) priority = -1;
					if(priority < 0) {
						this._priorityIndex--;
						priority = this._priorityIndex;
					}
					var sort = new lovedna.net.SortRequest(newrequest,priority,userdata,loadtype);
					this._requestList.push(sort);
					this._update = true;
					this._count = this._requestList.length;
					if(!this._sortDelay.running) this._sortDelay.start(1);
				}
			}
		}
	}
	,setPriority: function(url,priority) {
		var len = this._requestList.length;
		while(len-- > 0) {
			var sort = this._requestList[len];
			if(sort.request.url.indexOf(url) == 0) sort.priority = priority;
		}
		if(!this._sortDelay.running) this._sortDelay.start(1);
	}
	,dispose: function() {
		this._StartHandler = null;
		this._ErrorHandler = null;
		this._CompleteHandler = null;
		this._ProgressHandler = null;
		this._queueCount = 0;
		this._requestList = null;
		this._hasLoadMap = null;
		this._sortDelay.dispose();
		this._nextDelay.dispose();
	}
	,stop: function() {
	}
	,setStartHandler: function(handler) {
		this._StartHandler = handler;
	}
	,setErrorHandler: function(handler) {
		this._ErrorHandler = handler;
	}
	,setProgressHandler: function(handler) {
		this._ProgressHandler = handler;
	}
	,setTotalProgressHandler: function(handler) {
		this._totalProgressHandler = handler;
	}
	,setCompleteHandler: function(handler) {
		this._CompleteHandler = handler;
	}
	,get_count: function() {
		return this._count;
	}
	,createLoader: function() {
		throw "override methods";
		return null;
	}
	,loadFromLocal: function(request,userdata) {
	}
	,getEventLoader: function(e) {
		if(js.Boot.__instanceof(e.target,lovedna.net.IQueueLoader)) return e.target;
		return null;
	}
	,loadComplete: function(loader) {
		throw "override methods";
	}
	,timerhandler: function() {
		if(this._update) this._requestList.sort($bind(this,this.sort));
		this._update = false;
		this.loadNext();
	}
	,sort: function(x,y) {
		if(js.Boot.__instanceof(x.priority,Int) && js.Boot.__instanceof(y.priority,Int)) return lovedna.utils.MathUtil.sign(x.priority - y.priority);
		return 0;
	}
	,getLoader: function() {
		if(this._queueCount < this._queueMax) {
			var loader = this.createLoader();
			this._queueCount++;
			this.addEvent(loader,true);
			return loader;
		}
		return null;
	}
	,delayNextLoadHandler: function() {
		this.loadNext();
	}
	,loadNext: function() {
		if(this._requestList == null) return;
		if(this._requestList.length == 0) {
			this._priorityIndex = 0;
			this._hasLoadMap = new haxe.ds.StringMap();
		} else if(this._queueCount < this._queueMax) {
			if(this._requestList == null) this._hasLoadMap = new haxe.ds.StringMap(); else {
				var r = this._requestList[this._requestList.length - 1];
				if(r != null) {
					var request = r.request;
					if(request != null) {
						var url = request.url;
						var http = lovedna.utils.PathUtil.isHttp(url);
						var type = r.type;
						if(http || type == lovedna.net.LoadType.NET) {
							var loader = this.getLoader();
							loader.setUserData(r.data);
							if(loader != null) {
								this._requestList.pop();
								if(this._StartHandler != null) this._StartHandler(loader);
								loader.startLoad(request);
								this.loadNext();
							}
						} else if(type == lovedna.net.LoadType.LOCAL) {
							this._requestList.pop();
							this._count = this._requestList.length;
							this.loadFromLocal(request,r.data);
							if(this._nextLoadTime > 0) this._nextDelay.start(this._nextLoadTime); else this.loadNext();
						}
					}
				}
			}
		}
	}
	,addEvent: function(target,add) {
		if(add == null) add = true;
		if(target != null) {
			var id = Lambda.indexOf(this._loaders,target);
			if(add) {
				target.getDispather().addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.completeHandler));
				target.getDispather().addEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.ioHandler));
				target.getDispather().addEventListener(openfl.events.ProgressEvent.PROGRESS,$bind(this,this.progressHandler));
				target.getDispather().addEventListener(openfl.events.SecurityErrorEvent.SECURITY_ERROR,$bind(this,this.securityHandler));
				if(id == -1) this._loaders.push(target);
			} else {
				target.getDispather().removeEventListener(openfl.events.Event.COMPLETE,$bind(this,this.completeHandler));
				target.getDispather().removeEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.ioHandler));
				target.getDispather().removeEventListener(openfl.events.ProgressEvent.PROGRESS,$bind(this,this.progressHandler));
				target.getDispather().removeEventListener(openfl.events.SecurityErrorEvent.SECURITY_ERROR,$bind(this,this.securityHandler));
				if(id != -1) this._loaders.splice(id,1);
				target.dispose();
			}
		}
	}
	,completeHandler: function(e) {
		var loader = this.getEventLoader(e);
		if(this._CompleteHandler != null) {
			this.loadComplete(loader);
			this._CompleteHandler(loader);
		}
		this.finish(loader);
	}
	,ioHandler: function(e) {
		var loader = this.getEventLoader(e);
		loader.setLoadProgress(-1,-1);
		if(this._ErrorHandler != null) this._ErrorHandler(loader);
		this.finish(loader);
	}
	,progressHandler: function(e) {
		if(this._ProgressHandler != null) {
			var loader = this.getEventLoader(e);
			loader.setLoadProgress(e.bytesLoaded,e.bytesTotal);
			this._ProgressHandler(loader);
		}
		if(this._totalProgressHandler != null) {
			var len = this._loaders.length;
			var loaded = 0;
			var total = 0;
			while(len-- > 0) {
				loaded += this._loaders[len].getBytesLoaded();
				total += this._loaders[len].getBytesTotal();
			}
			this._totalProgressHandler(loaded,total);
		}
	}
	,securityHandler: function(e) {
		var loader = this.getEventLoader(e);
		if(this._ErrorHandler != null) this._ErrorHandler(loader);
		this.finish(loader);
	}
	,finish: function(loader) {
		if(loader != null) {
			this.addEvent(loader,false);
			var url = loader.getURL();
			if(this._hasLoadMap != null) {
				if(this._hasLoadMap.exists(url)) this._hasLoadMap.remove(url);
				this._count = this._requestList.length;
				this._queueCount--;
				if(this._nextLoadTime > 0) this._nextDelay.start(this._nextLoadTime); else this.loadNext();
			}
		}
	}
	,__class__: lovedna.net.BaseQueue
	,__properties__: {get_count:"get_count"}
};
lovedna.net.SortRequest = function(request,priority,data,type) {
	this.request = request;
	this.priority = priority;
	this.data = data;
	if(type == null) type = lovedna.net.LoadType.AUTO;
	this.type = type;
};
$hxClasses["lovedna.net.SortRequest"] = lovedna.net.SortRequest;
lovedna.net.SortRequest.__name__ = ["lovedna","net","SortRequest"];
lovedna.net.SortRequest.prototype = {
	__class__: lovedna.net.SortRequest
};
lovedna.net.IQueueLoader = function() { };
$hxClasses["lovedna.net.IQueueLoader"] = lovedna.net.IQueueLoader;
lovedna.net.IQueueLoader.__name__ = ["lovedna","net","IQueueLoader"];
lovedna.net.IQueueLoader.prototype = {
	__class__: lovedna.net.IQueueLoader
};
lovedna.net.LocalCache = function(name) {
	if(name == null) name = "local";
	if(name == "") name = "local";
	this._fail = false;
	this._map = new haxe.ds.StringMap();
	this._delay = new lovedna.utils.tick.Delay();
	this._delay.setCompleteHandler($bind(this,this.delaySave));
	this._sharedObject = openfl.net.SharedObject.getLocal(name,"/");
	if(this._sharedObject == null) return;
	this._sharedObject.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.completehandler));
};
$hxClasses["lovedna.net.LocalCache"] = lovedna.net.LocalCache;
lovedna.net.LocalCache.__name__ = ["lovedna","net","LocalCache"];
lovedna.net.LocalCache.prototype = {
	completehandler: function(e) {
		haxe.Log.trace("complete",{ fileName : "LocalCache.hx", lineNumber : 51, className : "lovedna.net.LocalCache", methodName : "completehandler"});
	}
	,dispose: function() {
		if(this._sharedObject == null) return;
		this._sharedObject = null;
	}
	,addCache: function(name,data) {
		if(this._sharedObject == null) return false;
		this._sharedObject.data[name] = data;
		try {
			var result = this._sharedObject.flush();
			if(result == openfl.net.SharedObjectFlushStatus.PENDING) {
				if(!this._map.exists(name)) {
					var value = data;
					this._map.set(name,value);
				}
				if(!this._delay.running) this._delay.start(3000);
				return false;
			} else if(result == openfl.net.SharedObjectFlushStatus.FLUSHED) {
				this._map.remove(name);
				return true;
			}
		} catch( e ) {
		}
		return false;
	}
	,getCache: function(name) {
		if(this._sharedObject == null) return null;
		return Reflect.field(this._sharedObject.data,name);
	}
	,clear: function() {
		if(this._sharedObject == null) return;
		this._sharedObject.clear();
		this._sharedObject.flush();
	}
	,delaySave: function() {
		if(this._fail) return;
		var keys = this._map.iterator();
		while(keys.hasNext()) {
			var key = keys.next();
			if(!this.addCache(key,this._map.get(key))) {
				if(!this._delay.running) this._delay.start(3000);
				return;
			}
		}
	}
	,__class__: lovedna.net.LocalCache
};
lovedna.net.QueueDataLoader = function(queueMax) {
	if(queueMax == null) queueMax = 2;
	lovedna.net.BaseQueue.call(this,queueMax);
};
$hxClasses["lovedna.net.QueueDataLoader"] = lovedna.net.QueueDataLoader;
lovedna.net.QueueDataLoader.__name__ = ["lovedna","net","QueueDataLoader"];
lovedna.net.QueueDataLoader.__super__ = lovedna.net.BaseQueue;
lovedna.net.QueueDataLoader.prototype = $extend(lovedna.net.BaseQueue.prototype,{
	loadComplete: function(loader) {
		var loader1 = loader;
		if(loader1 != null) loader1.setContent(loader1.data);
	}
	,loadFromLocal: function(request,userdata) {
		var url = request.url;
		var loader = this.createLoader();
		loader.startLoad(request,false);
		loader.setUserData(userdata);
		if(!openfl.Assets.exists(url,openfl.AssetType.BINARY)) {
			haxe.Log.trace("not exists " + url,{ fileName : "QueueDataLoader.hx", lineNumber : 46, className : "lovedna.net.QueueDataLoader", methodName : "loadFromLocal"});
			if(this._ErrorHandler != null) this._ErrorHandler(loader);
			return;
		}
		var data = openfl.Assets.getBytes(url);
		loader.setContent(data);
		if(data != null) {
			var size = data.length;
			loader.setLoadProgress(size,size);
			if(this._ProgressHandler != null) this._ProgressHandler(loader);
			if(this._CompleteHandler != null) this._CompleteHandler(loader);
		} else if(this._ErrorHandler != null) this._ErrorHandler(loader);
	}
	,createLoader: function() {
		return new lovedna.net.loaders.DataLoader();
	}
	,__class__: lovedna.net.QueueDataLoader
});
lovedna.net.QueueImageLoader = function(queueMax) {
	if(queueMax == null) queueMax = 2;
	lovedna.net.BaseQueue.call(this,queueMax);
};
$hxClasses["lovedna.net.QueueImageLoader"] = lovedna.net.QueueImageLoader;
lovedna.net.QueueImageLoader.__name__ = ["lovedna","net","QueueImageLoader"];
lovedna.net.QueueImageLoader.__super__ = lovedna.net.BaseQueue;
lovedna.net.QueueImageLoader.prototype = $extend(lovedna.net.BaseQueue.prototype,{
	createLoader: function() {
		return new lovedna.net.loaders.ImageLoader();
	}
	,loadFromLocal: function(request,userdata) {
		var url = request.url;
		var loader = this.createLoader();
		loader.setUserData(userdata);
		loader.startLoad(request,false);
		if(!openfl.Assets.exists(url,openfl.AssetType.IMAGE)) {
			haxe.Log.trace("not exists " + url,{ fileName : "QueueImageLoader.hx", lineNumber : 80, className : "lovedna.net.QueueImageLoader", methodName : "loadFromLocal"});
			if(this._ErrorHandler != null) this._ErrorHandler(loader);
			return;
		}
		var bmd = openfl.Assets.getBitmapData(url);
		loader.setContent(bmd);
		loader.setLoadProgress(1,1);
		if(bmd != null) {
			if(this._CompleteHandler != null) this._CompleteHandler(loader);
		} else if(this._ErrorHandler != null) this._ErrorHandler(loader);
		loader = null;
		bmd = null;
	}
	,getEventLoader: function(e) {
		var info = e.target;
		if(info != null) return info.loader;
		return null;
	}
	,loadComplete: function(loader) {
		var loader1 = loader;
		if(loader1 != null) {
			var bm = loader1.content;
			if(bm != null) loader1.setContent(bm.bitmapData);
		}
	}
	,__class__: lovedna.net.QueueImageLoader
});
lovedna.net.QueueSoundLoader = function(queueMax) {
	if(queueMax == null) queueMax = 1;
	lovedna.net.BaseQueue.call(this,queueMax);
};
$hxClasses["lovedna.net.QueueSoundLoader"] = lovedna.net.QueueSoundLoader;
lovedna.net.QueueSoundLoader.__name__ = ["lovedna","net","QueueSoundLoader"];
lovedna.net.QueueSoundLoader.__super__ = lovedna.net.BaseQueue;
lovedna.net.QueueSoundLoader.prototype = $extend(lovedna.net.BaseQueue.prototype,{
	createLoader: function() {
		return new lovedna.net.loaders.SoundLoader();
	}
	,loadFromLocal: function(request,userdata) {
		var url = request.url;
		var loader = this.createLoader();
		loader.setUserData(userdata);
		loader.startLoad(request,false);
		if(!openfl.Assets.exists(url,openfl.AssetType.SOUND)) {
			haxe.Log.trace("not exists " + url,{ fileName : "QueueSoundLoader.hx", lineNumber : 45, className : "lovedna.net.QueueSoundLoader", methodName : "loadFromLocal"});
			if(this._ErrorHandler != null) this._ErrorHandler(loader);
			return;
		}
		var sound = openfl.Assets.getSound(url);
		loader.setContent(sound);
		if(sound != null) {
			if(this._CompleteHandler != null) this._CompleteHandler(loader);
		} else if(this._ErrorHandler != null) this._ErrorHandler(loader);
		loader = null;
		sound = null;
	}
	,loadComplete: function(loader) {
	}
	,__class__: lovedna.net.QueueSoundLoader
});
openfl.net = {};
openfl.net.URLLoader = function(request) {
	openfl.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(openfl.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["openfl.net.URLLoader"] = openfl.net.URLLoader;
openfl.net.URLLoader.__name__ = ["openfl","net","URLLoader"];
openfl.net.URLLoader.__super__ = openfl.events.EventDispatcher;
openfl.net.URLLoader.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	close: function() {
	}
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,openfl.utils.ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,openfl.net.URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = openfl.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new openfl.events.Event(openfl.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new openfl.events.Event(openfl.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new openfl.events.ProgressEvent(openfl.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new openfl.events.SecurityErrorEvent(openfl.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var evt = new openfl.events.HTTPStatusEvent(openfl.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == openfl.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = openfl.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: openfl.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
lovedna.net.loaders = {};
lovedna.net.loaders.DataLoader = function() {
	openfl.net.URLLoader.call(this);
	this.set_dataFormat(openfl.net.URLLoaderDataFormat.BINARY);
};
$hxClasses["lovedna.net.loaders.DataLoader"] = lovedna.net.loaders.DataLoader;
lovedna.net.loaders.DataLoader.__name__ = ["lovedna","net","loaders","DataLoader"];
lovedna.net.loaders.DataLoader.__interfaces__ = [lovedna.net.IQueueLoader];
lovedna.net.loaders.DataLoader.__super__ = openfl.net.URLLoader;
lovedna.net.loaders.DataLoader.prototype = $extend(openfl.net.URLLoader.prototype,{
	getDispather: function() {
		return this;
	}
	,startLoad: function(request,load) {
		if(load == null) load = true;
		this._bytesLoaded = 0;
		this._bytesTotal = -1;
		if(request != null) {
			this._request = request;
			this._url = request.url;
			if(load) {
				if(request.data != null) this._content = request.data;
				try {
					openfl.net.URLLoader.prototype.load.call(this,request);
				} catch( e ) {
					if( js.Boot.__instanceof(e,openfl.errors.Error) ) {
						this.dispatchEvent(new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR));
					} else throw(e);
				}
			}
		}
	}
	,getURL: function() {
		return this._url;
	}
	,getContent: function() {
		return this._content;
	}
	,setContent: function(value) {
		this._content = value;
	}
	,dispose: function() {
		this._userData = null;
		this._content = null;
	}
	,setUserData: function(value) {
		this._userData = value;
	}
	,getUserData: function() {
		return this._userData;
	}
	,getLoadType: function() {
		return this._loadType;
	}
	,setLoadType: function(value) {
		this._loadType = value;
	}
	,setLoadProgress: function(loaded,total) {
		if(loaded > this._bytesLoaded) this._bytesLoaded = loaded;
		this._bytesTotal = total;
	}
	,getBytesLoaded: function() {
		return this._bytesLoaded;
	}
	,getBytesTotal: function() {
		return this._bytesTotal;
	}
	,getBytes: function() {
		if(this.dataFormat == openfl.net.URLLoaderDataFormat.BINARY) return this.data; else {
			var ba = new openfl.utils.ByteArray();
			ba.writeUTFBytes(this.data);
			ba.position = 0;
			return ba;
		}
	}
	,__class__: lovedna.net.loaders.DataLoader
});
openfl.display.Loader = function() {
	openfl.display.Sprite.call(this);
	this.contentLoaderInfo = openfl.display.LoaderInfo.create(this);
};
$hxClasses["openfl.display.Loader"] = openfl.display.Loader;
openfl.display.Loader.__name__ = ["openfl","display","Loader"];
openfl.display.Loader.__super__ = openfl.display.Sprite;
openfl.display.Loader.prototype = $extend(openfl.display.Sprite.prototype,{
	load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		if(request.contentType == null && request.contentType != "") switch(extension) {
		case "swf":
			this.contentLoaderInfo.contentType = "application/x-shockwave-flash";
			break;
		case "jpg":case "jpeg":
			transparent = false;
			this.contentLoaderInfo.contentType = "image/jpeg";
			break;
		case "png":
			this.contentLoaderInfo.contentType = "image/png";
			break;
		case "gif":
			this.contentLoaderInfo.contentType = "image/gif";
			break;
		default:
			this.contentLoaderInfo.contentType = "application/x-www-form-urlencoded";
		} else this.contentLoaderInfo.contentType = request.contentType;
		openfl.display.BitmapData.fromFile(request.url,$bind(this,this.BitmapData_onLoad),$bind(this,this.BitmapData_onError));
	}
	,loadBytes: function(buffer) {
		openfl.display.BitmapData.fromBytes(buffer,null,$bind(this,this.BitmapData_onLoad));
	}
	,unload: function() {
		if(this.get_numChildren() > 0) {
			while(this.get_numChildren() > 0) this.removeChildAt(0);
			this.content = null;
			this.contentLoaderInfo.url = null;
			this.contentLoaderInfo.contentType = null;
			this.contentLoaderInfo.content = null;
			this.contentLoaderInfo.bytesLoaded = 0;
			this.contentLoaderInfo.bytesTotal = 0;
			this.contentLoaderInfo.width = 0;
			this.contentLoaderInfo.height = 0;
			var event = new openfl.events.Event(openfl.events.Event.UNLOAD);
			event.currentTarget = this;
			this.dispatchEvent(event);
		}
	}
	,BitmapData_onLoad: function(bitmapData) {
		this.contentLoaderInfo.content = new openfl.display.Bitmap(bitmapData);
		this.content = this.contentLoaderInfo.content;
		this.addChild(this.contentLoaderInfo.content);
		var event = new openfl.events.Event(openfl.events.Event.COMPLETE);
		event.target = this.contentLoaderInfo;
		event.currentTarget = this.contentLoaderInfo;
		this.contentLoaderInfo.dispatchEvent(event);
	}
	,BitmapData_onError: function() {
		var event = new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR);
		event.target = this.contentLoaderInfo;
		event.currentTarget = this.contentLoaderInfo;
		this.contentLoaderInfo.dispatchEvent(event);
	}
	,__class__: openfl.display.Loader
});
lovedna.net.loaders.ImageLoader = function() {
	openfl.display.Loader.call(this);
};
$hxClasses["lovedna.net.loaders.ImageLoader"] = lovedna.net.loaders.ImageLoader;
lovedna.net.loaders.ImageLoader.__name__ = ["lovedna","net","loaders","ImageLoader"];
lovedna.net.loaders.ImageLoader.__interfaces__ = [lovedna.net.IQueueLoader];
lovedna.net.loaders.ImageLoader.__super__ = openfl.display.Loader;
lovedna.net.loaders.ImageLoader.prototype = $extend(openfl.display.Loader.prototype,{
	getDispather: function() {
		return this.contentLoaderInfo;
	}
	,startLoad: function(request,load) {
		if(load == null) load = true;
		this._bytesLoaded = 0;
		this._bytesTotal = -1;
		if(request != null) {
			this._request = request;
			this._url = request.url;
			if(load) {
				if(request.data != null) {
					this._content = request.data;
					if(js.Boot.__instanceof(request.data,openfl.utils.ByteArray)) {
						var bytes = request.data;
						this._bytesTotal = this._bytesLoaded = bytes.length;
						this.loadBytes(bytes);
						return;
					}
				}
				try {
					openfl.display.Loader.prototype.load.call(this,request);
				} catch( e ) {
					if( js.Boot.__instanceof(e,openfl.errors.Error) ) {
						this.dispatchEvent(new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR));
					} else throw(e);
				}
			}
		}
	}
	,getURL: function() {
		return this._url;
	}
	,getContent: function() {
		return this._content;
	}
	,setContent: function(value) {
		this._content = value;
	}
	,dispose: function() {
		this._request = null;
		this._userData = null;
		this._content = null;
	}
	,setUserData: function(value) {
		this._userData = value;
	}
	,getUserData: function() {
		return this._userData;
	}
	,getLoadType: function() {
		return this._loadType;
	}
	,setLoadType: function(value) {
		this._loadType = value;
	}
	,setLoadProgress: function(loaded,total) {
		if(loaded > this._bytesLoaded) this._bytesLoaded = loaded;
		this._bytesTotal = total;
	}
	,getBytesLoaded: function() {
		return this._bytesLoaded;
	}
	,getBytesTotal: function() {
		return this._bytesTotal;
	}
	,getBytes: function() {
		if(this._request != null) {
			if(js.Boot.__instanceof(this._request.data,openfl.utils.ByteArray)) return this._request.data;
		}
		return null;
		return null;
	}
	,__class__: lovedna.net.loaders.ImageLoader
});
lovedna.net.loaders.SoundLoader = function() {
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["lovedna.net.loaders.SoundLoader"] = lovedna.net.loaders.SoundLoader;
lovedna.net.loaders.SoundLoader.__name__ = ["lovedna","net","loaders","SoundLoader"];
lovedna.net.loaders.SoundLoader.__interfaces__ = [lovedna.net.IQueueLoader];
lovedna.net.loaders.SoundLoader.__super__ = openfl.events.EventDispatcher;
lovedna.net.loaders.SoundLoader.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	getDispather: function() {
		return this;
	}
	,startLoad: function(request,load) {
		if(load == null) load = true;
		this._bytesLoaded = this._bytesTotal = 0;
		if(request != null) {
			this._request = request;
			this._url = request.url;
			if(load) {
				this._sound = new openfl.media.Sound();
				this._sound.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.sound_complete));
				this._sound.addEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.sound_ioError));
				this._sound.load(request);
			}
		}
	}
	,sound_complete: function(e) {
		this._disposeSound();
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,sound_ioError: function(e) {
		haxe.Log.trace("sound error " + this._url,{ fileName : "SoundLoader.hx", lineNumber : 78, className : "lovedna.net.loaders.SoundLoader", methodName : "sound_ioError"});
		this._disposeSound();
		this.dispatchEvent(e);
	}
	,getURL: function() {
		return this._url;
	}
	,getContent: function() {
		return this._sound;
	}
	,setContent: function(value) {
		if(js.Boot.__instanceof(value,openfl.media.Sound)) {
			this._disposeSound();
			this._sound = value;
		}
	}
	,dispose: function() {
		this._disposeSound();
		this._sound = null;
	}
	,setUserData: function(value) {
		this._userData = value;
	}
	,getUserData: function() {
		return this._userData;
	}
	,getLoadType: function() {
		return this._loadType;
	}
	,setLoadType: function(value) {
		this._loadType = value;
	}
	,setLoadProgress: function(loaded,total) {
		this._bytesLoaded = loaded;
		this._bytesTotal = total;
	}
	,getBytesLoaded: function() {
		return this._bytesLoaded;
	}
	,getBytesTotal: function() {
		return this._bytesTotal;
	}
	,getBytes: function() {
		return null;
	}
	,_disposeSound: function() {
		if(this._sound != null) {
			this._sound.removeEventListener(openfl.events.Event.COMPLETE,$bind(this,this.sound_complete));
			this._sound.removeEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.sound_ioError));
		}
	}
	,__class__: lovedna.net.loaders.SoundLoader
});
lovedna.net.storage = {};
lovedna.net.storage.Storage = function(pathId) {
	if(pathId == null) pathId = -1;
	this.reset(pathId);
};
$hxClasses["lovedna.net.storage.Storage"] = lovedna.net.storage.Storage;
lovedna.net.storage.Storage.__name__ = ["lovedna","net","storage","Storage"];
lovedna.net.storage.Storage.getFullPath = function(type) {
	var path = "";
	return path;
};
lovedna.net.storage.Storage.prototype = {
	reset: function(pathId) {
		if(pathId == null) pathId = -1;
		if(pathId >= 0 && pathId < 5) {
		} else pathId = 0;
		this._rootPath = lovedna.net.storage.Storage.getFullPath(pathId);
		this._path = "";
	}
	,setAbsPath: function(path) {
		this._rootPath = path;
		this._path = "";
	}
	,getPath: function(value) {
		var path = this._rootPath;
		if(this._path != "") path += "/" + this._path;
		if(value != "") path += "/" + value;
		return path;
	}
	,cd: function(path) {
		var last = HxOverrides.substr(path,path.length - 1,null);
		if(last == "/" || last == "\\") path = HxOverrides.substr(path,0,path.length - 1);
		if(!this.exists(path)) this.createDirectory(path);
		this._path = path;
	}
	,getStoragePath: function() {
		return this._rootPath + "/" + this._path;
	}
	,getBytes: function(path) {
		return null;
	}
	,saveBytes: function(path,bytes) {
	}
	,getContent: function(path) {
		return null;
	}
	,saveContent: function(path,content) {
	}
	,copy: function(src,dst) {
	}
	,createDirectory: function(path) {
		return path;
	}
	,deleteDirectory: function(path) {
	}
	,deleteFile: function(path) {
	}
	,exists: function(path) {
		return false;
	}
	,isDirectory: function(path) {
		return false;
	}
	,readDirectory: function(path) {
		return null;
	}
	,rename: function(path,newpath) {
	}
	,getByteArray: function(bytes) {
		return null;
	}
	,getAbsPath: function(path) {
		return path;
	}
	,__class__: lovedna.net.storage.Storage
};
lovedna.rtti = {};
lovedna.rtti.Description = function() {
	this._metaNameMap = new haxe.ds.StringMap();
};
$hxClasses["lovedna.rtti.Description"] = lovedna.rtti.Description;
lovedna.rtti.Description.__name__ = ["lovedna","rtti","Description"];
lovedna.rtti.Description._desc = null;
lovedna.rtti.Description.getDescription = function(value) {
	var qcn = lovedna.rtti.Description.getQCN(value);
	if(lovedna.rtti.Description._desc == null) lovedna.rtti.Description._desc = new haxe.ds.StringMap();
	if(lovedna.rtti.Description._desc.exists(qcn)) return lovedna.rtti.Description._desc.get(qcn);
	var typeMeta = haxe.rtti.Meta.getType(value);
	if(typeMeta != null) {
		var fieldsMeta = lovedna.rtti.Description.getFields(value);
		var desc = new lovedna.rtti.Description();
		desc.parse(fieldsMeta);
		lovedna.rtti.Description._desc.set(qcn,desc);
		return desc;
	}
	return null;
};
lovedna.rtti.Description.getQCN = function(value) {
	var fqcn;
	if(typeof(value) == "string") return js.Boot.__cast(value , String);
	return Type.getClassName(lovedna.rtti.Description.getClass(value));
};
lovedna.rtti.Description.getClass = function(value) {
	if(js.Boot.__instanceof(value,Class)) return value;
	if(typeof(value) == "string") return Type.resolveClass(Std.string(value));
	return Type.getClass(value);
};
lovedna.rtti.Description.getFields = function(type) {
	var meta = { };
	while(type != null) {
		var typeMeta = haxe.rtti.Meta.getFields(type);
		var _g = 0;
		var _g1 = Reflect.fields(typeMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			Reflect.setField(meta,field,Reflect.field(typeMeta,field));
		}
		type = Type.getSuperClass(type);
	}
	return meta;
};
lovedna.rtti.Description.prototype = {
	getMetaList: function() {
		return this._metaNameMap.iterator();
	}
	,parse: function(fieldsMeta) {
		if(fieldsMeta == null) return;
		var list = Reflect.fields(fieldsMeta);
		var len = list.length;
		while(len-- > 0) {
			var key = list[len];
			var fieldMeta = Reflect.field(fieldsMeta,key);
			var data = new lovedna.rtti.MetaData();
			data.parse(fieldMeta);
			if(data.get_name() != null) {
				var key1 = data.get_name();
				this._metaNameMap.set(key1,data);
			}
		}
	}
	,__class__: lovedna.rtti.Description
};
lovedna.rtti.MetaConfig = function() {
};
$hxClasses["lovedna.rtti.MetaConfig"] = lovedna.rtti.MetaConfig;
lovedna.rtti.MetaConfig.__name__ = ["lovedna","rtti","MetaConfig"];
lovedna.rtti.MetaConfig._keys = null;
lovedna.rtti.MetaConfig.isSystem = function(name) {
	if(lovedna.rtti.MetaConfig._keys == null) {
		lovedna.rtti.MetaConfig._keys = new haxe.ds.StringMap();
		lovedna.rtti.MetaConfig._keys.set("*a",true);
		lovedna.rtti.MetaConfig._keys.set("*t",true);
		lovedna.rtti.MetaConfig._keys.set("*n",true);
	}
	return lovedna.rtti.MetaConfig._keys.exists(name);
};
lovedna.rtti.MetaConfig.prototype = {
	__class__: lovedna.rtti.MetaConfig
};
lovedna.rtti.MetaData = function() {
	this._metaList = new Array();
	this._metaArgs = new haxe.ds.StringMap();
};
$hxClasses["lovedna.rtti.MetaData"] = lovedna.rtti.MetaData;
lovedna.rtti.MetaData.__name__ = ["lovedna","rtti","MetaData"];
lovedna.rtti.MetaData.prototype = {
	getArg: function(key) {
		if(this.hasKey(key)) return this._metaArgs.get(key);
		return "";
	}
	,getFunArg: function() {
		return this._funArgs;
	}
	,hasKey: function(key) {
		return this._metaArgs.exists(key);
	}
	,parse: function(fieldMeta) {
		var type = Reflect.field(fieldMeta,"*t");
		if(type != null) {
			this._type = type[type.length - 1];
			var name = Reflect.field(fieldMeta,"*n");
			this._funArgs = Reflect.field(fieldMeta,"*f");
			this._name = name[name.length - 1];
			var _g = 0;
			var _g1 = Reflect.fields(fieldMeta);
			while(_g < _g1.length) {
				var key = _g1[_g];
				++_g;
				if(lovedna.rtti.MetaConfig.isSystem(key)) continue;
				var value = Reflect.field(fieldMeta,key);
				var arg = "";
				if(value != null) {
					if(value.length > 0) arg = value[value.length - 1];
				}
				this._metaList.push(key);
				this._metaArgs.set(key,arg);
			}
		}
	}
	,get_name: function() {
		return this._name;
	}
	,get_type: function() {
		return this._type;
	}
	,__class__: lovedna.rtti.MetaData
	,__properties__: {get_type:"get_type",get_name:"get_name"}
};
lovedna.utils.Array2 = function(width,height) {
	this._width = width;
	this._height = height;
	this._length = this._width * this._height;
	this._list = [];
};
$hxClasses["lovedna.utils.Array2"] = lovedna.utils.Array2;
lovedna.utils.Array2.__name__ = ["lovedna","utils","Array2"];
lovedna.utils.Array2.prototype = {
	fill: function(value) {
		var len = this._length;
		while(len-- > 0) this._list[len] = value;
	}
	,clear: function() {
		this._list = [];
	}
	,get: function(x,y) {
		return this._list[y * this._width + x];
	}
	,set: function(x,y,value) {
		this._list[y * this._width + x] = value;
	}
	,getFromIndex: function(index) {
		return this._list[index];
	}
	,setFromIndex: function(index,value) {
		this._list[index] = value;
	}
	,resize: function(width,height) {
		if(width != this._width || height != this._height) {
			var t = this._list;
			var minx = Std["int"](lovedna.utils.MathUtil.min(width,this._width));
			var miny = Std["int"](lovedna.utils.MathUtil.min(height,this._height));
			var _g = 0;
			while(_g < miny) {
				var y = _g++;
				var t1 = y * width;
				var t2 = y * this._width;
				var _g1 = 0;
				while(_g1 < minx) {
					var x = _g1++;
					this._list[t1 + x] = t[t2 + x];
				}
			}
			this._width = width;
			this._height = height;
			this._length = this._width * this._height;
		}
	}
	,getWidth: function() {
		return this._width;
	}
	,getHeight: function() {
		return this._height;
	}
	,getSize: function() {
		return this._length;
	}
	,inRange: function(x,y) {
		return x >= 0 && x < this._width && y >= 0 && y < this._height;
	}
	,getRow: function(y,output) {
		if(output == null) output = new Array();
		var offset = y * this._width;
		var _g1 = 0;
		var _g = this._width;
		while(_g1 < _g) {
			var x = _g1++;
			output[x] = this._list[offset + x];
		}
		return output;
	}
	,setRow: function(y,input) {
		if(input != null) {
			var offset = y * this._width;
			var _g1 = 0;
			var _g = this._width;
			while(_g1 < _g) {
				var x = _g1++;
				this._list[offset + x] = input[x];
			}
		}
	}
	,getCol: function(x,output) {
		if(output == null) output = new Array();
		var _g1 = 0;
		var _g = this._height;
		while(_g1 < _g) {
			var i = _g1++;
			output[i] = this._list[i * this._width + x];
		}
		return output;
	}
	,setCol: function(x,input) {
		if(input != null) {
			var _g1 = 0;
			var _g = this._height;
			while(_g1 < _g) {
				var y = _g1++;
				this._list[y * this._width + x] = input[y];
			}
		}
	}
	,getIndexFromPos: function(x,y) {
		return y * this._width + x;
	}
	,getX: function(index) {
		return index % this._width;
	}
	,getY: function(index) {
		return index / this._width | 0;
	}
	,__class__: lovedna.utils.Array2
};
lovedna.utils.BitArray = function(size) {
	if(size == null) size = 31;
	if(size < 0) size = 0;
	this._size = size;
	this._list = [];
	var len = (size / 31 | 0) + 1;
	this._length = len;
	while(len-- > 0) this._list.push(new lovedna.utils.BitField());
};
$hxClasses["lovedna.utils.BitArray"] = lovedna.utils.BitArray;
lovedna.utils.BitArray.__name__ = ["lovedna","utils","BitArray"];
lovedna.utils.BitArray.getIndex = function(value) {
	return value / 31 | 0;
};
lovedna.utils.BitArray.getUseCount = function(max) {
	if(max < 1) return 0;
	var count = (max / 31 | 0) + 1;
	if(max % 31 == 0) count--;
	return count;
};
lovedna.utils.BitArray.prototype = {
	open: function(value) {
		if(value >= 0) {
			if(value < this._size) {
				var id = value / 31 | 0;
				var v = this._list[id];
				v.open(value);
			}
		}
	}
	,close: function(value) {
		if(value >= 0) {
			if(value < this._size) {
				var id = value / 31 | 0;
				var v = this._list[id];
				v.close(value);
			}
		}
	}
	,hasOpen: function(value) {
		if(value >= 0) {
			if(value < this._size) {
				var id = value / 31 | 0;
				var v = this._list[id];
				return v.hasOpen(value);
			}
		}
		return false;
	}
	,getFields: function() {
		var lst = [];
		var _g1 = 0;
		var _g = this._length;
		while(_g1 < _g) {
			var i = _g1++;
			var v = this._list[i];
			lst.push(v.getValue());
		}
		return lst;
	}
	,parse: function(value,size) {
		if(size == null) size = 0;
		if(value != null) {
			var len = value.length;
			if(size < 1) size = len * 31;
			this._size = size;
			this._list = [];
			this._length = Math.ceil(size / 31);
			if(len < this._length) {
				var _g1 = 0;
				var _g = this._length - len;
				while(_g1 < _g) {
					var i = _g1++;
					value.push(0);
				}
			}
			var _g11 = 0;
			var _g2 = this._length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this._list.push(new lovedna.utils.BitField(value[i1]));
			}
		}
	}
	,get_size: function() {
		return this._size;
	}
	,__class__: lovedna.utils.BitArray
	,__properties__: {get_size:"get_size"}
};
lovedna.utils.BitField = function(value) {
	if(value == null) value = 0;
	this._value = value;
};
$hxClasses["lovedna.utils.BitField"] = lovedna.utils.BitField;
lovedna.utils.BitField.__name__ = ["lovedna","utils","BitField"];
lovedna.utils.BitField.prototype = {
	open: function(index) {
		this._value |= this.getKey(index);
		return this._value;
	}
	,close: function(index) {
		this._value &= ~this.getKey(index);
		return this._value;
	}
	,hasOpen: function(index) {
		var key = this.getKey(index);
		return (this._value & key) == key;
	}
	,getValue: function() {
		return this._value;
	}
	,exists: function(value) {
		return (this._value & value) == value;
	}
	,clear: function() {
		this._value = 0;
	}
	,setValue: function(value) {
		if(value >= 0) this._value = value;
	}
	,getKey: function(index) {
		index %= 31;
		return 1 << index;
	}
	,__class__: lovedna.utils.BitField
};
lovedna.utils.ByteArrayUtil = function() {
};
$hxClasses["lovedna.utils.ByteArrayUtil"] = lovedna.utils.ByteArrayUtil;
lovedna.utils.ByteArrayUtil.__name__ = ["lovedna","utils","ByteArrayUtil"];
lovedna.utils.ByteArrayUtil.BytesToByteArray = function(value) {
	return value.b;
};
lovedna.utils.ByteArrayUtil.ByteArrayToBytes = function(value) {
	return haxe.io.Bytes.ofData(value);
};
lovedna.utils.ByteArrayUtil.getCrc32 = function(data) {
	return haxe.crypto.Crc32.make(lovedna.utils.ByteArrayUtil.ByteArrayToBytes(data));
};
lovedna.utils.ByteArrayUtil.ByteArrayToString = function(value) {
	var b = lovedna.utils.ByteArrayUtil.ByteArrayToBytes(value);
	return b.toString();
};
lovedna.utils.ByteArrayUtil.StringToBytes = function(value) {
	return haxe.io.Bytes.ofString(value);
};
lovedna.utils.ByteArrayUtil.reloadByteArray = function(value) {
	var len = value.byteView.length;
	var ba = new openfl.utils.ByteArray();
	var bv = value.byteView;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		ba.writeByte(bv[i]);
	}
	ba.position = 0;
	return ba;
	return value;
};
lovedna.utils.ByteArrayUtil.FileToString = function(value) {
	return value.toString();
};
lovedna.utils.ByteArrayUtil.prototype = {
	__class__: lovedna.utils.ByteArrayUtil
};
lovedna.utils.BytesString = function(value) {
	if(value == null) value = "";
	this.ofString(value);
};
$hxClasses["lovedna.utils.BytesString"] = lovedna.utils.BytesString;
lovedna.utils.BytesString.__name__ = ["lovedna","utils","BytesString"];
lovedna.utils.BytesString.prototype = {
	getData: function() {
		var ba = new openfl.utils.ByteArray();
		var _g1 = 0;
		var _g = this._length;
		while(_g1 < _g) {
			var i = _g1++;
			ba.writeByte(this._bytes.b[i]);
		}
		if(this._length % 2 != 0) ba.writeByte(0);
		return ba;
	}
	,toString: function() {
		return this._bytes.toString();
	}
	,toHex: function() {
		return this._bytes.toHex();
	}
	,ofString: function(value) {
		if(value == null) value = "";
		if(value == null) value = "";
		try {
			this._bytes = haxe.io.Bytes.ofString(value);
		} catch( e ) {
			this._bytes = haxe.io.Bytes.ofString("");
		}
		this._input = new haxe.io.BytesInput(this._bytes);
		this._input.set_bigEndian(this._bigEndian);
		this._position = 0;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length;
	}
	,ofBytes: function(value) {
		if(value == null) value = haxe.io.Bytes.ofString("");
		this._bytes = value;
		this._input = new haxe.io.BytesInput(this._bytes);
		this._input.set_bigEndian(this._bigEndian);
		this._position = 0;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length;
	}
	,ofByteArray: function(value) {
		var pos = value.position;
		value.position = 0;
		this.ofString(value.readUTFBytes(value.length));
		value.position = pos;
	}
	,set: function(pos,value) {
		this._bytes.b[pos] = value & 255;
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
	}
	,get: function(pos) {
		return this._bytes.b[pos];
	}
	,clear: function() {
		this._position = 0;
		this._bytes = haxe.io.Bytes.alloc(0);
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
	}
	,readBytes: function(len) {
		if(this._bytesAvailable < len) throw haxe.io.Error.OutsideBounds;
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeBytes(this._bytes,this._position,len);
		var out = new lovedna.utils.BytesString();
		out.ofBytes(output.getBytes());
		this._position += len;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return out;
	}
	,writeBytes: function(input,len) {
		if(input._bytesAvailable < len) throw haxe.io.Error.OutsideBounds;
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		var bytes = input._bytes;
		output.writeBytes(bytes,input._position,len);
		this.writeUpdate(output);
	}
	,readByte: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readByte();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeByte: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeByte(value);
		this.writeUpdate(output);
	}
	,readFloat: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readFloat();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeFloat: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeFloat(value);
		this.writeUpdate(output);
	}
	,readDouble: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readDouble();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeDouble: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeDouble(value);
		this.writeUpdate(output);
	}
	,readInt8: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readInt8();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeInt8: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeInt8(value);
		this.writeUpdate(output);
	}
	,readInt16: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readInt16();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeInt16: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeInt16(value);
		this.writeUpdate(output);
	}
	,readInt32: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readInt32();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeInt32: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeInt32(value);
		this.writeUpdate(output);
	}
	,readUInt16: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readUInt16();
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeUInt16: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeUInt16(value);
		this.writeUpdate(output);
	}
	,readString: function(len) {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var c = this._input.readString(len);
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,writeString: function(value) {
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeString(value);
		this.writeUpdate(output);
	}
	,readUTF: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
		var len = this._input.readUInt16();
		var c = this._input.readString(len);
		this._position = this._input.pos;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return c;
	}
	,existsUTF: function() {
		var len = this._length - this._position;
		if(len < 2) return false;
		var bytes = this._bytes.sub(this._position,len);
		var input = new haxe.io.BytesInput(bytes);
		var stringlen = input.readUInt16();
		return len - 2 >= stringlen;
	}
	,writeUTF: function(value) {
		var t = new haxe.io.BytesOutput();
		t.set_bigEndian(this._bigEndian);
		t.writeString(value);
		var len = t.getBytes().length;
		var output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		output.writeUInt16(len);
		output.writeString(value);
		this.writeUpdate(output);
	}
	,getBytes: function() {
		return this._bytes;
	}
	,get_position: function() {
		return this._position;
	}
	,set_position: function(value) {
		if(value > this._length) throw haxe.io.Error.OutsideBounds;
		this._input.set_position(value);
		this._position = value;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
		return this._position;
	}
	,get_length: function() {
		return this._bytes.length;
	}
	,get_bytesAvailable: function() {
		return this._bytesAvailable;
	}
	,get_bigEndian: function() {
		return this._bigEndian;
	}
	,set_bigEndian: function(value) {
		this._input.set_bigEndian(value);
		return this._bigEndian = value;
	}
	,set_insert: function(value) {
		return this._insert = value;
	}
	,update: function() {
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
	}
	,writeUpdate: function(output) {
		var bytes = output.getBytes();
		var len = bytes.length;
		output = new haxe.io.BytesOutput();
		output.set_bigEndian(this._bigEndian);
		if(this._position > 0) output.writeBytes(this._bytes,0,this._position);
		output.writeBytes(bytes,0,len);
		if(this._insert) {
			output.writeBytes(this._bytes,this._position,this._length - this._position);
			this._position += len;
		} else {
			this._position += len;
			len = this._length - this._position;
			if(len > 0) output.writeBytes(this._bytes.sub(this._position,len),0,len);
		}
		this._bytes = output.getBytes();
		this._update = true;
		this._length = this._bytes.length;
		this._bytesAvailable = this._length - this._position;
	}
	,preRead: function() {
		if(this._update) {
			this._input = new haxe.io.BytesInput(this._bytes);
			this._input.set_bigEndian(this._bigEndian);
			this._input.set_position(this._position);
			this._update = false;
		}
	}
	,__class__: lovedna.utils.BytesString
	,__properties__: {set_insert:"set_insert",set_bigEndian:"set_bigEndian",get_bigEndian:"get_bigEndian",get_bytesAvailable:"get_bytesAvailable",get_length:"get_length",set_position:"set_position",get_position:"get_position"}
};
lovedna.utils.ColorUtil = function() {
};
$hxClasses["lovedna.utils.ColorUtil"] = lovedna.utils.ColorUtil;
lovedna.utils.ColorUtil.__name__ = ["lovedna","utils","ColorUtil"];
lovedna.utils.ColorUtil.getColorRGB = function(Red,Green,Blue) {
	return (Red & 255) << 16 | (Green & 255) << 8 | Blue & 255;
};
lovedna.utils.ColorUtil.getColorRGBA = function(Red,Green,Blue,Alpha) {
	if(Alpha == null) Alpha = 1.0;
	return (Math.floor(Alpha > 1?Alpha:Alpha * 255) & 255) << 24 | ((Red & 255) << 16 | (Green & 255) << 8 | Blue & 255);
};
lovedna.utils.ColorUtil.getAlpha = function(value) {
	return value >> 24 & 255;
};
lovedna.utils.ColorUtil.getRGB = function(value) {
	return (value >> 16 & 255 & 255) << 16 | (value >> 8 & 255 & 255) << 8 | value & 255 & 255;
};
lovedna.utils.ColorUtil.fromToByPercent = function(fromColor,toColor,percent) {
	if(percent == null) percent = 1;
	if(percent <= 0) return fromColor; else if(percent >= 1) return toColor; else {
		var a = fromColor >> 24 & 255;
		var r = fromColor >> 16 & 255;
		var g = fromColor >> 8 & 255;
		var b = fromColor & 255;
		var dA = (toColor >> 24 & 255) - a;
		var dR = (toColor >> 16 & 255) - r;
		var dG = (toColor >> 8 & 255) - g;
		var dB = (toColor & 255) - b;
		a += dA * percent | 0;
		r += dR * percent | 0;
		g += dG * percent | 0;
		b += dB * percent | 0;
		return a << 24 | r << 16 | g << 8 | b;
	}
};
lovedna.utils.ColorUtil.getColorHSV = function(h,s,v) {
	h = h * 360 | 0;
	var hi = Math.floor(h / 60) % 6;
	var f = h / 60 - Math.floor(h / 60);
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	switch(hi) {
	case 0:
		return (v * 255 | 0) << 16 | (t * 255 | 0) << 8 | (p * 255 | 0);
	case 1:
		return (q * 255 | 0) << 16 | (v * 255 | 0) << 8 | (p * 255 | 0);
	case 2:
		return (p * 255 | 0) << 16 | (v * 255 | 0) << 8 | (t * 255 | 0);
	case 3:
		return (p * 255 | 0) << 16 | (q * 255 | 0) << 8 | (v * 255 | 0);
	case 4:
		return (t * 255 | 0) << 16 | (p * 255 | 0) << 8 | (v * 255 | 0);
	case 5:
		return (v * 255 | 0) << 16 | (p * 255 | 0) << 8 | (q * 255 | 0);
	default:
		return 0;
	}
	return 0;
};
lovedna.utils.ColorUtil.prototype = {
	__class__: lovedna.utils.ColorUtil
};
lovedna.utils.Ease = function() { };
$hxClasses["lovedna.utils.Ease"] = lovedna.utils.Ease;
lovedna.utils.Ease.__name__ = ["lovedna","utils","Ease"];
lovedna.utils.Ease._nameMap = null;
lovedna.utils.Ease._nameList = null;
lovedna.utils.Ease.getEaseByName = function(name) {
	if(name == null) return null;
	var key = name.toLowerCase();
	return lovedna.utils.Ease._nameMap.get(key);
};
lovedna.utils.Ease.getEaseById = function(id) {
	return lovedna.utils.Ease._nameList[id];
};
lovedna.utils.Ease.linear = function(t) {
	return t;
};
lovedna.utils.Ease.sineIn = function(t) {
	if(t == 0) return 0; else if(t == 1) return 1; else return 1 - lovedna.utils.Ease.MathCos(t * 1.5707963267949);
};
lovedna.utils.Ease.sineOut = function(t) {
	if(t == 0) return 0; else if(t == 1) return 1; else return lovedna.utils.Ease.MathSin(t * 1.5707963267949);
};
lovedna.utils.Ease.sineInOut = function(t) {
	if(t == 0) return 0; else if(t == 1) return 1; else return -0.5 * (lovedna.utils.Ease.MathCos(3.141592653589793238 * t) - 1);
};
lovedna.utils.Ease.sineOutIn = function(t) {
	if(t == 0) return 0; else if(t == 1) return 1; else if(t < 0.5) return 0.5 * lovedna.utils.Ease.MathSin(t * 2 * 1.5707963267949); else return -0.5 * lovedna.utils.Ease.MathCos((t * 2 - 1) * 1.5707963267949) + 1;
};
lovedna.utils.Ease.quadIn = function(t) {
	return t * t;
};
lovedna.utils.Ease.quadOut = function(t) {
	return -t * (t - 2);
};
lovedna.utils.Ease.quadInOut = function(t) {
	if(t < 0.5) return 2 * t * t; else return -2 * ((t -= 1) * t) + 1;
};
lovedna.utils.Ease.quadOutIn = function(t) {
	if(t < 0.5) return -0.5 * (t = t * 2) * (t - 2); else return 0.5 * (t = t * 2 - 1) * t + 0.5;
};
lovedna.utils.Ease.cubicIn = function(t) {
	return t * t * t;
};
lovedna.utils.Ease.cubicOut = function(t) {
	return (t = t - 1) * t * t + 1;
};
lovedna.utils.Ease.cubicInOut = function(t) {
	if((t *= 2) < 1) return 0.5 * t * t * t; else return 0.5 * ((t -= 2) * t * t + 2);
};
lovedna.utils.Ease.cubicOutIn = function(t) {
	return 0.5 * ((t = t * 2 - 1) * t * t + 1);
};
lovedna.utils.Ease.quartIn = function(t) {
	return t * t * t * t;
};
lovedna.utils.Ease.quartOut = function(t) {
	return 1 - (t = (t = t - 1) * t) * t;
};
lovedna.utils.Ease.quartInOut = function(t) {
	if((t *= 2) < 1) return 0.5 * t * t * t * t; else return -0.5 * ((t -= 2) * t * t * t - 2);
};
lovedna.utils.Ease.quartOutIn = function(t) {
	if(t < 0.5) return -0.5 * (t = t * 2 - 1) * t * t * t + 0.5; else return 0.5 * (t = t * 2 - 1) * t * t * t + 0.5;
};
lovedna.utils.Ease.quintIn = function(t) {
	return t * t * t * t * t;
};
lovedna.utils.Ease.quintOut = function(t) {
	return (t = t - 1) * t * t * t * t + 1;
};
lovedna.utils.Ease.quintInOut = function(t) {
	if((t *= 2) < 1) return 0.5 * t * t * t * t * t; else return 0.5 * (t -= 2) * t * t * t * t + 1;
};
lovedna.utils.Ease.quintOutIn = function(t) {
	return 0.5 * ((t = t * 2 - 1) * t * t * t * t + 1);
};
lovedna.utils.Ease.expoIn = function(t) {
	if(t == 0) return 0; else return Math.pow(2,10 * (t - 1));
};
lovedna.utils.Ease.expoOut = function(t) {
	if(t == 1) return 1; else return 1 - Math.pow(2,-10 * t);
};
lovedna.utils.Ease.expoInOut = function(t) {
	if(t == 0) return 0; else if(t == 1) return 1; else if((t *= 2) < 1) return 0.5 * Math.pow(2,10 * (t - 1)); else return 0.5 * (2 - Math.pow(2,-10 * --t));
};
lovedna.utils.Ease.expoOutIn = function(t) {
	if(t < 0.5) return 0.5 * (1 - Math.pow(2,-20 * t)); else if(t == 0.5) return 0.5; else return 0.5 * (Math.pow(2,20 * (t - 1)) + 1);
};
lovedna.utils.Ease.circIn = function(t) {
	return 1 - Math.sqrt(1 - t * t);
};
lovedna.utils.Ease.circOut = function(t) {
	return Math.sqrt(t * (2 - t));
};
lovedna.utils.Ease.circInOut = function(t) {
	if((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1); else return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};
lovedna.utils.Ease.circOutIn = function(t) {
	if(t < 0.5) return 0.5 * Math.sqrt(1 - (t = t * 2 - 1) * t); else return -0.5 * (Math.sqrt(1 - (t = t * 2 - 1) * t) - 1 - 1);
};
lovedna.utils.Ease.bounceIn = function(t) {
	if((t = 1 - t) < 0.36363636363636365) return 1 - 7.5625 * t * t;
	if(t < 0.72727272727272729) return 1 - (7.5625 * (t -= 0.54545454545454541) * t + 0.75);
	if(t < 0.90909090909090906) return 1 - (7.5625 * (t -= 0.81818181818181823) * t + 0.9375);
	return 1 - (7.5625 * (t -= 0.95454545454545459) * t + 0.984375);
};
lovedna.utils.Ease.bounceOut = function(t) {
	if(t < 0.36363636363636365) return 7.5625 * t * t;
	if(t < 0.72727272727272729) return 7.5625 * (t -= 0.54545454545454541) * t + 0.75;
	if(t < 0.90909090909090906) return 7.5625 * (t -= 0.81818181818181823) * t + 0.9375;
	return 7.5625 * (t -= 0.95454545454545459) * t + 0.984375;
};
lovedna.utils.Ease.bounceInOut = function(t) {
	if(t < 0.5) {
		if((t = 1 - t * 2) < 0.36363636363636365) return (1 - 7.5625 * t * t) * 0.5;
		if(t < 0.72727272727272729) return (1 - (7.5625 * (t -= 0.54545454545454541) * t + 0.75)) * 0.5;
		if(t < 0.90909090909090906) return (1 - (7.5625 * (t -= 0.81818181818181823) * t + 0.9375)) * 0.5;
		return (1 - (7.5625 * (t -= 0.95454545454545459) * t + 0.984375)) * 0.5;
	} else {
		if((t = t * 2 - 1) < 0.36363636363636365) return 7.5625 * t * t * 0.5 + 0.5;
		if(t < 0.72727272727272729) return (7.5625 * (t -= 0.54545454545454541) * t + 0.75) * 0.5 + 0.5;
		if(t < 0.90909090909090906) return (7.5625 * (t -= 0.81818181818181823) * t + 0.9375) * 0.5 + 0.5;
		return (7.5625 * (t -= 0.95454545454545459) * t + 0.984375) * 0.5 + 0.5;
	}
};
lovedna.utils.Ease.bounceOutIn = function(t) {
	if(t < 0.5) {
		if((t = t * 2) < 0.36363636363636365) return 0.5 * (7.5625 * t * t);
		if(t < 0.72727272727272729) return 0.5 * (7.5625 * (t -= 0.54545454545454541) * t + 0.75);
		if(t < 0.90909090909090906) return 0.5 * (7.5625 * (t -= 0.81818181818181823) * t + 0.9375);
		return 0.5 * (7.5625 * (t -= 0.95454545454545459) * t + 0.984375);
	} else {
		if((t = 1 - (t * 2 - 1)) < 0.36363636363636365) return 0.5 - 0.5 * (7.5625 * t * t) + 0.5;
		if(t < 0.72727272727272729) return 0.5 - 0.5 * (7.5625 * (t -= 0.54545454545454541) * t + 0.75) + 0.5;
		if(t < 0.90909090909090906) return 0.5 - 0.5 * (7.5625 * (t -= 0.81818181818181823) * t + 0.9375) + 0.5;
		return 0.5 - 0.5 * (7.5625 * (t -= 0.95454545454545459) * t + 0.984375) + 0.5;
	}
};
lovedna.utils.Ease.backIn = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	return t * t * (2.70158 * t - 1.70158);
};
lovedna.utils.Ease.backOut = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	return (t = t - 1) * t * (2.70158 * t + 1.70158) + 1;
};
lovedna.utils.Ease.backInOut = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	if((t *= 2) < 1) return 0.5 * (t * t * (3.5949095 * t - 2.5949095));
	return 0.5 * ((t -= 2) * t * (3.5949095 * t + 2.5949095) + 2);
};
lovedna.utils.Ease.backOutIn = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	if(t < 0.5) return 0.5 * ((t = t * 2 - 1) * t * (2.70158 * t + 1.70158) + 1);
	return 0.5 * (t = t * 2 - 1) * t * (2.70158 * t - 1.70158) + 0.5;
};
lovedna.utils.Ease.elasticIn = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	var s = 7.5e-005;
	return -(1 * Math.pow(2,10 * (t -= 1)) * lovedna.utils.Ease.MathSin((t * 0.001 - s) * 6.2831853071795862 / 0.0003));
};
lovedna.utils.Ease.elasticOut = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	var s = 7.5e-005;
	return Math.pow(2,-10 * t) * lovedna.utils.Ease.MathSin((t * 0.001 - s) * 6.2831853071795862 / 0.0003) + 1;
};
lovedna.utils.Ease.elasticInOut = function(t) {
	if(t == 0) return 0;
	if(t == 1) return 1;
	var s = 7.5e-005;
	if((t *= 2) < 1) return -0.5 * (1 * Math.pow(2,10 * (t -= 1)) * lovedna.utils.Ease.MathSin((t * 0.001 - s) * 6.2831853071795862 / 0.0003)); else return 1 * Math.pow(2,-10 * (t -= 1)) * lovedna.utils.Ease.MathSin((t * 0.001 - s) * 6.2831853071795862 / 0.0003) * 0.5 + 1;
};
lovedna.utils.Ease.elasticOutIn = function(t) {
	if(t < 0.5) {
		if((t *= 2) == 0) return 0;
		var s = 7.5e-005;
		return 1 / 2 * Math.pow(2,-10 * t) * lovedna.utils.Ease.MathSin((t * 0.001 - s) * 6.2831853071795862 / 0.0003) + 0.5;
	} else {
		if(t == 0.5) return 0.5;
		if(t == 1) return 1;
		t = t * 2 - 1;
		var s1 = 7.5e-005;
		return -(1 / 2 * Math.pow(2,10 * (t -= 1)) * lovedna.utils.Ease.MathSin((t * 0.001 - s1) * 6.2831853071795862 / 0.0003)) + 0.5;
	}
};
lovedna.utils.Ease.addName = function(func,name,id) {
	if(name != null && func != null) {
		var key = name.toLowerCase();
		lovedna.utils.Ease._nameMap.set(key,func);
		lovedna.utils.Ease._nameList[id] = func;
	}
};
lovedna.utils.Log = function() {
};
$hxClasses["lovedna.utils.Log"] = lovedna.utils.Log;
lovedna.utils.Log.__name__ = ["lovedna","utils","Log"];
lovedna.utils.Log._txt = null;
lovedna.utils.Log._maxLine = null;
lovedna.utils.Log._init = null;
lovedna.utils.Log._cache = null;
lovedna.utils.Log._con = null;
lovedna.utils.Log._yinc = null;
lovedna.utils.Log._restrictList = null;
lovedna.utils.Log._allowList = null;
lovedna.utils.Log._break = null;
lovedna.utils.Log.setEnable = function(value) {
	lovedna.utils.Log._enable = value;
};
lovedna.utils.Log.init = function(container) {
	if(container != null) {
		if(!lovedna.utils.Log._init) {
			lovedna.utils.Log._allowList = [];
			lovedna.utils.Log._restrictList = [];
			lovedna.utils.Log._con = new openfl.display.Sprite();
			lovedna.utils.Log._con.mouseChildren = lovedna.utils.Log._con.mouseEnabled = false;
			lovedna.utils.Log._cache = new Array();
			lovedna.utils.Log._txt = new openfl.text.TextField();
			lovedna.utils.Log._txt.set_autoSize(openfl.text.TextFieldAutoSize.LEFT);
			lovedna.utils.Log._maxLine = Math.floor(container.stage.stageHeight / 15) - 1;
			container.stage.addEventListener(openfl.events.Event.RESIZE,lovedna.utils.Log.stage_resize);
			lovedna.utils.Log._yinc = 0;
		}
		lovedna.utils.Log._init = true;
		container.addChild(lovedna.utils.Log._txt);
		container.addChild(lovedna.utils.Log._con);
	}
};
lovedna.utils.Log.setFilter = function(packageName,split) {
	if(split == null) split = ";";
	if(packageName == null) packageName = "";
	if(packageName != null) lovedna.utils.Log._allowList = packageName.split(split);
};
lovedna.utils.Log.setRestrict = function(packageName,split) {
	if(split == null) split = ";";
	if(packageName == null) packageName = "";
	if(packageName != null) lovedna.utils.Log._restrictList = packageName.split(split);
};
lovedna.utils.Log.trace = function(msg,infos) {
	if(lovedna.utils.Log._enable) {
		if(lovedna.utils.Log._init) {
			lovedna.utils.Log._break = false;
			if(msg != null) {
				if(infos != null) {
					var className = infos.className;
					if(lovedna.utils.Log.inRestrict(className)) lovedna.utils.Log._break = true;
					if(!lovedna.utils.Log._break) {
						if(!lovedna.utils.Log.inFilter(className)) lovedna.utils.Log._break = true;
					}
					if(!lovedna.utils.Log._break) {
						var date;
						var t = new Date().getTime();
						var d = new Date();
						d.setTime(t);
						date = d;
						var time = date.getHours() + "/" + date.getMinutes() + "/" + date.getSeconds();
						if(lovedna.utils.Log.showPackage) msg = time + " " + className + ":" + infos.lineNumber + ":" + msg; else msg = time + " " + msg;
					}
				}
				var id = Math.floor(lovedna.utils.Log._yinc % lovedna.utils.Log._maxLine);
				if(!lovedna.utils.Log._break) {
					var txt = lovedna.utils.Log._cache[id];
					if(txt == null) {
						txt = new openfl.text.TextField();
						txt.set_textColor(lovedna.utils.Log._color);
						txt.mouseEnabled = false;
						txt.set_autoSize(openfl.text.TextFieldAutoSize.LEFT);
						lovedna.utils.Log._cache[id] = txt;
					}
					txt.set_text(msg);
					txt.set_y(lovedna.utils.Log._yinc * 15);
					lovedna.utils.Log._con.addChild(txt);
					lovedna.utils.Log._line++;
					lovedna.utils.Log._con.set_y((lovedna.utils.Log._maxLine - lovedna.utils.Log._yinc - 1) * 15);
					lovedna.utils.Log._yinc++;
				}
			}
		}
	}
};
lovedna.utils.Log.update = function(msg) {
	if(lovedna.utils.Log._init) lovedna.utils.Log._txt.set_text(msg);
};
lovedna.utils.Log.inFilter = function(packageName) {
	var len = lovedna.utils.Log._allowList.length;
	if(len == 0) return true;
	while(len-- > 0) {
		var part = lovedna.utils.Log._allowList[len];
		if(packageName.indexOf(part) != -1) return true;
	}
	return false;
};
lovedna.utils.Log.inRestrict = function(packageName) {
	var len = lovedna.utils.Log._restrictList.length;
	if(len == 0) return false;
	while(len-- > 0) {
		var part = lovedna.utils.Log._restrictList[len];
		if(packageName.indexOf(part) != -1) return true;
	}
	return false;
};
lovedna.utils.Log.stage_resize = function(e) {
	var stage = e.target;
	if(stage != null) lovedna.utils.Log._maxLine = Math.floor(stage.stageHeight / 15);
};
lovedna.utils.Log.prototype = {
	__class__: lovedna.utils.Log
};
lovedna.utils.MathUtil = function() { };
$hxClasses["lovedna.utils.MathUtil"] = lovedna.utils.MathUtil;
lovedna.utils.MathUtil.__name__ = ["lovedna","utils","MathUtil"];
lovedna.utils.MathUtil.toRadians = function(degrees) {
	return degrees * 0.017453292519943295;
};
lovedna.utils.MathUtil.toDegrees = function(radians) {
	return radians * 57.295779513082323;
};
lovedna.utils.MathUtil.max = function(a,b) {
	if(a > b) return a; else return b;
};
lovedna.utils.MathUtil.min = function(a,b) {
	if(a < b) return a; else return b;
};
lovedna.utils.MathUtil.abs = function(x) {
	if(x < 0) return -x; else return x;
};
lovedna.utils.MathUtil.clamp = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
};
lovedna.utils.MathUtil.sign = function(value) {
	if(value > 0) return 1; else if(value < 0) return -1; else return 0;
};
lovedna.utils.MathUtil.round = function(x) {
	return (x + 16384.5 | 0) - 16384;
};
lovedna.utils.MathUtil.floor = function(x) {
	var f = x | 0;
	if(x < 0 && f != x) f--;
	return f;
};
lovedna.utils.MathUtil.ceil = function(x) {
	var f = x | 0;
	if(x == f) return f; else {
		x += 1;
		var f1 = x | 0;
		if(x < 0 && f1 != x) f1--;
		return f1;
	}
};
lovedna.utils.MathUtil.exp = function(a,n) {
	var t = 1;
	var r = 0;
	while(true) {
		if((n & 1) != 0) t = a * t;
		n >>= 1;
		if(n == 0) {
			r = t;
			break;
		} else a *= a;
	}
	return r;
};
lovedna.utils.MathUtil.wrapToPI = function(x) {
	x += 3.141592653589793238;
	return x - 6.28318530717959 * Math.floor(x / 6.28318530717959) - 3.141592653589793238;
};
lovedna.utils.MathUtil.wrapToPI2 = function(x) {
	return x - 6.28318530717959 * Math.floor(x / 6.28318530717959);
};
lovedna.utils.MathUtil.nextPow2 = function(x) {
	var t = x - 1;
	t |= t >> 1;
	t |= t >> 2;
	t |= t >> 4;
	t |= t >> 8;
	t |= t >> 16;
	return t + 1;
};
lovedna.utils.MathUtil.isPow2 = function(x) {
	return x > 0 && (x & x - 1) == 0;
};
lovedna.utils.MathUtil.isEven = function(x) {
	return (x & 1) == 0;
};
lovedna.utils.MathUtil.getAngle = function(x1,y1,x2,y2) {
	return Math.atan2(y2 - y1,x2 - x1);
};
lovedna.utils.MathUtil.distance = function(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
};
lovedna.utils.MathUtil.Int2Uint = function(value) {
	if(value < 0) return value + 4294967296; else return value;
};
lovedna.utils.MathUtil.Uint2Int = function(value) {
	if(value > 2147483647.0) return value - 4294967296 | 0; else return value | 0;
};
lovedna.utils.MatrixUtil = function() {
};
$hxClasses["lovedna.utils.MatrixUtil"] = lovedna.utils.MatrixUtil;
lovedna.utils.MatrixUtil.__name__ = ["lovedna","utils","MatrixUtil"];
lovedna.utils.MatrixUtil.deltaTransformPoint = function(point,mat) {
	var px = point.x;
	var py = point.y;
	point.x = px * mat.a + py * mat.c;
	point.y = px * mat.b + py * mat.d;
	return point;
};
lovedna.utils.MatrixUtil.prototype = {
	__class__: lovedna.utils.MatrixUtil
};
lovedna.utils.PathUtil = function() {
};
$hxClasses["lovedna.utils.PathUtil"] = lovedna.utils.PathUtil;
lovedna.utils.PathUtil.__name__ = ["lovedna","utils","PathUtil"];
lovedna.utils.PathUtil.isHttp = function(url) {
	var pref = HxOverrides.substr(url,0,7);
	return pref == "http://" || pref == "https:/";
};
lovedna.utils.PathUtil.getShortURL = function(url,prefix) {
	if(prefix == null) prefix = "";
	var fixurl = url;
	if(prefix != "") fixurl = fixurl.split(prefix).pop();
	return fixurl;
};
lovedna.utils.PathUtil.getFixURL = function(url) {
	url = url.split("?").shift();
	url = StringTools.replace(url,"://","_");
	url = StringTools.replace(url,":\\","_");
	url = StringTools.replace(url,"/","_");
	return url;
};
lovedna.utils.PathUtil.prototype = {
	__class__: lovedna.utils.PathUtil
};
lovedna.utils.Pool = function() {
};
$hxClasses["lovedna.utils.Pool"] = lovedna.utils.Pool;
lovedna.utils.Pool.__name__ = ["lovedna","utils","Pool"];
lovedna.utils.Pool.getObjectByName = function(type,params) {
	if(type != null) {
		var classType = Type.resolveClass(type);
		if(classType != null) return lovedna.utils.Pool.getObject(classType,params);
	}
	return null;
};
lovedna.utils.Pool.getObject = function(typeClass,params) {
	var key = Type.getClassName(typeClass);
	var list = lovedna.utils.Pool._idle.get(key);
	var activelist = lovedna.utils.Pool._active.get(key);
	if(list == null) {
		list = [];
		activelist = [];
		lovedna.utils.Pool._idle.set(key,list);
		lovedna.utils.Pool._active.set(key,activelist);
	}
	var ins = null;
	if(list.length == 0) {
		if(params == null) params = [];
		ins = Type.createInstance(typeClass,params);
		lovedna.utils.Pool.count++;
	} else ins = list.pop();
	if(ins != null) {
		if(js.Boot.__instanceof(ins,lovedna.utils.IPoolObject)) {
			var pool = ins;
			pool.reset();
			pool.poolId = activelist.length;
		}
	}
	activelist.push(ins);
	lovedna.utils.Pool.active++;
	return ins;
};
lovedna.utils.Pool.returnObject = function(object) {
	if(object != null) {
		var name = Type.getClassName(Type.getClass(object));
		var list = lovedna.utils.Pool._idle.get(name);
		if(lovedna.utils.Pool._idle == null) {
			list = [];
			lovedna.utils.Pool._idle.set(name,list);
		}
		if(list == null) return;
		var id = -1;
		if(js.Boot.__instanceof(object,lovedna.utils.IPoolObject)) {
			var pool = object;
			if(pool.poolId != -1) {
				list.push(pool);
				list = lovedna.utils.Pool._active.get(name);
				if(list != null) {
					id = lovedna.utils.Pool.indexOf(list,pool,pool.poolId);
					if(id != -1) {
						list.splice(id,1);
						lovedna.utils.Pool.active--;
					}
				}
				pool.poolId = -1;
			}
		} else {
			id = Lambda.indexOf(list,object);
			if(id == -1) list.push(object);
			list = lovedna.utils.Pool._active.get(name);
			if(list != null) {
				id = Lambda.indexOf(list,object);
				if(id != -1) {
					list.splice(id,1);
					lovedna.utils.Pool.active--;
				}
			}
		}
	}
};
lovedna.utils.Pool.recycle = function(type) {
	var keys = lovedna.utils.Pool._active.keys();
	var list = null;
	var idleList = null;
	var len = 0;
	var item = null;
	var flag = 0;
	var pack = null;
	if(typeof(type) == "string") {
		flag = 2;
		pack = type;
		if(pack == "") flag = 3;
	} else {
		flag = 1;
		if(type == null) flag = 3;
	}
	while(keys.hasNext()) {
		var key = keys.next();
		list = lovedna.utils.Pool._active.get(key);
		idleList = lovedna.utils.Pool._idle.get(key);
		if(flag == 1) {
			len = list.length;
			while(len-- > 0) {
				item = list[len];
				if(js.Boot.__instanceof(item,type)) {
					lovedna.utils.Pool.active--;
					list.splice(len,1);
					idleList.push(item);
				}
			}
		} else if(flag == 3) {
			if(idleList != null) {
				len = list.length;
				lovedna.utils.Pool.active -= len;
				idleList = idleList.concat(list.splice(0,len));
			}
		} else if(flag == 2 && key.indexOf(pack) == 0) {
			if(idleList != null) {
				len = list.length;
				lovedna.utils.Pool.active -= len;
				idleList = idleList.concat(list.splice(0,len));
			}
		}
		lovedna.utils.Pool._idle.set(key,idleList);
	}
};
lovedna.utils.Pool.clear = function() {
	lovedna.utils.Pool._idle = new haxe.ds.StringMap();
	lovedna.utils.Pool._active = new haxe.ds.StringMap();
	lovedna.utils.Pool.count = 0;
	lovedna.utils.Pool.active = 0;
};
lovedna.utils.Pool.getDefinition = function(packageName) {
	var cls = Type.resolveClass(packageName);
	if(cls != null) return lovedna.utils.Pool.getObject(cls);
	return null;
};
lovedna.utils.Pool.indexOf = function(list,item,id) {
	if(id == null) id = -1;
	if(list == null || item == null) return -1;
	var len = list.length;
	if(len == 0) return -1;
	if(id > 0) {
		if(id > len) id = len;
		while(id-- > 0) if(list[id] == item) return id;
	} else if(list[0] == item) return 0;
	return -1;
};
lovedna.utils.Pool.prototype = {
	__class__: lovedna.utils.Pool
};
lovedna.utils.ResizeUtil = function() {
};
$hxClasses["lovedna.utils.ResizeUtil"] = lovedna.utils.ResizeUtil;
lovedna.utils.ResizeUtil.__name__ = ["lovedna","utils","ResizeUtil"];
lovedna.utils.ResizeUtil._stage = null;
lovedna.utils.ResizeUtil._list = null;
lovedna.utils.ResizeUtil._delay = null;
lovedna.utils.ResizeUtil._stageWidth = null;
lovedna.utils.ResizeUtil._stageHeight = null;
lovedna.utils.ResizeUtil.getSize = function(width,height,maxWidth,maxHeight,resize) {
	if(resize == null) resize = true;
	var tox = 0;
	var toy = 0;
	var toWidth;
	var toHeight;
	if(resize) {
		var p = width / height;
		var p2 = maxWidth / maxHeight;
		var rp;
		if(p > p2) {
			rp = maxWidth / width;
			toWidth = maxWidth;
			toHeight = Math.floor(toWidth / p);
		} else {
			rp = maxHeight / height;
			toHeight = maxHeight;
			toWidth = Math.floor(p * toHeight);
		}
	} else {
		toWidth = width;
		toHeight = height;
	}
	lovedna.utils.ResizeUtil._rect.x = (maxWidth - toWidth) * 0.5 | 0;
	lovedna.utils.ResizeUtil._rect.y = (maxHeight - toHeight) * 0.5 | 0;
	lovedna.utils.ResizeUtil._rect.width = toWidth / width;
	lovedna.utils.ResizeUtil._rect.height = toHeight / height;
	return lovedna.utils.ResizeUtil._rect;
};
lovedna.utils.ResizeUtil.add = function(value,width,height,autoResize) {
	if(autoResize == null) autoResize = true;
	if(value == null) return;
	if(lovedna.utils.ResizeUtil._stage == null) {
		lovedna.utils.ResizeUtil._stage = openfl.Lib.current.stage;
		if(lovedna.utils.ResizeUtil._stage == null) return;
		lovedna.utils.ResizeUtil._list = new Array();
		lovedna.utils.ResizeUtil._stage.addEventListener(openfl.events.Event.RESIZE,lovedna.utils.ResizeUtil.stage_resize);
		lovedna.utils.ResizeUtil._stageWidth = lovedna.utils.ResizeUtil._stage.stageWidth;
		lovedna.utils.ResizeUtil._stageHeight = lovedna.utils.ResizeUtil._stage.stageHeight;
		lovedna.utils.ResizeUtil._delay = new lovedna.utils.tick.Delay();
		lovedna.utils.ResizeUtil._delay.setCompleteHandler(lovedna.utils.ResizeUtil.stageResize);
	}
	var len = lovedna.utils.ResizeUtil._list.length;
	var resize;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		resize = lovedna.utils.ResizeUtil._list[i];
		if(resize.check(value)) {
			resize.config(width,height,autoResize);
			break;
			return;
		}
	}
	resize = new lovedna.utils.ResizeDisplay(value,width,height,autoResize);
	lovedna.utils.ResizeUtil._list.push(resize);
	resize.update(lovedna.utils.ResizeUtil._stage.stageWidth,lovedna.utils.ResizeUtil._stage.stageHeight);
};
lovedna.utils.ResizeUtil.execute = function(value) {
	var len = lovedna.utils.ResizeUtil._list.length;
	var resize;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		resize = lovedna.utils.ResizeUtil._list[i];
		if(resize.check(value)) resize.update(lovedna.utils.ResizeUtil._stageWidth,lovedna.utils.ResizeUtil._stageHeight);
	}
};
lovedna.utils.ResizeUtil.stage_resize = function(e) {
	lovedna.utils.ResizeUtil._delay.stop();
	lovedna.utils.ResizeUtil._delay.start(50);
	lovedna.utils.ResizeUtil._stageWidth = lovedna.utils.ResizeUtil._stage.stageWidth;
	lovedna.utils.ResizeUtil._stageHeight = lovedna.utils.ResizeUtil._stage.stageHeight;
};
lovedna.utils.ResizeUtil.stageResize = function() {
	var len = lovedna.utils.ResizeUtil._list.length;
	var resize;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		resize = lovedna.utils.ResizeUtil._list[i];
		resize.update(lovedna.utils.ResizeUtil._stageWidth,lovedna.utils.ResizeUtil._stageHeight);
	}
};
lovedna.utils.ResizeUtil.prototype = {
	__class__: lovedna.utils.ResizeUtil
};
lovedna.utils.ResizeDisplay = function(value,width,height,autoResize) {
	if(autoResize == null) autoResize = true;
	this._target = value;
	this.config(width,height,autoResize);
};
$hxClasses["lovedna.utils.ResizeDisplay"] = lovedna.utils.ResizeDisplay;
lovedna.utils.ResizeDisplay.__name__ = ["lovedna","utils","ResizeDisplay"];
lovedna.utils.ResizeDisplay.prototype = {
	update: function(width,height) {
		if(js.Boot.__instanceof(this._target,openfl.display.DisplayObject)) {
			var display = this._target;
			var rect = lovedna.utils.ResizeUtil.getSize(this._width,this._height,width,height,this._auto);
			display.set_x(rect.x);
			display.set_y(rect.y);
			display.set_scaleX(rect.width);
			display.set_scaleY(rect.height);
		}
		if(js.Boot.__instanceof(this._target,lovedna.utils.IDisplayResize)) {
			var re = this._target;
			re.displayResize(width,height);
		}
	}
	,check: function(value) {
		return this._target == value;
	}
	,config: function(width,height,autoResize) {
		if(autoResize == null) autoResize = true;
		this._width = width;
		this._height = height;
		this._auto = autoResize;
	}
	,__class__: lovedna.utils.ResizeDisplay
};
lovedna.utils.StringUtil = function() {
};
$hxClasses["lovedna.utils.StringUtil"] = lovedna.utils.StringUtil;
lovedna.utils.StringUtil.__name__ = ["lovedna","utils","StringUtil"];
lovedna.utils.StringUtil.fill0 = function(x,n) {
	var left = n < 0;
	if(n < 0) n = -n; else n = n;
	var s = "";
	var _g1 = 0;
	var _g = n - x.length;
	while(_g1 < _g) {
		var i = _g1++;
		s += "0";
	}
	if(left) return s + x; else return x + s;
};
lovedna.utils.StringUtil.reverse = function(x) {
	var t = "";
	var i = x.length;
	while(--i >= 0) t += x.charAt(i);
	return t;
};
lovedna.utils.StringUtil.parseBin = function(x) {
	var b = 0;
	var j = 0;
	var i = x.length;
	while(i-- > 0) {
		var s = x.charAt(i);
		if(s == "0") j++; else if(s == "1") {
			b += 1 << j;
			j++;
		}
	}
	return b;
};
lovedna.utils.StringUtil.replace = function(value,args) {
	if(args == null) return value;
	var len = args.length;
	if(len == 0) return value;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var part = "%" + i + "%";
		var partlen = part.length;
		var id = value.indexOf(part);
		var replace = args[i];
		while(id != -1) {
			value = HxOverrides.substr(value,0,id) + replace + HxOverrides.substr(value,id + partlen,null);
			id = value.indexOf(part);
		}
	}
	return value;
};
lovedna.utils.StringUtil.toUpperCaseFirstLetter = function(value) {
	return value.charAt(0).toUpperCase() + HxOverrides.substr(value,1,null).toLowerCase();
};
lovedna.utils.StringUtil.trim = function(value) {
	return StringTools.trim(value);
};
lovedna.utils.StringUtil.ltrim = function(value) {
	return StringTools.ltrim(value);
};
lovedna.utils.StringUtil.rtrim = function(value) {
	return StringTools.rtrim(value);
};
lovedna.utils.StringUtil.getLength = function(value) {
	var ba = new openfl.utils.ByteArray();
	ba.writeUTFBytes(value);
	return ba.length;
};
lovedna.utils.StringUtil.prototype = {
	__class__: lovedna.utils.StringUtil
};
lovedna.utils.csv.CSVPacker = function() {
	this._names = [];
	this._values = [];
	this._dataMap = new haxe.ds.StringMap();
};
$hxClasses["lovedna.utils.csv.CSVPacker"] = lovedna.utils.csv.CSVPacker;
lovedna.utils.csv.CSVPacker.__name__ = ["lovedna","utils","csv","CSVPacker"];
lovedna.utils.csv.CSVPacker.writeString = function(data,value) {
	data.writeByte(value.length);
	data.writeUTFBytes(value);
};
lovedna.utils.csv.CSVPacker.readString = function(data) {
	var len = data.readByte();
	return data.readUTFBytes(len);
};
lovedna.utils.csv.CSVPacker.prototype = {
	addCsv: function(name,value) {
		this._names.push(name);
		this._values.push(value);
	}
	,getCsvList: function() {
		return this._names;
	}
	,getCsv: function(name) {
		return this._dataMap.get(name);
	}
	,encode: function() {
		var len = this._names.length;
		var data = new openfl.utils.ByteArray();
		data.writeShort(len);
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var name = this._names[i];
			var itemdata = this.toByteArray(this._values[i]);
			if(itemdata != null) {
				data.writeByte(name.length);
				data.writeUTFBytes(name);
				data.writeInt(itemdata.length);
				data.writeBytes(itemdata,0,itemdata.length);
			}
		}
		return data;
	}
	,decode: function(value) {
		this._names = [];
		this._dataMap = new haxe.ds.StringMap();
		value.uncompress();
		value.position = 0;
		var len = value.readShort();
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var name = lovedna.utils.csv.CSVPacker.readString(value);
			this._names[i] = name;
			var datalen = value.readInt();
			var data = new openfl.utils.ByteArray();
			value.readBytes(data,0,datalen);
			this._dataMap.set(name,data);
		}
	}
	,dispose: function() {
		this._names = [];
		this._values = [];
		this._dataMap = new haxe.ds.StringMap();
	}
	,toByteArray: function(value) {
		if(value == "") return null;
		var items = value.split("\r\n");
		if(items.length < 2) items = value.split("\n");
		var len = items.length;
		var keyStr = items.shift();
		var keys = keyStr.split(",");
		var keylen = keys.length;
		var namelen = 0;
		var header = new openfl.utils.ByteArray();
		var skipList = [];
		var value1;
		var _g = 0;
		while(_g < keylen) {
			var i = _g++;
			value1 = keys[i];
			skipList[i] = value1.indexOf("#") == 0;
			if(skipList[i]) continue;
			namelen++;
		}
		header.writeByte(namelen);
		var _g1 = 0;
		while(_g1 < keylen) {
			var i1 = _g1++;
			value1 = keys[i1];
			if(skipList[i1]) continue;
			header.writeByte(value1.length);
			header.writeUTFBytes(value1);
		}
		var typeStr = items.shift();
		var types = typeStr.split(",");
		var _g2 = 0;
		while(_g2 < keylen) {
			var i2 = _g2++;
			if(skipList[i2]) continue;
			lovedna.utils.csv.CSVPacker.writeString(header,types[i2].toLowerCase());
		}
		len = items.length;
		var itemdata = new openfl.utils.ByteArray();
		var k = 0;
		var _g3 = 0;
		while(_g3 < len) {
			var i3 = _g3++;
			var vstr = items[i3];
			if(vstr.charAt(0) == "#") continue;
			if(vstr == "") continue;
			var varr = vstr.split(",");
			if(varr.length < keylen) continue;
			k++;
			var _g11 = 0;
			while(_g11 < keylen) {
				var j = _g11++;
				if(skipList[j]) continue;
				var type = types[j];
				value1 = varr[j];
				if(type == "int") itemdata.writeInt(Std.parseInt(value1)); else if(type == "float") {
					var f = Std.parseFloat(value1);
					itemdata.writeFloat(f);
				} else if(type == "uint") {
					var u = Std.parseFloat(value1);
					itemdata.writeUnsignedInt(u);
				} else if(type == "double") {
					var d = Std.parseFloat(value1);
					itemdata.writeDouble(d);
				} else {
					itemdata.writeByte(value1.length);
					itemdata.writeUTFBytes(value1);
				}
			}
		}
		var data = new openfl.utils.ByteArray();
		data.writeBytes(header,0,header.length);
		data.writeInt(k);
		data.writeBytes(itemdata,0,itemdata.length);
		return data;
	}
	,__class__: lovedna.utils.csv.CSVPacker
};
lovedna.utils.images = {};
lovedna.utils.images.PNGEncoder = function() { };
$hxClasses["lovedna.utils.images.PNGEncoder"] = lovedna.utils.images.PNGEncoder;
lovedna.utils.images.PNGEncoder.__name__ = ["lovedna","utils","images","PNGEncoder"];
lovedna.utils.images.PNGEncoder.encode = function(img) {
	return null;
};
lovedna.utils.png = {};
lovedna.utils.png.Chunk = function(bytes,chunkType) {
	if(chunkType == null) chunkType = 0;
	if(chunkType != 0) {
		this._type = chunkType;
		this._bytes = bytes;
		return;
	}
	if(bytes.length < 8) {
		var len = 8 - bytes.length;
		while(len-- > 0) bytes.writeByte(0);
	}
	this._bytes = new openfl.utils.ByteArray();
	bytes.position = 0;
	this._type = bytes.readInt();
	bytes.readBytes(this._bytes,0,bytes.length - bytes.position - 4);
	this._bytes.position = 0;
};
$hxClasses["lovedna.utils.png.Chunk"] = lovedna.utils.png.Chunk;
lovedna.utils.png.Chunk.__name__ = ["lovedna","utils","png","Chunk"];
lovedna.utils.png.Chunk.prototype = {
	dispose: function() {
		this._bytes = null;
	}
	,get_type: function() {
		return this._type;
	}
	,set_type: function(value) {
		return this._type = value;
	}
	,get_bytes: function() {
		var len = this._bytes.length;
		var con = new openfl.utils.ByteArray();
		con.writeInt(this._type);
		con.writeBytes(this._bytes,0,len);
		var crc = lovedna.utils.ByteArrayUtil.getCrc32(con);
		var ba = new openfl.utils.ByteArray();
		ba.writeInt(len);
		ba.writeBytes(con);
		ba.writeInt(crc);
		return ba;
	}
	,get_content: function() {
		this._bytes.position = 0;
		return this._bytes;
	}
	,set_content: function(value) {
		this._bytes = value;
		return value;
	}
	,__class__: lovedna.utils.png.Chunk
	,__properties__: {set_content:"set_content",get_content:"get_content",get_bytes:"get_bytes",set_type:"set_type",get_type:"get_type"}
};
lovedna.utils.png.PngReader = function() {
	this._chunkList = new Array();
	this._chunkDict = new haxe.ds.StringMap();
};
$hxClasses["lovedna.utils.png.PngReader"] = lovedna.utils.png.PngReader;
lovedna.utils.png.PngReader.__name__ = ["lovedna","utils","png","PngReader"];
lovedna.utils.png.PngReader.prototype = {
	dispose: function() {
		if(this._chunkList != null) {
			var len = this._chunkList.length;
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				var chunk = this._chunkList[i];
				chunk.dispose();
			}
			this._chunkList = null;
		}
		if(this._chunkEnd != null) {
			this._chunkEnd.dispose();
			this._chunkEnd = null;
		}
		this._chunkDict = null;
	}
	,reset: function() {
		this._chunkList.splice(0,this._chunkList.length);
		this._chunkDict = new haxe.ds.StringMap();
	}
	,read: function(bytes) {
		bytes.position = 0;
		if(bytes.length < 21) return false;
		bytes.position = 8;
		var len = bytes.readInt();
		var type = bytes.readInt();
		if(type != 1229472850) return false;
		this.reset();
		this._width = bytes.readInt();
		this._height = bytes.readInt();
		bytes.position = 8;
		while(bytes.length - bytes.position > 0) {
			var datalen = bytes.readUnsignedInt();
			type = bytes.readUnsignedInt();
			var ba = new openfl.utils.ByteArray();
			if(datalen > 0) bytes.readBytes(ba,0,datalen);
			bytes.readInt();
			var chunk = new lovedna.utils.png.Chunk(ba,type);
			if(type == 1229278788) this._chunkEnd = chunk; else {
				this._chunkDict.set("type" + type,this._chunkList.length);
				this._chunkList.push(chunk);
			}
		}
		return true;
	}
	,encode: function() {
		if(this._chunkList == null) return null;
		var len = this._chunkList.length;
		var ba = new openfl.utils.ByteArray();
		ba.writeInt(-1991225785);
		ba.writeInt(218765834);
		var chunk;
		var bytes;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			chunk = this._chunkList[i];
			bytes = chunk.get_bytes();
			ba.writeBytes(bytes,0,bytes.length);
		}
		if(this._chunkEnd != null) {
			bytes = this._chunkEnd.get_bytes();
			ba.writeBytes(bytes,0,bytes.length);
		}
		return ba;
	}
	,getChunk: function(type) {
		if(this._chunkList == null) return null;
		if(this._chunkDict.exists("type" + type)) {
			var id = this._chunkDict.get("type" + type);
			if(this._chunkList.length >= id) return this._chunkList[id];
		}
		return null;
	}
	,addChunk: function(chunk) {
		if(chunk == null) return;
		var key = "type" + chunk.get_type();
		this._chunkDict.set(key,this._chunkList.length);
		this._chunkList.push(chunk);
	}
	,removeChunk: function(type) {
		if(type == null) type = 0;
		if(this._chunkList == null) return;
		var len = this._chunkList.length;
		while(len-- > 0) {
			var chunk = this._chunkList[len];
			var ctype = chunk.get_type();
			if(ctype == 1229472850 || ctype == 1229278788 || ctype == 1229209940 || ctype == 1347179589) continue;
			if(type == 0) this._chunkList.splice(len,1); else if(chunk.get_type() == type) this._chunkList.splice(len,1);
		}
	}
	,__class__: lovedna.utils.png.PngReader
};
lovedna.utils.tick.Delay = function() {
	this._tick = new lovedna.utils.tick.Tick(0,false);
	this._tick.add(this);
	this.running = false;
};
$hxClasses["lovedna.utils.tick.Delay"] = lovedna.utils.tick.Delay;
lovedna.utils.tick.Delay.__name__ = ["lovedna","utils","tick","Delay"];
lovedna.utils.tick.Delay.__interfaces__ = [lovedna.utils.tick.ITick];
lovedna.utils.tick.Delay.prototype = {
	dispose: function() {
		this.stop();
		if(this._tick != null) {
			this._tick.dispose();
			this._tick = null;
		}
		this._onComplete = null;
		this._onCompleteParams = null;
	}
	,start: function(time,once) {
		if(once == null) once = false;
		this._once = once;
		this._tick.set_delay(time);
		this._tick.start();
		this.running = this._tick.get_running();
		return this;
	}
	,stop: function() {
		if(this._tick != null) this._tick.stop();
		this.running = false;
		return this;
	}
	,pause: function() {
		this._tick.pauseTime();
	}
	,resume: function() {
		this._tick.resumeTime();
	}
	,setCompleteHandler: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		return this;
	}
	,tickTime: function(time,tick) {
		if(tick == null) tick = 0;
		if(time == null) time = 0;
		this.stop();
		if(this._onComplete != null) this._onComplete.apply(this._onComplete,this._onCompleteParams);
		if(this._once) this.dispose();
	}
	,__class__: lovedna.utils.tick.Delay
};
lovedna.utils.tick.Tick = function(time,autoRun) {
	if(autoRun == null) autoRun = true;
	if(time == null) time = 30;
	this._list = new Array();
	this._running = false;
	if(time < 1) time = 30;
	this._delay = time;
	if(autoRun) this.start();
	this._pausePassTime = -1;
	this._timePause = false;
};
$hxClasses["lovedna.utils.tick.Tick"] = lovedna.utils.tick.Tick;
lovedna.utils.tick.Tick.__name__ = ["lovedna","utils","tick","Tick"];
lovedna.utils.tick.Tick.getStamp = function() {
	return new Date().getTime();
};
lovedna.utils.tick.Tick.getPass = function(lastTime) {
	return new Date().getTime() - lastTime;
};
lovedna.utils.tick.Tick.prototype = {
	start: function() {
		if(this._timer == null) {
			this._time = new Date().getTime();
			this._timer = new haxe.Timer(this._delay);
			this._timer.run = $bind(this,this.update);
			this._running = true;
		}
	}
	,stop: function() {
		if(this._timer != null) {
			this._timer.stop();
			this._timer.run = null;
			this._timer = null;
			this._running = false;
		}
	}
	,pauseTime: function() {
		if(!this._timePause) {
			this._pausePassTime = Std["int"](new Date().getTime() - this._time);
			this.stop();
		}
		this._timePause = true;
	}
	,resumeTime: function() {
		if(this._timePause) {
			var delay = this._delay;
			this._delay = delay - this._pausePassTime;
			if(this._delay < 1) this._delay = delay;
			this.start();
			this._time -= this._pausePassTime;
			this._delay = delay;
		}
		this._timePause = false;
	}
	,hasPause: function() {
		return this._timePause;
	}
	,setTickHandler: function(handler) {
		this._tickHandler = handler;
		this.checkEnable();
	}
	,dispose: function() {
		this.stop();
		this._tickHandler = null;
		this._list = null;
	}
	,add: function(value) {
		if(value == null) return false;
		var list = HxOverrides.iter(this._list);
		while(list.hasNext()) if(list.next() == value) return false;
		this._list.push(value);
		this.checkEnable();
		return true;
	}
	,remove: function(value) {
		var len = this._list.length;
		while(len-- > 0) if(this._list[len] == value) {
			this._list.splice(len,1);
			return len;
		}
		this.checkEnable();
		return -1;
	}
	,clear: function() {
		this._list = new Array();
		this.checkEnable();
	}
	,resetTime: function() {
		this._time = new Date().getTime();
	}
	,update: function() {
		if(!this.pause) {
			if(this._enable) {
				this._currentTime = new Date().getTime();
				this._tick = this._currentTime - this._time;
				if(this._tick >= this._delay) {
					this._time = this._currentTime;
					if(this._tickHandler != null) this._tickHandler(this._time,this._tick);
					if(this._list != null) {
						var len = this._list.length;
						if(len > 0) while(len-- > 0) this._list[len].tickTime(this._time,this._tick);
					}
				}
				if(this._pausePassTime > 0) {
					this.start();
					this._pausePassTime = -1;
				}
			}
		}
	}
	,checkEnable: function() {
		var haschild = this._list.length > 0;
		var hashandler = this._tickHandler != null;
		this._enable = haschild || hashandler;
		if(this._enable) this.resetTime();
	}
	,get_delay: function() {
		return this._delay;
	}
	,set_delay: function(value) {
		if(value == this._delay) return value;
		this.stop();
		if(value < 1) return value;
		this._delay = value;
		this.start();
		return this._delay;
	}
	,get_time: function() {
		return this._time;
	}
	,get_running: function() {
		return this._running;
	}
	,__class__: lovedna.utils.tick.Tick
	,__properties__: {get_running:"get_running",get_time:"get_time",set_delay:"set_delay",get_delay:"get_delay"}
};
openfl.AssetCache = function() {
	this.enabled = true;
	this.bitmapData = new haxe.ds.StringMap();
	this.font = new haxe.ds.StringMap();
	this.sound = new haxe.ds.StringMap();
};
$hxClasses["openfl.AssetCache"] = openfl.AssetCache;
openfl.AssetCache.__name__ = ["openfl","AssetCache"];
openfl.AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.bitmapData = new haxe.ds.StringMap();
			this.font = new haxe.ds.StringMap();
			this.sound = new haxe.ds.StringMap();
		} else {
			var keys = this.bitmapData.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.bitmapData.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.sound.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.sound.remove(key2);
			}
		}
	}
	,__class__: openfl.AssetCache
};
openfl.Assets = function() { };
$hxClasses["openfl.Assets"] = openfl.Assets;
openfl.Assets.__name__ = ["openfl","Assets"];
openfl.Assets.addEventListener = function(type,listener,useCapture,priority,useWeakReference) {
	if(useWeakReference == null) useWeakReference = false;
	if(priority == null) priority = 0;
	if(useCapture == null) useCapture = false;
	openfl.Assets.initialize();
	openfl.Assets.dispatcher.addEventListener(type,listener,useCapture,priority,useWeakReference);
};
openfl.Assets.dispatchEvent = function(event) {
	openfl.Assets.initialize();
	return openfl.Assets.dispatcher.dispatchEvent(event);
};
openfl.Assets.exists = function(id,type) {
	openfl.Assets.initialize();
	if(type == null) type = openfl.AssetType.BINARY;
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) return library.exists(symbolName,type);
	return false;
};
openfl.Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.bitmapData.exists(id)) {
		var bitmapData = openfl.Assets.cache.bitmapData.get(id);
		if(openfl.Assets.isValidBitmapData(bitmapData)) return bitmapData;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.IMAGE)) {
			if(library.isLocal(symbolName,openfl.AssetType.IMAGE)) {
				var bitmapData1 = library.getBitmapData(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.bitmapData.set(id,bitmapData1);
				return bitmapData1;
			} else haxe.Log.trace("[openfl.Assets] BitmapData asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 139, className : "openfl.Assets", methodName : "getBitmapData"});
		} else haxe.Log.trace("[openfl.Assets] There is no BitmapData asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 145, className : "openfl.Assets", methodName : "getBitmapData"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 151, className : "openfl.Assets", methodName : "getBitmapData"});
	return null;
};
openfl.Assets.getBytes = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.BINARY)) {
			if(library.isLocal(symbolName,openfl.AssetType.BINARY)) return library.getBytes(symbolName); else haxe.Log.trace("[openfl.Assets] String or ByteArray asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 188, className : "openfl.Assets", methodName : "getBytes"});
		} else haxe.Log.trace("[openfl.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 194, className : "openfl.Assets", methodName : "getBytes"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 200, className : "openfl.Assets", methodName : "getBytes"});
	return null;
};
openfl.Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.font.exists(id)) return openfl.Assets.cache.font.get(id);
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.FONT)) {
			if(library.isLocal(symbolName,openfl.AssetType.FONT)) {
				var font = library.getFont(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.font.set(id,font);
				return font;
			} else haxe.Log.trace("[openfl.Assets] Font asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 251, className : "openfl.Assets", methodName : "getFont"});
		} else haxe.Log.trace("[openfl.Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 257, className : "openfl.Assets", methodName : "getFont"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 263, className : "openfl.Assets", methodName : "getFont"});
	return null;
};
openfl.Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return openfl.Assets.libraries.get(name);
};
openfl.Assets.getMovieClip = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MOVIE_CLIP)) {
			if(library.isLocal(symbolName,openfl.AssetType.MOVIE_CLIP)) return library.getMovieClip(symbolName); else haxe.Log.trace("[openfl.Assets] MovieClip asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 313, className : "openfl.Assets", methodName : "getMovieClip"});
		} else haxe.Log.trace("[openfl.Assets] There is no MovieClip asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 319, className : "openfl.Assets", methodName : "getMovieClip"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 325, className : "openfl.Assets", methodName : "getMovieClip"});
	return null;
};
openfl.Assets.getMusic = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) return sound;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MUSIC)) {
			if(library.isLocal(symbolName,openfl.AssetType.MUSIC)) {
				var sound1 = library.getMusic(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.sound.set(id,sound1);
				return sound1;
			} else haxe.Log.trace("[openfl.Assets] Sound asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 382, className : "openfl.Assets", methodName : "getMusic"});
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 388, className : "openfl.Assets", methodName : "getMusic"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 394, className : "openfl.Assets", methodName : "getMusic"});
	return null;
};
openfl.Assets.getPath = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,null)) return library.getPath(symbolName); else haxe.Log.trace("[openfl.Assets] There is no asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 429, className : "openfl.Assets", methodName : "getPath"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 435, className : "openfl.Assets", methodName : "getPath"});
	return null;
};
openfl.Assets.getSound = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) return sound;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.SOUND)) {
			if(library.isLocal(symbolName,openfl.AssetType.SOUND)) {
				var sound1 = library.getSound(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.sound.set(id,sound1);
				return sound1;
			} else haxe.Log.trace("[openfl.Assets] Sound asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 492, className : "openfl.Assets", methodName : "getSound"});
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 498, className : "openfl.Assets", methodName : "getSound"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 504, className : "openfl.Assets", methodName : "getSound"});
	return null;
};
openfl.Assets.getText = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.TEXT)) {
			if(library.isLocal(symbolName,openfl.AssetType.TEXT)) return library.getText(symbolName); else haxe.Log.trace("[openfl.Assets] String asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 541, className : "openfl.Assets", methodName : "getText"});
		} else haxe.Log.trace("[openfl.Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 547, className : "openfl.Assets", methodName : "getText"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 553, className : "openfl.Assets", methodName : "getText"});
	return null;
};
openfl.Assets.hasEventListener = function(type) {
	openfl.Assets.initialize();
	return openfl.Assets.dispatcher.hasEventListener(type);
};
openfl.Assets.initialize = function() {
	if(!openfl.Assets.initialized) {
		openfl.Assets.registerLibrary("default",new DefaultAssetLibrary());
		openfl.Assets.initialized = true;
	}
};
openfl.Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled) {
		if(type == openfl.AssetType.IMAGE || type == null) {
			if(openfl.Assets.cache.bitmapData.exists(id)) return true;
		}
		if(type == openfl.AssetType.FONT || type == null) {
			if(openfl.Assets.cache.font.exists(id)) return true;
		}
		if(type == openfl.AssetType.SOUND || type == openfl.AssetType.MUSIC || type == null) {
			if(openfl.Assets.cache.sound.exists(id)) return true;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) return library.isLocal(symbolName,type);
	return false;
};
openfl.Assets.isValidBitmapData = function(bitmapData) {
	return bitmapData.__sourceImage != null || bitmapData.__sourceCanvas != null;
	return true;
};
openfl.Assets.isValidSound = function(sound) {
	return true;
};
openfl.Assets.list = function(type) {
	openfl.Assets.initialize();
	var items = [];
	var $it0 = openfl.Assets.libraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var libraryItems = library.list(type);
		if(libraryItems != null) items = items.concat(libraryItems);
	}
	return items;
};
openfl.Assets.loadBitmapData = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.bitmapData.exists(id)) {
		var bitmapData = openfl.Assets.cache.bitmapData.get(id);
		if(openfl.Assets.isValidBitmapData(bitmapData)) {
			handler(bitmapData);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.IMAGE)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadBitmapData(symbolName,function(bitmapData1) {
				openfl.Assets.cache.bitmapData.set(id,bitmapData1);
				handler(bitmapData1);
			}); else library.loadBitmapData(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no BitmapData asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 750, className : "openfl.Assets", methodName : "loadBitmapData"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 756, className : "openfl.Assets", methodName : "loadBitmapData"});
	handler(null);
};
openfl.Assets.loadBytes = function(id,handler) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.BINARY)) {
			library.loadBytes(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 786, className : "openfl.Assets", methodName : "loadBytes"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 792, className : "openfl.Assets", methodName : "loadBytes"});
	handler(null);
};
openfl.Assets.loadFont = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.font.exists(id)) {
		handler(openfl.Assets.cache.font.get(id));
		return;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.FONT)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadFont(symbolName,function(font) {
				openfl.Assets.cache.font.set(id,font);
				handler(font);
			}); else library.loadFont(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 843, className : "openfl.Assets", methodName : "loadFont"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 849, className : "openfl.Assets", methodName : "loadFont"});
	handler(null);
};
openfl.Assets.loadLibrary = function(name,handler) {
	openfl.Assets.initialize();
	var data = openfl.Assets.getText("libraries/" + name + ".dat");
	if(data != null && data != "") {
		var unserializer = new haxe.Unserializer(data);
		unserializer.setResolver({ resolveEnum : openfl.Assets.resolveEnum, resolveClass : openfl.Assets.resolveClass});
		var library = unserializer.unserialize();
		openfl.Assets.libraries.set(name,library);
		library.eventCallback = openfl.Assets.library_onEvent;
		library.load(handler);
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + name + "\"",{ fileName : "Assets.hx", lineNumber : 880, className : "openfl.Assets", methodName : "loadLibrary"});
};
openfl.Assets.loadMusic = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) {
			handler(sound);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MUSIC)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadMusic(symbolName,function(sound1) {
				openfl.Assets.cache.sound.set(id,sound1);
				handler(sound1);
			}); else library.loadMusic(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 935, className : "openfl.Assets", methodName : "loadMusic"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 941, className : "openfl.Assets", methodName : "loadMusic"});
	handler(null);
};
openfl.Assets.loadMovieClip = function(id,handler) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MOVIE_CLIP)) {
			library.loadMovieClip(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no MovieClip asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 971, className : "openfl.Assets", methodName : "loadMovieClip"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 977, className : "openfl.Assets", methodName : "loadMovieClip"});
	handler(null);
};
openfl.Assets.loadSound = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) {
			handler(sound);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.SOUND)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadSound(symbolName,function(sound1) {
				openfl.Assets.cache.sound.set(id,sound1);
				handler(sound1);
			}); else library.loadSound(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 1034, className : "openfl.Assets", methodName : "loadSound"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 1040, className : "openfl.Assets", methodName : "loadSound"});
	handler(null);
};
openfl.Assets.loadText = function(id,handler) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.TEXT)) {
			library.loadText(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 1070, className : "openfl.Assets", methodName : "loadText"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 1076, className : "openfl.Assets", methodName : "loadText"});
	handler(null);
};
openfl.Assets.registerLibrary = function(name,library) {
	if(openfl.Assets.libraries.exists(name)) openfl.Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = openfl.Assets.library_onEvent;
	openfl.Assets.libraries.set(name,library);
};
openfl.Assets.removeEventListener = function(type,listener,capture) {
	if(capture == null) capture = false;
	openfl.Assets.initialize();
	openfl.Assets.dispatcher.removeEventListener(type,listener,capture);
};
openfl.Assets.resolveClass = function(name) {
	return Type.resolveClass(name);
};
openfl.Assets.resolveEnum = function(name) {
	var value = Type.resolveEnum(name);
	return value;
};
openfl.Assets.unloadLibrary = function(name) {
	openfl.Assets.initialize();
	var library = openfl.Assets.libraries.get(name);
	if(library != null) {
		openfl.Assets.cache.clear(name + ":");
		library.eventCallback = null;
	}
	openfl.Assets.libraries.remove(name);
};
openfl.Assets.library_onEvent = function(library,type) {
	if(type == "change") {
		openfl.Assets.cache.clear();
		openfl.Assets.dispatchEvent(new openfl.events.Event(openfl.events.Event.CHANGE));
	}
};
openfl.AssetData = function() {
};
$hxClasses["openfl.AssetData"] = openfl.AssetData;
openfl.AssetData.__name__ = ["openfl","AssetData"];
openfl.AssetData.prototype = {
	__class__: openfl.AssetData
};
openfl.AssetType = $hxClasses["openfl.AssetType"] = { __ename__ : ["openfl","AssetType"], __constructs__ : ["BINARY","FONT","IMAGE","MOVIE_CLIP","MUSIC","SOUND","TEMPLATE","TEXT"] };
openfl.AssetType.BINARY = ["BINARY",0];
openfl.AssetType.BINARY.toString = $estr;
openfl.AssetType.BINARY.__enum__ = openfl.AssetType;
openfl.AssetType.FONT = ["FONT",1];
openfl.AssetType.FONT.toString = $estr;
openfl.AssetType.FONT.__enum__ = openfl.AssetType;
openfl.AssetType.IMAGE = ["IMAGE",2];
openfl.AssetType.IMAGE.toString = $estr;
openfl.AssetType.IMAGE.__enum__ = openfl.AssetType;
openfl.AssetType.MOVIE_CLIP = ["MOVIE_CLIP",3];
openfl.AssetType.MOVIE_CLIP.toString = $estr;
openfl.AssetType.MOVIE_CLIP.__enum__ = openfl.AssetType;
openfl.AssetType.MUSIC = ["MUSIC",4];
openfl.AssetType.MUSIC.toString = $estr;
openfl.AssetType.MUSIC.__enum__ = openfl.AssetType;
openfl.AssetType.SOUND = ["SOUND",5];
openfl.AssetType.SOUND.toString = $estr;
openfl.AssetType.SOUND.__enum__ = openfl.AssetType;
openfl.AssetType.TEMPLATE = ["TEMPLATE",6];
openfl.AssetType.TEMPLATE.toString = $estr;
openfl.AssetType.TEMPLATE.__enum__ = openfl.AssetType;
openfl.AssetType.TEXT = ["TEXT",7];
openfl.AssetType.TEXT.toString = $estr;
openfl.AssetType.TEXT.__enum__ = openfl.AssetType;
openfl.Lib = function() { };
$hxClasses["openfl.Lib"] = openfl.Lib;
openfl.Lib.__name__ = ["openfl","Lib"];
openfl.Lib.current = null;
openfl.Lib["as"] = function(v,c) {
	if(js.Boot.__instanceof(v,c)) return v; else return null;
};
openfl.Lib.attach = function(name) {
	return new openfl.display.MovieClip();
};
openfl.Lib.create = function(element,width,height,backgroundColor) {
	if(width == null) width = 0;
	if(height == null) height = 0;
	
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										   || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
	var stage = new openfl.display.Stage(width,height,element,backgroundColor);
	if(openfl.Lib.current == null) {
		openfl.Lib.current = new openfl.display.MovieClip();
		stage.addChild(openfl.Lib.current);
	}
};
openfl.Lib.getTimer = function() {
	return Std["int"]((haxe.Timer.stamp() - openfl.Lib.__startTime) * 1000);
};
openfl.Lib.getURL = function(request,target) {
	if(target == null) target = "_blank";
	window.open(request.url,target);
};
openfl.Lib.notImplemented = function(api) {
	if(!openfl.Lib.__sentWarnings.exists(api)) {
		openfl.Lib.__sentWarnings.set(api,true);
		haxe.Log.trace("Warning: " + api + " has not implemented",{ fileName : "Lib.hx", lineNumber : 114, className : "openfl.Lib", methodName : "notImplemented"});
	}
};
openfl.Lib.preventDefaultTouchMove = function() {
	window.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
};
openfl.Lib.trace = function(arg) {
	haxe.Log.trace(arg,{ fileName : "Lib.hx", lineNumber : 134, className : "openfl.Lib", methodName : "trace"});
};
openfl._Vector = {};
openfl._Vector.Vector_Impl_ = function() { };
$hxClasses["openfl._Vector.Vector_Impl_"] = openfl._Vector.Vector_Impl_;
openfl._Vector.Vector_Impl_.__name__ = ["openfl","_Vector","Vector_Impl_"];
openfl._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
openfl._Vector.Vector_Impl_._new = function(length,fixed) {
	if(fixed == null) fixed = false;
	if(length == null) length = 0;
	var this1;
	this1 = new openfl.VectorData();
	var this2;
	this2 = new Array(length);
	this1.data = this2;
	this1.length = length;
	this1.fixed = fixed;
	return this1;
};
openfl._Vector.Vector_Impl_.concat = function(this1,a) {
	var vectorData = new openfl.VectorData();
	if(a != null) vectorData.length = this1.length + a.length; else vectorData.length = this1.length;
	vectorData.fixed = false;
	var this2;
	this2 = new Array(vectorData.length);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
	if(a != null) haxe.ds._Vector.Vector_Impl_.blit(a.data,0,vectorData.data,this1.length,a.length);
	return vectorData;
};
openfl._Vector.Vector_Impl_.copy = function(this1) {
	var vectorData = new openfl.VectorData();
	vectorData.length = this1.length;
	vectorData.fixed = this1.fixed;
	var this2;
	this2 = new Array(this1.length);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,vectorData.data,0,this1.length);
	return vectorData;
};
openfl._Vector.Vector_Impl_.iterator = function(this1) {
	return new openfl.VectorDataIterator(this1);
};
openfl._Vector.Vector_Impl_.join = function(this1,sep) {
	var output = "";
	var _g1 = 0;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(i > 0) output += sep;
		output += Std.string(this1.data[i]);
	}
	return output;
};
openfl._Vector.Vector_Impl_.pop = function(this1) {
	if(!this1.fixed) {
		if(this1.length > 0) {
			this1.length--;
			return this1.data[this1.length];
		}
	}
	return null;
};
openfl._Vector.Vector_Impl_.push = function(this1,x) {
	if(!this1.fixed) {
		this1.length++;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.data.length + 10);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,this1.data.length);
			this1.data = data;
		}
		this1.data[this1.length - 1] = x;
	}
	return this1.length;
};
openfl._Vector.Vector_Impl_.reverse = function(this1) {
	var data;
	var this2;
	this2 = new Array(this1.length);
	data = this2;
	var _g1 = 0;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		data[this1.length - 1 - i] = this1.data[i];
	}
	this1.data = data;
};
openfl._Vector.Vector_Impl_.shift = function(this1) {
	if(!this1.fixed && this1.length > 0) {
		var value = this1.data[0];
		this1.length--;
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,1,this1.data,0,this1.length);
		return value;
	}
	return null;
};
openfl._Vector.Vector_Impl_.unshift = function(this1,x) {
	if(!this1.fixed) {
		this1.length++;
		if(this1.data.length < this1.length) {
			var data;
			var this2;
			this2 = new Array(this1.length + 10);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,1,this1.data.length);
			this1.data = data;
		} else haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,this1.data,1,this1.length - 1);
		this1.data[0] = x;
	}
};
openfl._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	if(end == null) end = 0;
	if(pos == null) pos = 0;
	if(pos < 0) pos += this1.length;
	if(end <= 0) end += this1.length;
	if(end > this1.length) end = this1.length;
	var length = end - pos;
	if(length <= 0 || length > this1.length) length = this1.length;
	var vectorData = new openfl.VectorData();
	vectorData.length = end - pos;
	vectorData.fixed = true;
	var this2;
	this2 = new Array(length);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,pos,vectorData.data,0,length);
	return vectorData;
};
openfl._Vector.Vector_Impl_.sort = function(this1,f) {
	var array = haxe.ds._Vector.Vector_Impl_.toArray(this1.data);
	array.sort(f);
	var vec;
	var this2;
	this2 = new Array(array.length);
	vec = this2;
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = array[i];
	}
	this1.data = vec;
};
openfl._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	if(pos < 0) pos += this1.length;
	if(pos + len > this1.length) len = this1.length - pos;
	if(len < 0) len = 0;
	var vectorData = new openfl.VectorData();
	vectorData.length = len;
	vectorData.fixed = false;
	var this2;
	this2 = new Array(len);
	vectorData.data = this2;
	haxe.ds._Vector.Vector_Impl_.blit(this1.data,pos,vectorData.data,0,len);
	if(len > 0) {
		this1.length -= len;
		haxe.ds._Vector.Vector_Impl_.blit(this1.data,pos + len,this1.data,pos,this1.length - pos);
	}
	return vectorData;
};
openfl._Vector.Vector_Impl_.toString = function(this1) {
	return "";
};
openfl._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1.data[i] == x) return i;
	}
	return -1;
};
openfl._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1.data[i] == x) return i;
		i--;
	}
	return -1;
};
openfl._Vector.Vector_Impl_.ofArray = function(a) {
	var vectorData = new openfl.VectorData();
	vectorData.length = a.length;
	vectorData.fixed = true;
	var vec;
	var this1;
	this1 = new Array(a.length);
	vec = this1;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = a[i];
	}
	vectorData.data = vec;
	return vectorData;
};
openfl._Vector.Vector_Impl_.convert = function(v) {
	return v;
};
openfl._Vector.Vector_Impl_.arrayAccess = function(this1,key) {
	return this1.data[key];
};
openfl._Vector.Vector_Impl_.arrayWrite = function(this1,key,value) {
	return this1.data[key] = value;
};
openfl._Vector.Vector_Impl_.fromArray = function(value) {
	var vectorData = new openfl.VectorData();
	vectorData.length = value.length;
	vectorData.fixed = true;
	var vec;
	var this1;
	this1 = new Array(value.length);
	vec = this1;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = value[i];
	}
	vectorData.data = vec;
	return vectorData;
};
openfl._Vector.Vector_Impl_.toArray = function(this1) {
	var value = new Array();
	var _g1 = 0;
	var _g = this1.data.length;
	while(_g1 < _g) {
		var i = _g1++;
		value.push(this1.data[i]);
	}
	return value;
};
openfl._Vector.Vector_Impl_.fromHaxeVector = function(value) {
	var vectorData = new openfl.VectorData();
	vectorData.length = value.length;
	vectorData.fixed = true;
	vectorData.data = value;
	return vectorData;
};
openfl._Vector.Vector_Impl_.toHaxeVector = function(this1) {
	return this1.data;
};
openfl._Vector.Vector_Impl_.fromVectorData = function(value) {
	return value;
};
openfl._Vector.Vector_Impl_.toVectorData = function(this1) {
	return this1;
};
openfl._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
};
openfl._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(!this1.fixed) {
		if(value > this1.length) {
			var data;
			var this2;
			this2 = new Array(value);
			data = this2;
			haxe.ds._Vector.Vector_Impl_.blit(this1.data,0,data,0,Std["int"](Math.min(this1.data.length,value)));
			this1.data = data;
		}
		this1.length = value;
	}
	return value;
};
openfl._Vector.Vector_Impl_.get_fixed = function(this1) {
	return this1.fixed;
};
openfl._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return this1.fixed = value;
};
openfl.VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl.VectorData;
openfl.VectorData.__name__ = ["openfl","VectorData"];
openfl.VectorData.prototype = {
	__class__: openfl.VectorData
};
openfl.VectorDataIterator = function(data) {
	this.index = 0;
	this.vectorData = data;
};
$hxClasses["openfl.VectorDataIterator"] = openfl.VectorDataIterator;
openfl.VectorDataIterator.__name__ = ["openfl","VectorDataIterator"];
openfl.VectorDataIterator.prototype = {
	hasNext: function() {
		return this.index < this.vectorData.length;
	}
	,next: function() {
		var index = this.index++;
		return this.vectorData.data[index];
	}
	,__class__: openfl.VectorDataIterator
};
openfl.display.Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	openfl.display.DisplayObjectContainer.call(this);
	this.bitmapData = bitmapData;
	this.pixelSnapping = pixelSnapping;
	this.smoothing = smoothing;
	if(pixelSnapping == null) this.pixelSnapping = openfl.display.PixelSnapping.AUTO;
};
$hxClasses["openfl.display.Bitmap"] = openfl.display.Bitmap;
openfl.display.Bitmap.__name__ = ["openfl","display","Bitmap"];
openfl.display.Bitmap.__super__ = openfl.display.DisplayObjectContainer;
openfl.display.Bitmap.prototype = $extend(openfl.display.DisplayObjectContainer.prototype,{
	__getBounds: function(rect,matrix) {
		if(this.bitmapData != null) {
			var bounds = new openfl.geom.Rectangle(0,0,this.bitmapData.width,this.bitmapData.height);
			bounds = bounds.transform(this.__worldTransform);
			rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || this.bitmapData == null) return false;
		var point = this.globalToLocal(new openfl.geom.Point(x,y));
		if(point.x > 0 && point.y > 0 && point.x <= this.bitmapData.width && point.y <= this.bitmapData.height) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		var context = renderSession.context;
		if(this.bitmapData != null && this.bitmapData.__valid) {
			if(this.__mask != null) renderSession.maskManager.pushMask(this.__mask);
			this.bitmapData.__syncImageData();
			context.globalAlpha = this.__worldAlpha;
			var transform = this.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(!this.smoothing) {
				context.mozImageSmoothingEnabled = false;
				context.webkitImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
			}
			if(this.get_scrollRect() == null) {
				if(this.bitmapData.__sourceImage != null) context.drawImage(this.bitmapData.__sourceImage,0,0); else context.drawImage(this.bitmapData.__sourceCanvas,0,0);
			} else if(this.bitmapData.__sourceImage != null) context.drawImage(this.bitmapData.__sourceImage,this.get_scrollRect().x,this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height,this.get_scrollRect().x,this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height); else context.drawImage(this.bitmapData.__sourceCanvas,this.get_scrollRect().x,this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height,this.get_scrollRect().x,this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
			if(!this.smoothing) {
				context.mozImageSmoothingEnabled = true;
				context.webkitImageSmoothingEnabled = true;
				context.imageSmoothingEnabled = true;
			}
			if(this.__mask != null) renderSession.maskManager.popMask();
		}
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable && this.bitmapData != null && this.bitmapData.__valid) {
			if(this.bitmapData.__sourceImage != null) this.__renderDOMImage(renderSession); else this.__renderDOMCanvas(renderSession);
		} else {
			if(this.__image != null) {
				renderSession.element.removeChild(this.__image);
				this.__image = null;
				this.__style = null;
			}
			if(this.__canvas != null) {
				renderSession.element.removeChild(this.__canvas);
				this.__canvas = null;
				this.__style = null;
			}
		}
	}
	,__renderDOMCanvas: function(renderSession) {
		if(this.__image != null) {
			renderSession.element.removeChild(this.__image);
			this.__image = null;
		}
		if(this.__canvas == null) {
			this.__canvas = window.document.createElement("canvas");
			this.__canvasContext = this.__canvas.getContext("2d");
			if(!this.smoothing) {
				this.__canvasContext.mozImageSmoothingEnabled = false;
				this.__canvasContext.webkitImageSmoothingEnabled = false;
				this.__canvasContext.imageSmoothingEnabled = false;
			}
			this.__initializeElement(this.__canvas,renderSession);
		}
		this.bitmapData.__syncImageData();
		this.__canvas.width = this.bitmapData.width;
		this.__canvas.height = this.bitmapData.height;
		this.__canvasContext.globalAlpha = this.__worldAlpha;
		this.__canvasContext.drawImage(this.bitmapData.__sourceCanvas,0,0);
		this.__applyStyle(renderSession,true,false,true);
	}
	,__renderDOMImage: function(renderSession) {
		if(this.__canvas != null) {
			renderSession.element.removeChild(this.__canvas);
			this.__canvas = null;
		}
		if(this.__image == null) {
			this.__image = window.document.createElement("img");
			this.__image.src = this.bitmapData.__sourceImage.src;
			this.__initializeElement(this.__image,renderSession);
		}
		this.__applyStyle(renderSession,true,true,true);
	}
	,__renderMask: function(renderSession) {
		renderSession.context.rect(0,0,this.get_width(),this.get_height());
	}
	,get_height: function() {
		if(this.bitmapData != null) return this.bitmapData.height * this.get_scaleY();
		return 0;
	}
	,set_height: function(value) {
		if(this.bitmapData != null) {
			if(value != this.bitmapData.height) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl.display.DisplayObject.__worldTransformDirty++;
				}
				this.set_scaleY(value / this.bitmapData.height);
			}
			return value;
		}
		return 0;
	}
	,get_width: function() {
		if(this.bitmapData != null) return this.bitmapData.width * this.get_scaleX();
		return 0;
	}
	,set_width: function(value) {
		if(this.bitmapData != null) {
			if(value != this.bitmapData.width) {
				if(!this.__transformDirty) {
					this.__transformDirty = true;
					openfl.display.DisplayObject.__worldTransformDirty++;
				}
				this.set_scaleX(value / this.bitmapData.width);
			}
			return value;
		}
		return 0;
	}
	,__class__: openfl.display.Bitmap
});
openfl.display.BitmapData = function(width,height,transparent,fillColor) {
	if(fillColor == null) fillColor = -1;
	if(transparent == null) transparent = true;
	this.transparent = transparent;
	if(width > 0 && height > 0) {
		this.width = width;
		this.height = height;
		this.rect = new openfl.geom.Rectangle(0,0,width,height);
		this.__createCanvas(width,height);
		if(!transparent) fillColor = -16777216 | fillColor & 16777215;
		this.__fillRect(new openfl.geom.Rectangle(0,0,width,height),fillColor);
	}
};
$hxClasses["openfl.display.BitmapData"] = openfl.display.BitmapData;
openfl.display.BitmapData.__name__ = ["openfl","display","BitmapData"];
openfl.display.BitmapData.__interfaces__ = [openfl.display.IBitmapDrawable];
openfl.display.BitmapData.__base64Encoder = null;
openfl.display.BitmapData.fromBase64 = function(base64,type,onload) {
	var bitmapData = new openfl.display.BitmapData(0,0,true);
	bitmapData.__loadFromBase64(base64,type,onload);
	return bitmapData;
};
openfl.display.BitmapData.fromBytes = function(bytes,rawAlpha,onload) {
	var bitmapData = new openfl.display.BitmapData(0,0,true);
	bitmapData.__loadFromBytes(bytes,rawAlpha,onload);
	return bitmapData;
};
openfl.display.BitmapData.fromFile = function(path,onload,onfail) {
	var bitmapData = new openfl.display.BitmapData(0,0,true);
	bitmapData.__sourceImage = new Image();
	bitmapData.__sourceImage.onload = function(_) {
		bitmapData.width = bitmapData.__sourceImage.width;
		bitmapData.height = bitmapData.__sourceImage.height;
		bitmapData.rect = new openfl.geom.Rectangle(0,0,bitmapData.__sourceImage.width,bitmapData.__sourceImage.height);
		bitmapData.__valid = true;
		if(onload != null) onload(bitmapData);
	};
	bitmapData.__sourceImage.onerror = function(_1) {
		bitmapData.__valid = false;
		if(onfail != null) onfail();
	};
	bitmapData.__sourceImage.src = path;
	if(bitmapData.__sourceImage.complete) {
	}
	return bitmapData;
};
openfl.display.BitmapData.fromImage = function(image,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl.display.BitmapData(0,0,transparent);
	bitmapData.__sourceImage = image;
	bitmapData.width = image.width;
	bitmapData.height = image.height;
	bitmapData.rect = new openfl.geom.Rectangle(0,0,image.width,image.height);
	bitmapData.__valid = true;
	return bitmapData;
};
openfl.display.BitmapData.fromCanvas = function(canvas,transparent) {
	if(transparent == null) transparent = true;
	var bitmapData = new openfl.display.BitmapData(0,0,transparent);
	bitmapData.width = canvas.width;
	bitmapData.height = canvas.height;
	bitmapData.rect = new openfl.geom.Rectangle(0,0,canvas.width,canvas.height);
	bitmapData.__createCanvas(canvas.width,canvas.height);
	bitmapData.__sourceContext.drawImage(canvas,0,0);
	return bitmapData;
};
openfl.display.BitmapData.__base64Encode = function(bytes) {
	var extension;
	var _g = bytes.length % 3;
	switch(_g) {
	case 1:
		extension = "==";
		break;
	case 2:
		extension = "=";
		break;
	default:
		extension = "";
	}
	if(openfl.display.BitmapData.__base64Encoder == null) openfl.display.BitmapData.__base64Encoder = new haxe.crypto.BaseCode(haxe.io.Bytes.ofString(openfl.display.BitmapData.__base64Chars));
	return openfl.display.BitmapData.__base64Encoder.encodeBytes(haxe.io.Bytes.ofData(bytes.byteView)).toString() + extension;
};
openfl.display.BitmapData.__isJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 255 && bytes.readByte() == 216;
};
openfl.display.BitmapData.__isPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 137 && bytes.readByte() == 80 && bytes.readByte() == 78 && bytes.readByte() == 71 && bytes.readByte() == 13 && bytes.readByte() == 10 && bytes.readByte() == 26 && bytes.readByte() == 10;
};
openfl.display.BitmapData.__isGIF = function(bytes) {
	bytes.position = 0;
	if(bytes.readByte() == 71 && bytes.readByte() == 73 && bytes.readByte() == 70 && bytes.readByte() == 38) {
		var b = bytes.readByte();
		return (b == 7 || b == 9) && bytes.readByte() == 97;
	}
	return false;
};
openfl.display.BitmapData.prototype = {
	applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(!this.__valid || sourceBitmapData == null || !sourceBitmapData.__valid) return;
		this.__convertToCanvas();
		this.__createImageData();
		sourceBitmapData.__convertToCanvas();
		sourceBitmapData.__createImageData();
		filter.__applyFilter(this.__sourceImageData,sourceBitmapData.__sourceImageData,sourceRect,destPoint);
		this.__sourceImageDataChanged = true;
	}
	,clone: function() {
		this.__syncImageData();
		if(!this.__valid) return new openfl.display.BitmapData(this.width,this.height,this.transparent); else if(this.__sourceImage != null) return openfl.display.BitmapData.fromImage(this.__sourceImage,this.transparent); else return openfl.display.BitmapData.fromCanvas(this.__sourceCanvas,this.transparent);
	}
	,colorTransform: function(rect,colorTransform) {
		rect = this.__clipRect(rect);
		if(!this.__valid || rect == null) return;
		this.__convertToCanvas();
		this.__createImageData();
		var data = this.__sourceImageData.data;
		var stride = this.width * 4;
		var offset;
		var _g1 = rect.y | 0;
		var _g = rect.height | 0;
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = rect.x | 0;
			var _g2 = rect.width | 0;
			while(_g3 < _g2) {
				var column = _g3++;
				offset = row * stride + column * 4;
				data[offset] = data[offset] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				data[offset + 1] = data[offset + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				data[offset + 2] = data[offset + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				data[offset + 3] = data[offset + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
		}
		this.__sourceImageDataChanged = true;
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		sourceRect = this.__clipRect(sourceRect);
		if(!this.__valid || sourceRect == null) return;
		if(destChannel == 8 && !this.transparent) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData.width) sourceRect.width = sourceBitmapData.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData.height) sourceRect.height = sourceBitmapData.height - sourceRect.y;
		var destIdx = -1;
		if(destChannel == 8) destIdx = 3; else if(destChannel == 4) destIdx = 2; else if(destChannel == 2) destIdx = 1; else if(destChannel == 1) destIdx = 0; else throw "Invalid destination BitmapDataChannel passed to BitmapData::copyChannel.";
		var srcIdx = -1;
		if(sourceChannel == 8) srcIdx = 3; else if(sourceChannel == 4) srcIdx = 2; else if(sourceChannel == 2) srcIdx = 1; else if(sourceChannel == 1) srcIdx = 0; else throw "Invalid source BitmapDataChannel passed to BitmapData::copyChannel.";
		sourceBitmapData.__convertToCanvas();
		sourceBitmapData.__createImageData();
		var srcData = sourceBitmapData.__sourceImageData.data;
		var srcStride = sourceBitmapData.width * 4 | 0;
		var srcPosition = sourceRect.x * 4 + srcStride * sourceRect.y + srcIdx | 0;
		var srcRowOffset = srcStride - (4 * sourceRect.width | 0);
		var srcRowEnd = 4 * (sourceRect.x + sourceRect.width) | 0;
		this.__convertToCanvas();
		this.__createImageData();
		var destData = this.__sourceImageData.data;
		var destStride = this.width * 4 | 0;
		var destPosition = destPoint.x * 4 + destStride * destPoint.y + destIdx | 0;
		var destRowOffset = destStride - (4 * sourceRect.width | 0);
		var destRowEnd = 4 * (destPoint.x + sourceRect.width) | 0;
		var length = sourceRect.width * sourceRect.height | 0;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			destData[destPosition] = srcData[srcPosition];
			srcPosition += 4;
			destPosition += 4;
			if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
			if(destPosition % destStride > destRowEnd) destPosition += destRowOffset;
		}
		this.__sourceImageDataChanged = true;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(!this.__valid) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData.width) sourceRect.width = sourceBitmapData.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData.height) sourceRect.height = sourceBitmapData.height - sourceRect.y;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(alphaBitmapData != null && alphaBitmapData.transparent) {
			if(alphaPoint == null) alphaPoint = new openfl.geom.Point();
			var tempData = this.clone();
			tempData.copyChannel(alphaBitmapData,new openfl.geom.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new openfl.geom.Point(sourceRect.x,sourceRect.y),8,8);
			sourceBitmapData = tempData;
		}
		this.__syncImageData();
		if(!mergeAlpha) {
			if(this.transparent && sourceBitmapData.transparent) this.__sourceContext.clearRect(destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		}
		sourceBitmapData.__syncImageData();
		if(sourceBitmapData.__sourceImage != null) this.__sourceContext.drawImage(sourceBitmapData.__sourceImage,sourceRect.x | 0,sourceRect.y | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x | 0,destPoint.y | 0,sourceRect.width | 0,sourceRect.height | 0); else if(sourceBitmapData.__sourceCanvas != null) this.__sourceContext.drawImage(sourceBitmapData.__sourceCanvas,sourceRect.x | 0,sourceRect.y | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x | 0,destPoint.y | 0,sourceRect.width | 0,sourceRect.height | 0);
	}
	,dispose: function() {
		this.__sourceImage = null;
		this.__sourceCanvas = null;
		this.__sourceContext = null;
		this.width = 0;
		this.height = 0;
		this.rect = null;
		this.__valid = false;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		if(!this.__valid) return;
		this.__convertToCanvas();
		this.__syncImageData();
		var renderSession = new openfl.display.RenderSession();
		renderSession.context = this.__sourceContext;
		renderSession.roundPixels = true;
		if(!smoothing) {
			this.__sourceContext.mozImageSmoothingEnabled = false;
			this.__sourceContext.webkitImageSmoothingEnabled = false;
			this.__sourceContext.imageSmoothingEnabled = false;
		}
		var matrixCache = source.__worldTransform;
		if(matrix != null) source.__worldTransform = matrix; else source.__worldTransform = new openfl.geom.Matrix();
		source.__updateChildren(false);
		source.__renderCanvas(renderSession);
		source.__worldTransform = matrixCache;
		source.__updateChildren(true);
		if(!smoothing) {
			this.__sourceContext.mozImageSmoothingEnabled = true;
			this.__sourceContext.webkitImageSmoothingEnabled = true;
			this.__sourceContext.imageSmoothingEnabled = true;
		}
		this.__sourceContext.setTransform(1,0,0,1,0,0);
	}
	,encode: function(rect,compressor,byteArray) {
		openfl.Lib.notImplemented("BitmapData.encode");
		return null;
	}
	,fillRect: function(rect,color) {
		rect = this.__clipRect(rect);
		if(!this.__valid || rect == null) return;
		this.__convertToCanvas();
		this.__syncImageData();
		if(rect.x == 0 && rect.y == 0 && rect.width == this.width && rect.height == this.height) {
			if(this.transparent && (color & -16777216) == 0) {
				this.__sourceCanvas.width = this.width;
				return;
			}
		}
		this.__fillRect(rect,color);
	}
	,floodFill: function(x,y,color) {
		if(!this.__valid) return;
		this.__convertToCanvas();
		this.__createImageData();
		var data = this.__sourceImageData.data;
		var offset = y * (this.width * 4) + x * 4;
		var hitColorR = data[offset];
		var hitColorG = data[offset + 1];
		var hitColorB = data[offset + 2];
		var hitColorA;
		if(this.transparent) hitColorA = data[offset + 3]; else hitColorA = 255;
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a;
		if(this.transparent) a = (color & -16777216) >>> 24; else a = 255;
		if(hitColorR == r && hitColorG == g && hitColorB == b && hitColorA == a) return;
		var dx = [0,-1,1,0];
		var dy = [-1,0,0,1];
		var queue = new Array();
		queue.push(x);
		queue.push(y);
		while(queue.length > 0) {
			var curPointY = queue.pop();
			var curPointX = queue.pop();
			var _g = 0;
			while(_g < 4) {
				var i = _g++;
				var nextPointX = curPointX + dx[i];
				var nextPointY = curPointY + dy[i];
				if(nextPointX < 0 || nextPointY < 0 || nextPointX >= this.width || nextPointY >= this.height) continue;
				var nextPointOffset = (nextPointY * this.width + nextPointX) * 4;
				if(data[nextPointOffset] == hitColorR && data[nextPointOffset + 1] == hitColorG && data[nextPointOffset + 2] == hitColorB && data[nextPointOffset + 3] == hitColorA) {
					data[nextPointOffset] = r;
					data[nextPointOffset + 1] = g;
					data[nextPointOffset + 2] = b;
					data[nextPointOffset + 3] = a;
					queue.push(nextPointX);
					queue.push(nextPointY);
				}
			}
		}
		this.__sourceImageDataChanged = true;
	}
	,generateFilterRect: function(sourceRect,filter) {
		return sourceRect.clone();
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		return this.rect.clone();
	}
	,getPixel: function(x,y) {
		if(!this.__valid || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		this.__convertToCanvas();
		this.__createImageData();
		var offset = 4 * y * this.width + x * 4;
		return this.__sourceImageData.data[offset] << 16 | this.__sourceImageData.data[offset + 1] << 8 | this.__sourceImageData.data[offset + 2];
	}
	,getPixel32: function(x,y) {
		if(!this.__valid || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		this.__convertToCanvas();
		this.__createImageData();
		return this.__getInt32(4 * y * this.width + x * 4,this.__sourceImageData.data);
	}
	,getPixels: function(rect) {
		if(!this.__valid) return null;
		this.__convertToCanvas();
		this.__createImageData();
		var byteArray = new openfl.utils.ByteArray();
		if(rect == null || rect.equals(this.rect)) {
			byteArray.set_length(this.__sourceImageData.data.length);
			byteArray.byteView.set(this.__sourceImageData.data);
		} else {
			var srcData = this.__sourceImageData.data;
			var srcStride = this.width * 4 | 0;
			var srcPosition = rect.x * 4 + srcStride * rect.y | 0;
			var srcRowOffset = srcStride - (4 * rect.width | 0);
			var srcRowEnd = 4 * (rect.x + rect.width) | 0;
			var length = 4 * rect.width * rect.height | 0;
			if(byteArray.allocated < length) byteArray.___resizeBuffer(byteArray.allocated = Std["int"](Math.max(length,byteArray.allocated * 2))); else if(byteArray.allocated > length) byteArray.___resizeBuffer(byteArray.allocated = length);
			byteArray.length = length;
			length;
			var _g = 0;
			while(_g < length) {
				var i = _g++;
				byteArray.__set(i,srcData[srcPosition++]);
				if(srcPosition % srcStride > srcRowEnd) srcPosition += srcRowOffset;
			}
		}
		byteArray.position = 0;
		return byteArray;
	}
	,getVector: function(rect) {
		openfl.Lib.notImplemented("BitmapData.getVector");
		var value = [];
		var vectorData = new openfl.VectorData();
		vectorData.length = value.length;
		vectorData.fixed = true;
		var vec;
		var this1;
		this1 = new Array(value.length);
		vec = this1;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			vec[i] = value[i];
		}
		vectorData.data = vec;
		return vectorData;
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		if(!this.__valid) return false;
		openfl.Lib.notImplemented("BitmapData.hitTest");
		return false;
	}
	,lock: function() {
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		if(!this.__valid) return;
		openfl.Lib.notImplemented("BitmapData.noise");
	}
	,perlinNoise: function(baseX,baseY,numOctaves,randomSeed,stitch,fractalNoise,channelOptions,grayScale,offsets) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		openfl.Lib.notImplemented("BitmapData.perlinNoise");
	}
	,scroll: function(x,y) {
		openfl.Lib.notImplemented("BitmapData.scroll");
	}
	,setVector: function(rect,pixels) {
		openfl.Lib.notImplemented("BitmapData.setVector");
	}
	,setPixel: function(x,y,color) {
		if(!this.__valid || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		this.__convertToCanvas();
		this.__createImageData();
		var offset = 4 * y * this.width + x * 4;
		this.__sourceImageData.data[offset] = (color & 16711680) >>> 16;
		this.__sourceImageData.data[offset + 1] = (color & 65280) >>> 8;
		this.__sourceImageData.data[offset + 2] = color & 255;
		if(this.transparent) this.__sourceImageData.data[offset + 3] = 255;
		this.__sourceImageDataChanged = true;
	}
	,setPixel32: function(x,y,color) {
		if(!this.__valid || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		this.__convertToCanvas();
		this.__createImageData();
		var offset = 4 * y * this.width + x * 4;
		this.__sourceImageData.data[offset] = (color & 16711680) >>> 16;
		this.__sourceImageData.data[offset + 1] = (color & 65280) >>> 8;
		this.__sourceImageData.data[offset + 2] = color & 255;
		if(this.transparent) this.__sourceImageData.data[offset + 3] = (color & -16777216) >>> 24; else this.__sourceImageData.data[offset + 3] = 255;
		this.__sourceImageDataChanged = true;
	}
	,setPixels: function(rect,byteArray) {
		rect = this.__clipRect(rect);
		if(!this.__valid || rect == null) return;
		this.__convertToCanvas();
		var len = Math.round(4 * rect.width * rect.height);
		if(rect.x == 0 && rect.y == 0 && rect.width == this.width && rect.height == this.height) {
			if(this.__sourceImageData == null) this.__sourceImageData = this.__sourceContext.createImageData(this.width,this.height);
			this.__sourceImageData.data.set(byteArray.byteView);
		} else {
			this.__createImageData();
			var offset = Math.round(4 * this.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var data = this.__sourceImageData.data;
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.width * 4) > boundR - 1) pos += this.width * 4 - boundR;
				data[pos] = byteArray.readByte();
				pos++;
			}
		}
		this.__sourceImageDataChanged = true;
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		openfl.Lib.notImplemented("BitmapData.threshold");
		return 0;
	}
	,unlock: function(changeRect) {
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__convertToCanvas: function() {
		if(this.__loading) return;
		if(this.__sourceImage != null) {
			if(this.__sourceCanvas == null) {
				this.__createCanvas(this.__sourceImage.width,this.__sourceImage.height);
				this.__sourceContext.drawImage(this.__sourceImage,0,0);
			}
			this.__sourceImage = null;
		}
	}
	,__createCanvas: function(width,height) {
		if(this.__sourceCanvas == null) {
			this.__sourceCanvas = window.document.createElement("canvas");
			this.__sourceCanvas.width = width;
			this.__sourceCanvas.height = height;
			if(!this.transparent) {
				if(!this.transparent) this.__sourceCanvas.setAttribute("moz-opaque","true");
				this.__sourceContext = this.__sourceCanvas.getContext ("2d", { alpha: false });
			} else this.__sourceContext = this.__sourceCanvas.getContext("2d");
			this.__sourceContext.mozImageSmoothingEnabled = false;
			this.__sourceContext.webkitImageSmoothingEnabled = false;
			this.__sourceContext.imageSmoothingEnabled = false;
			this.__valid = true;
		}
	}
	,__createImageData: function() {
		if(this.__sourceImageData == null) this.__sourceImageData = this.__sourceContext.getImageData(0,0,this.width,this.height);
	}
	,__fillRect: function(rect,color) {
		var a;
		if(this.transparent) a = (color & -16777216) >>> 24; else a = 255;
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		this.__sourceContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
		this.__sourceContext.fillRect(rect.x,rect.y,rect.width,rect.height);
	}
	,__getInt32: function(offset,data) {
		return (this.transparent?data[offset + 3]:255) << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
	}
	,__loadFromBase64: function(base64,type,onload) {
		var _g = this;
		this.__sourceImage = window.document.createElement("img");
		var image_onLoaded = function(event) {
			if(_g.__sourceImage == null) _g.__sourceImage = event.target;
			_g.width = _g.__sourceImage.width;
			_g.height = _g.__sourceImage.height;
			_g.rect = new openfl.geom.Rectangle(0,0,_g.width,_g.height);
			_g.__valid = true;
			if(onload != null) onload(_g);
		};
		this.__sourceImage.addEventListener("load",image_onLoaded,false);
		this.__sourceImage.src = "data:" + type + ";base64," + base64;
	}
	,__loadFromBytes: function(bytes,rawAlpha,onload) {
		var _g = this;
		var type = "";
		if(openfl.display.BitmapData.__isPNG(bytes)) type = "image/png"; else if(openfl.display.BitmapData.__isJPG(bytes)) type = "image/jpeg"; else if(openfl.display.BitmapData.__isGIF(bytes)) type = "image/gif"; else throw new openfl.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
		if(rawAlpha != null) this.__loadFromBase64(openfl.display.BitmapData.__base64Encode(bytes),type,function(_) {
			_g.__convertToCanvas();
			_g.__createImageData();
			var data = _g.__sourceImageData.data;
			var _g2 = 0;
			var _g1 = rawAlpha.length;
			while(_g2 < _g1) {
				var i = _g2++;
				data[i * 4 + 3] = rawAlpha.readUnsignedByte();
			}
			_g.__sourceImageDataChanged = true;
			if(onload != null) onload(_g);
		}); else this.__loadFromBase64(openfl.display.BitmapData.__base64Encode(bytes),type,onload);
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__valid) return;
		this.__syncImageData();
		var context = renderSession.context;
		if(this.__worldTransform == null) this.__worldTransform = new openfl.geom.Matrix();
		context.globalAlpha = 1;
		var transform = this.__worldTransform;
		if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
		if(this.__sourceImage != null) context.drawImage(this.__sourceImage,0,0); else context.drawImage(this.__sourceCanvas,0,0);
	}
	,__renderMask: function(renderSession) {
	}
	,__syncImageData: function() {
		if(this.__sourceImageDataChanged) {
			this.__sourceContext.putImageData(this.__sourceImageData,0,0);
			this.__sourceImageData = null;
			this.__sourceImageDataChanged = false;
		}
	}
	,__updateChildren: function(transformOnly) {
	}
	,__class__: openfl.display.BitmapData
};
openfl.display.BitmapDataChannel = function() { };
$hxClasses["openfl.display.BitmapDataChannel"] = openfl.display.BitmapDataChannel;
openfl.display.BitmapDataChannel.__name__ = ["openfl","display","BitmapDataChannel"];
openfl.display.BlendMode = $hxClasses["openfl.display.BlendMode"] = { __ename__ : ["openfl","display","BlendMode"], __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
openfl.display.BlendMode.ADD = ["ADD",0];
openfl.display.BlendMode.ADD.toString = $estr;
openfl.display.BlendMode.ADD.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.ALPHA = ["ALPHA",1];
openfl.display.BlendMode.ALPHA.toString = $estr;
openfl.display.BlendMode.ALPHA.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.DARKEN = ["DARKEN",2];
openfl.display.BlendMode.DARKEN.toString = $estr;
openfl.display.BlendMode.DARKEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
openfl.display.BlendMode.DIFFERENCE.toString = $estr;
openfl.display.BlendMode.DIFFERENCE.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.ERASE = ["ERASE",4];
openfl.display.BlendMode.ERASE.toString = $estr;
openfl.display.BlendMode.ERASE.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
openfl.display.BlendMode.HARDLIGHT.toString = $estr;
openfl.display.BlendMode.HARDLIGHT.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.INVERT = ["INVERT",6];
openfl.display.BlendMode.INVERT.toString = $estr;
openfl.display.BlendMode.INVERT.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.LAYER = ["LAYER",7];
openfl.display.BlendMode.LAYER.toString = $estr;
openfl.display.BlendMode.LAYER.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
openfl.display.BlendMode.LIGHTEN.toString = $estr;
openfl.display.BlendMode.LIGHTEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
openfl.display.BlendMode.MULTIPLY.toString = $estr;
openfl.display.BlendMode.MULTIPLY.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.NORMAL = ["NORMAL",10];
openfl.display.BlendMode.NORMAL.toString = $estr;
openfl.display.BlendMode.NORMAL.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.OVERLAY = ["OVERLAY",11];
openfl.display.BlendMode.OVERLAY.toString = $estr;
openfl.display.BlendMode.OVERLAY.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.SCREEN = ["SCREEN",12];
openfl.display.BlendMode.SCREEN.toString = $estr;
openfl.display.BlendMode.SCREEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
openfl.display.BlendMode.SUBTRACT.toString = $estr;
openfl.display.BlendMode.SUBTRACT.__enum__ = openfl.display.BlendMode;
openfl.display._CapsStyle = {};
openfl.display._CapsStyle.CapsStyle_Impl_ = function() { };
$hxClasses["openfl.display._CapsStyle.CapsStyle_Impl_"] = openfl.display._CapsStyle.CapsStyle_Impl_;
openfl.display._CapsStyle.CapsStyle_Impl_.__name__ = ["openfl","display","_CapsStyle","CapsStyle_Impl_"];
openfl.display.FPS = function(x,y,color) {
	if(color == null) color = 0;
	if(y == null) y = 10;
	if(x == null) x = 10;
	openfl.text.TextField.call(this);
	this.set_x(x);
	this.set_y(y);
	this.currentFPS = 0;
	this.selectable = false;
	this.set_defaultTextFormat(new openfl.text.TextFormat("_sans",12,color));
	this.set_text("FPS: ");
	this.cacheCount = 0;
	this.times = [];
	this.addEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.this_onEnterFrame));
};
$hxClasses["openfl.display.FPS"] = openfl.display.FPS;
openfl.display.FPS.__name__ = ["openfl","display","FPS"];
openfl.display.FPS.__super__ = openfl.text.TextField;
openfl.display.FPS.prototype = $extend(openfl.text.TextField.prototype,{
	this_onEnterFrame: function(event) {
		var currentTime = haxe.Timer.stamp();
		this.times.push(currentTime);
		while(this.times[0] < currentTime - 1) this.times.shift();
		var currentCount = this.times.length;
		this.currentFPS = Math.round((currentCount + this.cacheCount) / 2);
		if(currentCount != this.cacheCount && this.get_visible()) this.set_text("FPS: " + this.currentFPS);
		this.cacheCount = currentCount;
	}
	,__class__: openfl.display.FPS
});
openfl.display.FrameLabel = function(name,frame) {
	openfl.events.EventDispatcher.call(this);
	this.__name = name;
	this.__frame = frame;
};
$hxClasses["openfl.display.FrameLabel"] = openfl.display.FrameLabel;
openfl.display.FrameLabel.__name__ = ["openfl","display","FrameLabel"];
openfl.display.FrameLabel.__super__ = openfl.events.EventDispatcher;
openfl.display.FrameLabel.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	get_frame: function() {
		return this.__frame;
	}
	,get_name: function() {
		return this.__name;
	}
	,__class__: openfl.display.FrameLabel
	,__properties__: {get_name:"get_name",get_frame:"get_frame"}
});
openfl.display.GradientType = $hxClasses["openfl.display.GradientType"] = { __ename__ : ["openfl","display","GradientType"], __constructs__ : ["RADIAL","LINEAR"] };
openfl.display.GradientType.RADIAL = ["RADIAL",0];
openfl.display.GradientType.RADIAL.toString = $estr;
openfl.display.GradientType.RADIAL.__enum__ = openfl.display.GradientType;
openfl.display.GradientType.LINEAR = ["LINEAR",1];
openfl.display.GradientType.LINEAR.toString = $estr;
openfl.display.GradientType.LINEAR.__enum__ = openfl.display.GradientType;
openfl.display.Graphics = function() {
	this.__commands = new Array();
	this.__halfStrokeWidth = 0;
	this.__positionX = 0;
	this.__positionY = 0;
};
$hxClasses["openfl.display.Graphics"] = openfl.display.Graphics;
openfl.display.Graphics.__name__ = ["openfl","display","Graphics"];
openfl.display.Graphics.prototype = {
	beginBitmapFill: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) smooth = false;
		if(repeat == null) repeat = true;
		this.__commands.push(openfl.display.DrawCommand.BeginBitmapFill(bitmap,matrix,repeat,smooth));
		this.__visible = true;
	}
	,beginFill: function(rgb,alpha) {
		if(alpha == null) alpha = 1;
		this.__commands.push(openfl.display.DrawCommand.BeginFill(rgb & 16777215,alpha));
		if(alpha > 0) this.__visible = true;
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		openfl.Lib.notImplemented("Graphics.beginGradientFill");
	}
	,clear: function() {
		this.__commands = new Array();
		this.__halfStrokeWidth = 0;
		if(this.__bounds != null) {
			this.__dirty = true;
			this.__bounds = null;
		}
		this.__visible = false;
	}
	,curveTo: function(cx,cy,x,y) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__inflateBounds(cx,cy);
		this.__positionX = x;
		this.__positionY = y;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.CurveTo(cx,cy,x,y));
		this.__dirty = true;
	}
	,drawCircle: function(x,y,radius) {
		if(radius <= 0) return;
		this.__inflateBounds(x - radius - this.__halfStrokeWidth,y - radius - this.__halfStrokeWidth);
		this.__inflateBounds(x + radius + this.__halfStrokeWidth,y + radius + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawCircle(x,y,radius));
		this.__dirty = true;
	}
	,drawEllipse: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawEllipse(x,y,width,height));
		this.__dirty = true;
	}
	,drawGraphicsData: function(graphicsData) {
		openfl.Lib.notImplemented("Graphics.drawGraphicsData");
	}
	,drawPath: function(commands,data,winding) {
		openfl.Lib.notImplemented("Graphics.drawPath");
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawRect(x,y,width,height));
		this.__dirty = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		openfl.Lib.notImplemented("Graphics.drawRoundRect");
	}
	,drawRoundRectComplex: function(x,y,width,height,topLeftRadius,topRightRadius,bottomLeftRadius,bottomRightRadius) {
		openfl.Lib.notImplemented("Graphics.drawRoundRectComplex");
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.__inflateBounds(0,0);
		this.__inflateBounds(openfl.Lib.current.stage.stageWidth,openfl.Lib.current.stage.stageHeight);
		this.__commands.push(openfl.display.DrawCommand.DrawTiles(sheet,tileData,smooth,flags));
		this.__dirty = true;
		this.__visible = true;
	}
	,drawTriangles: function(vertices,indices,uvtData,culling) {
		openfl.Lib.notImplemented("Graphics.drawTriangles");
	}
	,endFill: function() {
		this.__commands.push(openfl.display.DrawCommand.EndFill);
	}
	,lineBitmapStyle: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) smooth = false;
		if(repeat == null) repeat = true;
		openfl.Lib.notImplemented("Graphics.lineBitmapStyle");
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		openfl.Lib.notImplemented("Graphics.lineGradientStyle");
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(thickness != null) this.__halfStrokeWidth = thickness / 2; else this.__halfStrokeWidth = 0;
		this.__commands.push(openfl.display.DrawCommand.LineStyle(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit));
		if(thickness != null) this.__visible = true;
	}
	,lineTo: function(x,y) {
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__positionX = x;
		this.__positionY = y;
		this.__inflateBounds(this.__positionX - this.__halfStrokeWidth,this.__positionY - this.__halfStrokeWidth);
		this.__inflateBounds(this.__positionX + this.__halfStrokeWidth,this.__positionY + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.LineTo(x,y));
		this.__dirty = true;
	}
	,moveTo: function(x,y) {
		this.__commands.push(openfl.display.DrawCommand.MoveTo(x,y));
		this.__positionX = x;
		this.__positionY = y;
	}
	,__beginPath: function() {
		if(!this.__inPath) {
			this.__context.beginPath();
			this.__inPath = true;
		}
	}
	,__closePath: function(closeFill) {
		if(this.__inPath) {
			if(this.__hasFill) this.__context.fill();
			this.__context.closePath();
			if(this.__hasStroke) this.__context.stroke();
		}
		this.__inPath = false;
		if(closeFill) {
			this.__hasFill = false;
			this.__hasStroke = false;
		}
	}
	,__getBounds: function(rect,matrix) {
		if(this.__bounds == null) return;
		var bounds = this.__bounds.clone().transform(matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__hitTest: function(x,y,shapeFlag,matrix) {
		if(this.__bounds == null) return false;
		var bounds = this.__bounds.clone().transform(matrix);
		return x > bounds.x && y > bounds.y && x <= bounds.get_right() && y <= bounds.get_bottom();
	}
	,__inflateBounds: function(x,y) {
		if(this.__bounds == null) {
			this.__bounds = new openfl.geom.Rectangle(x,y,0,0);
			return;
		}
		if(x < this.__bounds.x) {
			this.__bounds.width += this.__bounds.x - x;
			this.__bounds.x = x;
		}
		if(y < this.__bounds.y) {
			this.__bounds.height += this.__bounds.y - y;
			this.__bounds.y = y;
		}
		if(x > this.__bounds.x + this.__bounds.width) this.__bounds.width = x - this.__bounds.x;
		if(y > this.__bounds.y + this.__bounds.height) this.__bounds.height = y - this.__bounds.y;
	}
	,__render: function() {
		if(this.__dirty) {
			this.__hasFill = false;
			this.__hasStroke = false;
			this.__inPath = false;
			this.__positionX = 0;
			this.__positionY = 0;
			if(!this.__visible || this.__commands.length == 0 || this.__bounds == null || this.__bounds.width == 0 || this.__bounds.height == 0) {
				this.__canvas = null;
				this.__context = null;
			} else {
				if(this.__canvas == null) {
					this.__canvas = window.document.createElement("canvas");
					this.__context = this.__canvas.getContext("2d");
				}
				this.__canvas.width = Math.ceil(this.__bounds.width);
				this.__canvas.height = Math.ceil(this.__bounds.height);
				var offsetX = this.__bounds.x;
				var offsetY = this.__bounds.y;
				var bitmapFill = null;
				var bitmapMatrix = null;
				var bitmapRepeat = false;
				var pattern = null;
				var setFill = false;
				var _g = 0;
				var _g1 = this.__commands;
				while(_g < _g1.length) {
					var command = _g1[_g];
					++_g;
					switch(command[1]) {
					case 0:
						var smooth = command[5];
						var repeat = command[4];
						var matrix = command[3];
						var bitmap = command[2];
						this.__closePath(false);
						if(bitmap != bitmapFill || repeat != bitmapRepeat) {
							bitmapFill = bitmap;
							bitmapRepeat = repeat;
							pattern = null;
							setFill = false;
							bitmap.__syncImageData();
						}
						bitmapMatrix = matrix;
						this.__hasFill = true;
						break;
					case 1:
						var alpha = command[3];
						var rgb = command[2];
						this.__closePath(false);
						if(alpha == 1) this.__context.fillStyle = "#" + StringTools.hex(rgb,6); else {
							var r = (rgb & 16711680) >>> 16;
							var g = (rgb & 65280) >>> 8;
							var b = rgb & 255;
							this.__context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
						}
						bitmapFill = null;
						setFill = true;
						this.__hasFill = true;
						break;
					case 2:
						var y = command[5];
						var x = command[4];
						var cy = command[3];
						var cx = command[2];
						this.__beginPath();
						this.__context.quadraticCurveTo(cx - offsetX,cy - offsetY,x - offsetX,y - offsetY);
						this.__positionX = x;
						this.__positionY = y;
						break;
					case 3:
						var radius = command[4];
						var y1 = command[3];
						var x1 = command[2];
						if(!setFill && bitmapFill != null) {
							if(pattern == null) {
								if(bitmapFill.__sourceImage != null) pattern = this.__context.createPattern(bitmapFill.__sourceImage,bitmapRepeat?"repeat":"no-repeat"); else pattern = this.__context.createPattern(bitmapFill.__sourceCanvas,bitmapRepeat?"repeat":"no-repeat");
							}
							this.__context.fillStyle = pattern;
							setFill = true;
						}
						this.__closePath(false);
						this.__beginPath();
						this.__context.arc(x1 - offsetX,y1 - offsetY,radius,0,Math.PI * 2,true);
						this.__closePath(false);
						break;
					case 4:
						var height = command[5];
						var width = command[4];
						var y2 = command[3];
						var x2 = command[2];
						if(!setFill && bitmapFill != null) {
							if(pattern == null) {
								if(bitmapFill.__sourceImage != null) pattern = this.__context.createPattern(bitmapFill.__sourceImage,bitmapRepeat?"repeat":"no-repeat"); else pattern = this.__context.createPattern(bitmapFill.__sourceCanvas,bitmapRepeat?"repeat":"no-repeat");
							}
							this.__context.fillStyle = pattern;
							setFill = true;
						}
						x2 -= offsetX;
						y2 -= offsetY;
						var kappa = .5522848;
						var ox = width / 2 * kappa;
						var oy = height / 2 * kappa;
						var xe = x2 + width;
						var ye = y2 + height;
						var xm = x2 + width / 2;
						var ym = y2 + height / 2;
						this.__closePath(false);
						this.__beginPath();
						this.__context.moveTo(x2,ym);
						this.__context.bezierCurveTo(x2,ym - oy,xm - ox,y2,xm,y2);
						this.__context.bezierCurveTo(xm + ox,y2,xe,ym - oy,xe,ym);
						this.__context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
						this.__context.bezierCurveTo(xm - ox,ye,x2,ym + oy,x2,ym);
						this.__closePath(false);
						break;
					case 5:
						var height1 = command[5];
						var width1 = command[4];
						var y3 = command[3];
						var x3 = command[2];
						if(bitmapFill != null && width1 <= bitmapFill.width && height1 <= bitmapFill.height) {
							this.__closePath(false);
							var dx = x3;
							var dy = y3;
							if(bitmapMatrix != null) {
								dx -= bitmapMatrix.tx;
								dy -= bitmapMatrix.ty;
							}
							if(bitmapFill.__sourceImage != null) this.__context.drawImage(bitmapFill.__sourceImage,dx,dy,width1,height1,x3,y3,width1,height1); else this.__context.drawImage(bitmapFill.__sourceCanvas,dx,dy,width1,height1,x3,y3,width1,height1);
						} else {
							this.__closePath(false);
							this.__beginPath();
							if(!setFill && bitmapFill != null) {
								if(pattern == null) {
									if(bitmapFill.__sourceImage != null) pattern = this.__context.createPattern(bitmapFill.__sourceImage,bitmapRepeat?"repeat":"no-repeat"); else pattern = this.__context.createPattern(bitmapFill.__sourceCanvas,bitmapRepeat?"repeat":"no-repeat");
								}
								this.__context.fillStyle = pattern;
								setFill = true;
							}
							this.__context.rect(x3 - offsetX,y3 - offsetY,width1,height1);
							this.__closePath(false);
						}
						break;
					case 6:
						var flags = command[5];
						var smooth1 = command[4];
						var tileData = command[3];
						var sheet = command[2];
						this.__closePath(false);
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = tileData.length;
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface;
						sheet.__bitmap.__syncImageData();
						if(sheet.__bitmap.__sourceImage != null) surface = sheet.__bitmap.__sourceImage; else surface = sheet.__bitmap.__sourceCanvas;
						while(index < totalCount) {
							var tileID = tileData[index + 2] | 0;
							if(tileID != previousTileID) {
								rect = sheet.__tileRects[tileID];
								center = sheet.__centerPoints[tileID];
								previousTileID = tileID;
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								this.__context.save();
								this.__context.translate(tileData[index],tileData[index + 1]);
								if(useRotation) this.__context.rotate(tileData[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) this.__context.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
								if(useAlpha) this.__context.globalAlpha = tileData[index + alphaIndex];
								this.__context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								this.__context.restore();
							}
							index += numValues;
						}
						break;
					case 7:
						this.__closePath(true);
						break;
					case 8:
						var miterLimit = command[9];
						var joints = command[8];
						var caps = command[7];
						var scaleMode = command[6];
						var pixelHinting = command[5];
						var alpha1 = command[4];
						var color = command[3];
						var thickness = command[2];
						this.__closePath(false);
						if(thickness == null) this.__hasStroke = false; else {
							this.__context.lineWidth = thickness;
							this.__context.lineJoin = joints;
							this.__context.lineCap = caps;
							this.__context.miterLimit = miterLimit;
							this.__context.strokeStyle = "#" + StringTools.hex(color,6);
							this.__hasStroke = true;
						}
						break;
					case 9:
						var y4 = command[3];
						var x4 = command[2];
						this.__beginPath();
						this.__context.lineTo(x4 - offsetX,y4 - offsetY);
						this.__positionX = x4;
						this.__positionY = y4;
						break;
					case 10:
						var y5 = command[3];
						var x5 = command[2];
						this.__beginPath();
						this.__context.moveTo(x5 - offsetX,y5 - offsetY);
						this.__positionX = x5;
						this.__positionY = y5;
						break;
					}
				}
			}
			this.__dirty = false;
			this.__closePath(false);
		}
	}
	,__renderMask: function(renderSession) {
		if(this.__commands.length != 0) {
			var __context = renderSession.context;
			var __positionX = 0.0;
			var __positionY = 0.0;
			var offsetX = 0;
			var offsetY = 0;
			var _g = 0;
			var _g1 = this.__commands;
			while(_g < _g1.length) {
				var command = _g1[_g];
				++_g;
				switch(command[1]) {
				case 2:
					var y = command[5];
					var x = command[4];
					var cy = command[3];
					var cx = command[2];
					__context.quadraticCurveTo(cx,cy,x,y);
					__positionX = x;
					__positionY = y;
					break;
				case 3:
					var radius = command[4];
					var y1 = command[3];
					var x1 = command[2];
					__context.arc(x1 - offsetX,y1 - offsetY,radius,0,Math.PI * 2,true);
					break;
				case 4:
					var height = command[5];
					var width = command[4];
					var y2 = command[3];
					var x2 = command[2];
					x2 -= offsetX;
					y2 -= offsetY;
					var kappa = .5522848;
					var ox = width / 2 * kappa;
					var oy = height / 2 * kappa;
					var xe = x2 + width;
					var ye = y2 + height;
					var xm = x2 + width / 2;
					var ym = y2 + height / 2;
					__context.moveTo(x2,ym);
					__context.bezierCurveTo(x2,ym - oy,xm - ox,y2,xm,y2);
					__context.bezierCurveTo(xm + ox,y2,xe,ym - oy,xe,ym);
					__context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
					__context.bezierCurveTo(xm - ox,ye,x2,ym + oy,x2,ym);
					break;
				case 5:
					var height1 = command[5];
					var width1 = command[4];
					var y3 = command[3];
					var x3 = command[2];
					__context.rect(x3 - offsetX,y3 - offsetY,width1,height1);
					break;
				case 9:
					var y4 = command[3];
					var x4 = command[2];
					__context.lineTo(x4 - offsetX,y4 - offsetY);
					__positionX = x4;
					__positionY = y4;
					break;
				case 10:
					var y5 = command[3];
					var x5 = command[2];
					__context.moveTo(x5 - offsetX,y5 - offsetY);
					__positionX = x5;
					__positionY = y5;
					break;
				default:
				}
			}
		}
	}
	,__class__: openfl.display.Graphics
};
openfl.display.DrawCommand = $hxClasses["openfl.display.DrawCommand"] = { __ename__ : ["openfl","display","DrawCommand"], __constructs__ : ["BeginBitmapFill","BeginFill","CurveTo","DrawCircle","DrawEllipse","DrawRect","DrawTiles","EndFill","LineStyle","LineTo","MoveTo"] };
openfl.display.DrawCommand.BeginBitmapFill = function(bitmap,matrix,repeat,smooth) { var $x = ["BeginBitmapFill",0,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.BeginFill = function(rgb,alpha) { var $x = ["BeginFill",1,rgb,alpha]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.CurveTo = function(cx,cy,x,y) { var $x = ["CurveTo",2,cx,cy,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawCircle = function(x,y,radius) { var $x = ["DrawCircle",3,x,y,radius]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawEllipse = function(x,y,width,height) { var $x = ["DrawEllipse",4,x,y,width,height]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawRect = function(x,y,width,height) { var $x = ["DrawRect",5,x,y,width,height]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawTiles = function(sheet,tileData,smooth,flags) { var $x = ["DrawTiles",6,sheet,tileData,smooth,flags]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.EndFill = ["EndFill",7];
openfl.display.DrawCommand.EndFill.toString = $estr;
openfl.display.DrawCommand.EndFill.__enum__ = openfl.display.DrawCommand;
openfl.display.DrawCommand.LineStyle = function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) { var $x = ["LineStyle",8,thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.LineTo = function(x,y) { var $x = ["LineTo",9,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.MoveTo = function(x,y) { var $x = ["MoveTo",10,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.GraphicsPathWinding = $hxClasses["openfl.display.GraphicsPathWinding"] = { __ename__ : ["openfl","display","GraphicsPathWinding"], __constructs__ : ["EVEN_ODD","NON_ZERO"] };
openfl.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
openfl.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
openfl.display.GraphicsPathWinding.EVEN_ODD.__enum__ = openfl.display.GraphicsPathWinding;
openfl.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
openfl.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
openfl.display.GraphicsPathWinding.NON_ZERO.__enum__ = openfl.display.GraphicsPathWinding;
openfl.display.IGraphicsData = function() { };
$hxClasses["openfl.display.IGraphicsData"] = openfl.display.IGraphicsData;
openfl.display.IGraphicsData.__name__ = ["openfl","display","IGraphicsData"];
openfl.display.IGraphicsData.prototype = {
	__class__: openfl.display.IGraphicsData
};
openfl.display.GraphicsDataType = $hxClasses["openfl.display.GraphicsDataType"] = { __ename__ : ["openfl","display","GraphicsDataType"], __constructs__ : ["STROKE","SOLID","GRADIENT","PATH","BITMAP","END"] };
openfl.display.GraphicsDataType.STROKE = ["STROKE",0];
openfl.display.GraphicsDataType.STROKE.toString = $estr;
openfl.display.GraphicsDataType.STROKE.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.SOLID = ["SOLID",1];
openfl.display.GraphicsDataType.SOLID.toString = $estr;
openfl.display.GraphicsDataType.SOLID.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
openfl.display.GraphicsDataType.GRADIENT.toString = $estr;
openfl.display.GraphicsDataType.GRADIENT.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.PATH = ["PATH",3];
openfl.display.GraphicsDataType.PATH.toString = $estr;
openfl.display.GraphicsDataType.PATH.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.BITMAP = ["BITMAP",4];
openfl.display.GraphicsDataType.BITMAP.toString = $estr;
openfl.display.GraphicsDataType.BITMAP.__enum__ = openfl.display.GraphicsDataType;
openfl.display.GraphicsDataType.END = ["END",5];
openfl.display.GraphicsDataType.END.toString = $estr;
openfl.display.GraphicsDataType.END.__enum__ = openfl.display.GraphicsDataType;
openfl.display.InterpolationMethod = $hxClasses["openfl.display.InterpolationMethod"] = { __ename__ : ["openfl","display","InterpolationMethod"], __constructs__ : ["RGB","LINEAR_RGB"] };
openfl.display.InterpolationMethod.RGB = ["RGB",0];
openfl.display.InterpolationMethod.RGB.toString = $estr;
openfl.display.InterpolationMethod.RGB.__enum__ = openfl.display.InterpolationMethod;
openfl.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
openfl.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
openfl.display.InterpolationMethod.LINEAR_RGB.__enum__ = openfl.display.InterpolationMethod;
openfl.display._JointStyle = {};
openfl.display._JointStyle.JointStyle_Impl_ = function() { };
$hxClasses["openfl.display._JointStyle.JointStyle_Impl_"] = openfl.display._JointStyle.JointStyle_Impl_;
openfl.display._JointStyle.JointStyle_Impl_.__name__ = ["openfl","display","_JointStyle","JointStyle_Impl_"];
openfl.display.LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : ["openfl","display","LineScaleMode"], __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl.display.LineScaleMode.HORIZONTAL.toString = $estr;
openfl.display.LineScaleMode.HORIZONTAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.NONE = ["NONE",1];
openfl.display.LineScaleMode.NONE.toString = $estr;
openfl.display.LineScaleMode.NONE.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.NORMAL = ["NORMAL",2];
openfl.display.LineScaleMode.NORMAL.toString = $estr;
openfl.display.LineScaleMode.NORMAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl.display.LineScaleMode.VERTICAL.toString = $estr;
openfl.display.LineScaleMode.VERTICAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LoaderInfo = function() {
	openfl.events.EventDispatcher.call(this);
	this.applicationDomain = openfl.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl.display.LoaderInfo;
openfl.display.LoaderInfo.__name__ = ["openfl","display","LoaderInfo"];
openfl.display.LoaderInfo.create = function(ldr) {
	var li = new openfl.display.LoaderInfo();
	if(ldr != null) li.loader = ldr; else li.url = "";
	return li;
};
openfl.display.LoaderInfo.__super__ = openfl.events.EventDispatcher;
openfl.display.LoaderInfo.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	__class__: openfl.display.LoaderInfo
});
openfl.display.MovieClip = function() {
	openfl.display.Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
	this.loaderInfo = openfl.display.LoaderInfo.create(null);
};
$hxClasses["openfl.display.MovieClip"] = openfl.display.MovieClip;
openfl.display.MovieClip.__name__ = ["openfl","display","MovieClip"];
openfl.display.MovieClip.__super__ = openfl.display.Sprite;
openfl.display.MovieClip.prototype = $extend(openfl.display.Sprite.prototype,{
	gotoAndPlay: function(frame,scene) {
	}
	,gotoAndStop: function(frame,scene) {
	}
	,nextFrame: function() {
	}
	,play: function() {
	}
	,prevFrame: function() {
	}
	,stop: function() {
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,get_currentFrameLabel: function() {
		return this.__currentFrameLabel;
	}
	,get_currentLabel: function() {
		return this.__currentLabel;
	}
	,get_currentLabels: function() {
		return this.__currentLabels;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_totalFrames: function() {
		return this.__totalFrames;
	}
	,__class__: openfl.display.MovieClip
	,__properties__: $extend(openfl.display.Sprite.prototype.__properties__,{get_totalFrames:"get_totalFrames",get_framesLoaded:"get_framesLoaded",get_currentLabels:"get_currentLabels",get_currentLabel:"get_currentLabel",get_currentFrameLabel:"get_currentFrameLabel",get_currentFrame:"get_currentFrame"})
});
openfl.display.PixelSnapping = $hxClasses["openfl.display.PixelSnapping"] = { __ename__ : ["openfl","display","PixelSnapping"], __constructs__ : ["NEVER","AUTO","ALWAYS"] };
openfl.display.PixelSnapping.NEVER = ["NEVER",0];
openfl.display.PixelSnapping.NEVER.toString = $estr;
openfl.display.PixelSnapping.NEVER.__enum__ = openfl.display.PixelSnapping;
openfl.display.PixelSnapping.AUTO = ["AUTO",1];
openfl.display.PixelSnapping.AUTO.toString = $estr;
openfl.display.PixelSnapping.AUTO.__enum__ = openfl.display.PixelSnapping;
openfl.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
openfl.display.PixelSnapping.ALWAYS.toString = $estr;
openfl.display.PixelSnapping.ALWAYS.__enum__ = openfl.display.PixelSnapping;
openfl.display.Shape = function() {
	openfl.display.DisplayObject.call(this);
};
$hxClasses["openfl.display.Shape"] = openfl.display.Shape;
openfl.display.Shape.__name__ = ["openfl","display","Shape"];
openfl.display.Shape.__super__ = openfl.display.DisplayObject;
openfl.display.Shape.prototype = $extend(openfl.display.DisplayObject.prototype,{
	__getBounds: function(rect,matrix) {
		if(this.__graphics != null) this.__graphics.__getBounds(rect,this.__worldTransform);
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(this.get_visible() && this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__worldTransform)) {
			if(!interactiveOnly) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) {
			this.__graphics.__render();
			if(this.__graphics.__canvas != null) {
				var context = renderSession.context;
				context.globalAlpha = this.__worldAlpha;
				var transform = this.__worldTransform;
				if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
				if(this.get_scrollRect() == null) context.drawImage(this.__graphics.__canvas,this.__graphics.__bounds.x,this.__graphics.__bounds.y); else context.drawImage(this.__graphics.__canvas,this.get_scrollRect().x - this.__graphics.__bounds.x,this.get_scrollRect().y - this.__graphics.__bounds.y,this.get_scrollRect().width,this.get_scrollRect().height,this.__graphics.__bounds.x + this.get_scrollRect().x,this.__graphics.__bounds.y + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
			}
		}
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable && this.__graphics != null) {
			if(this.__graphics.__dirty || this.__worldAlphaChanged || this.__canvas == null && this.__graphics.__canvas != null) {
				this.__graphics.__render();
				if(this.__graphics.__canvas != null) {
					if(this.__canvas == null) {
						this.__canvas = window.document.createElement("canvas");
						this.__canvasContext = this.__canvas.getContext("2d");
						this.__initializeElement(this.__canvas,renderSession);
					}
					this.__canvas.width = this.__graphics.__canvas.width;
					this.__canvas.height = this.__graphics.__canvas.height;
					this.__canvasContext.globalAlpha = this.__worldAlpha;
					this.__canvasContext.drawImage(this.__graphics.__canvas,0,0);
				} else if(this.__canvas != null) {
					renderSession.element.removeChild(this.__canvas);
					this.__canvas = null;
					this.__style = null;
				}
			}
			if(this.__canvas != null) {
				if(this.__worldTransformChanged) {
					var transform = new openfl.geom.Matrix();
					transform.translate(this.__graphics.__bounds.x,this.__graphics.__bounds.y);
					transform = transform.mult(this.__worldTransform);
					this.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
				}
				this.__applyStyle(renderSession,false,false,true);
			}
		} else if(this.__canvas != null) {
			renderSession.element.removeChild(this.__canvas);
			this.__canvas = null;
			this.__style = null;
		}
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl.display.Graphics();
		return this.__graphics;
	}
	,__class__: openfl.display.Shape
	,__properties__: $extend(openfl.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
openfl.display.SpreadMethod = $hxClasses["openfl.display.SpreadMethod"] = { __ename__ : ["openfl","display","SpreadMethod"], __constructs__ : ["REPEAT","REFLECT","PAD"] };
openfl.display.SpreadMethod.REPEAT = ["REPEAT",0];
openfl.display.SpreadMethod.REPEAT.toString = $estr;
openfl.display.SpreadMethod.REPEAT.__enum__ = openfl.display.SpreadMethod;
openfl.display.SpreadMethod.REFLECT = ["REFLECT",1];
openfl.display.SpreadMethod.REFLECT.toString = $estr;
openfl.display.SpreadMethod.REFLECT.__enum__ = openfl.display.SpreadMethod;
openfl.display.SpreadMethod.PAD = ["PAD",2];
openfl.display.SpreadMethod.PAD.toString = $estr;
openfl.display.SpreadMethod.PAD.__enum__ = openfl.display.SpreadMethod;
openfl.display.Stage = function(width,height,element,color) {
	this.__mouseY = 0;
	this.__mouseX = 0;
	openfl.display.Sprite.call(this);
	this.__element = element;
	if(color == null) {
		this.__transparent = true;
		this.set_color(0);
	} else this.set_color(color);
	this.set_name(null);
	this.__mouseX = 0;
	this.__mouseY = 0;
	if(js.Boot.__instanceof(this.__element,HTMLCanvasElement)) this.__canvas = this.__element; else this.__canvas = window.document.createElement("canvas");
	if(this.__transparent) this.__context = this.__canvas.getContext("2d"); else {
		this.__canvas.setAttribute("moz-opaque","true");
		this.__context = this.__canvas.getContext ("2d", { alpha: false });
	}
	var style = this.__canvas.style;
	style.setProperty("-webkit-transform","translateZ(0)",null);
	style.setProperty("transform","translateZ(0)",null);
	this.__originalWidth = width;
	this.__originalHeight = height;
	if(width == 0 && height == 0) {
		if(element != null) {
			width = element.clientWidth;
			height = element.clientHeight;
		} else {
			width = window.innerWidth;
			height = window.innerHeight;
		}
		this.__fullscreen = true;
	}
	this.stageWidth = width;
	this.stageHeight = height;
	if(this.__canvas != null) {
		this.__canvas.width = width;
		this.__canvas.height = height;
	} else {
		this.__div.style.width = width + "px";
		this.__div.style.height = height + "px";
	}
	this.__resize();
	window.addEventListener("resize",$bind(this,this.window_onResize));
	window.addEventListener("focus",$bind(this,this.window_onFocus));
	window.addEventListener("blur",$bind(this,this.window_onBlur));
	if(element != null) {
		if(this.__canvas != null) {
			if(element != this.__canvas) element.appendChild(this.__canvas);
		} else element.appendChild(this.__div);
	}
	this.stage = this;
	this.align = openfl.display.StageAlign.TOP_LEFT;
	this.allowsFullScreen = false;
	this.set_displayState(openfl.display.StageDisplayState.NORMAL);
	this.frameRate = 60;
	this.quality = "high";
	this.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
	this.stageFocusRect = true;
	this.__clearBeforeRender = true;
	this.__stack = [];
	this.__renderSession = new openfl.display.RenderSession();
	this.__renderSession.context = this.__context;
	this.__renderSession.roundPixels = true;
	if(this.__div != null) {
		this.__renderSession.element = this.__div;
		var prefix = (function () {
			  var styles = window.getComputedStyle(document.documentElement, ''),
			    pre = (Array.prototype.slice
			      .call(styles)
			      .join('') 
			      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			    )[1],
			    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
			  return {
			    dom: dom,
			    lowercase: pre,
			    css: '-' + pre + '-',
			    js: pre[0].toUpperCase() + pre.substr(1)
			  };
			})();
		this.__renderSession.vendorPrefix = prefix.lowercase;
		if(prefix.lowercase == "webkit") this.__renderSession.transformProperty = "-webkit-transform"; else this.__renderSession.transformProperty = "transform";
		if(prefix.lowercase == "webkit") this.__renderSession.transformOriginProperty = "-webkit-transform-origin"; else this.__renderSession.transformOriginProperty = "transform-origin";
	}
	var keyEvents = ["keydown","keyup"];
	var touchEvents = ["touchstart","touchmove","touchend"];
	var mouseEvents = ["mousedown","mousemove","mouseup","click","dblclick","mousewheel"];
	var focusEvents = ["focus","blur"];
	var element1;
	if(this.__canvas != null) element1 = this.__canvas; else element1 = this.__div;
	var _g = 0;
	while(_g < keyEvents.length) {
		var type = keyEvents[_g];
		++_g;
		window.addEventListener(type,$bind(this,this.window_onKey),false);
	}
	var _g1 = 0;
	while(_g1 < touchEvents.length) {
		var type1 = touchEvents[_g1];
		++_g1;
		element1.addEventListener(type1,$bind(this,this.element_onTouch),true);
	}
	var _g2 = 0;
	while(_g2 < mouseEvents.length) {
		var type2 = mouseEvents[_g2];
		++_g2;
		element1.addEventListener(type2,$bind(this,this.element_onMouse),true);
	}
	var _g3 = 0;
	while(_g3 < focusEvents.length) {
		var type3 = focusEvents[_g3];
		++_g3;
		element1.addEventListener(type3,$bind(this,this.element_onFocus),true);
	}
	window.requestAnimationFrame($bind(this,this.__render));
};
$hxClasses["openfl.display.Stage"] = openfl.display.Stage;
openfl.display.Stage.__name__ = ["openfl","display","Stage"];
openfl.display.Stage.__super__ = openfl.display.Sprite;
openfl.display.Stage.prototype = $extend(openfl.display.Sprite.prototype,{
	globalToLocal: function(pos) {
		return pos;
	}
	,invalidate: function() {
		this.__invalidated = true;
	}
	,localToGlobal: function(pos) {
		return pos;
	}
	,__fireEvent: function(event,stack) {
		var length = stack.length;
		if(length == 0) {
			event.eventPhase = 1;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = 0;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCancelled) return;
			}
			event.eventPhase = 1;
			event.target.__broadcast(event,false);
			if(event.__isCancelled) return;
			if(event.bubbles) {
				event.eventPhase = 2;
				var i1 = length - 2;
				while(i1 >= 0) {
					stack[i1].__broadcast(event,false);
					if(event.__isCancelled) return;
					i1--;
				}
			}
		}
	}
	,__getInteractive: function(stack) {
		stack.push(this);
	}
	,__render: function() {
		this.__broadcast(new openfl.events.Event(openfl.events.Event.ENTER_FRAME),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl.events.Event(openfl.events.Event.RENDER),true);
		}
		this.__renderable = true;
		this.__update(false,true);
		if(this.__canvas != null) {
			if(!this.__fullscreen || this.__element != this.__canvas) {
				if(this.stageWidth != this.__canvas.width || this.stageHeight != this.__canvas.height) {
					this.__canvas.width = this.stageWidth;
					this.__canvas.height = this.stageHeight;
				}
			} else {
				this.stageWidth = this.__canvas.width;
				this.stageHeight = this.__canvas.height;
			}
			this.__context.setTransform(1,0,0,1,0,0);
			this.__context.globalAlpha = 1;
			if(!this.__transparent && this.__clearBeforeRender) {
				this.__context.fillStyle = this.__colorString;
				this.__context.fillRect(0,0,this.stageWidth,this.stageHeight);
			} else if(this.__transparent && this.__clearBeforeRender) this.__context.clearRect(0,0,this.stageWidth,this.stageHeight);
			this.__renderCanvas(this.__renderSession);
		} else {
			this.__renderSession.z = 1;
			this.__renderDOM(this.__renderSession);
		}
		window.requestAnimationFrame($bind(this,this.__render));
	}
	,__resize: function() {
		if(this.__element != null && this.__div == null) {
			if(this.__fullscreen) {
				this.stageWidth = this.__element.clientWidth;
				this.stageHeight = this.__element.clientHeight;
				if(this.__canvas != null) {
					if(this.__element != this.__canvas) {
						this.__canvas.width = this.stageWidth;
						this.__canvas.height = this.stageHeight;
					}
				} else {
					this.__div.style.width = this.stageWidth + "px";
					this.__div.style.height = this.stageHeight + "px";
				}
			} else {
				var scaleX = this.__element.clientWidth / this.__originalWidth;
				var scaleY = this.__element.clientHeight / this.__originalHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.__canvas != null) {
					if(this.__element != this.__canvas) {
						this.__canvas.style.width = this.__originalWidth * targetRatio + "px";
						this.__canvas.style.height = this.__originalHeight * targetRatio + "px";
						this.__canvas.style.marginLeft = (this.__element.clientWidth - this.__originalWidth * targetRatio) / 2 + "px";
						this.__canvas.style.marginTop = (this.__element.clientHeight - this.__originalHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.__div.style.width = this.__originalWidth * targetRatio + "px";
					this.__div.style.height = this.__originalHeight * targetRatio + "px";
					this.__div.style.marginLeft = (this.__element.clientWidth - this.__originalWidth * targetRatio) / 2 + "px";
					this.__div.style.marginTop = (this.__element.clientHeight - this.__originalHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,__setCursor: function(cursor) {
		if(this.__cursor != cursor) {
			this.__cursor = cursor;
			if(!this.__cursorHidden) {
				var element;
				if(this.__canvas != null) element = this.__canvas; else element = this.__div;
				element.style.cursor = cursor;
			}
		}
	}
	,__setCursorHidden: function(value) {
		if(this.__cursorHidden != value) {
			this.__cursorHidden = value;
			var element;
			if(this.__canvas != null) element = this.__canvas; else element = this.__div;
			if(value) element.style.cursor = "none"; else element.style.cursor = this.__cursor;
		}
	}
	,__update: function(transformOnly,updateChildren) {
		if(transformOnly) {
			if(openfl.display.DisplayObject.__worldTransformDirty > 0) {
				openfl.display.Sprite.prototype.__update.call(this,true,updateChildren);
				if(updateChildren) {
					openfl.display.DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl.display.DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl.display.DisplayObject.__worldRenderDirty > 0) {
			openfl.display.Sprite.prototype.__update.call(this,false,updateChildren);
			if(updateChildren) {
				openfl.display.DisplayObject.__worldTransformDirty = 0;
				openfl.display.DisplayObject.__worldRenderDirty = 0;
				this.__dirty = false;
			}
		}
	}
	,get_mouseX: function() {
		return this.__mouseX;
	}
	,get_mouseY: function() {
		return this.__mouseY;
	}
	,element_onFocus: function(event) {
	}
	,element_onTouch: function(event) {
		event.preventDefault();
		var rect;
		if(this.__canvas != null) rect = this.__canvas.getBoundingClientRect(); else rect = this.__div.getBoundingClientRect();
		var touch = event.changedTouches[0];
		var point = new openfl.geom.Point((touch.pageX - rect.left) * (this.stageWidth / rect.width),(touch.pageY - rect.top) * (this.stageHeight / rect.height));
		this.__mouseX = point.x;
		this.__mouseY = point.y;
		this.__stack = [];
		var type = null;
		var mouseType = null;
		var _g = event.type;
		switch(_g) {
		case "touchstart":
			type = "touchBegin";
			mouseType = openfl.events.MouseEvent.MOUSE_DOWN;
			break;
		case "touchmove":
			type = "touchMove";
			mouseType = openfl.events.MouseEvent.MOUSE_MOVE;
			break;
		case "touchend":
			type = "touchEnd";
			mouseType = openfl.events.MouseEvent.MOUSE_UP;
			break;
		default:
		}
		if(this.__hitTest(this.get_mouseX(),this.get_mouseY(),false,this.__stack,true)) {
			var target = this.__stack[this.__stack.length - 1];
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl.events.TouchEvent.__create(type,event,touch,localPoint,target);
			touchEvent.touchPointID = touch.identifier;
			touchEvent.isPrimaryTouchPoint = true;
			var mouseEvent = openfl.events.MouseEvent.__create(mouseType,event,localPoint,target);
			mouseEvent.buttonDown = type != "touchEnd";
			this.__fireEvent(touchEvent,this.__stack);
			this.__fireEvent(mouseEvent,this.__stack);
		} else {
			var touchEvent1 = openfl.events.TouchEvent.__create(type,event,touch,point,this);
			touchEvent1.touchPointID = touch.identifier;
			touchEvent1.isPrimaryTouchPoint = true;
			var mouseEvent1 = openfl.events.MouseEvent.__create(mouseType,event,point,this);
			mouseEvent1.buttonDown = type != "touchEnd";
			this.__fireEvent(touchEvent1,[this]);
			this.__fireEvent(mouseEvent1,[this]);
		}
	}
	,element_onMouse: function(event) {
		var rect;
		if(this.__canvas != null) {
			rect = this.__canvas.getBoundingClientRect();
			this.__mouseX = (event.clientX - rect.left) * (this.stageWidth / rect.width);
			this.__mouseY = (event.clientY - rect.top) * (this.stageHeight / rect.height);
		} else {
			rect = this.__div.getBoundingClientRect();
			this.__mouseX = event.clientX - rect.left;
			this.__mouseY = event.clientY - rect.top;
		}
		this.__stack = [];
		var type;
		var _g = event.type;
		switch(_g) {
		case "mousedown":
			type = openfl.events.MouseEvent.MOUSE_DOWN;
			break;
		case "mouseup":
			type = openfl.events.MouseEvent.MOUSE_UP;
			break;
		case "mousemove":
			type = openfl.events.MouseEvent.MOUSE_MOVE;
			break;
		case "click":
			type = openfl.events.MouseEvent.CLICK;
			break;
		case "dblclick":
			type = openfl.events.MouseEvent.DOUBLE_CLICK;
			break;
		case "mousewheel":
			type = openfl.events.MouseEvent.MOUSE_WHEEL;
			break;
		default:
			type = null;
		}
		if(this.__hitTest(this.get_mouseX(),this.get_mouseY(),false,this.__stack,true)) {
			var target = this.__stack[this.__stack.length - 1];
			this.__setCursor(target.buttonMode?"pointer":"default");
			this.__fireEvent(openfl.events.MouseEvent.__create(type,event,target.globalToLocal(new openfl.geom.Point(this.get_mouseX(),this.get_mouseY())),target),this.__stack);
		} else {
			this.__setCursor(this.buttonMode?"pointer":"default");
			this.__fireEvent(openfl.events.MouseEvent.__create(type,event,new openfl.geom.Point(this.get_mouseX(),this.get_mouseY()),this),[this]);
		}
	}
	,window_onKey: function(event) {
		var keyCode;
		if(event.keyCode != null) keyCode = event.keyCode; else keyCode = event.which;
		keyCode = openfl.ui.Keyboard.__convertMozillaCode(keyCode);
		var location;
		if(event.location != null) location = event.location; else location = event.keyLocation;
		var keyLocation;
		keyLocation = js.Boot.__cast(location , Int);
		var stack = new Array();
		if(this.__focus == null) this.__getInteractive(stack); else this.__focus.__getInteractive(stack);
		if(stack.length > 0) {
			stack.reverse();
			this.__fireEvent(new openfl.events.KeyboardEvent(event.type == "keydown"?openfl.events.KeyboardEvent.KEY_DOWN:openfl.events.KeyboardEvent.KEY_UP,true,false,event.charCode,keyCode,keyLocation,event.ctrlKey,event.altKey,event.shiftKey),stack);
		}
	}
	,window_onResize: function(event) {
		this.__resize();
		var event1 = new openfl.events.Event(openfl.events.Event.RESIZE);
		this.__broadcast(event1,false);
	}
	,window_onFocus: function(event) {
		var event1 = new openfl.events.Event(openfl.events.Event.ACTIVATE);
		this.__broadcast(event1,true);
	}
	,window_onBlur: function(event) {
		var event1 = new openfl.events.Event(openfl.events.Event.DEACTIVATE);
		this.__broadcast(event1,true);
	}
	,get_color: function() {
		return this.__color;
	}
	,set_color: function(value) {
		this.__colorString = "#" + StringTools.hex(value,6);
		return this.__color = value;
	}
	,get_focus: function() {
		return this.__focus;
	}
	,set_focus: function(value) {
		if(value != this.__focus) {
			if(this.__focus != null) {
				var event = new openfl.events.FocusEvent(openfl.events.FocusEvent.FOCUS_OUT,true,false,value,false,0);
				this.__stack = [];
				this.__focus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(value != null) {
				var event1 = new openfl.events.FocusEvent(openfl.events.FocusEvent.FOCUS_IN,true,false,this.__focus,false,0);
				this.__stack = [];
				value.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event1,this.__stack);
			}
			this.__focus = value;
		}
		return this.__focus;
	}
	,set_displayState: function(value) {
		switch(value[1]) {
		case 0:
			var fs_exit_function = function() {
			    if (document.exitFullscreen) {
			      document.exitFullscreen();
			    } else if (document.msExitFullscreen) {
			      document.msExitFullscreen();
			    } else if (document.mozCancelFullScreen) {
			      document.mozCancelFullScreen();
			    } else if (document.webkitExitFullscreen) {
			      document.webkitExitFullscreen();
			    }
				}
			fs_exit_function();
			break;
		case 1:case 2:
			var fsfunction = function(elem) {
					if (elem.requestFullscreen) elem.requestFullscreen();
					else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
					else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
					else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
				}
			fsfunction(this.__element);
			break;
		}
		this.displayState = value;
		return value;
	}
	,__class__: openfl.display.Stage
	,__properties__: $extend(openfl.display.Sprite.prototype.__properties__,{set_focus:"set_focus",get_focus:"get_focus",set_displayState:"set_displayState",set_color:"set_color",get_color:"get_color"})
});
openfl.display.RenderSession = function() {
	this.maskManager = new openfl.display.MaskManager(this);
};
$hxClasses["openfl.display.RenderSession"] = openfl.display.RenderSession;
openfl.display.RenderSession.__name__ = ["openfl","display","RenderSession"];
openfl.display.RenderSession.prototype = {
	__class__: openfl.display.RenderSession
};
openfl.display.MaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl.display.MaskManager"] = openfl.display.MaskManager;
openfl.display.MaskManager.__name__ = ["openfl","display","MaskManager"];
openfl.display.MaskManager.prototype = {
	pushMask: function(mask) {
		var context = this.renderSession.context;
		context.save();
		var transform = mask.__worldTransform;
		if(transform == null) transform = new openfl.geom.Matrix();
		context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);
		context.beginPath();
		mask.__renderMask(this.renderSession);
		context.clip();
	}
	,pushRect: function(rect,transform) {
		var context = this.renderSession.context;
		context.save();
		context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);
		context.beginPath();
		context.rect(rect.x,rect.y,rect.width,rect.height);
		context.clip();
	}
	,popMask: function() {
		this.renderSession.context.restore();
	}
	,__class__: openfl.display.MaskManager
};
openfl.display.StageAlign = $hxClasses["openfl.display.StageAlign"] = { __ename__ : ["openfl","display","StageAlign"], __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
openfl.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
openfl.display.StageAlign.TOP_RIGHT.toString = $estr;
openfl.display.StageAlign.TOP_RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
openfl.display.StageAlign.TOP_LEFT.toString = $estr;
openfl.display.StageAlign.TOP_LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.TOP = ["TOP",2];
openfl.display.StageAlign.TOP.toString = $estr;
openfl.display.StageAlign.TOP.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.RIGHT = ["RIGHT",3];
openfl.display.StageAlign.RIGHT.toString = $estr;
openfl.display.StageAlign.RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.LEFT = ["LEFT",4];
openfl.display.StageAlign.LEFT.toString = $estr;
openfl.display.StageAlign.LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
openfl.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
openfl.display.StageAlign.BOTTOM_RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
openfl.display.StageAlign.BOTTOM_LEFT.toString = $estr;
openfl.display.StageAlign.BOTTOM_LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM = ["BOTTOM",7];
openfl.display.StageAlign.BOTTOM.toString = $estr;
openfl.display.StageAlign.BOTTOM.__enum__ = openfl.display.StageAlign;
openfl.display.StageDisplayState = $hxClasses["openfl.display.StageDisplayState"] = { __ename__ : ["openfl","display","StageDisplayState"], __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] };
openfl.display.StageDisplayState.NORMAL = ["NORMAL",0];
openfl.display.StageDisplayState.NORMAL.toString = $estr;
openfl.display.StageDisplayState.NORMAL.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
openfl.display.StageDisplayState.FULL_SCREEN.toString = $estr;
openfl.display.StageDisplayState.FULL_SCREEN.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = openfl.display.StageDisplayState;
openfl.display._StageQuality = {};
openfl.display._StageQuality.StageQuality_Impl_ = function() { };
$hxClasses["openfl.display._StageQuality.StageQuality_Impl_"] = openfl.display._StageQuality.StageQuality_Impl_;
openfl.display._StageQuality.StageQuality_Impl_.__name__ = ["openfl","display","_StageQuality","StageQuality_Impl_"];
openfl.display.StageScaleMode = $hxClasses["openfl.display.StageScaleMode"] = { __ename__ : ["openfl","display","StageScaleMode"], __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
openfl.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
openfl.display.StageScaleMode.SHOW_ALL.toString = $estr;
openfl.display.StageScaleMode.SHOW_ALL.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
openfl.display.StageScaleMode.NO_SCALE.toString = $estr;
openfl.display.StageScaleMode.NO_SCALE.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
openfl.display.StageScaleMode.NO_BORDER.toString = $estr;
openfl.display.StageScaleMode.NO_BORDER.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
openfl.display.StageScaleMode.EXACT_FIT.toString = $estr;
openfl.display.StageScaleMode.EXACT_FIT.__enum__ = openfl.display.StageScaleMode;
openfl.display.TriangleCulling = $hxClasses["openfl.display.TriangleCulling"] = { __ename__ : ["openfl","display","TriangleCulling"], __constructs__ : ["NEGATIVE","NONE","POSITIVE"] };
openfl.display.TriangleCulling.NEGATIVE = ["NEGATIVE",0];
openfl.display.TriangleCulling.NEGATIVE.toString = $estr;
openfl.display.TriangleCulling.NEGATIVE.__enum__ = openfl.display.TriangleCulling;
openfl.display.TriangleCulling.NONE = ["NONE",1];
openfl.display.TriangleCulling.NONE.toString = $estr;
openfl.display.TriangleCulling.NONE.__enum__ = openfl.display.TriangleCulling;
openfl.display.TriangleCulling.POSITIVE = ["POSITIVE",2];
openfl.display.TriangleCulling.POSITIVE.toString = $estr;
openfl.display.TriangleCulling.POSITIVE.__enum__ = openfl.display.TriangleCulling;
openfl.errors = {};
openfl.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
	this.name = "Error";
};
$hxClasses["openfl.errors.Error"] = openfl.errors.Error;
openfl.errors.Error.__name__ = ["openfl","errors","Error"];
openfl.errors.Error.prototype = {
	getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: openfl.errors.Error
};
openfl.errors.IOError = function(message) {
	if(message == null) message = "";
	openfl.errors.Error.call(this,message);
};
$hxClasses["openfl.errors.IOError"] = openfl.errors.IOError;
openfl.errors.IOError.__name__ = ["openfl","errors","IOError"];
openfl.errors.IOError.__super__ = openfl.errors.Error;
openfl.errors.IOError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.IOError
});
openfl.errors.RangeError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl.errors.Error.call(this,inMessage,0);
};
$hxClasses["openfl.errors.RangeError"] = openfl.errors.RangeError;
openfl.errors.RangeError.__name__ = ["openfl","errors","RangeError"];
openfl.errors.RangeError.__super__ = openfl.errors.Error;
openfl.errors.RangeError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.RangeError
});
openfl.errors.TypeError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl.errors.Error.call(this,inMessage,0);
};
$hxClasses["openfl.errors.TypeError"] = openfl.errors.TypeError;
openfl.errors.TypeError.__name__ = ["openfl","errors","TypeError"];
openfl.errors.TypeError.__super__ = openfl.errors.Error;
openfl.errors.TypeError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.TypeError
});
openfl.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl.events.TextEvent;
openfl.events.TextEvent.__name__ = ["openfl","events","TextEvent"];
openfl.events.TextEvent.__super__ = openfl.events.Event;
openfl.events.TextEvent.prototype = $extend(openfl.events.Event.prototype,{
	__class__: openfl.events.TextEvent
});
openfl.events.ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl.events.ErrorEvent;
openfl.events.ErrorEvent.__name__ = ["openfl","events","ErrorEvent"];
openfl.events.ErrorEvent.__super__ = openfl.events.TextEvent;
openfl.events.ErrorEvent.prototype = $extend(openfl.events.TextEvent.prototype,{
	__class__: openfl.events.ErrorEvent
});
openfl.events._EventDispatcher = {};
openfl.events._EventDispatcher.Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl.events._EventDispatcher.Listener;
openfl.events._EventDispatcher.Listener.__name__ = ["openfl","events","_EventDispatcher","Listener"];
openfl.events._EventDispatcher.Listener.prototype = {
	match: function(callback,useCapture) {
		return this.callback == callback && this.useCapture == useCapture;
	}
	,__class__: openfl.events._EventDispatcher.Listener
};
openfl.events._EventPhase = {};
openfl.events._EventPhase.EventPhase_Impl_ = function() { };
$hxClasses["openfl.events._EventPhase.EventPhase_Impl_"] = openfl.events._EventPhase.EventPhase_Impl_;
openfl.events._EventPhase.EventPhase_Impl_.__name__ = ["openfl","events","_EventPhase","EventPhase_Impl_"];
openfl.events.FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	if(shiftKey == null) this.shiftKey = false; else this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl.events.FocusEvent;
openfl.events.FocusEvent.__name__ = ["openfl","events","FocusEvent"];
openfl.events.FocusEvent.__super__ = openfl.events.Event;
openfl.events.FocusEvent.prototype = $extend(openfl.events.Event.prototype,{
	clone: function() {
		var event = new openfl.events.FocusEvent(this.type,this.bubbles,this.cancelable,this.relatedObject,this.shiftKey,this.keyCode);
		event.target = this.target;
		event.currentTarget = this.currentTarget;
		event.eventPhase = this.eventPhase;
		return event;
	}
	,__class__: openfl.events.FocusEvent
});
openfl.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	openfl.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["openfl.events.HTTPStatusEvent"] = openfl.events.HTTPStatusEvent;
openfl.events.HTTPStatusEvent.__name__ = ["openfl","events","HTTPStatusEvent"];
openfl.events.HTTPStatusEvent.__super__ = openfl.events.Event;
openfl.events.HTTPStatusEvent.prototype = $extend(openfl.events.Event.prototype,{
	__class__: openfl.events.HTTPStatusEvent
});
openfl.events.IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl.events.IOErrorEvent;
openfl.events.IOErrorEvent.__name__ = ["openfl","events","IOErrorEvent"];
openfl.events.IOErrorEvent.__super__ = openfl.events.ErrorEvent;
openfl.events.IOErrorEvent.prototype = $extend(openfl.events.ErrorEvent.prototype,{
	clone: function() {
		return new openfl.events.IOErrorEvent(this.type,this.bubbles,this.cancelable,this.text,this.errorID);
	}
	,toString: function() {
		return "[IOErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl.events.IOErrorEvent
});
openfl.events.KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl.events.KeyboardEvent;
openfl.events.KeyboardEvent.__name__ = ["openfl","events","KeyboardEvent"];
openfl.events.KeyboardEvent.__super__ = openfl.events.Event;
openfl.events.KeyboardEvent.prototype = $extend(openfl.events.Event.prototype,{
	__class__: openfl.events.KeyboardEvent
});
openfl.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["openfl.events.MouseEvent"] = openfl.events.MouseEvent;
openfl.events.MouseEvent.__name__ = ["openfl","events","MouseEvent"];
openfl.events.MouseEvent.__buttonDown = null;
openfl.events.MouseEvent.__create = function(type,event,local,target) {
	var delta = 2;
	if(type == openfl.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == openfl.events.MouseEvent.MOUSE_DOWN) openfl.events.MouseEvent.__buttonDown = true; else if(type == openfl.events.MouseEvent.MOUSE_UP) openfl.events.MouseEvent.__buttonDown = false;
	var pseudoEvent = new openfl.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,openfl.events.MouseEvent.__buttonDown,delta);
	pseudoEvent.stageX = openfl.Lib.current.stage.get_mouseX();
	pseudoEvent.stageY = openfl.Lib.current.stage.get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
};
openfl.events.MouseEvent.__super__ = openfl.events.Event;
openfl.events.MouseEvent.prototype = $extend(openfl.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,__class__: openfl.events.MouseEvent
});
openfl.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["openfl.events.ProgressEvent"] = openfl.events.ProgressEvent;
openfl.events.ProgressEvent.__name__ = ["openfl","events","ProgressEvent"];
openfl.events.ProgressEvent.__super__ = openfl.events.Event;
openfl.events.ProgressEvent.prototype = $extend(openfl.events.Event.prototype,{
	__class__: openfl.events.ProgressEvent
});
openfl.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.SecurityErrorEvent"] = openfl.events.SecurityErrorEvent;
openfl.events.SecurityErrorEvent.__name__ = ["openfl","events","SecurityErrorEvent"];
openfl.events.SecurityErrorEvent.__super__ = openfl.events.ErrorEvent;
openfl.events.SecurityErrorEvent.prototype = $extend(openfl.events.ErrorEvent.prototype,{
	__class__: openfl.events.SecurityErrorEvent
});
openfl.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,sizeX,sizeY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(sizeY == null) sizeY = 1;
	if(sizeX == null) sizeX = 1;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.pressure = 1;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["openfl.events.TouchEvent"] = openfl.events.TouchEvent;
openfl.events.TouchEvent.__name__ = ["openfl","events","TouchEvent"];
openfl.events.TouchEvent.__create = function(type,event,touch,local,target) {
	var evt = new openfl.events.TouchEvent(type,true,false,local.x,local.y,null,null,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = openfl.Lib.current.stage.get_mouseX();
	evt.stageY = openfl.Lib.current.stage.get_mouseY();
	evt.target = target;
	return evt;
};
openfl.events.TouchEvent.__super__ = openfl.events.Event;
openfl.events.TouchEvent.prototype = $extend(openfl.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,__class__: openfl.events.TouchEvent
});
openfl.filters = {};
openfl.filters.BitmapFilter = function() {
};
$hxClasses["openfl.filters.BitmapFilter"] = openfl.filters.BitmapFilter;
openfl.filters.BitmapFilter.__name__ = ["openfl","filters","BitmapFilter"];
openfl.filters.BitmapFilter.prototype = {
	clone: function() {
		return new openfl.filters.BitmapFilter();
	}
	,__applyFilter: function(sourceData,targetData,sourceRect,destPoint) {
	}
	,__class__: openfl.filters.BitmapFilter
};
openfl.geom.Transform = function(displayObject) {
	this.colorTransform = new openfl.geom.ColorTransform();
	this.concatenatedColorTransform = new openfl.geom.ColorTransform();
	this.concatenatedMatrix = new openfl.geom.Matrix();
	this.pixelBounds = new openfl.geom.Rectangle();
	this.__displayObject = displayObject;
	this.__matrix = new openfl.geom.Matrix();
};
$hxClasses["openfl.geom.Transform"] = openfl.geom.Transform;
openfl.geom.Transform.__name__ = ["openfl","geom","Transform"];
openfl.geom.Transform.prototype = {
	get_matrix: function() {
		if(this.__matrix != null) {
			this.__matrix.identity();
			this.__matrix.scale(this.__displayObject.get_scaleX(),this.__displayObject.get_scaleY());
			this.__matrix.rotate(this.__displayObject.get_rotation() * (Math.PI / 180));
			this.__matrix.translate(this.__displayObject.get_x(),this.__displayObject.get_y());
			return this.__matrix.clone();
		}
		return null;
	}
	,set_matrix: function(value) {
		if(value == null) return this.__matrix = null;
		if(this.__displayObject != null) {
			this.__displayObject.set_x(value.tx);
			this.__displayObject.set_y(value.ty);
			this.__displayObject.set_scaleX(Math.sqrt(value.a * value.a + value.b * value.b));
			this.__displayObject.set_scaleY(Math.sqrt(value.c * value.c + value.d * value.d));
			this.__displayObject.set_rotation(Math.atan2(value.b,value.a) * (180 / Math.PI));
		}
		return value;
	}
	,__class__: openfl.geom.Transform
	,__properties__: {set_matrix:"set_matrix",get_matrix:"get_matrix"}
};
openfl.geom.Vector3D = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["openfl.geom.Vector3D"] = openfl.geom.Vector3D;
openfl.geom.Vector3D.__name__ = ["openfl","geom","Vector3D"];
openfl.geom.Vector3D.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"}
openfl.geom.Vector3D.X_AXIS = null;
openfl.geom.Vector3D.Y_AXIS = null;
openfl.geom.Vector3D.Z_AXIS = null;
openfl.geom.Vector3D.angleBetween = function(a,b) {
	var a0 = new openfl.geom.Vector3D(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new openfl.geom.Vector3D(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
openfl.geom.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
openfl.geom.Vector3D.get_X_AXIS = function() {
	return new openfl.geom.Vector3D(1,0,0);
};
openfl.geom.Vector3D.get_Y_AXIS = function() {
	return new openfl.geom.Vector3D(0,1,0);
};
openfl.geom.Vector3D.get_Z_AXIS = function() {
	return new openfl.geom.Vector3D(0,0,1);
};
openfl.geom.Vector3D.prototype = {
	add: function(a) {
		return new openfl.geom.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new openfl.geom.Vector3D(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector3D) {
		this.x = sourceVector3D.x;
		this.y = sourceVector3D.y;
		this.z = sourceVector3D.z;
	}
	,crossProduct: function(a) {
		return new openfl.geom.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,subtract: function(a) {
		return new openfl.geom.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: openfl.geom.Vector3D
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
};
openfl.media = {};
openfl.media.ID3Info = function() {
};
$hxClasses["openfl.media.ID3Info"] = openfl.media.ID3Info;
openfl.media.ID3Info.__name__ = ["openfl","media","ID3Info"];
openfl.media.ID3Info.prototype = {
	__class__: openfl.media.ID3Info
};
openfl.media.Sound = function(stream,context) {
	openfl.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl.media.Sound;
openfl.media.Sound.__name__ = ["openfl","media","Sound"];
openfl.media.Sound.__super__ = openfl.events.EventDispatcher;
openfl.media.Sound.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	close: function() {
		if(openfl.media.Sound.__registeredSounds.exists(this.__soundID)) createjs.Sound.removeSound(this.__soundID);
	}
	,load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe.io.Path.withoutExtension(stream.url);
		if(!openfl.media.Sound.__registeredSounds.exists(this.__soundID)) {
			openfl.media.Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,loadCompressedDataFromByteArray: function(bytes,bytesLength) {
		openfl.Lib.notImplemented("Sound.loadCompressedDataFromByteArray");
	}
	,loadPCMFromByteArray: function(bytes,samples,format,stereo,sampleRate) {
		if(sampleRate == null) sampleRate = 44100;
		if(stereo == null) stereo = true;
		openfl.Lib.notImplemented("Sound.loadPCMFromByteArray");
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(sndTransform == null) sndTransform = new openfl.media.SoundTransform(1,0);
		var instance = createjs.Sound.play(this.__soundID,"any",0,startTime | 0,loops,sndTransform.volume,sndTransform.pan);
		return new openfl.media.SoundChannel(instance);
	}
	,get_id3: function() {
		return new openfl.media.ID3Info();
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
		}
	}
	,__class__: openfl.media.Sound
	,__properties__: {get_id3:"get_id3"}
});
openfl.media.SoundChannel = function(soundInstance) {
	openfl.events.EventDispatcher.call(this,this);
	this.__soundInstance = soundInstance;
	this.__soundInstance.addEventListener("complete",$bind(this,this.soundInstance_onComplete));
};
$hxClasses["openfl.media.SoundChannel"] = openfl.media.SoundChannel;
openfl.media.SoundChannel.__name__ = ["openfl","media","SoundChannel"];
openfl.media.SoundChannel.__super__ = openfl.events.EventDispatcher;
openfl.media.SoundChannel.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	stop: function() {
		this.__soundInstance.stop();
	}
	,__dispose: function() {
		this.__soundInstance.stop();
		this.__soundInstance = null;
	}
	,get_position: function() {
		return this.__soundInstance.getPosition();
	}
	,set_position: function(value) {
		this.__soundInstance.setPosition(value | 0);
		return this.__soundInstance.getPosition();
	}
	,get_soundTransform: function() {
		return new openfl.media.SoundTransform(this.__soundInstance.getVolume(),this.__soundInstance.getPan());
	}
	,set_soundTransform: function(value) {
		this.__soundInstance.setVolume(value.volume);
		this.__soundInstance.setPan(value.pan);
		return value;
	}
	,soundInstance_onComplete: function(_) {
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.SOUND_COMPLETE));
	}
	,__class__: openfl.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform",get_soundTransform:"get_soundTransform",set_position:"set_position",get_position:"get_position"}
});
openfl.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["openfl.media.SoundLoaderContext"] = openfl.media.SoundLoaderContext;
openfl.media.SoundLoaderContext.__name__ = ["openfl","media","SoundLoaderContext"];
openfl.media.SoundLoaderContext.prototype = {
	__class__: openfl.media.SoundLoaderContext
};
openfl.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["openfl.media.SoundTransform"] = openfl.media.SoundTransform;
openfl.media.SoundTransform.__name__ = ["openfl","media","SoundTransform"];
openfl.media.SoundTransform.prototype = {
	__class__: openfl.media.SoundTransform
};
openfl.net.SharedObject = function() {
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["openfl.net.SharedObject"] = openfl.net.SharedObject;
openfl.net.SharedObject.__name__ = ["openfl","net","SharedObject"];
openfl.net.SharedObject.getLocal = function(name,localPath,secure) {
	if(secure == null) secure = false;
	if(localPath == null) localPath = window.location.href;
	var so = new openfl.net.SharedObject();
	so.__key = localPath + ":" + name;
	var rawData = null;
	try {
		rawData = openfl.net.SharedObject.__getLocalStorage().getItem(so.__key);
	} catch( e ) {
	}
	so.data = { };
	if(rawData != null && rawData != "") {
		var unserializer = new haxe.Unserializer(rawData);
		unserializer.setResolver({ resolveEnum : Type.resolveEnum, resolveClass : openfl.net.SharedObject.resolveClass});
		so.data = unserializer.unserialize();
	}
	if(so.data == null) so.data = { };
	return so;
};
openfl.net.SharedObject.__getLocalStorage = function() {
	var res = js.Browser.getLocalStorage();
	if(res == null) throw new openfl.errors.Error("SharedObject not supported");
	return res;
};
openfl.net.SharedObject.resolveClass = function(name) {
	if(name != null) return Type.resolveClass(StringTools.replace(StringTools.replace(name,"jeash.","flash."),"browser.","flash."));
	return null;
};
openfl.net.SharedObject.__super__ = openfl.events.EventDispatcher;
openfl.net.SharedObject.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	clear: function() {
		this.data = { };
		try {
			openfl.net.SharedObject.__getLocalStorage().removeItem(this.__key);
		} catch( e ) {
		}
		this.flush();
	}
	,flush: function() {
		var data = haxe.Serializer.run(this.data);
		try {
			openfl.net.SharedObject.__getLocalStorage().removeItem(this.__key);
			openfl.net.SharedObject.__getLocalStorage().setItem(this.__key,data);
		} catch( e ) {
			return openfl.net.SharedObjectFlushStatus.PENDING;
		}
		return openfl.net.SharedObjectFlushStatus.FLUSHED;
	}
	,setProperty: function(propertyName,value) {
		if(this.data != null) this.data[propertyName] = value;
	}
	,get_size: function() {
		var d = haxe.Serializer.run(this.data);
		return haxe.io.Bytes.ofString(d).length;
	}
	,__class__: openfl.net.SharedObject
	,__properties__: {get_size:"get_size"}
});
openfl.net.SharedObjectFlushStatus = $hxClasses["openfl.net.SharedObjectFlushStatus"] = { __ename__ : ["openfl","net","SharedObjectFlushStatus"], __constructs__ : ["FLUSHED","PENDING"] };
openfl.net.SharedObjectFlushStatus.FLUSHED = ["FLUSHED",0];
openfl.net.SharedObjectFlushStatus.FLUSHED.toString = $estr;
openfl.net.SharedObjectFlushStatus.FLUSHED.__enum__ = openfl.net.SharedObjectFlushStatus;
openfl.net.SharedObjectFlushStatus.PENDING = ["PENDING",1];
openfl.net.SharedObjectFlushStatus.PENDING.toString = $estr;
openfl.net.SharedObjectFlushStatus.PENDING.__enum__ = openfl.net.SharedObjectFlushStatus;
openfl.net.URLLoaderDataFormat = $hxClasses["openfl.net.URLLoaderDataFormat"] = { __ename__ : ["openfl","net","URLLoaderDataFormat"], __constructs__ : ["BINARY","TEXT","VARIABLES"] };
openfl.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
openfl.net.URLLoaderDataFormat.BINARY.toString = $estr;
openfl.net.URLLoaderDataFormat.BINARY.__enum__ = openfl.net.URLLoaderDataFormat;
openfl.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
openfl.net.URLLoaderDataFormat.TEXT.toString = $estr;
openfl.net.URLLoaderDataFormat.TEXT.__enum__ = openfl.net.URLLoaderDataFormat;
openfl.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
openfl.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
openfl.net.URLLoaderDataFormat.VARIABLES.__enum__ = openfl.net.URLLoaderDataFormat;
openfl.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = openfl.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl.net.URLRequest;
openfl.net.URLRequest.__name__ = ["openfl","net","URLRequest"];
openfl.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == openfl.net.URLRequestMethod.GET || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,openfl.utils.ByteArray)) {
			res = res.slice();
			res.push(new openfl.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: openfl.net.URLRequest
};
openfl.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["openfl.net.URLRequestHeader"] = openfl.net.URLRequestHeader;
openfl.net.URLRequestHeader.__name__ = ["openfl","net","URLRequestHeader"];
openfl.net.URLRequestHeader.prototype = {
	__class__: openfl.net.URLRequestHeader
};
openfl.net.URLRequestMethod = function() { };
$hxClasses["openfl.net.URLRequestMethod"] = openfl.net.URLRequestMethod;
openfl.net.URLRequestMethod.__name__ = ["openfl","net","URLRequestMethod"];
openfl.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["openfl.net.URLVariables"] = openfl.net.URLVariables;
openfl.net.URLVariables.__name__ = ["openfl","net","URLVariables"];
openfl.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g1 = 0;
		while(_g1 < fields1.length) {
			var f1 = fields1[_g1];
			++_g1;
			var eq = f1.indexOf("=");
			if(eq > 0) Reflect.setField(this,StringTools.urlDecode(HxOverrides.substr(f1,0,eq)),StringTools.urlDecode(HxOverrides.substr(f1,eq + 1,null))); else if(eq != 0) Reflect.setField(this,decodeURIComponent(f1.split("+").join(" ")),"");
		}
	}
	,toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(encodeURIComponent(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,__class__: openfl.net.URLVariables
};
openfl.system = {};
openfl.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl.system.ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl.system.ApplicationDomain;
openfl.system.ApplicationDomain.__name__ = ["openfl","system","ApplicationDomain"];
openfl.system.ApplicationDomain.prototype = {
	getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,__class__: openfl.system.ApplicationDomain
};
openfl.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	this.applicationDomain = applicationDomain;
	this.allowCodeImport = true;
	this.allowLoadBytesCodeExecution = true;
};
$hxClasses["openfl.system.LoaderContext"] = openfl.system.LoaderContext;
openfl.system.LoaderContext.__name__ = ["openfl","system","LoaderContext"];
openfl.system.LoaderContext.prototype = {
	__class__: openfl.system.LoaderContext
};
openfl.system.SecurityDomain = function() {
};
$hxClasses["openfl.system.SecurityDomain"] = openfl.system.SecurityDomain;
openfl.system.SecurityDomain.__name__ = ["openfl","system","SecurityDomain"];
openfl.system.SecurityDomain.prototype = {
	__class__: openfl.system.SecurityDomain
};
openfl.text._AntiAliasType = {};
openfl.text._AntiAliasType.AntiAliasType_Impl_ = function() { };
$hxClasses["openfl.text._AntiAliasType.AntiAliasType_Impl_"] = openfl.text._AntiAliasType.AntiAliasType_Impl_;
openfl.text._AntiAliasType.AntiAliasType_Impl_.__name__ = ["openfl","text","_AntiAliasType","AntiAliasType_Impl_"];
openfl.text.Font = function() {
};
$hxClasses["openfl.text.Font"] = openfl.text.Font;
openfl.text.Font.__name__ = ["openfl","text","Font"];
openfl.text.Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) enumerateDeviceFonts = false;
	return [];
};
openfl.text.Font.registerFont = function(font) {
};
openfl.text.Font.prototype = {
	__class__: openfl.text.Font
};
openfl.text.FontStyle = $hxClasses["openfl.text.FontStyle"] = { __ename__ : ["openfl","text","FontStyle"], __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] };
openfl.text.FontStyle.REGULAR = ["REGULAR",0];
openfl.text.FontStyle.REGULAR.toString = $estr;
openfl.text.FontStyle.REGULAR.__enum__ = openfl.text.FontStyle;
openfl.text.FontStyle.ITALIC = ["ITALIC",1];
openfl.text.FontStyle.ITALIC.toString = $estr;
openfl.text.FontStyle.ITALIC.__enum__ = openfl.text.FontStyle;
openfl.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
openfl.text.FontStyle.BOLD_ITALIC.toString = $estr;
openfl.text.FontStyle.BOLD_ITALIC.__enum__ = openfl.text.FontStyle;
openfl.text.FontStyle.BOLD = ["BOLD",3];
openfl.text.FontStyle.BOLD.toString = $estr;
openfl.text.FontStyle.BOLD.__enum__ = openfl.text.FontStyle;
openfl.text.FontType = $hxClasses["openfl.text.FontType"] = { __ename__ : ["openfl","text","FontType"], __constructs__ : ["DEVICE","EMBEDDED","EMBEDDED_CFF"] };
openfl.text.FontType.DEVICE = ["DEVICE",0];
openfl.text.FontType.DEVICE.toString = $estr;
openfl.text.FontType.DEVICE.__enum__ = openfl.text.FontType;
openfl.text.FontType.EMBEDDED = ["EMBEDDED",1];
openfl.text.FontType.EMBEDDED.toString = $estr;
openfl.text.FontType.EMBEDDED.__enum__ = openfl.text.FontType;
openfl.text.FontType.EMBEDDED_CFF = ["EMBEDDED_CFF",2];
openfl.text.FontType.EMBEDDED_CFF.toString = $estr;
openfl.text.FontType.EMBEDDED_CFF.__enum__ = openfl.text.FontType;
openfl.text.TextFormatRange = function(format,start,end) {
	this.format = format;
	this.start = start;
	this.end = end;
};
$hxClasses["openfl.text.TextFormatRange"] = openfl.text.TextFormatRange;
openfl.text.TextFormatRange.__name__ = ["openfl","text","TextFormatRange"];
openfl.text.TextFormatRange.prototype = {
	__class__: openfl.text.TextFormatRange
};
openfl.text.TextLineMetrics = function(x,width,height,ascent,descent,leading) {
	this.x = x;
	this.width = width;
	this.height = height;
	this.ascent = ascent;
	this.descent = descent;
	this.leading = leading;
};
$hxClasses["openfl.text.TextLineMetrics"] = openfl.text.TextLineMetrics;
openfl.text.TextLineMetrics.__name__ = ["openfl","text","TextLineMetrics"];
openfl.text.TextLineMetrics.prototype = {
	__class__: openfl.text.TextLineMetrics
};
openfl.ui = {};
openfl.ui._KeyLocation = {};
openfl.ui._KeyLocation.KeyLocation_Impl_ = function() { };
$hxClasses["openfl.ui._KeyLocation.KeyLocation_Impl_"] = openfl.ui._KeyLocation.KeyLocation_Impl_;
openfl.ui._KeyLocation.KeyLocation_Impl_.__name__ = ["openfl","ui","_KeyLocation","KeyLocation_Impl_"];
openfl.ui.Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl.ui.Keyboard;
openfl.ui.Keyboard.__name__ = ["openfl","ui","Keyboard"];
openfl.ui.Keyboard.capsLock = null;
openfl.ui.Keyboard.numLock = null;
openfl.ui.Keyboard.isAccessible = function() {
	return false;
};
openfl.ui.Keyboard.__convertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 20;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
};
openfl.ui.Keyboard.__convertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 20;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
};
openfl.ui.Multitouch = function() { };
$hxClasses["openfl.ui.Multitouch"] = openfl.ui.Multitouch;
openfl.ui.Multitouch.__name__ = ["openfl","ui","Multitouch"];
openfl.ui.Multitouch.__properties__ = {get_supportsTouchEvents:"get_supportsTouchEvents",set_inputMode:"set_inputMode",get_inputMode:"get_inputMode"}
openfl.ui.Multitouch.maxTouchPoints = null;
openfl.ui.Multitouch.supportedGestures = null;
openfl.ui.Multitouch.supportsGestureEvents = null;
openfl.ui.Multitouch.supportsTouchEvents = null;
openfl.ui.Multitouch.get_inputMode = function() {
	return openfl.ui.MultitouchInputMode.TOUCH_POINT;
};
openfl.ui.Multitouch.set_inputMode = function(inMode) {
	if(inMode == openfl.ui.MultitouchInputMode.GESTURE) return openfl.ui.Multitouch.get_inputMode();
	return inMode;
};
openfl.ui.Multitouch.get_supportsTouchEvents = function() {
	if(('ontouchstart' in document.documentElement) || (window.DocumentTouch && document instanceof DocumentTouch)) return true;
	return false;
};
openfl.ui.MultitouchInputMode = $hxClasses["openfl.ui.MultitouchInputMode"] = { __ename__ : ["openfl","ui","MultitouchInputMode"], __constructs__ : ["NONE","TOUCH_POINT","GESTURE"] };
openfl.ui.MultitouchInputMode.NONE = ["NONE",0];
openfl.ui.MultitouchInputMode.NONE.toString = $estr;
openfl.ui.MultitouchInputMode.NONE.__enum__ = openfl.ui.MultitouchInputMode;
openfl.ui.MultitouchInputMode.TOUCH_POINT = ["TOUCH_POINT",1];
openfl.ui.MultitouchInputMode.TOUCH_POINT.toString = $estr;
openfl.ui.MultitouchInputMode.TOUCH_POINT.__enum__ = openfl.ui.MultitouchInputMode;
openfl.ui.MultitouchInputMode.GESTURE = ["GESTURE",2];
openfl.ui.MultitouchInputMode.GESTURE.toString = $estr;
openfl.ui.MultitouchInputMode.GESTURE.__enum__ = openfl.ui.MultitouchInputMode;
openfl.utils = {};
openfl.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this.___resizeBuffer(this.allocated);
};
$hxClasses["openfl.utils.ByteArray"] = openfl.utils.ByteArray;
openfl.utils.ByteArray.__name__ = ["openfl","utils","ByteArray"];
openfl.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new openfl.utils.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
};
openfl.utils.ByteArray.__ofBuffer = function(buffer) {
	var bytes = new openfl.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
openfl.utils.ByteArray.prototype = {
	clear: function() {
		if(this.allocated < 0) this.___resizeBuffer(this.allocated = Std["int"](Math.max(0,this.allocated * 2))); else if(this.allocated > 0) this.___resizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
		this.position = 0;
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(length == null) length = 0;
		if(offset == null) offset = 0;
		if(offset < 0 || length < 0) throw new openfl.errors.IOError("Read error - Out of bounds");
		if(length == 0) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = Std["int"](Math.max(lengthToEnsure,bytes.allocated * 2))); else if(bytes.allocated > lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this.___resizeBuffer(this.allocated = Std["int"](Math.max(len,this.allocated * 2))); else if(this.allocated > len) this.___resizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,uncompress: function() {
		var bytes = haxe.io.Bytes.ofData(this.byteView);
		var buf = format.tools.Inflate.run(bytes).getData();
		this.byteView = new Uint8Array(buf);
		this.data = new DataView(this.byteView.buffer);
		this.set_length(this.allocated = this.byteView.buffer.byteLength);
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(length == null) length = 0;
		if(offset == null) offset = 0;
		if(offset < 0 || length < 0) throw new openfl.errors.IOError("Write error - Out of bounds");
		if(length == 0) length = bytes.length;
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,__fromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__getBuffer: function() {
		return this.data.buffer;
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: openfl.utils.ByteArray
	,__properties__: {set_length:"set_length",set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
};
openfl.utils.CompressionAlgorithm = $hxClasses["openfl.utils.CompressionAlgorithm"] = { __ename__ : ["openfl","utils","CompressionAlgorithm"], __constructs__ : ["DEFLATE","ZLIB","LZMA","GZIP"] };
openfl.utils.CompressionAlgorithm.DEFLATE = ["DEFLATE",0];
openfl.utils.CompressionAlgorithm.DEFLATE.toString = $estr;
openfl.utils.CompressionAlgorithm.DEFLATE.__enum__ = openfl.utils.CompressionAlgorithm;
openfl.utils.CompressionAlgorithm.ZLIB = ["ZLIB",1];
openfl.utils.CompressionAlgorithm.ZLIB.toString = $estr;
openfl.utils.CompressionAlgorithm.ZLIB.__enum__ = openfl.utils.CompressionAlgorithm;
openfl.utils.CompressionAlgorithm.LZMA = ["LZMA",2];
openfl.utils.CompressionAlgorithm.LZMA.toString = $estr;
openfl.utils.CompressionAlgorithm.LZMA.__enum__ = openfl.utils.CompressionAlgorithm;
openfl.utils.CompressionAlgorithm.GZIP = ["GZIP",3];
openfl.utils.CompressionAlgorithm.GZIP.toString = $estr;
openfl.utils.CompressionAlgorithm.GZIP.__enum__ = openfl.utils.CompressionAlgorithm;
openfl.utils.Endian = function() { };
$hxClasses["openfl.utils.Endian"] = openfl.utils.Endian;
openfl.utils.Endian.__name__ = ["openfl","utils","Endian"];
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
lovedna.utils.Ease._nameMap = new haxe.ds.StringMap();
lovedna.utils.Ease._nameList = [];
lovedna.utils.Ease.addName(lovedna.utils.Ease.linear,"linear",0);
lovedna.utils.Ease.addName(lovedna.utils.Ease.sineIn,"sineIn",1);
lovedna.utils.Ease.addName(lovedna.utils.Ease.sineOut,"sineOut",2);
lovedna.utils.Ease.addName(lovedna.utils.Ease.sineInOut,"sineInOut",3);
lovedna.utils.Ease.addName(lovedna.utils.Ease.sineOutIn,"sineOutIn",4);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quadIn,"quadIn",5);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quadOut,"quadOut",6);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quadInOut,"quadInOut",7);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quadOutIn,"quadOutIn",8);
lovedna.utils.Ease.addName(lovedna.utils.Ease.cubicIn,"cubicIn",9);
lovedna.utils.Ease.addName(lovedna.utils.Ease.cubicOut,"cubicOut",10);
lovedna.utils.Ease.addName(lovedna.utils.Ease.cubicInOut,"cubicInOut",11);
lovedna.utils.Ease.addName(lovedna.utils.Ease.cubicOutIn,"cubicOutIn",12);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quartIn,"quartIn",13);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quartOut,"quartOut",14);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quartInOut,"quartInOut",15);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quartOutIn,"quartOutIn",16);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quintIn,"quintIn",17);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quintOut,"quintOut",18);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quintInOut,"quintInOut",19);
lovedna.utils.Ease.addName(lovedna.utils.Ease.quintOutIn,"quintOutIn",20);
lovedna.utils.Ease.addName(lovedna.utils.Ease.expoIn,"expoIn",21);
lovedna.utils.Ease.addName(lovedna.utils.Ease.expoOut,"expoOut",22);
lovedna.utils.Ease.addName(lovedna.utils.Ease.expoInOut,"expoInOut",23);
lovedna.utils.Ease.addName(lovedna.utils.Ease.expoOutIn,"expoOutIn",24);
lovedna.utils.Ease.addName(lovedna.utils.Ease.circIn,"circIn",25);
lovedna.utils.Ease.addName(lovedna.utils.Ease.circOut,"circOut",26);
lovedna.utils.Ease.addName(lovedna.utils.Ease.circInOut,"circInOut",27);
lovedna.utils.Ease.addName(lovedna.utils.Ease.circOutIn,"circOutIn",28);
lovedna.utils.Ease.addName(lovedna.utils.Ease.bounceIn,"bounceIn",29);
lovedna.utils.Ease.addName(lovedna.utils.Ease.bounceOut,"bounceOut",30);
lovedna.utils.Ease.addName(lovedna.utils.Ease.bounceInOut,"bounceInOut",31);
lovedna.utils.Ease.addName(lovedna.utils.Ease.bounceOutIn,"bounceOutIn",32);
lovedna.utils.Ease.addName(lovedna.utils.Ease.backIn,"backIn",33);
lovedna.utils.Ease.addName(lovedna.utils.Ease.backOut,"backOut",34);
lovedna.utils.Ease.addName(lovedna.utils.Ease.backInOut,"backInOut",35);
lovedna.utils.Ease.addName(lovedna.utils.Ease.backOutIn,"backOutIn",36);
lovedna.utils.Ease.addName(lovedna.utils.Ease.elasticIn,"elasticIn",37);
lovedna.utils.Ease.addName(lovedna.utils.Ease.elasticOut,"elasticOut",38);
lovedna.utils.Ease.addName(lovedna.utils.Ease.elasticInOut,"elasticInOut",39);
lovedna.utils.Ease.addName(lovedna.utils.Ease.elasticOutIn,"elasticOutIn",40);
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl.ui.Multitouch.maxTouchPoints = 2;
openfl.ui.Multitouch.supportedGestures = null;
openfl.ui.Multitouch.supportsGestureEvents = false;
ApplicationMain.images = new haxe.ds.StringMap();
ApplicationMain.urlLoaders = new haxe.ds.StringMap();
ApplicationMain.assetsLoaded = 0;
ApplicationMain.total = 0;
openfl.display.DisplayObject.__instanceCount = 0;
openfl.display.DisplayObject.__worldRenderDirty = 0;
openfl.display.DisplayObject.__worldTransformDirty = 0;
format.tools._InflateImpl.Window.SIZE = 32768;
format.tools._InflateImpl.Window.BUFSIZE = 65536;
format.tools.InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
format.tools.InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
format.tools.InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
format.tools.InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
format.tools.InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
format.tools.InflateImpl.FIXED_HUFFMAN = null;
lovedna.framework.Actor.__meta__ = { fields : { _singleton : { '*t' : ["lovedna.injector.Singleton"], '*n' : ["_singleton"], inject : null}, _actorEvent : { '*t' : ["openfl.events.EventDispatcher"], '*n' : ["_actorEvent"], inject : null}, _context : { '*t' : ["lovedna.framework.Context"], '*n' : ["_context"], inject : null}}};
lovedna.framework.Context.__meta__ = { fields : { _container : { '*t' : ["openfl.display.DisplayObjectContainer"], '*n' : ["_container"], inject : null}}};
game.client.ClientContext.__meta__ = { fields : { _camera : { '*t' : ["game.client.core.GameCamera"], '*n' : ["_camera"], inject : null}}};
game.client.command.AdStatusCommand.__meta__ = { fields : { _event : { '*t' : ["game.client.event.ADEvent"], '*n' : ["_event"], inject : null}, _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}, _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}}};
game.client.command.ExportDataCommand.__meta__ = { fields : { _drawstage : { '*t' : ["game.client.module.draw.EditStage"], '*n' : ["_drawstage"], inject : null}, _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}}};
game.client.command.GameDataCompleteCommand.__meta__ = { fields : { _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}, _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}}};
game.client.command.GameStartCommand.__meta__ = { fields : { _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}, _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}, _csvConfig : { '*t' : ["game.client.config.CsvConfig"], '*n' : ["_csvConfig"], inject : null}, _java : { '*t' : ["game.client.service.JavaService"], '*n' : ["_java"], inject : null}}};
game.client.config.AppConfig.debug = false;
game.client.config.AppConfig.width = 288;
game.client.config.AppConfig.height = 512;
game.client.config.AppConfig.ui = "ui2.png#";
game.client.config.AppConfig.resourcePath = "http://game2d.duapp.com/pixel/v0/";
game.client.config.UserConfig.currentLevel = 1;
game.client.config.UserConfig.maxLevel = 1;
lovedna.canvas.Image.RELATIVE_X = 1;
lovedna.canvas.Image.RELATIVE_Y = 2;
lovedna.canvas.Image.RELATIVE_ROTATION = 3;
lovedna.canvas.Image.RELATIVE_SCALEX = 4;
lovedna.canvas.Image.RELATIVE_SCALEY = 5;
lovedna.canvas.Image.RELATIVE_ALPHA = 6;
lovedna.canvas.Image.RELATIVE_COLOR = 7;
lovedna.canvas.Image.RELATION_SMOOTH = 8;
lovedna.canvas.Image._xlist = new Array();
lovedna.canvas.Image._ylist = new Array();
openfl.events.Event.ACTIVATE = "activate";
openfl.events.Event.ADDED = "added";
openfl.events.Event.ADDED_TO_STAGE = "addedToStage";
openfl.events.Event.CANCEL = "cancel";
openfl.events.Event.CHANGE = "change";
openfl.events.Event.CLOSE = "close";
openfl.events.Event.COMPLETE = "complete";
openfl.events.Event.CONNECT = "connect";
openfl.events.Event.CONTEXT3D_CREATE = "context3DCreate";
openfl.events.Event.DEACTIVATE = "deactivate";
openfl.events.Event.ENTER_FRAME = "enterFrame";
openfl.events.Event.ID3 = "id3";
openfl.events.Event.INIT = "init";
openfl.events.Event.MOUSE_LEAVE = "mouseLeave";
openfl.events.Event.OPEN = "open";
openfl.events.Event.REMOVED = "removed";
openfl.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
openfl.events.Event.RENDER = "render";
openfl.events.Event.RESIZE = "resize";
openfl.events.Event.SCROLL = "scroll";
openfl.events.Event.SELECT = "select";
openfl.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
openfl.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
openfl.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
openfl.events.Event.UNLOAD = "unload";
openfl.events.Event.SOUND_COMPLETE = "soundComplete";
game.client.event.ADEvent.AD_STATUS = "ad_status";
game.client.event.ADEvent.AdSwitch = 1;
game.client.event.ADEvent.AdShow = 2;
game.client.event.ADEvent.AdReady = 3;
game.client.event.ADEvent.AdFailed = 4;
game.client.event.ADEvent.AdClick = 5;
game.client.event.GameEvent.START = "gameStart";
game.client.event.GameEvent.DATA_COMPLETE = "dataComplete";
game.client.event.GameEvent.DATA_EXPORT = "data_export";
game.client.module.day.DayStage.__meta__ = { fields : { _java : { '*t' : ["game.client.service.JavaService"], '*n' : ["_java"], inject : null}, _guide : { '*t' : ["game.client.module.guide.Guide"], '*n' : ["_guide"], inject : null}}};
game.client.module.draw.BreakCell.life = 600;
game.client.module.draw.Cell._count = 0;
game.client.module.draw.Cell.size = 30;
game.client.module.draw.DrawMouseHandler.__meta__ = { fields : { _draw : { '*t' : ["game.client.module.draw.DrawStage"], '*n' : ["_draw"], inject : null}}};
game.client.module.draw.DrawStage.__meta__ = { fields : { _mosue : { '*t' : ["game.client.module.draw.DrawMouseHandler"], '*n' : ["_mosue"], inject : null}, _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}, _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}, _container : { '*t' : ["game.client.module.draw.TableContainer"], '*n' : ["_container"], inject : null}}};
game.client.module.draw.EditMouseHandler.__meta__ = { fields : { _draw : { '*t' : ["game.client.module.draw.EditStage"], '*n' : ["_draw"], inject : null}}};
game.client.module.draw.EditStage.__meta__ = { fields : { _editmosue : { '*t' : ["game.client.module.draw.EditMouseHandler"], '*n' : ["_editmosue"], inject : null}}};
game.client.module.draw.TableContainer.__meta__ = { fields : { _tableData : { '*t' : ["game.client.module.draw.data.TableData"], '*n' : ["_tableData"], inject : null}}};
game.client.module.numbers.ImageNumber.w = 6;
game.client.module.numbers.ImageNumber.h = 9;
game.client.module.numbers.ImageNumber.wp = 0.6;
game.client.module.numbers.ImageNumber.hp = 0.9;
game.client.module.guide.Guide.__meta__ = { fields : { _configData : { '*t' : ["game.common.data.ConfigData"], '*n' : ["_configData"], inject : null}}};
game.client.module.menu.LevelButton.SIZE = 50;
game.client.module.menu.LevelButton.WIDTH = 54;
game.client.module.menu.LevelButton.HEIGHT = 54;
game.client.module.menu.MenuMouseHandler.__meta__ = { fields : { _menu : { '*t' : ["game.client.module.menu.MenuStage"], '*n' : ["_menu"], inject : null}}};
game.client.module.menu.MenuStage.__meta__ = { fields : { _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}, _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}, _mosue : { '*t' : ["game.client.module.menu.MenuMouseHandler"], '*n' : ["_mosue"], inject : null}, _draw : { '*t' : ["game.client.module.draw.DrawStage"], '*n' : ["_draw"], inject : null}, _configData : { '*t' : ["game.common.data.ConfigData"], '*n' : ["_configData"], inject : null}}};
game.client.module.menu.MenuStage.PAGE_COUNT = 25;
game.client.module.start.StartStage.__meta__ = { fields : { _stageService : { '*t' : ["game.client.service.StageService"], '*n' : ["_stageService"], inject : null}, _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}, _configData : { '*t' : ["game.common.data.ConfigData"], '*n' : ["_configData"], inject : null}, _guide : { '*t' : ["game.client.module.guide.Guide"], '*n' : ["_guide"], inject : null}}};
game.client.service.JavaService._ADInit = false;
game.client.service.JavaService._ADShowing = false;
game.client.service.StageService.__meta__ = { fields : { _stageConfig : { '*t' : ["game.client.config.StageConfig"], '*n' : ["_stageConfig"], inject : null}, _camera : { '*t' : ["game.client.core.GameCamera"], '*n' : ["_camera"], inject : null}, _display : { '*t' : ["openfl.display.DisplayObjectContainer"], '*n' : ["_display"], inject : null}, _javaService : { '*t' : ["game.client.service.JavaService"], '*n' : ["_javaService"], inject : null}}};
game.client.util.SaveUtil.CURRENTLEVEL = "currentLevel";
game.client.util.SaveUtil.LEVEL_DATA = "level_";
game.client.util.SaveUtil.LOCAL_VERSION = "local_version";
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
haxe.ds.ObjectMap.count = 0;
haxe.io.Output.LN2 = Math.log(2);
openfl.geom.Matrix.__identity = new openfl.geom.Matrix();
lovedna.canvas.ImageHelper.split = "#";
lovedna.canvas.ImageHelper.point = new openfl.geom.Point();
lovedna.canvas.ImageHelper.rectangle = new openfl.geom.Rectangle();
lovedna.canvas.ImageHelper.matrix = new openfl.geom.Matrix();
lovedna.canvas.ImageHelper.color = new openfl.geom.ColorTransform();
lovedna.canvas.ImageHelper.log = new openfl.text.TextField();
lovedna.canvas.ImageHelper._sheetMap = new haxe.ds.StringMap();
lovedna.canvas.ImageHelper._tileMap = new haxe.ds.StringMap();
lovedna.canvas.ImageHelper._loaderListMap = new haxe.ds.StringMap();
lovedna.canvas.ImageHelper._groupMap = new haxe.ds.StringMap();
lovedna.canvas.ImageHelper._tempSheetList = [];
lovedna.canvas.animation.ImageAnimation._cache = new haxe.ds.StringMap();
lovedna.canvas.core.Canvas.defaultFlag = 24;
lovedna.canvas.core.Canvas.RGBFlag = 28;
lovedna.canvas.core.EnterFrame.mouseLeaveEnable = false;
lovedna.canvas.core.EnterFrame.deactivateEnable = true;
lovedna.canvas.core.EnterFrame._deactivate = false;
lovedna.canvas.core.EnterFrame._mouseLeave = false;
lovedna.canvas.core.EnterFrame._enable = true;
lovedna.canvas.core.ImageData.__id = 0;
lovedna.canvas.core.ImageGroup._rectpool = [];
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
lovedna.canvas.mouse.MouseData.EMPTY = 0;
lovedna.canvas.mouse.MouseData.DOWN = 1;
lovedna.canvas.mouse.MouseData.MOVE = 2;
lovedna.canvas.mouse.MouseData.UP = 3;
lovedna.canvas.mouse.MouseData.OVER = 4;
lovedna.canvas.net.GetCacheJob.IMAGE = 0;
lovedna.canvas.net.GetCacheJob.DATA = 1;
lovedna.canvas.net.GetCacheJob.SOUND = 2;
lovedna.canvas.net.NetStorage.LOAD_TYPE_START = 0;
lovedna.canvas.net.NetStorage.LOAD_TYPE_PROGRESS = 1;
lovedna.canvas.net.NetStorage.LOAD_TYPE_COMPLETE = 2;
lovedna.canvas.net.NetStorage.defaultLoadType = lovedna.net.LoadType.AUTO;
lovedna.canvas.net.NetStorage.useCache = true;
lovedna.canvas.net.NetStorage._loadObserve = [];
lovedna.canvas.net.NetStorage._allStorage = [];
lovedna.canvas.net.NetStorage._localLoadDelay = 10;
lovedna.canvas.net.NetStorage.localDelay = 1;
lovedna.canvas.net.NetStorage._worker = new lovedna.utils.worker.Worker();
lovedna.canvas.net.NetStorage._globalURL = "";
lovedna.canvas.net.NetStorage._versionMap = new haxe.ds.StringMap();
lovedna.injector.Singleton.metaName = "inject";
lovedna.net.storage.Storage.folder = "/";
lovedna.net.storage.Storage.APP = 0;
lovedna.net.storage.Storage.STORAGE = 1;
lovedna.net.storage.Storage.DESKTOP = 2;
lovedna.net.storage.Storage.DOCS = 3;
lovedna.net.storage.Storage.USER = 4;
lovedna.rtti.MetaConfig.metaName = "*n";
lovedna.rtti.MetaConfig.metaType = "*t";
lovedna.rtti.MetaConfig.metaArgs = "*a";
lovedna.rtti.MetaConfig.metaFunArgs = "*f";
lovedna.utils.Ease.MathSin = Math.sin;
lovedna.utils.Ease.MathCos = Math.cos;
lovedna.utils.Ease.overshoot = 1.70158;
lovedna.utils.Ease.amplitude = 1;
lovedna.utils.Ease.period = 0.0003;
lovedna.utils.Log._line = 0;
lovedna.utils.Log._color = 16777215;
lovedna.utils.Log._enable = true;
lovedna.utils.Log.showPackage = true;
lovedna.utils.MathUtil.E = 2.718281828459045;
lovedna.utils.MathUtil.LN2 = 0.6931471805599453;
lovedna.utils.MathUtil.LN10 = 2.302585092994046;
lovedna.utils.MathUtil.LOG2E = 1.4426950408889634;
lovedna.utils.MathUtil.LOG10E = 0.43429448190325176;
lovedna.utils.MathUtil.PI = 3.141592653589793238;
lovedna.utils.MathUtil.PI2 = 6.28318530717959;
lovedna.utils.MathUtil.PI_2 = 1.5707963267949;
lovedna.utils.MathUtil.SQRT1_2 = 0.7071067811865476;
lovedna.utils.MathUtil.SQRT2 = 1.4142135623730951;
lovedna.utils.MathUtil.INT_MIN = -2147483648.0;
lovedna.utils.MathUtil.INT_MAX = 2147483647.0;
lovedna.utils.MathUtil.FLOAT_MIN = -1.79769313486231e+308;
lovedna.utils.MathUtil.FLOAT_MAX = 1.79769313486231e+308;
lovedna.utils.MathUtil.RAD_DEG = 57.295779513082323;
lovedna.utils.MathUtil.DEG_RAD = 0.017453292519943295;
lovedna.utils.Pool._idle = new haxe.ds.StringMap();
lovedna.utils.Pool._active = new haxe.ds.StringMap();
lovedna.utils.Pool.count = 0;
lovedna.utils.Pool.active = 0;
lovedna.utils.ResizeUtil._rect = new openfl.geom.Rectangle();
lovedna.utils.ResizeUtil.delay = 50;
lovedna.utils.png.PngReader.TYPE_IHDR = 1229472850;
lovedna.utils.png.PngReader.TYPE_IDAT = 1229209940;
lovedna.utils.png.PngReader.TYPE_IEND = 1229278788;
lovedna.utils.png.PngReader.TYPE_cHRM = 1665684045;
lovedna.utils.png.PngReader.TYPE_gAMA = 1732332865;
lovedna.utils.png.PngReader.TYPE_sBIT = 1933723988;
lovedna.utils.png.PngReader.TYPE_PLTE = 1347179589;
lovedna.utils.png.PngReader.TYPE_bKGD = 1649100612;
lovedna.utils.png.PngReader.TYPE_hIST = 1749635924;
lovedna.utils.png.PngReader.TYPE_tRNS = 1951551059;
lovedna.utils.png.PngReader.TYPE_oFFs = 1866876531;
lovedna.utils.png.PngReader.TYPE_pHYs = 1883789683;
lovedna.utils.png.PngReader.TYPE_sCAL = 1933787468;
lovedna.utils.png.PngReader.TYPE_tIME = 1950960965;
lovedna.utils.png.PngReader.TYPE_tEXt = 1950701684;
lovedna.utils.png.PngReader.TYPE_zTXt = 2052348020;
lovedna.utils.png.PngReader.TYPE_fRAc = 1716666723;
lovedna.utils.png.PngReader.TYPE_gIFg = 1732855399;
lovedna.utils.png.PngReader.TYPE_gIFt = 1732855412;
lovedna.utils.png.PngReader.TYPE_gIFx = 1732855416;
lovedna.utils.png.PngReader.TYPE_LIWEI = 1716666723;
openfl.Assets.cache = new openfl.AssetCache();
openfl.Assets.libraries = new haxe.ds.StringMap();
openfl.Assets.dispatcher = new openfl.events.EventDispatcher();
openfl.Assets.initialized = false;
openfl.Lib.__sentWarnings = new haxe.ds.StringMap();
openfl.Lib.__startTime = haxe.Timer.stamp();
openfl.display.BitmapData.__base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
openfl.display.BitmapDataChannel.ALPHA = 8;
openfl.display.BitmapDataChannel.BLUE = 4;
openfl.display.BitmapDataChannel.GREEN = 2;
openfl.display.BitmapDataChannel.RED = 1;
openfl.display._CapsStyle.CapsStyle_Impl_.NONE = "butt";
openfl.display._CapsStyle.CapsStyle_Impl_.ROUND = "round";
openfl.display._CapsStyle.CapsStyle_Impl_.SQUARE = "square";
openfl.display.Graphics.TILE_SCALE = 1;
openfl.display.Graphics.TILE_ROTATION = 2;
openfl.display.Graphics.TILE_RGB = 4;
openfl.display.Graphics.TILE_ALPHA = 8;
openfl.display.Graphics.TILE_TRANS_2x2 = 16;
openfl.display.Graphics.TILE_BLEND_NORMAL = 0;
openfl.display.Graphics.TILE_BLEND_ADD = 65536;
openfl.display._JointStyle.JointStyle_Impl_.MITER = "miter";
openfl.display._JointStyle.JointStyle_Impl_.ROUND = "round";
openfl.display._JointStyle.JointStyle_Impl_.BEVEL = "bevel";
openfl.display._StageQuality.StageQuality_Impl_.BEST = "best";
openfl.display._StageQuality.StageQuality_Impl_.HIGH = "high";
openfl.display._StageQuality.StageQuality_Impl_.MEDIUM = "medium";
openfl.display._StageQuality.StageQuality_Impl_.LOW = "low";
openfl.errors.Error.DEFAULT_TO_STRING = "Error";
openfl.events.TextEvent.LINK = "link";
openfl.events.TextEvent.TEXT_INPUT = "textInput";
openfl.events.ErrorEvent.ERROR = "error";
openfl.events._EventPhase.EventPhase_Impl_.CAPTURING_PHASE = 0;
openfl.events._EventPhase.EventPhase_Impl_.AT_TARGET = 1;
openfl.events._EventPhase.EventPhase_Impl_.BUBBLING_PHASE = 2;
openfl.events.FocusEvent.FOCUS_IN = "focusIn";
openfl.events.FocusEvent.FOCUS_OUT = "focusOut";
openfl.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
openfl.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
openfl.events.HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
openfl.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
openfl.events.IOErrorEvent.IO_ERROR = "ioError";
openfl.events.KeyboardEvent.KEY_DOWN = "keyDown";
openfl.events.KeyboardEvent.KEY_UP = "keyUp";
openfl.events.MouseEvent.CLICK = "click";
openfl.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
openfl.events.MouseEvent.MIDDLE_CLICK = "middleClick";
openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
openfl.events.MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
openfl.events.MouseEvent.MOUSE_DOWN = "mouseDown";
openfl.events.MouseEvent.MOUSE_MOVE = "mouseMove";
openfl.events.MouseEvent.MOUSE_OUT = "mouseOut";
openfl.events.MouseEvent.MOUSE_OVER = "mouseOver";
openfl.events.MouseEvent.MOUSE_UP = "mouseUp";
openfl.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
openfl.events.MouseEvent.RIGHT_CLICK = "rightClick";
openfl.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
openfl.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
openfl.events.MouseEvent.ROLL_OUT = "rollOut";
openfl.events.MouseEvent.ROLL_OVER = "rollOver";
openfl.events.ProgressEvent.PROGRESS = "progress";
openfl.events.ProgressEvent.SOCKET_DATA = "socketData";
openfl.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
openfl.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
openfl.events.TouchEvent.TOUCH_END = "touchEnd";
openfl.events.TouchEvent.TOUCH_MOVE = "touchMove";
openfl.events.TouchEvent.TOUCH_OUT = "touchOut";
openfl.events.TouchEvent.TOUCH_OVER = "touchOver";
openfl.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
openfl.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
openfl.events.TouchEvent.TOUCH_TAP = "touchTap";
openfl.media.Sound.__registeredSounds = new haxe.ds.StringMap();
openfl.net.URLRequestMethod.DELETE = "DELETE";
openfl.net.URLRequestMethod.GET = "GET";
openfl.net.URLRequestMethod.HEAD = "HEAD";
openfl.net.URLRequestMethod.OPTIONS = "OPTIONS";
openfl.net.URLRequestMethod.POST = "POST";
openfl.net.URLRequestMethod.PUT = "PUT";
openfl.system.ApplicationDomain.currentDomain = new openfl.system.ApplicationDomain(null);
openfl.system.SecurityDomain.currentDomain = new openfl.system.SecurityDomain();
openfl.text._AntiAliasType.AntiAliasType_Impl_.ADVANCED = "advanced";
openfl.text._AntiAliasType.AntiAliasType_Impl_.NORMAL = "normal";
openfl.ui._KeyLocation.KeyLocation_Impl_.STANDARD = 0;
openfl.ui._KeyLocation.KeyLocation_Impl_.LEFT = 1;
openfl.ui._KeyLocation.KeyLocation_Impl_.RIGHT = 2;
openfl.ui._KeyLocation.KeyLocation_Impl_.NUM_PAD = 3;
openfl.ui.Keyboard.NUMBER_0 = 48;
openfl.ui.Keyboard.NUMBER_1 = 49;
openfl.ui.Keyboard.NUMBER_2 = 50;
openfl.ui.Keyboard.NUMBER_3 = 51;
openfl.ui.Keyboard.NUMBER_4 = 52;
openfl.ui.Keyboard.NUMBER_5 = 53;
openfl.ui.Keyboard.NUMBER_6 = 54;
openfl.ui.Keyboard.NUMBER_7 = 55;
openfl.ui.Keyboard.NUMBER_8 = 56;
openfl.ui.Keyboard.NUMBER_9 = 57;
openfl.ui.Keyboard.A = 65;
openfl.ui.Keyboard.B = 66;
openfl.ui.Keyboard.C = 67;
openfl.ui.Keyboard.D = 68;
openfl.ui.Keyboard.E = 69;
openfl.ui.Keyboard.F = 70;
openfl.ui.Keyboard.G = 71;
openfl.ui.Keyboard.H = 72;
openfl.ui.Keyboard.I = 73;
openfl.ui.Keyboard.J = 74;
openfl.ui.Keyboard.K = 75;
openfl.ui.Keyboard.L = 76;
openfl.ui.Keyboard.M = 77;
openfl.ui.Keyboard.N = 78;
openfl.ui.Keyboard.O = 79;
openfl.ui.Keyboard.P = 80;
openfl.ui.Keyboard.Q = 81;
openfl.ui.Keyboard.R = 82;
openfl.ui.Keyboard.S = 83;
openfl.ui.Keyboard.T = 84;
openfl.ui.Keyboard.U = 85;
openfl.ui.Keyboard.V = 86;
openfl.ui.Keyboard.W = 87;
openfl.ui.Keyboard.X = 88;
openfl.ui.Keyboard.Y = 89;
openfl.ui.Keyboard.Z = 90;
openfl.ui.Keyboard.NUMPAD_0 = 96;
openfl.ui.Keyboard.NUMPAD_1 = 97;
openfl.ui.Keyboard.NUMPAD_2 = 98;
openfl.ui.Keyboard.NUMPAD_3 = 99;
openfl.ui.Keyboard.NUMPAD_4 = 100;
openfl.ui.Keyboard.NUMPAD_5 = 101;
openfl.ui.Keyboard.NUMPAD_6 = 102;
openfl.ui.Keyboard.NUMPAD_7 = 103;
openfl.ui.Keyboard.NUMPAD_8 = 104;
openfl.ui.Keyboard.NUMPAD_9 = 105;
openfl.ui.Keyboard.NUMPAD_MULTIPLY = 106;
openfl.ui.Keyboard.NUMPAD_ADD = 107;
openfl.ui.Keyboard.NUMPAD_ENTER = 108;
openfl.ui.Keyboard.NUMPAD_SUBTRACT = 109;
openfl.ui.Keyboard.NUMPAD_DECIMAL = 110;
openfl.ui.Keyboard.NUMPAD_DIVIDE = 111;
openfl.ui.Keyboard.F1 = 112;
openfl.ui.Keyboard.F2 = 113;
openfl.ui.Keyboard.F3 = 114;
openfl.ui.Keyboard.F4 = 115;
openfl.ui.Keyboard.F5 = 116;
openfl.ui.Keyboard.F6 = 117;
openfl.ui.Keyboard.F7 = 118;
openfl.ui.Keyboard.F8 = 119;
openfl.ui.Keyboard.F9 = 120;
openfl.ui.Keyboard.F10 = 121;
openfl.ui.Keyboard.F11 = 122;
openfl.ui.Keyboard.F12 = 123;
openfl.ui.Keyboard.F13 = 124;
openfl.ui.Keyboard.F14 = 125;
openfl.ui.Keyboard.F15 = 126;
openfl.ui.Keyboard.BACKSPACE = 8;
openfl.ui.Keyboard.TAB = 9;
openfl.ui.Keyboard.ALTERNATE = 18;
openfl.ui.Keyboard.ENTER = 13;
openfl.ui.Keyboard.COMMAND = 15;
openfl.ui.Keyboard.SHIFT = 16;
openfl.ui.Keyboard.CONTROL = 17;
openfl.ui.Keyboard.CAPS_LOCK = 20;
openfl.ui.Keyboard.NUMPAD = 21;
openfl.ui.Keyboard.ESCAPE = 27;
openfl.ui.Keyboard.SPACE = 32;
openfl.ui.Keyboard.PAGE_UP = 33;
openfl.ui.Keyboard.PAGE_DOWN = 34;
openfl.ui.Keyboard.END = 35;
openfl.ui.Keyboard.HOME = 36;
openfl.ui.Keyboard.LEFT = 37;
openfl.ui.Keyboard.RIGHT = 39;
openfl.ui.Keyboard.UP = 38;
openfl.ui.Keyboard.DOWN = 40;
openfl.ui.Keyboard.INSERT = 45;
openfl.ui.Keyboard.DELETE = 46;
openfl.ui.Keyboard.NUMLOCK = 144;
openfl.ui.Keyboard.BREAK = 19;
openfl.ui.Keyboard.SEMICOLON = 186;
openfl.ui.Keyboard.EQUAL = 187;
openfl.ui.Keyboard.COMMA = 188;
openfl.ui.Keyboard.MINUS = 189;
openfl.ui.Keyboard.PERIOD = 190;
openfl.ui.Keyboard.SLASH = 191;
openfl.ui.Keyboard.BACKQUOTE = 192;
openfl.ui.Keyboard.LEFTBRACKET = 219;
openfl.ui.Keyboard.BACKSLASH = 220;
openfl.ui.Keyboard.RIGHTBRACKET = 221;
openfl.ui.Keyboard.QUOTE = 222;
openfl.ui.Keyboard.DOM_VK_CANCEL = 3;
openfl.ui.Keyboard.DOM_VK_HELP = 6;
openfl.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
openfl.ui.Keyboard.DOM_VK_TAB = 9;
openfl.ui.Keyboard.DOM_VK_CLEAR = 12;
openfl.ui.Keyboard.DOM_VK_RETURN = 13;
openfl.ui.Keyboard.DOM_VK_ENTER = 14;
openfl.ui.Keyboard.DOM_VK_SHIFT = 16;
openfl.ui.Keyboard.DOM_VK_CONTROL = 17;
openfl.ui.Keyboard.DOM_VK_ALT = 18;
openfl.ui.Keyboard.DOM_VK_PAUSE = 19;
openfl.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
openfl.ui.Keyboard.DOM_VK_ESCAPE = 27;
openfl.ui.Keyboard.DOM_VK_SPACE = 32;
openfl.ui.Keyboard.DOM_VK_PAGE_UP = 33;
openfl.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
openfl.ui.Keyboard.DOM_VK_END = 35;
openfl.ui.Keyboard.DOM_VK_HOME = 36;
openfl.ui.Keyboard.DOM_VK_LEFT = 37;
openfl.ui.Keyboard.DOM_VK_UP = 38;
openfl.ui.Keyboard.DOM_VK_RIGHT = 39;
openfl.ui.Keyboard.DOM_VK_DOWN = 40;
openfl.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
openfl.ui.Keyboard.DOM_VK_INSERT = 45;
openfl.ui.Keyboard.DOM_VK_DELETE = 46;
openfl.ui.Keyboard.DOM_VK_0 = 48;
openfl.ui.Keyboard.DOM_VK_1 = 49;
openfl.ui.Keyboard.DOM_VK_2 = 50;
openfl.ui.Keyboard.DOM_VK_3 = 51;
openfl.ui.Keyboard.DOM_VK_4 = 52;
openfl.ui.Keyboard.DOM_VK_5 = 53;
openfl.ui.Keyboard.DOM_VK_6 = 54;
openfl.ui.Keyboard.DOM_VK_7 = 55;
openfl.ui.Keyboard.DOM_VK_8 = 56;
openfl.ui.Keyboard.DOM_VK_9 = 57;
openfl.ui.Keyboard.DOM_VK_SEMICOLON = 59;
openfl.ui.Keyboard.DOM_VK_EQUALS = 61;
openfl.ui.Keyboard.DOM_VK_A = 65;
openfl.ui.Keyboard.DOM_VK_B = 66;
openfl.ui.Keyboard.DOM_VK_C = 67;
openfl.ui.Keyboard.DOM_VK_D = 68;
openfl.ui.Keyboard.DOM_VK_E = 69;
openfl.ui.Keyboard.DOM_VK_F = 70;
openfl.ui.Keyboard.DOM_VK_G = 71;
openfl.ui.Keyboard.DOM_VK_H = 72;
openfl.ui.Keyboard.DOM_VK_I = 73;
openfl.ui.Keyboard.DOM_VK_J = 74;
openfl.ui.Keyboard.DOM_VK_K = 75;
openfl.ui.Keyboard.DOM_VK_L = 76;
openfl.ui.Keyboard.DOM_VK_M = 77;
openfl.ui.Keyboard.DOM_VK_N = 78;
openfl.ui.Keyboard.DOM_VK_O = 79;
openfl.ui.Keyboard.DOM_VK_P = 80;
openfl.ui.Keyboard.DOM_VK_Q = 81;
openfl.ui.Keyboard.DOM_VK_R = 82;
openfl.ui.Keyboard.DOM_VK_S = 83;
openfl.ui.Keyboard.DOM_VK_T = 84;
openfl.ui.Keyboard.DOM_VK_U = 85;
openfl.ui.Keyboard.DOM_VK_V = 86;
openfl.ui.Keyboard.DOM_VK_W = 87;
openfl.ui.Keyboard.DOM_VK_X = 88;
openfl.ui.Keyboard.DOM_VK_Y = 89;
openfl.ui.Keyboard.DOM_VK_Z = 90;
openfl.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
openfl.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
openfl.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
openfl.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
openfl.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
openfl.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
openfl.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
openfl.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
openfl.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
openfl.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
openfl.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
openfl.ui.Keyboard.DOM_VK_MULTIPLY = 106;
openfl.ui.Keyboard.DOM_VK_ADD = 107;
openfl.ui.Keyboard.DOM_VK_SEPARATOR = 108;
openfl.ui.Keyboard.DOM_VK_SUBTRACT = 109;
openfl.ui.Keyboard.DOM_VK_DECIMAL = 110;
openfl.ui.Keyboard.DOM_VK_DIVIDE = 111;
openfl.ui.Keyboard.DOM_VK_F1 = 112;
openfl.ui.Keyboard.DOM_VK_F2 = 113;
openfl.ui.Keyboard.DOM_VK_F3 = 114;
openfl.ui.Keyboard.DOM_VK_F4 = 115;
openfl.ui.Keyboard.DOM_VK_F5 = 116;
openfl.ui.Keyboard.DOM_VK_F6 = 117;
openfl.ui.Keyboard.DOM_VK_F7 = 118;
openfl.ui.Keyboard.DOM_VK_F8 = 119;
openfl.ui.Keyboard.DOM_VK_F9 = 120;
openfl.ui.Keyboard.DOM_VK_F10 = 121;
openfl.ui.Keyboard.DOM_VK_F11 = 122;
openfl.ui.Keyboard.DOM_VK_F12 = 123;
openfl.ui.Keyboard.DOM_VK_F13 = 124;
openfl.ui.Keyboard.DOM_VK_F14 = 125;
openfl.ui.Keyboard.DOM_VK_F15 = 126;
openfl.ui.Keyboard.DOM_VK_F16 = 127;
openfl.ui.Keyboard.DOM_VK_F17 = 128;
openfl.ui.Keyboard.DOM_VK_F18 = 129;
openfl.ui.Keyboard.DOM_VK_F19 = 130;
openfl.ui.Keyboard.DOM_VK_F20 = 131;
openfl.ui.Keyboard.DOM_VK_F21 = 132;
openfl.ui.Keyboard.DOM_VK_F22 = 133;
openfl.ui.Keyboard.DOM_VK_F23 = 134;
openfl.ui.Keyboard.DOM_VK_F24 = 135;
openfl.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
openfl.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
openfl.ui.Keyboard.DOM_VK_COMMA = 188;
openfl.ui.Keyboard.DOM_VK_PERIOD = 190;
openfl.ui.Keyboard.DOM_VK_SLASH = 191;
openfl.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
openfl.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
openfl.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
openfl.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
openfl.ui.Keyboard.DOM_VK_QUOTE = 222;
openfl.ui.Keyboard.DOM_VK_META = 224;
openfl.ui.Keyboard.DOM_VK_KANA = 21;
openfl.ui.Keyboard.DOM_VK_HANGUL = 21;
openfl.ui.Keyboard.DOM_VK_JUNJA = 23;
openfl.ui.Keyboard.DOM_VK_FINAL = 24;
openfl.ui.Keyboard.DOM_VK_HANJA = 25;
openfl.ui.Keyboard.DOM_VK_KANJI = 25;
openfl.ui.Keyboard.DOM_VK_CONVERT = 28;
openfl.ui.Keyboard.DOM_VK_NONCONVERT = 29;
openfl.ui.Keyboard.DOM_VK_ACEPT = 30;
openfl.ui.Keyboard.DOM_VK_MODECHANGE = 31;
openfl.ui.Keyboard.DOM_VK_SELECT = 41;
openfl.ui.Keyboard.DOM_VK_PRINT = 42;
openfl.ui.Keyboard.DOM_VK_EXECUTE = 43;
openfl.ui.Keyboard.DOM_VK_SLEEP = 95;
openfl.utils.Endian.BIG_ENDIAN = "bigEndian";
openfl.utils.Endian.LITTLE_ENDIAN = "littleEndian";
ApplicationMain.main();
})(typeof window != "undefined" ? window : exports);
