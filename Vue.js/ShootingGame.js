document.documentElement.addEventListener('touchstart', function (event) { 
    if (event.touches.length > 1) { 
        event.preventDefault(); 
    }
}, false);
const screenSize = {w : 347, h: 500};

var imageLoader = new Vue({
    el : "#imageLoader",
    data : {
        ctx : null,
        imageDatas : [
            { src : "./images/shootinggame/bg.svg", key : "bg" , image : new Image()},
            { src : "./images/shootinggame/shot01_1.svg", key : "shot01_1" , image : new Image()},
            { src : "./images/shootinggame/shot01_2.svg", key : "shot01_2" , image : new Image()},
            { src : "./images/shootinggame/shot01_3.svg", key : "shot01_3" , image : new Image()},
            { src : "./images/shootinggame/shot02.svg", key : "shot02" , image : new Image()},
            { src : "./images/shootinggame/shot03.svg", key : "shot03" , image : new Image()},
            { src : "./images/shootinggame/shot04.svg", key : "shot04" , image : new Image()},
            { src : "./images/shootinggame/shot05.svg", key : "shot05" , image : new Image()},
            { src : "./images/shootinggame/shot05.svg", key : "shot05" , image : new Image()},
            { src : "./images/shootinggame/shot06_1.svg", key : "shot06_1" , image : new Image()},
            { src : "./images/shootinggame/shot06_2.svg", key : "shot06_2" , image : new Image()},
            { src : "./images/shootinggame/shot06_3.svg", key : "shot06_3" , image : new Image()},
            { src : "./images/shootinggame/enemy01.svg", key : "enemy01" , image : new Image()},
            { src : "./images/shootinggame/enemy02.svg", key : "enemy02" , image : new Image()},
            { src : "./images/shootinggame/enemy03.svg", key : "enemy03" , image : new Image()},
            { src : "./images/shootinggame/enemy04_1.svg", key : "enemy04_1" , image : new Image()},
            { src : "./images/shootinggame/enemy04_2.svg", key : "enemy04_2" , image : new Image()},
            { src : "./images/shootinggame/enemy04_3.svg", key : "enemy04_3" , image : new Image()},
            { src : "./images/shootinggame/enemy05.svg", key : "enemy05" , image : new Image()},
            { src : "./images/shootinggame/player_1.svg", key : "player_1" , image : new Image()},
            { src : "./images/shootinggame/player_2.svg", key : "player_2" , image : new Image()},
            { src : "./images/shootinggame/player_3.svg", key : "player_3" , image : new Image()},
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



var gameManager = new Vue({
    data : {
        player : null,
        playersShots : [],
        isShooting : true,
        enemys : [],
        enemysShots : [],
        dropItems : [],
        point : 0,
        combo : 0,
        enemyShotCount : 0,
        timeline : 0,
        lastAddedPoint : null, 
        damagedCount : 0,
    },
    methods : {
        addCombo : function() {
            this.combo += 1;
            if(this.combo > 100) {
                this.combo = 100;
            }
        },
        addPoint : function(point) {
            const value = point * (this.combo +1);
            this.point += value
            gameManager.lastAddedPoint = value;
            return value;
        },
        restart : function() {
            this.point = 0;
            this.enemy = [];
            this.enemysShots = [];
            this.player = null;
            this.playersShots = [];
            this.isShooting = true;
            this.newGame();
        },
        newGame : function() {
            if(this.player != null) {
                return;
            }
            this.player = gameUtil.makePlayer()
        },
        powerup : function() {
            this.player.attack += 1;
            if(this.player.attack > this.player.attack_MAX) {
                this.player.attack = this.player.attack_MAX;
            }
        },
        powerdown : function() {
            this.player.attack = 1;
        },
        
        // 그리기
        draw: function(ctx) {
            // 배경 그리기
            const bg = imageLoader.getImage("bg");
            ctx.drawImage(bg,0,-5000 + gameManager.timeline * 0.5 , 370,5000); 
            
            if(this.player != null){
                this.timeline ++;
            }
            // 적 미사일 그리기 
            for(var i=0; i < this.enemys.length; i++) {
                let enemy = this.enemys[i];
                if(enemy.die) {
                    this.enemys.splice(i,1);
                }
            }
            for(var i=0; i < this.enemys.length; i++) {
                this.enemys[i].draw(ctx);
            }

            // 플레이어 미사일 그리기 
            for (var i = 0; i < this.playersShots.length; i ++) {                
                let shot = this.playersShots[i];
                if(shot.die && shot.fireCount > 20) {
                    this.playersShots.splice(i,1);
                }
            }
            for (var i = 0; i < this.playersShots.length; i ++) {                
                this.playersShots[i].draw(ctx);
            }

            //아이템 그리기 
            for(var i=0; i<this.dropItems.length; i++) {
                let item = this.dropItems[i];
                if(item.die && item.fireCount > 10) {
                    this.dropItems.splice(i,1);
                }
            }
            for(var i=0; i<this.dropItems.length; i++) {
                this.dropItems[i].draw(ctx);
            }

            for(var i=0; i< this.enemysShots.length; i++) {
                if(this.enemysShots[i].die && this.enemysShots[i].fireCount > 10) {
                    this.enemysShots.splice(i,1);
                }
            }
            for(var i=0; i<this.enemysShots.length; i++) {
                this.enemysShots[i].draw(ctx);
            } 
            if(this.player != null) {
                this.makeEnemy();       
            }

            const gameOver = this.timeline > 5200 && this.enemys.length == 0;
            // point 그리기
            if(!gameOver) {
                const pText = addCommas(this.point); 
                if(this.point > 0) {                    
                    ctx.font = "30px Gill Sans"; 
                    ctx.fillStyle = "white";
                    ctx.fillText(pText,5,25);
                    ctx.strokeStyle = "red";
                    ctx.strokeText(pText,5,25);    
                }
                if(this.combo > 0) {
                    ctx.font = "15px Gill Sans"; 
                    ctx.fillStyle = "orange";
                    ctx.fillText("x" + this.combo, 5 + pText.length * 15,20 );
                    ctx.strokeStyle = "white";
                    ctx.strokeText("x" + this.combo, 5+ pText.length * 15,20);    
                }
    
                if(gameManager.lastAddedPoint != null) {                
                    ctx.font = "10px Gill Sans"; 
                    ctx.fillStyle = "yellow";
                    ctx.fillText("+"+gameManager.lastAddedPoint, 5+ pText.length * 15 ,30);
                }    
                // 플레이어 그리기 
                if (this.player != null) {
                    this.player.draw(ctx);
                }                
            }
            else {
                // 플레이어 그리기 
                if (this.player != null) {
                    this.player.draw(ctx);
                }

                var ty = 30;
                ctx.font = "30px gill sans";
                ctx.fillStyle = "orange";
                ctx.fillText("GAME OVER", 5,ty);
                ty += 40;

                ctx.font = "20px gill sans";
                ctx.fillStyle = "white";
                var point = this.point;
                if (this.damagedCount == 0) {
                    ctx.fillText("No Miss Bonus : " + addCommas(10000) ,5, ty);
                    point +=  10000;
                    ty += 30;
                }
                ctx.fillText("Combo : " + this.combo , 5, ty);
                ty += 30;
                if(this.combo > 0) {
                    point += 1000 * this.combo;
                    ctx.fillText("Combo Bonus : " + addCommas(this.combo * 1000) , 5, ty);
                    ty += 30;
                }

                ctx.fillText("total : " + addCommas(point), 5, ty);                
            }
            
        },

      

        makeEnemy() {
            const a = [
                {
                    imageKey : ["enemy01"],
                    shottype : [0,1],
                    x : 50,
                    movetype : 0,
                    HP : 3,
                    speed : 0.8,
                    size : 30,                    
                },// 0
                {
                    imageKey : ["enemy01"],
                    shottype : [1,2,2],
                    x : 40,
                    movetype : 0,
                    HP : 3,
                    speed : 0.9,
                    size : 30
                },// 1
                {
                    imageKey : ["enemy01"],
                    shottype : [0,2,2,2],
                    x : 30,
                    movetype : 0,
                    HP : 3,
                    speed : 1,
                    size : 30
                },// 1
                {
                    imageKey : ["enemy01"],
                    shottype : [0,1,1],
                    x : 260,
                    movetype : 0,
                    HP : 3,
                    speed : 0.8,
                    size : 30
                },// 0
                {
                    imageKey : ["enemy01"],
                    shottype : [1,0,0,0],
                    x : 270,
                    movetype : 0,
                    HP : 3,
                    speed : 0.9,
                    size : 30
                },// 1
                {
                    imageKey : ["enemy01"],
                    shottype : [0,2,2,2],
                    x : 280,
                    movetype : 0,
                    HP : 3,
                    speed : 1,
                    size : 30
                },// 1
            ];
            b = [
                {
                    imageKey : ["enemy02"],
                    shottype : [3],
                    x : 150,
                    movetype : 1,
                    HP : 50,
                    speed : 0.7,
                    size : 50
                },// 1
                {
                    imageKey : ["enemy02"],
                    shottype : [4],
                    x : 280,
                    movetype : 1,
                    HP : 50,
                    speed : 0.7,
                    size : 50
                },// 1
            ];
            c = [
                {
                    imageKey : ["enemy03"],
                    shottype : [4],
                    x : 100,
                    movetype : 0,
                    HP : 10,
                    speed : 3,
                    size : 30
                },// 1
                {
                    imageKey : ["enemy03"],
                    shottype : [3,2],
                    x : 150,
                    movetype : 0,
                    HP : 10,
                    speed : 3,
                    size : 30
                },// 1
                {
                    imageKey : ["enemy03"],
                    shottype : [3,2],
                    x : 200,
                    movetype : 0,
                    HP : 10,
                    speed : 3,
                    size : 30
                },// 1
            ];   
            boss = [
                {
                    imageKey : ["enemy03"],
                    shottype : [0,0,1,1,1,1,2,2,3,3,3],
                    x : 150,
                    movetype : 0,
                    HP : 500,
                    speed : 2,
                    size : 100,
                    ylimit : 150
                },// 1
                {
                    imageKey : ["enemy01"],
                    shottype : [0,0,0,0,3,4],
                    x : 50,
                    movetype : 0,
                    HP : 500,
                    speed : 1,
                    size : 40,
                    ylimit : 50
                },// 1
                {
                    imageKey : ["enemy01"],
                    shottype : [0,0,0,0,3,4],
                    x : 300,
                    movetype : 0,
                    HP : 500,
                    speed : 1,
                    size : 40,
                    ylimit : 50
                },// 1
                {
                    imageKey : ["enemy02"],
                    shottype : [0,0,0,0,2,2],
                    x : 50,
                    movetype : 0,
                    HP : 500,
                    speed : 1,
                    size : 40,
                    ylimit : 250
                },// 1
                {
                    imageKey : ["enemy02"],
                    shottype : [0,0,0,0,2,2],
                    x : 300,
                    movetype : 0,
                    HP : 500,
                    speed : 1,
                    size : 40,
                    ylimit : 250
                },// 1

            ];  
            e_power = {
                imageKey : ["enemy04_1","enemy04_2","enemy04_3","enemy04_3","enemy04_3","enemy04_3","enemy04_3","enemy04_3","enemy04_2","enemy04_1","enemy04_1","enemy04_1","enemy04_1","enemy04_1"],
                shottype : [0,1,2,2],
                x : getRandomInt(50,200),
                movetype : 0,
                HP : 30,
                speed : 2,
                size : 30,
                ylimit : 250,
                itemType : "POWER"
            };
            e_HpUP = {
                imageKey : ["enemy05"],
                shottype : [0,1,2,2],
                x : getRandomInt(50,200),
                movetype : 0,
                HP : 30,
                speed : 2,
                size : 30,
                ylimit : 250,
                itemType : "HP"
            }
            

            const enemydata = {
                50 : c[0], 
                80 : c[1], 
                120 : c[2], 
                125 : e_power,
                100 : a[0],
                150 : a[1],
                200 : a[2],
                300 : a[3],
                350 : a[4],
                400 : a[5],
                450 : e_HpUP,
                500 : a[0],
                550 : a[1],
                600 : a[2],
                650 : a[3],
                700 : a[4],
                750 : a[5],
                900 : b[0],
                950 : b[1],
                1000 : b[0],
                1050 : b[1],
                1080 : e_power,
                1100 : a[0],
                1150 : a[1],
                1200 : a[2],
                1250 : b[0],
                1260 : b[1],            
                1300 : b[0],
                1310 : b[1],
                1400 : a[1],
                1450 : a[2],
                1500 : a[3],
                1550 : a[4],
                1600 : a[5],
                1650 : a[0],
                1700 : a[1],
                1750 : a[2],
                1800 : a[3],
                1850 : a[4],
                1900 : a[5],
                1990 : e_HpUP,
                2000 : c[0], 
                2050 : c[1], 
                2100 : c[2], 
                2200 : e_power,            
                2250 : e_power,            
                2300 : e_power,            
                3110 : boss[0],
                3112 : boss[1],
                3113 : boss[2],
                3114 : boss[3],
                3115 : boss[4],
             }

            if(this.player == null) {
                return 
            }       
            var enemy = enemydata[this.timeline];
            if(enemy != null) {
                this.enemys.push(gameUtil.makeEnemy(enemy));
            }     
        }
    },
})


var game01 = new Vue({
    el:"#game01",
    data : {
        ctx:null,
        interval:0,
        gameOver:false,
        lastTouchPoint:null,
        mouseDown:false
    },
    methods : {
        shotBtnClassName : function() {
            if(gameManager.isShooting) {
                return "ON";
            }
            return "OFF"
        },
        isStartGame : function() {
            return gameManager.player != null 
        },
        draw : function() {
            this.interval++;
            let ctx = this.ctx;
            ctx.clearRect(0,0,1000,1000);
            ctx.fillStyle = "white";            
            gameManager.draw(ctx);
            if(gameManager.player != null) {
                if(gameManager.player.HP <= 0) {
                    this.gameOver = true 
                }
            }
        },
        restart : function() {
            this.gameOver = false ;
            gameManager.restart();
        },
        start : function() {
            this.gameOver = false ;
            gameManager.newGame();
        },
        moveLeft : function() {
           gameManager.player.moveLeft();
        },
        moveRight : function() {
            gameManager.player.moveRight();
        },
        moveDown : function() {
            gameManager.player.moveDown();
        },
        moveUp : function() {
            gameManager.player.moveUp();
        },
        shoot : function() {
            gameManager.isShooting = !gameManager.isShooting;
        },
        touchstart(touchPoint) {
            const canvas = document.getElementById("game01_canvas");
            let rect = canvas.getBoundingClientRect();
            let x = touchPoint.x - rect.x;
            let y = touchPoint.y - rect.y;
            this.lastTouchPoint = {x : x, y : y};
        },
        touchmove(touchPoint){
            if(gameManager.player == null) {
                return;
            }
            if(gameManager.player.die) {
                return;
            }
            const canvas = document.getElementById("game01_canvas");
            let rect = canvas.getBoundingClientRect();
            let x = touchPoint.x - rect.x;
            let y = touchPoint.y - rect.y;
            if(this.lastTouchPoint!= null && gameManager.player != null) {
                const lp =this.lastTouchPoint;
                const nx = x - lp.x;
                const ny = y - lp.y;

                const newx = gameManager.player.position.x + nx;
                const newy = gameManager.player.position.y + ny;                
                if (gameUtil.isScreenOut(newx,newy,-10) == false) {                    
                    gameManager.player.position = {x : newx, y : newy};
                } else {
                }
            }
            this.lastTouchPoint = {x : x, y : y};
        },
        touchend(touchPoint) {
            const canvas = document.getElementById("game01_canvas");
            let rect = canvas.getBoundingClientRect();
            let x = touchPoint.x - rect.x;
            let y = touchPoint.y - rect.y;
            this.lastTouchPoint = null
        }
    },
    mounted() {
        const canvas = document.getElementById("game01_canvas");
        this.ctx = canvas.getContext('2d');
        canvas.addEventListener("touchstart",function(event){
            game01.touchstart({x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY});
        });
        canvas.addEventListener("touchmove",function(event) {
            game01.touchmove({x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY});  
        });
        canvas.addEventListener("touchend", function(event) {
            game01.touchend({x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY});
        });
        canvas.addEventListener("mousedown",function(event){
            game01.touchstart({x:event.clientX, y:event.clientY});
            game01.mouseDown = true;
        });
        canvas.addEventListener("mousemove",function(event) {
            if(game01.mouseDown) {
                game01.touchmove({x:event.clientX, y:event.clientY});  
            }
        });
        canvas.addEventListener("mouseup", function(event) {
            game01.mouseDown = false;
            game01.touchend({x:event.clientX, y:event.clientY});
        });
        


        setInterval(() => {
            this.draw();
        }, 16.6);
    }
})


var gameUtil = {
    count:0,
    dropItemCount:0,
    lastPlayerPosiont : { x : 0, y : 0},
    isScreenOut(x,y,targetSize) {
        if(y > screenSize.h + targetSize) {
            return true 
        }
        if(x > screenSize.w + targetSize) {
            return true 
        }
        if(x < -targetSize) {
            return true 
        }
        if(y < -targetSize) {
            return true 
        }
        return false 
    },
    makeDropItem(targetPosition, point, itemType) {
        var item = new Vue({
            data : {
                die : false,
                position : targetPosition,
                vector : {x:0,y:1},
                size : 10,
                speed : 1,
                fireCount : 0,
                point : point,
                itemType : itemType, // 아이템 타임 0 : 포인트 , 1 : 파워업 , 2 : HP 회복 
            },
            methods : {                
                init() {
                    gameUtil.dropItemCount ++;
                },
                update() {
                    if(gameManager.player == null) {
                        return;
                    }
                    const pp = gameManager.player.position;
                    const distance = gameUtil.getDistance(this.position.x, this.position.y, pp.x, pp.y);                    

                    if(gameUtil.isScreenOut(this.position.x, this.position.y,-50)) {
                        this.vector = gameUtil.getMoveVector(this.position.x, this.position.y, pp.x, pp.y, 2);
                    }
                    if(distance >= 150) {
                        this.speed = 0.9;
                    }
                    if(distance < 150) {
                        this.speed = 1.5;
                        this.vector = gameUtil.getMoveVector(this.position.x, this.position.y, pp.x, pp.y, 2);                        
                    }                                        
                    if(distance < 10) {                        
                        this.die = true;
                    }                    
                    if(!this.die) {
                        this.position.x += this.vector.x * this.speed;
                        this.position.y += this.vector.y * this.speed;    
                    } else {
                        this.fireCount ++;
                    }
                },

                draw(ctx) {
                    var text = this.point;
                    switch (this.itemType) {
                        case 1:
                            text = "P";
                            break;
                        case 2:
                            text = "HP";
                            break;
                        default:
                            break;                        
                    }
                    this.update();
                    ctx.font = (this.fireCount + 30) + "px Gill Sans";             
                    ctx.fillStyle = "blue"
                    if(this.speed > 1.0) {
                        ctx.fillStyle = "green";
                    }
                    ctx.fillText(text,this.position.x, this.position.y);
                    ctx.strokeStyle = "white"        
                    ctx.strokeText(text,this.position.x, this.position.y);
                }
            },
            watch : {
                die(a,b) {
                    if(this.die && gameManager.player != null) {     
                        switch (this.itemType) {
                            case 0:
                                gameManager.addPoint(this.point);
                                break;
                            case 1:
                                gameManager.powerup();                                
                            case 2:
                                gameManager.player.healing();
                            default:
                                break;
                        }               
                    }
                }

            }
        })
        item.init();
        return item;
    },
    // 적 생성 
    makeEnemy(data) {
        /**
         * {
         * shottype : 0 // 에너미 미사일타입 (0~4)
         * x : 0 // 등장 위치 
         * movetype : 0 // 이동방법 1 : 직진 0 : 플레이어 추적 
         * HP : 100 // HP
         * speed : 이동속도
         * }
         */
       var enemy = new Vue({
            data:{
                screenOut : false,
                die : false,
                inAtteck : false,
                position:{
                    x : data.x,
                    y : -50
                },
                HP : data.HP,
                HP_MAX : 0,
                size : data.size,
                misailPettrnNumber : data.shottype,
                vector : {
                    x : 0,
                    y : 1
                },
                speed : data.speed,
                moveType : data.movetype,
                shotCount : 0,  
                itemType : data.itemType,              
            },
            methods:{
                setPlayerTargetVector()  {
                    const px = gameManager.player.position.x;
                    const py = gameManager.player.position.y; 
                    this.vector = gameUtil.getMoveVector(this.position.x,this.position.y,px, py, 1);
                },
                init(){
                    this.HP_MAX = this.HP;
                    if(this.size == null) {
                        this.size = this.HP * 2
                    }
                    switch (this.moveType) {
                        case 0:
                            this.setPlayerTargetVector();
                            break;
                        default:
                            break;
                    } 

                },
                update() {
                    if(this.HP <= 0) {
                        this.size += 1;
                        return 
                    }
                    if(gameManager.player == null) {
                        return 
                    }
                    
                    this.position.y += this.vector.y * this.speed / 2;
                    this.position.x += this.vector.x * this.speed / 2;
                    if(gameUtil.isScreenOut(this.position.x, this.position.y, this.size * 2)) {
                        this.die = true;                        
                    }
                    if(this.position.y < 400 && this.die == false && this.moveType == 0) {
                        this.setPlayerTargetVector();
                    }
                    if(data.ylimit != null) {
                        if(this.position.y >= data.ylimit) {
                            this.speed = 0;
                            this.setPlayerTargetVector();    
                        }
                    }
                    
                    // 플레이어 샷과 적기의 충돌검사
                    for(var i = 0; i < gameManager.playersShots.length; i ++) {
                        var shot = gameManager.playersShots[i];
                        var distance = gameUtil.getDistance(this.position.x,this.position.y,shot.position.x,shot.position.y);
                        
                        if(distance < this.size && shot.position.y > 0 && shot.die == false ) {
                            this.HP -= 1;    
                            gameManager.addPoint(1);                        
                            if(this.HP <= 0 && shot.die == false) {                                                                
                                gameManager.dropItems.push(gameUtil.makeDropItem(this.position,this.HP_MAX,0));
                                if(this.itemType != null) {
                                    if(data.itemType == "POWER") {
                                        gameManager.dropItems.push(gameUtil.makeDropItem({x:this.position.x, y:this.position.y - 20},0,1));
                                    }
                                    if(data.itemType == "HP") {
                                        gameManager.dropItems.push(gameUtil.makeDropItem({x:this.position.x, y:this.position.y - 20},0,2));
                                    }
                                }
                            }
                            shot.die = true;

                            if(this.HP <= 0) {
                                setTimeout(() => {
                                    this.die = true;
                                }, 500);                                      
                                gameManager.addCombo();
                            }              
                            this.inAtteck = true;
                            setTimeout(() => {
                                this.inAtteck = false;
                            }, 500);              
                        }
                    }
                    if( gameManager.timeline % 100  < 50) {
                        if(gameManager.timeline % 10 == 0) {
                            this.makeShot();
                        }
                    }
                },
                draw(ctx) {
                    this.update();
                    ctx.strokeStyle = "orange";
                    if(this.inAtteck) {
                        ctx.strokeStyle = "red";
                    }
                    if(this.HP <=0) {
                        ctx.strokeStyle = "white";
                    }
                    // ctx.beginPath();                        
                    // ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
                    // ctx.stroke();
                    const imgidx = gameManager.timeline % data.imageKey.length;
                    const image = imageLoader.getImage(data.imageKey[imgidx]);
                    if(image != null && this.HP > 0) {                
                        ctx.drawImage(image,this.position.x - this.size , this.position.y - this.size , this.size * 2, this.size * 2);
                    }

                    if(this.HP > 0){
                        ctx.fillStyle = "white";
                        ctx.font = "30px Gill Sans"; 
                        ctx.fillText(this.HP,this.position.x - 10, this.position.y);
                        ctx.fillStyle = "red";
                        const hpx =  this.position.x - this.size;
                        const hpy =  this.position.y + this.size + 5;
                        const hpw = this.size * 2 * (this.HP / this.HP_MAX);
                        ctx.fillRect(hpx,hpy, this.size * 2, 3)
                        ctx.fillStyle = "green";
                        ctx.fillRect(hpx,hpy, hpw,3);
                    }
                    
                },
                // 적군 미사일 생성
                makeShot() {
                    this.shotCount ++;
                    if(gameManager.enemysShots.length > 1000) {
                        return;
                    }
                    this.enemyShotCount += 1;
                    const idx = this.shotCount % this.misailPettrnNumber.length;
                    const data = gameUtil.getMisailPettern(this.position,this.misailPettrnNumber[idx]);
                    const vectors = data.vectors;
                    for(i=0; i< vectors.length; i++) {
                        var shot = new Vue ({
                            data : {
                                die : false,
                                position : {
                                    x : this.position.x,
                                    y : this.position.y
                                },
                                vector : vectors[i],
                                fireCount : 0,
                            },
                            methods : {
                                update : function() {
                                    if(this.die == true) {
                                        return 
                                    }
                                    this.position.x += this.vector.x;
                                    this.position.y += this.vector.y;
                                    if(gameUtil.isScreenOut(this.position.x, this.position.y,20)) {
                                        this.die = true;
                                        this.screenOut = true;
                                        return;
                                    }
                                    if(gameManager.player == null) {
                                        return;
                                    }
                                    // 적군 미사일과 플레이어의 충돌검사 
                                    const distance = gameUtil.getDistance(this.position.x,this.position.y, gameManager.player.position.x, gameManager.player.position.y);
                                    if (distance  < 5 && gameManager.player.die == false && this.die == false ) {
                                        this.die = true;
                                        gameManager.player.damage(1);
                                    }                              
                                    if(gameManager.player.HP <= 0) {
                                        setTimeout(() => {
                                            gameManager.player = null;
                                        }, 5000);
                                    }                                              
                                },
                                draw : function(ctx) {
                                    if(this.die) {
                                        this.fireCount += 1;
                                    }
                                    this.update();   

                                    if(this.screenOut) {
                                        return ;
                                    }                                     
                                    ctx.fillStyle = "white";
                                    if(this.fireCount > 0) {
                                        switch (getRandomInt(0,3)) {
                                            case 0:
                                                ctx.fillStyle = "orange";
                                                break;
                                            case 1:
                                                ctx.fillStyle = "red";
                                                break;
                                            default:
                                                ctx.fillStyle = "yellow";
                                                break;
                                        }
                                    }
                                    var newHeight = this.fireCount;
                                    if((5 - this.fireCount) < 1) {
                                        newHeight = 1;
                                    } 
                                    let x = this.position.x - 2.5 - this.fireCount * 2.5;
                                    let y = this.position.y + 2.5 + newHeight;           
                                    let w = 5 + this.fireCount * 5;
                                    let h = 5 - newHeight * 2;

                                    
                                    // ctx.fillRect(x, y, w, h); 
                                    if(this.die) {
                                        ctx.fillRect(
                                            this.position.x + 2.5 + newHeight,
                                            this.position.y - 2.5 - this.fireCount * 2.5,
                                            5 - newHeight * 2,
                                            5 + this.fireCount * 5                                        
                                        )
                                    } else {
                                        let idx = gameManager.timeline % data.imageKey.length;
                                        let imgKey = data.imageKey[idx];
                                        let image = imageLoader.getImage(imgKey);    
                                        if(image != null) {
                                            ctx.drawImage(image,this.position.x - 5, this.position.y - 5, 10,10);
                                        } 
                                
                                    }
                                    
                                }    
                            }
                        })                                                                                        
                        gameManager.enemysShots.push(shot);
                    }
                }
            }
        })
        enemy.init();
        return enemy;
    },
    // 플레이어 생성 
    makePlayer() {
        return new Vue({
            data : {                    
                point : 0,
                HP : 20,
                HP_MAX : 20,
                position : {
                    x : 180,
                    y : 400
                },
                die : false,
                moveTo : null,
                speed : 2,
                moveVector : null,
                movement : 50,
                inDamage : false,
                size : 20,
                attack : 1,
                attack_MAX : 5,
                damagePrintCount : 0,
            },
            methods : {
                // 플레이어 미사일 발사
                shoot : function() {
                    if(this.die) {
                        return;
                    }
                    const playerVectors = [
                        {x:0,y:-1}, // 1
                        {x:-0.05,y:-0.95},
                        {x:0.05,y:-0.95}, // 2
                        {x:-0.1,y:-0.9},
                        {x:0.1,y:-0.9}, // 3
                        {x:-0.15,y:-0.95},
                        {x:0.15,y:-0.95}, // 4
                        {x:-0.2,y:-0.8},
                        {x:0.2,y:-0.8}, // 5
                    ]
                    const vc = [1,3,5,7,9];
                    for(i=0; i<vc[this.attack-1]; i++) {
                        gameManager.playersShots.push(gameUtil.makePlayerShot(playerVectors[i]));
                    }
                    
                },
                //피탄 
                damage(point) {
                    this.HP -= point;
                    gameManager.combo = Math.ceil(gameManager.combo/2);

                    gameManager.damagedCount += 1;
                    attack = 1;
                },
                //HP회복
                healing() {
                    this.HP = this.HP_MAX;
                },
                moveLeft : function() {
                    this.moveVector = null;
                    this.moveTo = { x : this.position.x - this.movement, y : this.position.y };
                },
                moveRight : function() {
                    this.moveVector = null;
                    this.moveTo = { x : this.position.x + this.movement, y : this.position.y };
                },
                moveUp : function() {
                    this.moveVector = null;
                    this.moveTo = { x : this.position.x , y : this.position.y - this.movement};
                },
                moveDown : function() {
                    this.moveVector = null;
                    this.moveTo = { x : this.position.x, y : this.position.y + this.movement};
                },            
                update : function() {
                    if(this.die) {
                        this.size +=1;
                        return;
                    }
                    if(gameManager.timeline % 5 == 0) {
                        this.shoot();
                    }
                    if(this.moveTo == null) {
                        return;
                    }
                    if(this.moveVector == null) {    
                        this.moveVector = gameUtil.getMoveVector(this.position.x,this.position.y,this.moveTo.x, this.moveTo.y, this.speed);                                                 
                    }
                    else {
                        const a = this.position.x > this.moveTo.x - this.speed;
                        const b = this.position.x < this.moveTo.x + this.speed;
                        const c = this.position.y > this.moveTo.y - this.speed;
                        const d = this.position.y < this.moveTo.y + this.speed; 
                        if(a & b && c & d) {
                            this.moveVector = null;
                            this.moveTo = null;
                        } else {
                            this.position.x += this.moveVector.x;
                            this.position.y += this.moveVector.y;
                        }
                    }
                    // 플레이어와 적기의 충돌검사 
                    for(var i=0; i<gameManager.enemys.length; i++) {
                        const enemy = gameManager.enemys[i];
                        const distance = gameUtil.getDistance(this.position.x,this.position.y,enemy.position.x,enemy.position.y);
                        if(distance < 5 + enemy.size) {
                            enemy.HP -= 1;  
                            gameManager.addPoint(1);                          
                        }
                    }
                },
                draw(ctx) {
                    this.update();
                    var imageNames = ["player_1","player_2"];
                    ctx.strokeStyle = "white";
                    if(this.inDamage == true || this.die == true || this.damagePrintCount > 0 ) {                        
                        this.damagePrintCount ++;
                        ctx.strokeStyle = "red";
                        imageNames = ["player_3"];                        
                        this.inDamage = false;                        
                        if(this.damagePrintCount > 50) {
                            this.damagePrintCount = 0;
                        }
                    }
                    if(this.damagePrintCount > 0) {
                        this.damagePrintCount++;
                    }

                    const idx = gameManager.timeline % imageNames.length;
                    const image = imageLoader.getImage(imageNames[idx]);
                    if(this.die == false) {
                        if(image != null) {
                            ctx.drawImage(image,this.position.x - this.size, this.position.y - this.size, this.size*2,this.size*2);
                        }    
                    } else {
                        ctx.beginPath();                        
                        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
                        ctx.stroke(); 
                    }
                    
                    ctx.strokeStyle = "red";    
                    ctx.beginPath();                        
                    ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
                    ctx.stroke();     
                    if(this.HP > 0) {
                        const hpx = this.position.x - 10;
                        const hpy = this.position.y + 12;
                        const hpw = this.HP / this.HP_MAX * 20;
                        ctx.fillStyle = "red";
                        ctx.fillRect(hpx,hpy,20,2);
                        ctx.fillStyle = "orange";
                        ctx.fillRect(hpx,hpy,hpw,2); 
                                                          
                    }
                }                  
            },
            watch : {
               HP(a,b) {
                if(this.HP <= 0) {
                    this.die = true;
                }
                if(a != b) {
                    this.inDamage = true;                                              
                }
               } 
            }
        })
    },
    // 플레이어의 미사일 생성
    makePlayerShot(vector) {
        if(gameManager.player == null) {
            return null;
        }
        return new Vue({
            data : {
                attack:gameManager.player.attack,
                position:{
                    x : gameManager.player.position.x,
                    y : gameManager.player.position.y,
                },
                vector: vector,
                speed: 10,
                die: false,
                fireCount : 0,
            },    
            methods : {
                update : function() {
                    if(this.die) {                            
                        return;
                    }
                    this.position.y += this.vector.y * this.speed;
                    this.position.x += this.vector.x * this.speed;
                    if(this.position.y < -100) {
                        this.die = true;
                    }
                },
                draw(ctx) {
                    if(this.die) {                            
                        this.fireCount ++;
                    }
                    this.update();
                    var rcolor1 = "red";
                    var rcolor2 = "white"
                    switch (getRandomInt(0,3)) {
                        case 0:
                            rcolor1 = "red";
                            rcolor2 = "white";
                            break;
                        case 1:
                            rcolor1 = "yellow";
                            rcolor2 = "lime"
                            break;
                        default:
                            rcolor1 = "black";
                            rcolor2 = "yellow"
                            break
                    }
                    ctx.fillStyle = rcolor1;
                    ctx.strokeStyle = rcolor2;
                    var fx = this.position.x - this.attack - this.fireCount * 2;
                    var fy = this.position.y - 20 + this.fireCount;

                    var fw = this.attack * 2 + this.fireCount * 4;
                    var fh = 40 - this.fireCount * 2;
                    if(this.fireCount > 0) {
                        ctx.fillRect(fx, fy,fw, fh);
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(fx,fy);
                        ctx.lineTo(fx + this.vector.x * 30,fy + this.vector.y * 30);
                        ctx.stroke();                            
                    }

                }
            }            
        })        
    },
    getMoveVector:function(x,y,moveX,moveY,speed) {
        const deltaX = moveX - x;
        const deltaY = moveY - y;
        const distnace = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // 이동 벡터 계산
        const directionX = deltaX / distnace;
        const directionY = deltaY / distnace;
        const mvX = directionX * speed;
        const mvY = directionY * speed;
        return {x : mvX, y: mvY};
    },
    getDistance:function(x1,y1,x2,y2) {
        let distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        return distance;
    },
    getMisailPettern:function(position, index) {
        if(gameManager.player != null) {
            this.lastPlayerPosiont = gameManager.player.position;
        }
        const data = [{
            imageKey : ["shot01_1", "shot01_2", "shot01_3", "shot01_2", "shot01_1"],
            vectors : [
                {x:-1,y:1},
                {x:0,y:1.5},
                {x:1,y:1},
                {x:-1.5,y:0},
                {x:1.5,y:0},
                {x:-1,y:-1},
                {x:0,y:-1.5},
                {x:1,y:-1},
            ],
        }, // 0
        {
            imageKey : ["shot03"],
            vectors : [
                {x:-1.5,y:-0.5},
                {x:1.5,y:-0.5},
                {x:-1.5,y:+0.5},
                {x:1.5,y:+0.5},
                {x:-0.5,y:-1.5},
                {x:0.5,y:-1.5},
                {x:-0.5,y:+1.5},
                {x:0.5,y:+1.5},
            ]            
        },  // 1      
        {
            imageKey : ["shot06_1","shot06_2","shot06_3","shot06_2","shot06_1"],
            vectors : [
                this.getMoveVector(position.x,position.y, this.lastPlayerPosiont.x, this.lastPlayerPosiont.y, getRandomInt(1,3)),
            ]
        }, // 2
        {
            imageKey : ["shot04"],
            vectors : [
                {x : - 1.0, y : 0.1},
                {x : - 0.9, y : 0.15},
                {x : - 0.8, y : 0.2},
                {x : - 0.7, y : 0.25},
                {x : - 0.6, y : 0.3},
                {x : - 0.5, y : 0.35},
                {x : - 0.4, y : 0.4},
                {x : - 0.3, y : 0.45},
                {x : - 0.2, y : 0.5},
                {x : - 0.1, y : 0.55},
                {x : 0, y : 0.6},
                {x : 0.1, y : 0.55},
                {x : 0.2, y : 0.5},
                {x : 0.3, y : 0.45},
                {x : 0.4, y : 0.4},
                {x : 0.5, y : 0.35},
                {x : 0.6, y : 0.3},
                {x : 0.7, y : 0.25},
                {x : 0.8, y : 0.2},
                {x : 0.8, y : 0.15},
                {x : 1.0, y : 0.1},
            ]
        }, // 3 
        {
            imageKey : ["shot05"],
            vectors : [
                {x : -1.9, y:0.1},
                {x : -1.85, y:0.15},
                {x : -1.8, y:0.2},
                {x : -1.75, y:0.25},
                {x : -1.7, y:0.3},
                // {x : -1.65, y:0.35},
                // {x : -1.6, y:0.4},
                // {x : -1.55, y:0.45},
                {x : -1.5, y:0.5},
                {x : -1.45, y:0.55},
                {x : -1.4, y:0.6},
                {x : -1.35, y:0.65},
                {x : -1.3, y:0.7},
                {x : -1.25, y:0.75},
                {x : -1.2, y:0.8},
                {x : -1.15, y:0.85},
                {x : -1.1, y:0.9},
                {x : -1.05, y:0.95},
                {x : -0.45, y:1.55},
                {x : -0.4, y:1.6},
                {x : -0.35, y:1.65},
                {x : -0.3, y:1.7},
                {x : -0.25, y:1.75},
                {x : -0.2, y:1.8},
                {x : -0.15, y:1.85},
                // {x : -0.1, y:1.9},
                // {x : -0.0, y:2},
                {x : 1.9, y:0.1},
                {x : 1.85, y:0.15},
                {x : 1.8, y:0.2},
                {x : 1.75, y:0.25},
                {x : 1.7, y:0.3},
                // {x : 1.65, y:0.35},
                // {x : 1.6, y:0.4},
                // {x : 1.55, y:0.45},
                {x : 1.5, y:0.5},
                {x : 1.45, y:0.55},
                {x : 1.4, y:0.6},
                {x : 1.35, y:0.65},
                {x : 1.3, y:0.7},
                {x : 1.25, y:0.75},
                {x : 1.2, y:0.8},
                {x : 1.15, y:0.85},
                {x : 1.1, y:0.9},
                {x : 1.05, y:0.95},
                {x : 0.45, y:1.55},
                {x : 0.4, y:1.6},
                {x : 0.35, y:1.65},
                {x : 0.3, y:1.7},
                {x : 0.25, y:1.75},
                {x : 0.2, y:1.8},
                {x : 0.15, y:1.85},
                // {x : 0.1, y:1.9},
                // {x : 0.0, y:2},
            ]
        } ,//4
        ]
        return data[index];
    }
    
}



