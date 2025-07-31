var scene1 = new Vue({
    el : "#scene1",
    data : {
        player : null,
        ctx : null,
        timeline : 0,
    },
    created() {
        this.player = unitMaker.makePlayer();
    },
    mounted() {
        const canvas = document.getElementById("scene1_canvas");
        this.ctx = canvas.getContext('2d');

        setInterval(() => {
            this.update();
        }, 1000 / 60);
    },
    methods : {        
        update() {
            if(imageLoader.isLoadFinish == false) {
                return;
            }        
            this.ctx.clearRect(0,0,500,500);
            this.timeline ++;
            if(this.player!= null) {
                this.player.draw(this.ctx);
            }
            if(this.timeline % 500 == 0) {
                console.log("!!!")
                this.player.attack();
            }
        }
    }
})