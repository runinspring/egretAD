var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** @internal */
var egretad;
(function (egretad) {
    /**谷歌 adx 横幅广告 */
    var AdxBanner = (function () {
        function AdxBanner(adID, target) {
            this.adID = '9133113621';
            if (window['egret']) {
                if (target && target.stage) {
                    var canvas = target.stage.$displayList.renderBuffer.surface;
                    canvas.parentElement.style.position = 'absolute';
                }
            }
            var body = document.getElementsByTagName('body')[0];
            var adDiv = document.getElementById('egretad_show');
            if (!adDiv) {
                adDiv = document.createElement('div');
                adDiv.id = 'egretad_show';
            }
            body.appendChild(adDiv);
            this.adDiv = adDiv;
            var script1 = document.createElement('script');
            script1.async = true;
            script1.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            var ins = document.createElement('ins');
            ins.className = 'adsbygoogle';
            var width = document.documentElement.clientWidth;
            ins.style = 'display:inline-block;width:' + width + 'px;height:50px';
            ins.dataset.adClient = "ca-pub-2550259840188565";
            ins.dataset.adSlot = this.adID;
            var script2 = document.createElement('script');
            script2.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
            this.adDiv.appendChild(script1);
            this.adDiv.appendChild(ins);
            this.adDiv.appendChild(script2);
        }
        AdxBanner.prototype.show = function () {
        };
        AdxBanner.prototype.close = function () {
        };
        AdxBanner.prototype.showAll = function () {
        };
        return AdxBanner;
    }());
    egretad.AdxBanner = AdxBanner;
    __reflect(AdxBanner.prototype, "egretad.AdxBanner", ["egretad.IAD"]);
})(egretad || (egretad = {}));
/** @internal */
var egretad;
(function (egretad) {
    /**谷歌 adx 视频，图文广告 */
    var AdxIMA = (function () {
        function AdxIMA(callBackObj, tag, category, target) {
            /**是否开始播放 */
            this.startPaly = false;
            this.callBackObj = {};
            this.category = 1;
            var body = document.getElementsByTagName('body')[0];
            this.adContainer = document.createElement('div');
            this.adContainer.style.overflow = 'hidden';
            // this.adContainer.style.position="absolute";
            // this.adContainer.style.top="25%";
            this.category = category;
            body.appendChild(this.adContainer);
            this.callBackObj = callBackObj;
            this.tag = tag;
            egretad.IMAManager.init(this.setUpIMA.bind(this), target); //初始化广告
        }
        /**显示广告 */
        AdxIMA.prototype.show = function () {
            try {
                if (!this.startPaly) {
                    this.startPaly = true;
                    this.adContainer.style.display = 'block';
                    this.adDisplayContainer.initialize();
                    console.log("aaaaaa");
                    this.adsManager.init(document.documentElement.clientWidth, document.documentElement.clientHeight, google.ima.ViewMode.NORMAL);
                    // this.adsManager.style.position="absolute";
                    // this.adsManager.style.top="25%";
                    // this.adContainer.style.position="absolute";
                    // this.adContainer.style.top="25%";
                    this.adsManager.start();
                    this.adContainer.childNodes[0].style.overflow = 'hidden';
                }
            }
            catch (adError) {
                this.startPaly = false;
            }
            // setTimeout(() => {
            //     this.adContainer.childNodes[0].style.display = 'none';
            // }, 5000);
        };
        AdxIMA.prototype.showAll = function () {
            try {
                if (!this.startPaly) {
                    this.startPaly = true;
                    this.adContainer.style.display = 'block';
                    this.adDisplayContainer.initialize();
                    this.adsManager.init(document.documentElement.clientWidth, document.documentElement.clientHeight, google.ima.ViewMode.NORMAL);
                    // this.adsManager.style.position="absolute";
                    // this.adsManager.style.top="25%";
                    // this.adContainer.style.position="absolute";
                    // this.adContainer.style.top="25%";
                    this.adsManager.start();
                    this.adContainer.childNodes[0].style.overflow = 'hidden';
                }
            }
            catch (adError) {
                this.startPaly = false;
            }
            // setTimeout(() => {
            //     this.adContainer.childNodes[0].style.display = 'none';
            // }, 5000);
        };
        AdxIMA.prototype.close = function () {
            this.adContainer.childNodes[0].style.display = 'none';
        };
        AdxIMA.prototype.setUpIMA = function () {
            this.adContainer.style.display = 'none';
            this.adContainer.innerHTML = "";
            google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
            var adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, null, null);
            this.adDisplayContainer = adDisplayContainer;
            var adsLoader = new google.ima.AdsLoader(adDisplayContainer);
            this.adsLoader = adsLoader;
            adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
            adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
            var adsRequest = new google.ima.AdsRequest();
            adsRequest.adTagUrl = this.tag;
            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            adsRequest.linearAdSlotWidth = clientWidth;
            adsRequest.linearAdSlotHeight = clientHeight;
            adsRequest.nonLinearAdSlotWidth = clientWidth;
            adsRequest.nonLinearAdSlotHeight = clientHeight;
            adsLoader.requestAds(adsRequest);
        };
        AdxIMA.prototype.onAdsManagerLoaded = function (adsManagerLoadedEvent) {
            this.adContainer.style.display = 'none';
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            adsRenderingSettings.requestNonPersonalizedAds = this.category;
            var obj = {
                currentTime: 0,
                duration: 0
            };
            var adsManager = adsManagerLoadedEvent.getAdsManager(obj, adsRenderingSettings);
            this.adsManager = adsManager;
            adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));
            adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this));
            adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this));
            var events = [
                google.ima.AdEvent.Type.AD_BREAK_READY,
                google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
                google.ima.AdEvent.Type.DURATION_CHANGE,
                google.ima.AdEvent.Type.CLICK,
                google.ima.AdEvent.Type.COMPLETE,
                google.ima.AdEvent.Type.FIRST_QUARTILE,
                google.ima.AdEvent.Type.LOADED,
                google.ima.AdEvent.Type.MIDPOINT,
                google.ima.AdEvent.Type.PAUSED,
                google.ima.AdEvent.Type.STARTED,
                google.ima.AdEvent.Type.THIRD_QUARTILE,
                google.ima.AdEvent.USER_CLOSE,
                google.ima.AdEvent.INTERACTION,
                google.ima.AdEvent.LINEAR_CHANGED
            ];
            for (var i = 0, len = events.length; i < len; i++) {
                adsManager.addEventListener(events[i], this.onAdEvent.bind(this));
            }
            this.startPaly = false;
            this.onCallBack(egretad.AD.CREATED);
        };
        AdxIMA.prototype.onAdError = function (err) {
            this.onCallBack(egretad.AD.ERROR, err.getError().toString());
            this.startPaly = false;
        };
        AdxIMA.prototype.onAdEvent = function (adEvent) {
            var ad = adEvent.getAd();
            // console.log('adEvent.type', adEvent.type)
            switch (adEvent.type) {
                case 'click':
                    this.onCallBack(egretad.AD.CLICK);
                    break;
                case 'loaded':
                    this.isLinear = adEvent.getAd().isLinear();
                    this.onCallBack(egretad.AD.LOADED);
                    break;
                case 'start':
                    this.startPaly = true;
                    this.onCallBack(egretad.AD.START);
                    break;
                case "complete":
                    break;
                case 'allAdsCompleted':
                    this.setUpIMA();
                    this.onCallBack(egretad.AD.END);
                    break;
            }
        };
        AdxIMA.prototype.onContentPauseRequested = function () {
        };
        AdxIMA.prototype.onContentResumeRequested = function () {
            if (this.isLinear) {
                this.setUpIMA();
                this.onCallBack(egretad.AD.END);
            }
        };
        AdxIMA.prototype.onCallBack = function (eventName, value) {
            if (value === void 0) { value = ''; }
            if (this.callBackObj[eventName]) {
                this.callBackObj[eventName](value);
            }
        };
        return AdxIMA;
    }());
    egretad.AdxIMA = AdxIMA;
    __reflect(AdxIMA.prototype, "egretad.AdxIMA", ["egretad.IAD"]);
})(egretad || (egretad = {}));
var egretad;
(function (egretad) {
    var AD = (function () {
        /**
         * @param id 从开放平台获取的广告ID
         * @param target 添加到舞台的对象
         */
        function AD(id, target) {
            /**
             * @internal
             * callback的函数对象
             * */
            this.callBackObj = {
                created: null,
            };
            this.LagLat(id, target);
        }
        /**
         * 增加广告事件监听
         * @param event 事件名称 egretad.AD.事件
         * @param callback 回调方法
         */
        AD.prototype.addEventListener = function (event, callback) {
            this.callBackObj[event] = callback;
        };
        /**显示广告 */
        AD.prototype.show = function () {
            if (this.ad) {
                this.ad.show();
            }
        };
        AD.prototype.showAll = function () {
            if (this.ad) {
                this.ad.showAll();
            }
        };
        AD.prototype.close = function () {
            if (this.ad) {
                this.ad.close();
            }
        };
        /** @internal */
        AD.prototype.onCallBack = function (eventName, value) {
            if (value === void 0) { value = ''; }
            if (this.callBackObj[eventName]) {
                this.callBackObj[eventName](value);
            }
        };
        AD.prototype.upload = function (id, category, target) {
            var _this = this;
            var urls = '//sspapi.egret.com/api/ad/getAd?ad_id=' + id;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var result = JSON.parse(xhr.responseText);
                if (result.msg == 'success') {
                    switch (result.data.ad_type) {
                        case 1://谷歌 adx 展示类广告，有问题，暂时不支持
                            break;
                        case 2://视频，暂时不支持
                            break;
                        case 3://谷歌 adx 视频，图文广告
                            var tag = result.data.ad_code.toString();
                            _this.ad = new egretad.AdxIMA(_this.callBackObj, tag, category, target);
                            break;
                    }
                }
                else {
                    _this.onCallBack(AD.ERROR, '广告KEY不正确或者其他原因，' + result.msg);
                }
            };
            xhr.open('GET', urls);
            xhr.send();
        };
        AD.prototype.LagLat = function (id, target) {
            if (navigator.geolocation) {
                console.log("trues");
                if (navigator.language) {
                    var language = navigator.language;
                    if (language == "zh-CN") {
                        console.log("zh_CN");
                        this.upload(id, 0, target);
                    }
                    else {
                        console.log("###");
                        navigator.geolocation.getCurrentPosition(showPosition);
                    }
                }
                else {
                    console.log("!@@@");
                }
                console.log("eeee");
            }
            var self = this;
            function showPosition(position) {
                console.log('aaaa');
                AD.lat = position.coords.latitude; //纬度 
                AD.lag = position.coords.longitude; //经度 
                console.log(AD.lat + "~~~" + AD.lag);
                console.log("!!!!!!!!!!!!!!!!!!!" + navigator.language);
                self.PopOut(id, target);
                return AD.flag = true;
            }
        };
        AD.prototype.PopOut = function (id, target) {
            var _this = this;
            var list = ["AT", "奥地利", "BE", "比利时", "BG", "保加利亚", "CY", "塞浦路斯", "CZ", "捷克", "DE", "德国", "DK", "丹麦", "EE", "爱沙尼亚", "ES", "西班牙", "FI", "芬兰", "FR", "法国", "GB", "英国",
                "GR", "希腊", "HR", "克罗地亚", "HU", "匈牙利", "IE", "爱尔兰", "IT", "意大利", "LT", "立陶宛", "LU", "卢森堡", "LV", "拉脱维亚", "MT", "马耳他", "NL", "荷兰", "PL", "波兰", "PT", "葡萄牙", "RO", "罗马尼亚",
                "SE", "瑞典", "SI", "斯洛文尼亚", "SK", "斯洛伐克",];
            console.log(AD.lat + "!!!" + AD.lag);
            clearInterval(AD.time);
            var opts = {
                method: "GET",
            };
            var opt = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };
            fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + AD.lat + "," + AD.lag + "&key=AIzaSyB8OtmsZk9rNmPXVygUaodC3zwR0GZ0AW0", opts)
                .then(function (response) {
                return response.text(); //返回一个带有文本的对象
            })
                .then(function (responseText) {
                var a = JSON.parse(responseText);
                console.log(a.results[0].address_components);
                var i = 0;
                for (var q = 0; q < a.results[0].address_components.length; q++) {
                    i++;
                }
                console.log(i + "qq");
                var s = a.results[0].address_components[i - 2].short_name;
                var l = a.results[0].address_components[i - 2].long_name;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == s) {
                        console.log("PPPPPP");
                        console.log(i + "aa");
                        fetch("//ssp.egret.com/api/statistical/shownumber?ad_id=" + id, opt).then(function (response) { return response.text(); }).then(function (responseText) {
                            console.log("@@@");
                        }).catch(function (error) { });
                        var div = document.createElement('div');
                        div.id = "All";
                        div.style.zIndex = "10000";
                        document.body.appendChild(div);
                        document.body.style.margin = "0";
                        document.body.style.height = "100%";
                        // var a=document.getElementsByTagName("html");
                        var z = window.screen.height;
                        div.style.height = z + "px";
                        div.style.width = "100%";
                        div.style.background = "rgba(0,0,0,0.2)";
                        var div2 = document.createElement('div');
                        div2.style.width = "80%";
                        div2.style.height = "60%";
                        div.style.position = "relative";
                        div2.style.position = "absolute";
                        div2.style.left = "10%";
                        div2.style.top = "20%";
                        div2.style.background = "#fff";
                        var title = document.createElement("p");
                        title.style.width = "100%";
                        title.innerHTML = "Egret Privacy Policy & Regulation";
                        title.style.textAlign = "center";
                        title.style.margin = "0";
                        title.style.position = "absolute";
                        title.style.top = "5px";
                        title.style.fontSize = "14px";
                        title.style.height = "20px";
                        title.style.lineHeight = "20px";
                        var textare = document.createElement("textarea");
                        textare.style.width = "96%";
                        textare.style.border = "1 #000 solider";
                        textare.style.position = "absolute";
                        textare.style.top = "30px";
                        textare.style.height = "80%";
                        textare.style.left = "1%";
                        textare.innerHTML = "Dear Players,\nFor your wonderful experience of our games and respect your acknowledge rights, please kindly note the following two points:\n1.All the ads that show in our game are come from Google and we will show personalized ads firstly to you according to your device type information,IP address,etc.\n2.We will get your location information according to the longitude and latitude information from Google Map.\nWe promise will not disclose these information to anyone and any third party .Just for ads show and recommendation purpose.";
                        var agree = document.createElement("input");
                        agree.style.width = "25%";
                        agree.style.height = "30px";
                        agree.value = "I Agree";
                        agree.type = "button";
                        agree.id = "agree";
                        agree.style.position = "absolute";
                        agree.style.bottom = "10px";
                        agree.style.right = "10px";
                        agree.style.fontSize = "12px";
                        agree.style.lineHeight = "30px";
                        agree.style.textAlign = "center";
                        //  agree.onclick=function(){
                        //      fetch("//ssp.egret.com/api/statistical/agreeNumber?ad_id="+id).then((response)=>{return response.text();}).then((responseText)=>{
                        //          div.style.display="none";
                        //      }).catch((error)=>{});
                        //      div.style.display="none";
                        //  }
                        agree.onclick = function () {
                            fetch("//ssp.egret.com/api/statistical/agreeNumber?ad_id=" + id, opt).then(function (response) { return response.text(); }).then(function (responseText) {
                                div.style.display = "none";
                            }).catch(function (error) { });
                            div.style.display = "none";
                            _this.upload(id, 0, target);
                        };
                        var unagree = document.createElement("input");
                        unagree.style.width = "25%";
                        unagree.style.height = "30px";
                        unagree.value = "I Don't Agree";
                        unagree.type = "button";
                        unagree.id = "unagree";
                        unagree.style.position = "absolute";
                        unagree.style.bottom = "10px";
                        unagree.style.left = "10px";
                        unagree.style.fontSize = "12px";
                        unagree.style.lineHeight = "30px";
                        unagree.style.textAlign = "center";
                        //  unagree.onclick=function(){
                        //      fetch("//ssp.egret.com/api/statistical/disagreeNumber?ad_id="+id).then((response)=>{return response.text();}).then((responseText)=>{
                        //          div.style.display="none";
                        //      }).catch((error)=>{});
                        //      div.style.display="none";
                        //  }
                        unagree.onclick = function () {
                            fetch("//ssp.egret.com/api/statistical/agreeNumber?ad_id=" + id, opt).then(function (response) { return response.text(); }).then(function (responseText) {
                                div.style.display = "none";
                            }).catch(function (error) { });
                            div.style.display = "none";
                            _this.upload(id, 1, target);
                        };
                        div2.appendChild(agree);
                        div2.appendChild(unagree);
                        div2.appendChild(textare);
                        div2.appendChild(title);
                        div.appendChild(div2);
                        return true;
                    }
                    else if (i == 55 && list[i] != s) {
                        console.log(i + "aa");
                        _this.upload(id, 1, target);
                    }
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        /**广告SDK版本 */
        AD.VERSION = 'v1.0';
        /**广告创建完成，可以播放 */
        AD.CREATED = 'created';
        /**广告开始加载 */
        AD.LOADED = 'loaded';
        /**广告开始播放 */
        AD.START = 'start';
        /**广告播放结束 */
        AD.END = 'end';
        /**广告播放出现错误 */
        AD.ERROR = 'error';
        /**被点击了 */
        AD.CLICK = 'click';
        AD.lag = '';
        AD.lat = '';
        AD.time = 0;
        AD.flag = false;
        return AD;
    }());
    egretad.AD = AD;
    __reflect(AD.prototype, "egretad.AD");
})(egretad || (egretad = {}));
/** @internal */
var egretad;
(function (egretad) {
    var IMAManager = (function () {
        function IMAManager() {
        }
        IMAManager.init = function (callback, target) {
            var _this = this;
            if (IMAManager.isInit) {
                callback();
            }
            IMAManager.callBackList.push(callback);
            if (IMAManager.startInit)
                return; //后续的流程只走一次
            if (window['egret']) {
                if (target && target.stage) {
                    var canvas = target.stage.$displayList.renderBuffer.surface;
                    canvas.parentElement.style.position = 'absolute';
                }
            }
            var adScript = document.getElementById('egretAdScript');
            if (!adScript) {
                IMAManager.startInit = true;
                var body = document.getElementsByTagName('body')[0];
                var script = document.createElement('script');
                script.id = 'egretAdScript';
                script.type = 'text/javascript';
                script.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js";
                body.appendChild(script);
                script.onload = function () {
                    IMAManager.isInit = true;
                    _this.onCallBack();
                };
            }
        };
        IMAManager.onCallBack = function () {
            for (var i = 0, len = IMAManager.callBackList.length; i < len; i++) {
                IMAManager.callBackList[i]();
            }
            IMAManager.callBackList = [];
        };
        IMAManager.callBackList = [];
        IMAManager.startInit = false;
        IMAManager.isInit = false;
        return IMAManager;
    }());
    egretad.IMAManager = IMAManager;
    __reflect(IMAManager.prototype, "egretad.IMAManager");
})(egretad || (egretad = {}));
