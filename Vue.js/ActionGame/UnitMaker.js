var unitMaker = {
    makePlayer() {
        return new Vue({
            data : {
                position : {
                    x : 0,
                    y : 0
                },
                vector : {
                    x : 0,
                    y : 0
                },
                speed : 1.0,
                size : {
                    width : 100,
                    height : 100
                },
                ani_status : "stand",
                imageData : {
                    "stand": {
                        loop : true,
                        keys : [
                        "green_stand01","green_stand02","green_stand03","green_stand04","green_stand05","green_stand05","green_stand04","green_stand03","green_stand02","green_stand01",
                        "green_stand01","green_stand01"
                        ]
                    },
                    "atteck" : {
                        loop : false,
                        keys : [
                            "green_stand01", "green_attack01", "green_attack02", "green_attack03", "green_attack04", "green_attack03", "green_attack04", "green_attack03", "green_attack02", "green_attack01" 
                        ]
                    }
                },
                imageIdx : 0
            },
            methods : {                
                update() {
                    this.imageIdx += 0.2;
                },
                draw(ctx) {
                    this.update();
                    const idx = Math.ceil(this.imageIdx);
                    const data = this.imageData[this.ani_status];
                    const keys = data.keys;
                    const key = keys[idx % keys.length];
                    if(data.loop === false ) {
                        if(idx > keys.length) {
                            this.ani_status = "stand";
                        }
                    }
                    ctx.drawImage(imageLoader.images[key], this.position.x, this.position.y, this.size.width, this.size.height);                    
                },
                attack() {
                    console.log("accack");
                    this.ani_status = "atteck";
                }               
            },            
            watch : {
                ani_status(a,b) {
                    this.imageIdx = 0;
                }
            }
        })
        
    }
}