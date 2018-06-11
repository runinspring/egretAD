class ADDemo extends egret.DisplayObjectContainer {
    private outputLabel: egret.TextField;
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    private init() {
        let outputLabel1 = new egret.TextField();
        outputLabel1.textColor = 0xffffff;
        outputLabel1.width = this.stage.stageWidth - 172;
        outputLabel1.textAlign = "center";
        outputLabel1.text = "本地测试，请将 IP 地址替换为 localhost ";
        outputLabel1.size = 24;
        outputLabel1.x = 172;
        outputLabel1.y = 50;
        this.addChild(outputLabel1);

        let outputLabel = new egret.TextField();
        this.outputLabel = outputLabel;
        outputLabel.textColor = 0xffffff;
        outputLabel.width = this.stage.stageWidth - 172;
        outputLabel.textAlign = "center";
        outputLabel.text = "初始化广告";
        outputLabel.size = 24;
        outputLabel.x = 172;
        outputLabel.y = 110;
        this.addChild(outputLabel);

        this.createAD();
    }
    private ad: egretad.AD;
    private createAD() {
        //初始化广告，必须加载到舞台以后才可以调用
        var ad = new egretad.AD('56',this);
        this.ad = ad;
        console.log('广告SDK版本:',egretad.AD.VERSION);
        // this.ad2 = egretad.Manager.getAD('key2');//可以创建更多的广告

        ad.addEventListener(egretad.AD.CREATED, () => {
            var info = '广告创建完成，可以播放';
            this.outputLabel.text = info;
            console.log(info);
        })
        ad.addEventListener(egretad.AD.LOADED, () => {
            var info = '广告开始加载'
            this.outputLabel.text = info;
            console.log(info);
        })
        ad.addEventListener(egretad.AD.START, () => {
            var info = '广告开始播放'
            this.outputLabel.text = info;
            console.log(info);
        })
        ad.addEventListener(egretad.AD.END, () => {
            var info = '广告播放结束'
            this.outputLabel.text = info;
            console.log(info);
        })
        ad.addEventListener(egretad.AD.ERROR, (err) => {
            var info = '广告播放出现错误:' + err;
            this.outputLabel.text = info;
            console.log(info);
        })
        ad.addEventListener(egretad.AD.CLICK, (err) => {
            var info = '用户点击了广告'
            this.outputLabel.text = info;
            console.log(info);
        })

        let button = new eui.Button();
        button.width = 100;
        button.height = 50;
        button.label = "Click!";
        button.x = (this.stage.stageWidth - 100) / 2;
        button.y = (this.stage.stageHeight - 50) / 2;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        this.ad.show();
    }
}