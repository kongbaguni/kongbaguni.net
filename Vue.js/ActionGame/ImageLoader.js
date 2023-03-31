Vue.extend
var imageLoader = new Vue({
    el : "#imageLoader",
    data : {
        imageDatas : [
            { src : "./images/green_stand/01.svg", key : "green_stand01" , image : new Image()},
            { src : "./images/green_stand/02.svg", key : "green_stand02" , image : new Image()},
            { src : "./images/green_stand/03.svg", key : "green_stand03" , image : new Image()},
            { src : "./images/green_stand/04.svg", key : "green_stand04" , image : new Image()},
            { src : "./images/green_stand/05.svg", key : "green_stand05" , image : new Image()},
            { src : "./images/green_stand/06.svg", key : "green_stand06" , image : new Image()},
            { src : "./images/green_attack/01.svg", key : "green_attack01" , image : new Image()},
            { src : "./images/green_attack/02.svg", key : "green_attack02" , image : new Image()},
            { src : "./images/green_attack/03.svg", key : "green_attack03" , image : new Image()},
            { src : "./images/green_attack/04.svg", key : "green_attack04" , image : new Image()},

        ],       
        images : {}, 
        isLoadFinish : false,
        loadCount : 0,
    },
    created() {
        const imageLength = this.imageDatas.length;
        console.log("image Load Start")           
        for (var i=0; i<this.imageDatas.length;i++) {
            const data = this.imageDatas[i];
            data.image.src = data.src;
            this.images[data.key] = data.image;
            data.image.onload = ()=> {
                this.loadCount +=1;
                console.log(this.loadCount);
                if(this.loadCount == imageLength) {
                    this.isLoadFinish = true;
                    console.log("image Load finish " + this.loadCount);
                }
            }
        }
    }
})