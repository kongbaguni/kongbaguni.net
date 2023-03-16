var gameManager = new Vue({
    data : {
        player : null,
        playersShot : [],
        enemys : [],
        enemysShot : []
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
                    }                  
                }
            })
            this.player.start();
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
                const p = gameManager.player.position;

                this.ctx.fillText("player " + p.x + " : " + p.y, p.x, p.y)
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