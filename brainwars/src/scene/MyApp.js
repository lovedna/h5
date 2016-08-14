/**
 * Created by Administrator on 15-9-2.
 */


function MyApp() {
    this.init();
}

MyApp.prototype = {
    init: function() {
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}

        var audioPath = "res/sound/";
        var sounds = [
            //{id:"bubble", src:"bubble.mp3"},
             {id:"wrong", src:"wrong.ogg"},
             {id:"correct", src:"correct.ogg"},
             {id:"gamestart", src:"gamestart.ogg"},
             {id:"gameover", src:"gameover.ogg"},
             {id:"loop", src:"loop.ogg"}

        ];
        createjs.Sound.alternateExtensions = ["mp3"];
        var loadProxy = createjs.proxy(this.handleLoad, this);
        createjs.Sound.addEventListener("fileload", loadProxy);
        createjs.Sound.registerSounds(sounds, audioPath);
    },

    handleLoad: function(event) {
        console.log("snd load cmt")
    }
}

myNameSpace.MyApp = MyApp;