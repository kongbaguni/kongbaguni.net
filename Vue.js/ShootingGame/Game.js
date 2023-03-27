const screenSize = {w : 347, h: 500};

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
            audioLoader.playBGM("bgm");
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







