var app = {
    androidURL: "http://www.talkmate.com"//http://xxx/xxx.apk"
};
app.getVersion = function () {
    var u = navigator.userAgent,
        app = navigator.appVersion;

    return {

        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,

        iPhone: u.indexOf('iPhone') > -1,

        iPad: u.indexOf('iPad') > -1,
        iPod: u.indexOf('iPod') > -1,

        language: (navigator.browserLanguage || navigator.language).toLowerCase()

    }
}

app.gotoStore = function () {
    var versions = app.getVersion();
    console.log("version:",versions)
    //alert(versions.language)
    if (versions.iPhone || versions.iPad || versions.iPod) {
        //如果是ios系統，直接跳轉至appstore該應用首頁，傳遞参數为該應用在appstroe的id號
        //document.location = this.androidURL;
        window.location.href = "https://itunes.apple.com/us/app/talkmate-learn-languages-converse/id959231176?ls=1&mt=8"
        //window.location.href = "com.baidu.tieba://itunes.apple.com/cn/app/id959231176";
            //"https://itunes.apple.com/cn/app/id477927812"
            //"itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=123456";
    } else if (versions.android) {
        //window.location.href = this.androidURL;
        window.location.href = this.androidURL;
    }else{
        window.open(this.androidURL);
    }
}
