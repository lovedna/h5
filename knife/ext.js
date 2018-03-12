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
	},
	vibrate: function (time) {
		if(extvar.ready==false)
		{
			return;
		}
		plus.device.vibrate( time );
	},
}

);

// var Ext =function()
// {
	// this.ready=false,
	// this.start=function()
	// {
		// alert("ext.start");
		// if(window.plus){
			// plusReady();
		// }else{
			// document.addEventListener("plusready",this.plusReady,false);
		// }
	// },
	// this.plusReady=function()
	// {
		// ready=true;
		// alert("ext.ready");
	// },
	// this.vibrate=function(time)
	// {
		// if(!ready)return;
		// plus.device.vibrate( time );
	// }
// }