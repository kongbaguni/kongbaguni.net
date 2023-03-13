const poker = new Vue({
    el:'#poker',
    data:{
        ctx:null,
        backImg: new Image(),
        cards:[
            {type:"S", value:"A", image:"./images/poker/SA.svg", desc:"SA", point:14, typepoint:4, img : new Image()},
            {type:"S", value:"2", image:"./images/poker/S2.svg", desc:"S2", point:2, typepoint:4, img : new Image()},
            {type:"S", value:"3", image:"./images/poker/S3.svg", desc:"S3", point:3, typepoint:4, img : new Image()},
            {type:"S", value:"4", image:"./images/poker/S4.svg", desc:"S4", point:4, typepoint:4, img : new Image()},
            {type:"S", value:"5", image:"./images/poker/S5.svg", desc:"S5", point:5, typepoint:4, img : new Image()},
            {type:"S", value:"6", image:"./images/poker/S6.svg", desc:"S6", point:6, typepoint:4, img : new Image()},
            {type:"S", value:"7", image:"./images/poker/S7.svg", desc:"S7", point:7, typepoint:4, img : new Image()},
            {type:"S", value:"8", image:"./images/poker/S8.svg", desc:"S8", point:8, typepoint:4, img : new Image()},
            {type:"S", value:"9", image:"./images/poker/S9.svg", desc:"S9", point:9, typepoint:4, img : new Image()},
            {type:"S", value:"10", image:"./images/poker/S10.svg", desc:"S10", point:10, typepoint:4, img : new Image()},
            {type:"S", value:"J", image:"./images/poker/SJ.svg", desc:"SJ", point:11, typepoint:4, img : new Image()},
            {type:"S", value:"Q", image:"./images/poker/SQ.svg", desc:"SQ", point:12, typepoint:4, img : new Image()},
            {type:"S", value:"K", image:"./images/poker/SK.svg", desc:"SK", point:13, typepoint:4, img : new Image()},
    
            {type:"D", value:"A", image:"./images/poker/DA.svg", desc:"DA", point:14, typepoint:3, img : new Image()},
            {type:"D", value:"2", image:"./images/poker/D2.svg", desc:"D2", point:2, typepoint:3, img : new Image()},
            {type:"D", value:"3", image:"./images/poker/D3.svg", desc:"D3", point:3, typepoint:3, img : new Image()},
            {type:"D", value:"4", image:"./images/poker/D4.svg", desc:"D4", point:4, typepoint:3, img : new Image()},
            {type:"D", value:"5", image:"./images/poker/D5.svg", desc:"D5", point:5, typepoint:3, img : new Image()},
            {type:"D", value:"6", image:"./images/poker/D6.svg", desc:"D6", point:6, typepoint:3, img : new Image()},
            {type:"D", value:"7", image:"./images/poker/D7.svg", desc:"D7", point:7, typepoint:3, img : new Image()},
            {type:"D", value:"8", image:"./images/poker/D8.svg", desc:"D8", point:8, typepoint:3, img : new Image()},
            {type:"D", value:"9", image:"./images/poker/D9.svg", desc:"D9", point:9, typepoint:3, img : new Image()},
            {type:"D", value:"10", image:"./images/poker/D10.svg", desc:"D10", point:10, typepoint:3, img : new Image()},
            {type:"D", value:"J", image:"./images/poker/DJ.svg", desc:"DJ", point:11, typepoint:3, img : new Image()},
            {type:"D", value:"Q", image:"./images/poker/DQ.svg", desc:"DQ", point:12, typepoint:3, img : new Image()},
            {type:"D", value:"K", image:"./images/poker/DK.svg", desc:"DK", point:13, typepoint:3, img : new Image()},
    
            {type:"H", value:"A", image:"./images/poker/HA.svg", desc:"HA", point:14, typepoint:2, img : new Image()},
            {type:"H", value:"2", image:"./images/poker/H2.svg", desc:"H2", point:2, typepoint:2, img : new Image()},
            {type:"H", value:"3", image:"./images/poker/H3.svg", desc:"H3", point:3, typepoint:2, img : new Image()},
            {type:"H", value:"4", image:"./images/poker/H4.svg", desc:"H4", point:4, typepoint:2, img : new Image()},
            {type:"H", value:"5", image:"./images/poker/H5.svg", desc:"H5", point:5, typepoint:2, img : new Image()},
            {type:"H", value:"6", image:"./images/poker/H6.svg", desc:"H6", point:6, typepoint:2, img : new Image()},
            {type:"H", value:"7", image:"./images/poker/H7.svg", desc:"H7", point:7, typepoint:2, img : new Image()},
            {type:"H", value:"8", image:"./images/poker/H8.svg", desc:"H8", point:8, typepoint:2, img : new Image()},
            {type:"H", value:"9", image:"./images/poker/H9.svg", desc:"H9", point:9, typepoint:2, img : new Image()},
            {type:"H", value:"10", image:"./images/poker/H10.svg", desc:"H10", point:10, typepoint:2, img : new Image()},
            {type:"H", value:"J", image:"./images/poker/HJ.svg", desc:"HJ", point:11, typepoint:2, img : new Image()},
            {type:"H", value:"Q", image:"./images/poker/HQ.svg", desc:"HQ", point:12, typepoint:2, img : new Image()},
            {type:"H", value:"K", image:"./images/poker/HK.svg", desc:"HK", point:13, typepoint:2, img : new Image()},
    
            {type:"C", value:"A", image:"./images/poker/CA.svg", desc:"CA", point:14, typepoint:1, img : new Image()},
            {type:"C", value:"2", image:"./images/poker/C2.svg", desc:"C2", point:2, typepoint:1, img : new Image()},
            {type:"C", value:"3", image:"./images/poker/C3.svg", desc:"C3", point:3, typepoint:1, img : new Image()},
            {type:"C", value:"4", image:"./images/poker/C4.svg", desc:"C4", point:4, typepoint:1, img : new Image()},
            {type:"C", value:"5", image:"./images/poker/C5.svg", desc:"C5", point:5, typepoint:1, img : new Image()},
            {type:"C", value:"6", image:"./images/poker/C6.svg", desc:"C6", point:6, typepoint:1, img : new Image()},
            {type:"C", value:"7", image:"./images/poker/C7.svg", desc:"C7", point:7, typepoint:1, img : new Image()},
            {type:"C", value:"8", image:"./images/poker/C8.svg", desc:"C8", point:8, typepoint:1, img : new Image()},
            {type:"C", value:"9", image:"./images/poker/C9.svg", desc:"C9", point:9, typepoint:1, img : new Image()},
            {type:"C", value:"10", image:"./images/poker/C10.svg", desc:"C10", point:10, typepoint:1, img : new Image()},
            {type:"C", value:"J", image:"./images/poker/CJ.svg", desc:"CJ", point:11, typepoint:1, img : new Image()},
            {type:"C", value:"Q", image:"./images/poker/CQ.svg", desc:"CQ", point:12, typepoint:1, img : new Image()},
            {type:"C", value:"K", image:"./images/poker/CK.svg", desc:"CK", point:13, typepoint:1, img : new Image()},
          ],
          loadCount:0
    },
    methods : {
        loadImage : function() {
            if (this.loadCount == 53) {
                return ;
            }
            this.loadCount = 0;
            this.backImg.src = "./images/poker/back.svg";
            this.backImg.onload  = function() {
                poker.ctx.drawImage(poker.backImg,10,10,40,80);
                poker.loadCount ++;
            }
            for(var i=0; i<this.cards.length; i++) {
                const card = this.cards[i];
                const img = card.img;
                img.src = card.image;
                const x = i * 5;
                img.onload = function() {                    
                    poker.ctx.drawImage(img,x + 10,10,40,80);   
                    poker.loadCount ++;
                    console.log("load : " + card.desc + " " + card.image + " i:" + i + " loadCount:" + poker.loadCount);
                }
            }
        }
    },
    mounted() {
        const canvas = document.getElementById('poker_canvas');
        this.ctx = canvas.getContext('2d');        
        this.loadImage();
    }
    
})