document.documentElement.addEventListener('touchstart', function (event) { 
    if (event.touches.length > 1) { 
        event.preventDefault(); 
    }
}, false);


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
    },
    methods : {
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
        // 플레이어 미사일 발사
        shoot : function() {
            if(this.player == null) {
                return;
            }
            if(this.player.die) {
                return;
            }
            const playerVectors = [
                {x:0,y:-1}, // 1
                {x:-0.1,y:-0.9},
                {x:0.1,y:-0.9}, // 2
                {x:-0.2,y:-0.8},
                {x:0.2,y:-0.8}, // 3
                {x:-0.3,y:-0.7},
                {x:0.3,y:-0.7}, // 4
                {x:-0.4,y:-0.6},
                {x:0.4,y:-0.6}, // 5
            ]
            const vc = [1,3,5,7,9];
            for(i=0; i<vc[this.player.attack-1]; i++) {
                this.playersShots.push(gameUtil.makePlayerShot(playerVectors[i]));
            }
            
        },
        // 그리기
        draw: function(ctx) {
            ctx.font = "20px Gill Sans"; 
            ctx.fillText("point : " + addCommas(this.point) + " combo : " + this.combo, 5,20);
            if (this.player != null) {
                this.player.draw(ctx);
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
        },

        shotIntervalPlayer() {
            if(this.isShooting) {
                this.shoot();
            }
        },

        makeIntervalEnemy() {
          this.makeEnemy();  
        },

        initInterval() {
            setInterval(() => {
                this.shotIntervalPlayer();
            }, (100));
            setInterval(() => {
                this.makeIntervalEnemy();
            }, 2000);
        }, 
        makeEnemy() {
            if(this.player == null) {
                return 
            }            
            this.enemys.push(gameUtil.makeEnemy());
            
        }
    },
})
gameManager.initInterval(); 


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
            const canvas = document.getElementById("game01_canvas");
            let rect = canvas.getBoundingClientRect();
            let x = touchPoint.x - rect.x;
            let y = touchPoint.y - rect.y;
            if(this.lastTouchPoint!= null && gameManager.player != null) {
                const lp =this.lastTouchPoint;
                const nx = x - lp.x;
                const ny = y - lp.y;

                gameManager.player.position.x += nx;
                gameManager.player.position.y += ny;                
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
            game01.touchstart({x:event.changedTouches[0].clientY,y:event.changedTouches[0].clientX});
        });
        canvas.addEventListener("touchmove",function(event) {
            game01.touchmove({x:event.changedTouches[0].clientY,y:event.changedTouches[0].clientX});  
        });
        canvas.addEventListener("touchend", function(event) {
            game01.touchend({x:event.changedTouches[0].clientY,y:event.changedTouches[0].clientX});
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
        }, 5);
    }
})


var gameUtil = {
    count:0,
    dropItemCount:0,
    lastPlayerPosiont : { x : 0, y : 0},
    makeDropItem(targetPosition) {
        var item = new Vue({
            data : {
                die : false,
                position : targetPosition,
                vector : {x:0,y:1},
                size : 10,
                speed : 1,
                fireCount : 0,
                point : getRandomInt(10,50),
                itemType : 0, // 아이템 타임 0 : 포인트 , 1 : 파워업 , 2 : HP 회복 
            },
            methods : {                
                init() {
                    gameUtil.dropItemCount ++;
                    if(gameUtil.dropItemCount % 5 == 0 && gameManager.player.attack < gameManager.player.attack_MAX) {
                        this.itemType = 1;                        
                    }
                    if(gameManager.player.HP < 10 ) {
                        this.itemType = 2;
                    }                    
                },
                update() {
                    if(gameManager.player == null) {
                        return;
                    }
                    const pp = gameManager.player.position;
                    const distance = gameUtil.getDistance(this.position.x, this.position.y, pp.x, pp.y);
                    if(distance >= 150) {
                        this.speed = 0.9;
                    }
                    if(this.position.y > 450 || this.position.y < 50 || this.position.x < 50 || this.position.x > 360) {
                        this.vector = gameUtil.getMoveVector(this.position.x, this.position.y, pp.x, pp.y, 2);
                        this.speed = 1;
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
                                gameManager.point += this.point * (gameManager.combo + 1);
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
    makeEnemy() {
       var enemy = new Vue({
            data:{
                die : false,
                inAtteck : false,
                position:{
                    x : getRandomInt(50,300),
                    y : -50
                },
                HP : getRandomInt(5,50),
                HP_MAX : 0,
                size : 20,
                misailPettrnNumber : getRandomInt(0,4),
                vector : {
                    x : 0,
                    y : 1
                },
                speed : 1,
                moveType : 0,
            },
            methods:{
                setPlayerTargetVector()  {
                    const px = gameManager.player.position.x;
                    const py = gameManager.player.position.y; 
                    this.vector = gameUtil.getMoveVector(this.position.x,this.position.y,px, py, 1);
                },
                init(){
                    this.HP_MAX = this.HP;
                    this.size = this.HP * 2
                    this.speed = 10 / this.HP
                    this.moveType = getRandomInt(0,3);
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
                    if(this.position.y > 800) {
                        this.die = true;                        
                    }
                    if(this.position.y < 400 && this.die == false && this.moveType == 0) {
                        this.setPlayerTargetVector();
                    }
                    // 플레이어 샷과 적기의 충돌검사
                    for(var i = 0; i < gameManager.playersShots.length; i ++) {
                        var shot = gameManager.playersShots[i];
                        var distance = gameUtil.getDistance(this.position.x,this.position.y,shot.position.x,shot.position.y);
                        if(distance < this.size && shot.position.y > 0 && shot.die == false ) {
                            this.HP -= 1;                            
                            gameManager.point += 1 * (gameManager.combo + 1);
                            if(this.HP <= 0 && shot.die == false) {                                                                
                                gameManager.dropItems.push(gameUtil.makeDropItem(this.position));
                            }
                            shot.die = true;

                            if(this.HP <= 0) {
                                setTimeout(() => {
                                    this.die = true;
                                }, 500);      
                                gameManager.combo += 1;            
                            }              
                            this.inAtteck = true;
                            setTimeout(() => {
                                this.inAtteck = false;
                            }, 500);              
                        }
                    }
                    if( Math.ceil(this.position.y) % 150 < 15) {
                        this.makeShot();
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
                    ctx.beginPath();                        
                    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
                    ctx.stroke();

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
                    if(gameManager.enemysShots.length > 200) {
                        return;
                    }
                    this.enemyShotCount += 1;
                    const data = gameUtil.getMisailPettern(this.position,this.misailPettrnNumber);
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
                                    if(this.position.x < -100 || this.position.x > 400 || this.position.y < -100 || this.position.y > 700) {
                                        this.die = true;
                                        return;
                                    }
                                    if(gameManager.player == null) {
                                        return;
                                    }
                                    // 적군 미사일과 플레이어의 충돌검사 
                                    const distance = gameUtil.getDistance(this.position.x,this.position.y, gameManager.player.position.x, gameManager.player.position.y);
                                    if (distance  < 10 && gameManager.player.die == false && this.die == false ) {
                                        this.die = true;
                                        gameManager.player.HP -= 1;
                                        gameManager.combo -= 1;
                                        gameManager.player.attack = 1;
                                        if(gameManager.combo < 0) {
                                            gameManager.combo = 0;
                                        }
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
                                    
                                    ctx.fillStyle = data.color;
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

                                    
                                    ctx.fillRect(x, y, w, h); 
                                    if(this.die) {
                                        ctx.fillRect(
                                            this.position.x + 2.5 + newHeight,
                                            this.position.y - 2.5 - this.fireCount * 2.5,
                                            5 - newHeight * 2,
                                            5 + this.fireCount * 5                                        
                                        )
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
                size : 10,
                attack : 1,
                attack_MAX : 5,
            },
            methods : {
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
                },
                draw(ctx) {
                    this.update();
                    ctx.strokeStyle = "white";
                    if(this.inDamage == true || this.die == true ) {
                        ctx.strokeStyle = "red";
                        this.inDamage = false;
                    }
                    
                    ctx.beginPath();                        
                    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
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
                    ctx.fillStyle = "white";
                    if(this.fireCount > 0) {
                        switch (getRandomInt(0,3)) {
                            case 0:
                                ctx.fillStyle = "red";
                                break;
                            case 1:
                                ctx.fillStyle = "yellow";
                                break;
                            default:
                                ctx.fillStyle = "black";
                                break
                        }
                        
                    }
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
            color : "orange",
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
        }, 
        {
            color : "red",
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
        },        
        {
            color: "yellow",
            vectors : [
                this.getMoveVector(position.x,position.y, this.lastPlayerPosiont.x, this.lastPlayerPosiont.y, getRandomInt(1,3)),
            ]
        },
        {
            color : "white",
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
        }            
        ]
        if(index < data.length) {
            return data[index];
        }
        this.count += 0.5;
        return data[Math.ceil(this.count) % data.length];
        return data[index];
    }
    
}