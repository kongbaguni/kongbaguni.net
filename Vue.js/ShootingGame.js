document.documentElement.addEventListener('touchstart', function (event) { 
    if (event.touches.length > 1) { 
        event.preventDefault(); 
    }
}, false);


var gameManager = new Vue({
    data : {
        player : null,
        playersShots : [],
        isShooting : false,
        enemys : [],
        enemysShots : []
    },
    methods : {
        newGame : function() {
            if(this.player != null) {
                return;
            }
            this.player = new Vue({
                data : {                    
                    point : 0,
                    life : 3,
                    position : {
                        x : 10,
                        y : 400
                    },
                    moveTo : null,
                    speed : 2,
                    moveVector : null,
                    movement : 50
                },
                methods : {
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
                        ctx.strokeStyle = "red";
                        ctx.beginPath();                        
                        ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
                        ctx.stroke();
                    }                  
                }
            })
        },
        // 플레이어 미사일 발사
        shoot : function() {
            if(this.player == null) {
                return;
            }
            var shot = new Vue({
                data : {
                    position:{
                        x : this.player.position.x,
                        y : this.player.position.y,
                    },
                    speed: 1,
                    die: false,
                },    
                methods : {
                    update : function() {
                        this.position.y -= this.speed;
                        if(this.position.y < 0) {
                            this.die = true;
                        }
                    },
                    draw(ctx) {
                        if(this.die) {
                            return;
                        }
                        this.update();
                        ctx.strokeStyle = "green";
                        ctx.beginPath();                        
                        ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
                        ctx.stroke();                        
                    }
                }            
            })
            this.playersShots.push(shot);
        },
        //플레이어 미사일 그리기
        drawShot : function(ctx) {
            for (var i = 0; i < this.playersShots.length; i ++) {                
                let shot = this.playersShots[i];
                if(shot.die) {
                    this.playersShots.splice(i,1);
                }
            }
            for (var i = 0; i < this.playersShots.length; i ++) {                
                this.playersShots[i].draw(ctx);
            }
        },
        // 그리기
        draw: function(ctx) {
            if (this.player != null) {
                this.player.draw(ctx);
            }
            this.drawShot(ctx);
            for(var i=0; i < this.enemys.length; i++) {
                let enemy = this.enemys[i];
                if(enemy.die) {
                    this.enemys.splice(i,1);
                }
            }
            for(var i=0; i < this.enemys.length; i++) {
                this.enemys[i].draw(ctx);
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
            }, 5000);
        }, 
        makeEnemy() {
            let enemy = new Vue({
                data:{
                    die : false,
                    inAtteck : false,
                    position:{
                        x : getRandomInt(50,300),
                        y : -50
                    },
                    HP : getRandomInt(1,50),
                    size : 20
                },
                methods:{
                    update() {
                        if(this.HP <= 0) {
                            this.size += 1;
                            return 
                        }
                        this.position.y += 0.1;
                        if(this.position.y > 800) {
                            die = true;
                        }
                        for(var i = 0; i < gameManager.playersShots.length; i ++) {
                            var shot = gameManager.playersShots[i];
                            var distance = gameUtil.getDistance(this.position.x,this.position.y,shot.position.x,shot.position.y);
                            if(distance < 20) {
                                this.HP -= 1;
                                shot.die = true;
                                if(this.HP <= 0) {
                                    setTimeout(() => {
                                        this.die = true;
                                    }, 500);                  
                                }              
                                this.inAtteck = true;
                                setTimeout(() => {
                                    this.inAtteck = false;
                                }, 500);              
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
                        ctx.beginPath();                        
                        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
                        ctx.stroke();
                        if(this.HP > 0){
                            ctx.fillText(this.HP,this.position.x - 10, this.position.y);
                        }
                    }
                }
            })
            this.enemys.push(enemy);
        }
    },
})
gameManager.initInterval(); 


var game01 = new Vue({
    el:"#game01",
    data : {
        ctx:null,
        interval:0
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
        },
        start : function() {
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
        }
    },
    mounted() {
        const canvas = document.getElementById("game01_canvas");
        this.ctx = canvas.getContext('2d');
        canvas.addEventListener("touchstart",function(event){
            console.log(event);
            let rect = canvas.getBoundingClientRect();
            console.log(rect);
            let x = event.changedTouches[0].clientX - rect.x;
            let y = event.changedTouches[0].clientY - rect.y;
            console.log("x : "+ x + " y :" + y);
            if(gameManager.player != null) {
                gameManager.player.moveVector = null;
                gameManager.player.moveTo = {x : x, y : y};
            }
        });

        setInterval(() => {
            this.draw();
        }, 5);
    }
})


var gameUtil = {
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
    }
    
}