/**
 * Created by Administrator on 15-8-23.
 */
var GlobalEvent = { events:{}};
GlobalEvent.on = function(eventType,listener){
    if(!this.events.hasOwnProperty(eventType)){
        this.events[eventType] = [];
    }
    this.events[eventType].push({_listener: listener})
}
GlobalEvent.dispatch = function(eventType, data){
    var arr = this.events[eventType];
    if(!arr) return;
    for(var i=0; i<arr.length; i++){
        var event = arr[i];
        event._listener(eventType,data);
    }
}
//////////////////////////////////////////////////////
GlobalEvent.Event_ShowStartScene = "Event_ShowStartScene";
GlobalEvent.Event_ShowEntryScene = "Event_ShowEntryScene";
GlobalEvent.Event_GameStart = "Event_GameStart";
GlobalEvent.Event_GameOver = "Event_GameOver";
GlobalEvent.Event_Right = "Event_Right";
GlobalEvent.Event_Wrong = "Event_Wrong";
GlobalEvent.Event_TimeStart = "Event_TimeStart";
GlobalEvent.Event_NextTime = "Event_NextTime";
GlobalEvent.Event_NextSentence = "Event_NextSentence";
GlobalEvent.Event_TestMenuInitComplete = "Event_TestMenuInitComplete";
GlobalEvent.Event_ShowFirework = "Event_ShowFirework";
GlobalEvent.Event_ShowHelp = "Event_ShowHelp";
//////////////////////////////////////////////////////