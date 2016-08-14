/**
 * Created by Administrator on 15-9-15.
 */
var WX = {
    errorCount:0,
    appId:"" , // 必填，公众号的唯一标识
    timestamp:"" , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: ''// 必填，生成签名
};

WX.init = function(){
    var _this = this;
    $.ajax({
        url: "http://chensuijia.me/weixin2/get_ticket",
        type: "GET",
        data:{
            url:location.href
        },
        dataType:"json",
        success: function (data) {
            console.log("cb:", data);
            wx.config({
             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
             appId: data.app_id, // 必填，公众号的唯一标识
             timestamp: data.time, // 必填，生成签名的时间戳
             nonceStr: data.nonceStr, // 必填，生成签名的随机串
             signature: data.signature,// 必填，签名，见附录1
             jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
             });

            wx.ready(function(){
                console.log("weixin is ready!!!!!!!!!", GlobalModel.shareTitle);
            });

            wx.error(function(res){
                console.log("weixin error: ", res);
                //重新请求签名
            });
            //朋友圈
            wx.onMenuShareTimeline({
                title: "看看你的大脑和爱因斯坦的距离", // 分享标题
                link: 'www.lovedna.net/brainwars/', // 分享链接
                imgUrl: 'http://www.lovedna.net/brainwars/res/aiyinsitan.jpg', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            //好友
            wx.onMenuShareAppMessage({
                title: "看看你的大脑和爱因斯坦的距离", // 分享标题
                desc: "我的脑力已经和爱因斯坦很接近啦~", // 分享描述
                link: 'www.lovedna.net/brainwars/', // 分享链接
                imgUrl: 'http://www.lovedna.net/brainwars/res/aiyinsitan.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        },
        error:function(data){

            _this.errorCount++;
            console.log("error:", _this.errorCount)
            if(_this.errorCount<3){
                WX.init();
            }
        }
    });
}