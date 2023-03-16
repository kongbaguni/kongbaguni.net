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
                    moveTo : {
                        x : null,
                        y : null
                    },
                    speed : 1,
                    movement : 50
                },
                methods : {
                    moveLeft : function() {
                        this.moveTo.x = this.position.x - this.movement;            
                        console.log(this.moveTo.x);
                    },
                    moveRight : function() {
                        this.moveTo.x = this.position.x + this.movement;
                        console.log(this.moveTo.x);
                    },
                    moveUp : function() {
                        this.moveTo.y = this.position.y - this.movement;
                    },
                    moveDown : function() {
                        this.moveTo.y = this.position.y + this.movement;
                    },            
                    update : function() {
                        if(this.moveTo.x != null) {
                            if(this.position.x > this.moveTo.x) {
                                this.position.x -= this.speed;
                            }
                            if(this.position.x < this.moveTo.x) {
                                this.position.x += this.speed;
                            }
                        }    
                        if(this.moveTo.y != null) {
                            if(this.position.y > this.moveTo.y) {
                                this.position.y -= this.speed;
                            }
                            if(this.position.y < this.moveTo.y) {
                                this.position.y += this.speed;
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
        },

        shotIntervalPlayer() {
            if(this.isShooting) {
                this.shoot();
            }
        },

        initInterval() {
            setInterval(() => {
                this.shotIntervalPlayer();
            }, (500));
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
                gameManager.player.moveTo.x = x;
                gameManager.player.moveTo.y = y;
            }
        });

        setInterval(() => {
            this.draw();
        }, 5);
    }
})