
const poker = new Vue({
    el:'#poker',
    data:{
        player_hand:null,
        dealer_hand:null,
        ctx:null,
        backImg: new Image(),
        loadFinish : false ,
        loadcount : 0,
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
        loadBackImage: function() {
            this.backImg.onload  = function() {
                poker.ctx.drawImage(poker.backImg,265,10,40,80);
                poker.loadCount ++;
            }                                
        },
        
        loadCardImage : function(idx) {            
            if (idx == 52) {
                console.log("load finish");                
                return ;
            }
            this.loadCount ++;
            this.backImg.src = "./images/poker/back.svg";            
            const card = this.cards[idx];
            const img = card.img;
            img.src = card.image;
            const x = idx * 5;
            img.onload = function() {       
                poker.ctx.drawImage(img,x + 10,10,40,80);                   
                console.log("load : " + card.desc + " " + card.image + " i:" + idx + " loadCount:" + poker.loadCount);
                poker.draw();
                poker.loadcount ++;
                if(poker.loadcount == 52) {
                    setTimeout(() => {
                        poker.loadFinish = true;    
                    }, 500);                    
                }
            }                
            this.loadCardImage(idx + 1);
        },

        draw() {
            this.ctx.font = "30px serif";
            if (this.loadFinish == true) {
                this.ctx.clearRect(0,0,1000,1000);
                this.ctx.fillStyle = "yellow";
                this.ctx.fillText("loading completed", 10, 50);
            } else {
                this.ctx.fillStyle = "orange";
                this.ctx.fillText("now loading...", 10, 50);

            }
        }
    },
    watch :{
        loadFinish(a,b) {
            this.draw();
        }
    },
    mounted() {
        const canvas = document.getElementById('poker_canvas');
        this.ctx = canvas.getContext('2d');           
        this.loadBackImage();
        this.loadCardImage(0);
    }   
    
})

var holdem = new Vue({
    el:'#holdem',
    data : {
        game_status : 'ready',
        ctx : null,
        deck : [],
        dealer_deck : [],
        player_deck : [],
        community_deck : []
    },

    methods:{
        isInitCard : function() {
            return poker.loadFinish;
        },
        shuffleCard : function() {        
            if(poker.loadFinish == false) {
                return 
            }
            this.deck = [];
            var copyarr = Array.from(poker.cards);
            while (copyarr.length > 0) {
              shuffle(copyarr);
              this.deck.unshift(copyarr.pop());          
            }
        },
        draw : function() {
            this.ctx.clearRect(0,0,1000, 1000);
            var img = poker.backImg;
            console.log(img);        
            for(var i=0;i<this.deck.length; i++) {                
                this.ctx.drawImage(img, i*2 + 10,10,20,30);
            }     
            
            for(var i=0; i<this.dealer_deck.length; i++) {
                var dImg = img;
                if (this.game_status == 'showdown') {
                    dImg = this.dealer_deck[i].img;
                }
                this.ctx.drawImage(dImg, i*95 + 10, 45, 90, 130);
            }

            if(this.dealer_hand != null) {
                this.ctx.fillStyle = "yellow";
                this.ctx.fillText(this.dealer_hand.title,10,185);
                for (var i=0; i <this.dealer_hand.cidx.length; i++) {
                    const x = this.dealer_hand.cidx[i];
                    this.ctx.fillRect(x*55+10,190,5,5);                    
                }
                if(this.dealer_hand.kiker != null) {
                    this.ctx.fillText("kiker",200,45)
                    this.ctx.drawImage(this.dealer_hand.kiker.img, 200,50,40,70);
                }

            }

            for(var i=0; i<this.community_deck.length; i++) {
                var card_img = this.community_deck[i].img;
                switch (this.game_status) {
                    case "preflop":
                    case "preflop_anime":
                        card_img = img;
                        break;
                    case "flop":
                        if(i >= 3) {
                            card_img = img;
                        }
                        break;
                    case "turn":
                        if(i >= 4) {
                            card_img = img;
                        }
                        break;
                    default:
                        break;
                }
                this.ctx.drawImage(card_img, i*55 + 10, 200, 90, 130);
            }
            for(var i=0; i<this.player_deck.length; i++) {
                const pimg = this.player_deck[i].img;
                this.ctx.drawImage(pimg, i*95 + 10, 350, 90, 130);
            }
            if(this.player_hand != null) {
                for (var i=0; i <this.player_hand.cidx.length; i++) {
                    const x = this.player_hand.cidx[i];
                    this.ctx.fillStyle = "yellow";
                    this.ctx.fillRect(x*55 + 10,335,5,5);                    
                }
                this.ctx.fillStyle = "yellow";
                this.ctx.fillText(this.player_hand.title,10,490);
                if(this.player_hand.kiker != null) {
                    this.ctx.fillText("kiker",200,350)
                    this.ctx.drawImage(this.player_hand.kiker.img, 200,355,40,70);
                }
            }
            
        },
        preflop : function() {
            if(this.game_status != 'ready') {
                return;
            }
            this.game_status = 'preflop_anime'
            if (this.deck.length < 12) {
                this.shuffleCard();
            }
            setTimeout(function() {
                holdem.dealer_deck.push(holdem.deck.pop());
            },1000)
            setTimeout(function() {
                holdem.dealer_deck.push(holdem.deck.pop());
            },1500)

            setTimeout(function() {
                holdem.player_deck.push(holdem.deck.pop());
            },2000)
            
            setTimeout(function() {
                holdem.player_deck.push(holdem.deck.pop());
            },2500)
            
            for (var i=0;i<5;i++) {
                setTimeout(function() {
                    holdem.community_deck.push(holdem.deck.pop());
                }, i * 250);
            }

            setTimeout(function() {
                holdem.game_status = 'preflop'
            },3000)           
        },
        flop : function() {
            if (this.game_status != 'preflop') {
                return;
            }
            this.game_status = 'flop';
            this.checkPlayerHand();
        },
        turn : function() {
            if (this.game_status != 'flop') {
                return;
            }
            this.game_status = 'turn';
            this.checkPlayerHand();
        },
        river : function() {
            if (this.game_status != 'turn') {
                return;
            }
            this.game_status = 'river';
            this.checkPlayerHand();
        },
        showdown : function() {
            if(this.game_status != 'river') {
                return;
            }
            this.checkDelarHand();
            this.game_status = 'showdown';            
        },
        reset : function() {
            this.game_status = 'ready';
            this.community_deck = [];
            this.dealer_deck = [];
            this.player_deck = [];
            this.player_hand = null;
            this.dealer_hand = null;
        },

        getCCardForHandCheck : function() {
            var cd = this.community_deck;
            console.log("checkPlayerHand");
            var ccards = [[cd[0],cd[1],cd[2]]];
            var cidxs = ["012"];
            switch (this.game_status) {
              case 'turn':
                cidxs = ["012","013","023","123"];
                break;
              case 'river':
                cidxs = ["012","014","024","034","124","134","234","013","023","123"];
                break;
            }
            switch (this.game_status) {
              case 'river':
                ccards.push([cd[0],cd[1],cd[4]]);
                ccards.push([cd[0],cd[2],cd[4]]);
                ccards.push([cd[0],cd[3],cd[4]]);
                ccards.push([cd[1],cd[2],cd[4]]);
                ccards.push([cd[1],cd[3],cd[4]]);
                ccards.push([cd[2],cd[3],cd[4]]);
              case 'turn':
                ccards.push([cd[0],cd[1],cd[3]]);
                ccards.push([cd[0],cd[2],cd[3]]);
                ccards.push([cd[1],cd[2],cd[3]]);
            }
            console.log("커뮤니티드 "+cd.length+"개 : "+cidxs.length + " "+ccards.length);
            console.log(cidxs);
            console.log("_----------_")
            return {cards:ccards, idxs:cidxs};
          },
          checkDelarHand : function() {
            if (this.community_deck.length < 3) {
              return 
            }
            var cc = this.getCCardForHandCheck();
            var handResuts = [];
            for(var i=0; i<cc.cards.length; i++) {
              var arr = [this.dealer_deck[0],this.dealer_deck[1]];
              for (var j=0; j<cc.cards[i].length; j++) {
                arr.push(cc.cards[i][j]);
              }
              console.log(arr);
              handResuts.push(holdem_manager.evaluatePokerHand(arr,cc.idxs[i]));                    
            }
            this.dealer_hand = holdem_manager.getHighHand(handResuts);
            console.log(handResuts)
          },

        checkPlayerHand: function() {
            if (this.community_deck.length < 3) {
              return 
            }
            var cc = this.getCCardForHandCheck();
            var handResuts = [];
            for(var i=0; i<cc.cards.length; i++) {
              var arr = [this.player_deck[0],this.player_deck[1]];
              for (var j=0; j<cc.cards[i].length; j++) {
                arr.push(cc.cards[i][j]);
              }
              console.log("check_"+i)
              console.log(arr);
              handResuts.push(holdem_manager.evaluatePokerHand(arr,cc.idxs[i]));                    
            }
            this.player_hand = holdem_manager.getHighHand(handResuts);
            console.log(handResuts)
          },
    },
    watch : {
      deck(oldDeck, newDeck) {
        this.draw();
      },
      game_status(old_status,new_status) {
        this.draw();
      }
    },
    mounted() {
        const canvas = document.getElementById("holdem_canvas");
        this.ctx = canvas.getContext('2d');
    }
});


var holdem_manager = new Vue({
    methods: {
        evaluatePokerHand : function(cards,cidx) {
            var kiker = null;
            // 가장 높은 카드 
            var heightCard = null;
            // 카드 무늬와 숫자를 분리해서 저장
            const suits = cards.map(card => card.type);
            const ranks = cards.map(card => card.point);                          
            ranks.sort();
            console.log("ranks ------");
            console.log(ranks);

            cards.sort(function(a,b) {
                if(a.point < b.point) {
                    return 1;
                }
                if(a.point > b.point) {
                    return -1;
                }
                return 0;
            });
            heightCard = cards[0];
            console.log(kiker);

            // 포커 판정
            if (ranks[0] === ranks[3] || ranks[1] === ranks[4]) {                
                if (ranks[0] === ranks[3]) {
                    kiker = cards[4];
                }
                if (ranks[1] === ranks[4]) {
                    kiker = cards[0];
                }
                return {title : "Four of a Kind", rank:7, cidx: cidx, kiker:kiker, hcard:null};
            }
          
            // 풀하우스 판정
            if ((ranks[0] === ranks[1] && ranks[2] === ranks[4]) || (ranks[0] === ranks[2] && ranks[3] === ranks[4])) {
              return {title: "Full House", rank:6, cidx: cidx, kiker:null, hcard:heightCard};
            }
          
            // 플러시 판정
            if (suits.every(suit => suit === suits[0])) {
              return {title: "Flush" , rank:5, cidx: cidx, kiker:null, hcard:heightCard};
            }
          
            // 스트레이트 판정
            let straight = true;
            for (let i = 0; i < ranks.length - 1; i++) {
              if (ranks[i + 1] - ranks[i] !== 1) {
                straight = false;
                break;
              }
            }
            if (straight) {
              return {title : "Straight", rank : 4, cidx: cidx,kiker:null, hcard:heightCard};
            }
          
            // 스트레이트 플러시 판정
            if (straight && suits.every(suit => suit === suits[0])) {
              return {title : "Straight Flush", rank : 8, cidx: cidx,kiker:null, hcard:heightCard};
            }
          
            // 쓰리카인드 판정
            if (ranks[0] === ranks[2] || ranks[1] === ranks[3] || ranks[2] === ranks[4]) {
                if(ranks[0] === ranks[2]) {
                    kiker = cards[3];
                }
                if(ranks[1] === ranks[3] || ranks[2] === ranks[4]) {
                    kiker = cards[0];
                }
              return {title : "Three of a Kind", rank : 3, cidx: cidx,kiker:kiker, hcard:null};
            }
          
            // 투페어 판정
            var pairRanks = [];
            let pairs = 0;
            for (let i = 0; i < ranks.length - 1; i++) {
              if (ranks[i] === ranks[i + 1]) {
                pairs++;
                pairRanks.push(ranks[i]);
              }
            }            
            for(var j=0; j<cards.length; j++) {
                var count=0;
                for(var i=0; i<pairRanks.length; i++) {
                    if(cards[j].point == pairRanks[i]) {
                        count++;
                    }
                }
                if(count == 0 && kiker == null) {
                    kiker = cards[j];
                }
            }
            
            if (pairs === 2) {
              return {title : "Two Pair", rank : 2, cidx: cidx,kiker:kiker, hcard:null};
            }
          
            // 원 페어 판정
            if (pairs === 1) {
              return {title : "One Pair", rank : 1, cidx: cidx,kiker:kiker, hcard:null};
            }
          
            // 하이카드 판정
            return {title : "High Card", rank: 0, cidx: cidx,kiker:null, hcard:heightCard};
          },   
          
          getHighHand : function(hands) {
            var hand = hands[0];
            console.log("------- getHighHand -------- ");      
            console.log(hands);  
            for (var i=0; i < hands.length; i++) {          
              console.log("getHighHand for "+i + " " + hands[i].desc);
              if (hands[i].rank > hand.rank) {
                hand = hands[i];
              }
              if(hands[i].rank === hand.rank) {
                if(hands[i].hcard != null && hand.hcard != null) {
                    if(hands[i].hcard.point > hand.hcard.point) {
                        hand = hands[i];
                    }
                }
                if(hands[i].kiker != null && hand.kiker != null) {
                    if(hands[i].kiker.point > hand.kiker.point) {
                        hand = hands[i];
                    }
                }
              }
            }
            return hand
          }      
    }
})