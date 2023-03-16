var gameManager = new Vue({
    data : {
        player : null,
        playersShots : [],
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
                    start : function() {
                        setInterval(() => {
                            this.update();
                        }, 1);
                    },
                    draw(ctx) {
                        ctx.strokeStyle = "red";
                        ctx.beginPath();                        
                        ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
                        ctx.stroke();
                    }                  
                }
            })
            this.player.start();
        },
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
        }
    }
})


var game01 = new Vue({
    el:"#game01",
    data : {
        ctx:null,
        interval:0
    },
    methods : {
        isStartGame : function() {
            return gameManager.player != null
        },
        draw : function() {
            this.interval++;
            let ctx = this.ctx;
            ctx.clearRect(0,0,1000,1000);
            ctx.fillStyle = "white";
            if (gameManager.player != null) {
                gameManager.player.draw(ctx);
            }
            for (var i = 0; i < gameManager.playersShots.length; i ++) {
                gameManager.playersShots[i].draw(ctx);
            }

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
            gameManager.shoot();
        }
    },
    mounted() {
        const canvas = document.getElementById("game01_canvas");
        this.ctx = canvas.getContext('2d');
        setInterval(() => {
            this.draw();
        }, 1);
    }
})