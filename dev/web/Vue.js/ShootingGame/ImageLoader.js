var imageLoader = new Vue({
    el : "#imageLoader",
    data : {
        ctx : null,
        
        imageDatas : [
            { src : "./images/bg.svg", key : "bg" , image : new Image()},
            { src : "./images/shot01_1.svg", key : "shot01_1" , image : new Image()},
            { src : "./images/shot01_2.svg", key : "shot01_2" , image : new Image()},
            { src : "./images/shot01_3.svg", key : "shot01_3" , image : new Image()},
            { src : "./images/shot02.svg", key : "shot02" , image : new Image()},
            { src : "./images/shot03.svg", key : "shot03" , image : new Image()},
            { src : "./images/shot04.svg", key : "shot04" , image : new Image()},
            { src : "./images/shot05.svg", key : "shot05" , image : new Image()},
            { src : "./images/shot05.svg", key : "shot05" , image : new Image()},
            { src : "./images/shot06_1.svg", key : "shot06_1" , image : new Image()},
            { src : "./images/shot06_2.svg", key : "shot06_2" , image : new Image()},
            { src : "./images/shot06_3.svg", key : "shot06_3" , image : new Image()},
            { src : "./images/enemy01.svg", key : "enemy01" , image : new Image()},
            { src : "./images/enemy02.svg", key : "enemy02" , image : new Image()},
            { src : "./images/enemy03.svg", key : "enemy03" , image : new Image()},
            { src : "./images/enemy04_1.svg", key : "enemy04_1" , image : new Image()},
            { src : "./images/enemy04_2.svg", key : "enemy04_2" , image : new Image()},
            { src : "./images/enemy04_3.svg", key : "enemy04_3" , image : new Image()},
            { src : "./images/enemy05.svg", key : "enemy05" , image : new Image()},
            { src : "./images/player_1.svg", key : "player_1" , image : new Image()},
            { src : "./images/player_2.svg", key : "player_2" , image : new Image()},
            { src : "./images/player_3.svg", key : "player_3" , image : new Image()},
            { src : "./images/hpUp.svg", key : "hpUp" , image : new Image()},
            { src : "./images/powerUp.svg", key : "powerUp" , image : new Image()},

        ],
        keys : [],
        images : {},
        needLoadingImageCount : 0,
        loadFinishCount : 0,    
        loadFinish : false 
    },
    methods : {
        getImage : function(key) {
            return this.images[key];
        },
        getClassName : function() {
            if(this.needLoadingImageCount > this.loadFinishCount) {
                return "on";
            }
            return "off";
        }, 
        draw : function() {
            let ctx = this.ctx;
            ctx.clearRect(0,0,1000,1000);
            ctx.font = "30px Gill Sans";             
            ctx.fillStyle = "white";
            var x = 10;
            var y = 10;
            for(var i=0; i<this.keys.length; i++) {                
                const key = this.keys[i];
                const img = this.images[key];
                ctx.drawImage(img,x ,y,30,30);
                x += 35;
                if(i%8 == 0 && i > 0) {
                    x = 10;
                    y += 35;
                }
            }
        }
    }, 
    
    mounted() {
        const canvas = document.getElementById("imageLoading_canvas");
        this.ctx = canvas.getContext('2d');

        this.needLoadingImageCount = this.imageDatas.length;
        var imgCount = this.imageDatas.length;

        for (var i = 0; i<this.imageDatas.length; i ++) {
            var data = this.imageDatas[i];
            var image = data.image;
            this.keys.push(data.key);            
            image.src = data.src;
            this.images[data.key] = image;
            image.onload  = function() {
                imageLoader.ctx.drawImage(image,50,50,0,0);
                imageLoader.loadFinishCount ++;
                if(imageLoader.loadFinishCount == imgCount) {
                    setTimeout(() => {
                        imageLoader.loadFinish = true;    
                    }, 1000);                    
                }
            }  
        }
        setInterval(() => {
            this.draw();
        }, 100);
    }

})

