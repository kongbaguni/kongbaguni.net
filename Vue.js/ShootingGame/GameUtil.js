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
                    audioLoader.playEffect("suctionPop");
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
