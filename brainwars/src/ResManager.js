/**
 * Created by Administrator on 15-8-22.
 */
var ResManager = {};
ResManager.queue = null;
ResManager.getRes = function(name){

    if(ResManager.queue){

       return ResManager.queue.getResult(name);

    }
    return null;
}