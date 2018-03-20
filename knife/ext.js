var extvar={}
function Ext()
{
	extvar.ready=false;
}
Object.assign(Ext.prototype,{
	start: function () {
		extvar.ready=false;
		
		if(window.plus){
			this.plusReady();
		}else{
			document.addEventListener("plusready",this.plusReady,false);
		}
	},
	plusReady: function () {
		extvar.ready=true;
		plus.device.setWakelock( true );
		//alert(plus.device.uuid);
		Knife.SetUid(plus.device.uuid);
	},
	vibrate: function (time) {
		if(extvar.ready==false)
		{
			return;
		}
		plus.device.vibrate( time );
	},
	setToClip:function(value){
		if(extvar.ready==false)
		{
			return;
		}
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip,"setText",value);
	},
	readFromClip:function(value){
		if(extvar.ready==false)
		{
			return "";
		}
		var Context = plus.android.importClass("android.content.Context");
        var main = plus.android.runtimeMainActivity();
        var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
        return plus.android.invoke(clip,"getText");
	},
}

);
