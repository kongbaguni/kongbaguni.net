var bank = new Vue({
    data : {
        account_value : localStorage.getItem("bankMoney")
    },
    methods : {
        //입금
        loan(money) {
            this.account_value  = Number(this.account_value) - Number(money);     
            localStorage.setItem("bankMoney", this.account_value);
            return money;
        },
        //출금
        deposit(money) {
            const m = wallet.takeMoney(money);
            if(m != null) {
                this.account_value =  Number(this.account_value)  + Number(m);
                localStorage.setItem("bankMoney", this.account_value);
            }
        },
        load(){
            console.log("bank data load");
            if(this.account_value == null) {
                this.account_value = 100000000;
            }
        }
    }   
})
bank.load();

var wallet = new Vue({
    data : {
        money : localStorage.getItem("walletMoney"),
        lastTakeoutMoney : null,
    },
    methods : {
        takeMoney(money) {

            if(Number(this.money) - Number(money) >= 0) {
                this.money = Number(this.money) - Number(money);
                this.lastTakeoutMoney = Number(money);
                localStorage.setItem("walletMoney",this.money);
                return money;
            }             
            if(Number(this.money) < Number(money)) {
                alert("lack of money");          
            }
            return null;
        },
        insertMoney(money) {            
            this.money = Number(this.money) + Number(money);
            localStorage.setItem("walletMoney",this.money);
        },
        load() {
            if(this.money == null) {
                this.money = 40000;
            }
        }
    }
})

wallet.load();

var bettingBoard = new Vue({
    data : {
        data : {"holdem":0,"blackjack":0}
    }, 
    methods : {
        betting(money, gameId) {
            if(this.data[gameId] == null) {
                this.data[gameId] = money;
            } else {
                this.data[gameId] = Number(this.data[gameId]) + Number(money);
            }
        },
        getBetting(gameId) {
            if(this.data[gameId] == null) {
                return 0
            }
            return this.data[gameId]
        },
        removeBetting(gameId) {
            this.data[gameId] = 0;
        },
        win(gameId) {
            const money = this.data[gameId] * 2;
            wallet.insertMoney(money);
            this.removeBetting(gameId);
        },     
        tie(gameId) {
            const money = this.data[gameId];
            wallet.insertMoney(money);
            this.removeBetting(gameId);
        },
        lose(gameId) {
            this.removeBetting(gameId);
        },
        processResult(gameId,result) {
            switch(result) {
                case "WIN":
                    this.win(gameId);
                    break;
                case "LOSE":
                    this.lose(gameId);
                    break;
                default:
                    this.tie(gameId);
                    break;
            }
        }

    }
})

const poker = new Vue({
    el:'#poker',
    data:{
        bank : bank,
        wallet : wallet,
        bettingBoard : bettingBoard,
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
        loadCount:0,
        walletMode:false,
    },
    methods : {
        getWalletMoney : function() {            
            return addCommas(this.wallet.money);
        },
        getBankMoney : function() {
            return addCommas(this.bank.account_value);
        },
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
                    setTimeout(() => {
                        poker.walletMode = true;
                    }, 2000)
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
        },
        outMoney() {
            const m = prompt("출금",50000);
            if(m != null) {
                const value = this.bank.loan(m);
                if(value != null) {
                    this.wallet.insertMoney(value);
                }
            }
        },
        inputMoney() {
            const m = prompt("입금", this.wallet.money);
            if(m != null) {
                const value = this.wallet.takeMoney(m);
                if(value != null) {
                    this.bank.deposit(value);
                }
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
        game_result : null,
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
            this.ctx.font = "10px serif";
            var img = poker.backImg;
            console.log(img);        
            for(var i=0;i<this.deck.length; i++) {                
                this.ctx.drawImage(img, i*2 + 10,10,20,30);
            }
            this.ctx.fillStyle = 'white';     
            this.ctx.fillText("card length : " + this.deck.length, this.deck.length * 2 + 30,20);
            
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
                    this.ctx.fillText("kiker",200,45);
                    this.ctx.drawImage(this.dealer_hand.kiker.img, 200,50,50,70);
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
                    this.ctx.drawImage(this.player_hand.kiker.img, 200,355,50,70);
                }
            }
            if(this.game_result != null) {
                this.ctx.font = "30px serif";
                this.ctx.fillText(this.game_result, 20,280);
                this.strokeStyle = "black";                
                this.ctx.strokeText(this.game_result, 20,280);
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
            },300)
            setTimeout(function() {
                holdem.dealer_deck.push(holdem.deck.pop());
            },400)

            setTimeout(function() {
                holdem.player_deck.push(holdem.deck.pop());
            },600)
            
            setTimeout(function() {
                holdem.player_deck.push(holdem.deck.pop());
            },700)
            
            for (var i=0;i<5;i++) {
                setTimeout(function() {
                    holdem.community_deck.push(holdem.deck.pop());
                }, i * 100 + 1500);
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
            this.game_result = this.checkGameResult();
            this.game_status = 'showdown';   

            bettingBoard.processResult("holdem", this.game_result);
        },
        reset : function() {
            this.game_status = 'ready';
            this.community_deck = [];
            this.dealer_deck = [];
            this.player_deck = [];
            this.player_hand = null;
            this.dealer_hand = null;
            this.game_result = null;
            this.preflop();
        },

        getCCardForHandCheck : function()  {
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
          checkGameResult : function() {
            if (this.dealer_hand == null) {
                return null;
            }
            var d = this.dealer_hand;
            var p = this.player_hand;
            if(p.rank > d.rank) {
                return "WIN";
            }
            if(p.rank == d.rank) {
                if(p.hcard.point > d.hcard.point) {
                    return "WIN";
                }
                if(p.hcard.point == d.hcard.point) {
                    if(p.kiker != null && d.kiker != null) {
                        if(p.kiker.point > d.kiker.point) {
                            return "WIN"
                        }
                        if(p.kiker.point == d.kiker.point) {
                            return "TIED"
                        }
                    }
                }
            }
            return "LOSE"
          },
        betting : function() {
            var bettingMoney = 100;
            if(wallet.lastTakeoutMoney != null) {
                bettingMoney = wallet.lastTakeoutMoney;
            }            

            switch (this.game_status) {
                case "preflop":
                    var newBetting = prompt("betting",bettingMoney);
                    var m = wallet.takeMoney(newBetting);
                    if(m != null) {
                        bettingBoard.betting(m,"holdem");
                        this.flop();
                    }
                    break;
                case "flop":
                    var m = wallet.takeMoney(bettingMoney);
                    if(m!= null) {
                        bettingBoard.betting(m,"holdem");
                        this.turn();
                    }
                    break;
                case "turn":
                    var m = wallet.takeMoney(bettingMoney);
                    if(m!= null) {
                        bettingBoard.betting(m,"holdem");
                        this.river();
                    }
                    break;
                case "river":
                    var m = wallet.takeMoney(bettingMoney);
                    if(m!= null) {
                        bettingBoard.betting(m,"holdem");
                        this.showdown();
                    }
                    break;                    
                default:                     
                    break;
            }

        }
    },
    watch : {
      deck(oldDeck, newDeck) {
        this.draw();
      },
      game_status(old_status,new_status) {
        this.draw();
      },
      game_result(a,b) {
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
                    heightCard = cards[0];
                    kiker = cards[4];
                }
                if (ranks[1] === ranks[4]) {
                    heightCard = cards[1];
                    kiker = cards[0];
                }
                return {title : "Four of a Kind", rank:7, cidx: cidx, kiker:kiker, hcard:heightCard};
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
                    heightCard = cards[0];
                    kiker = cards[3];
                }
                if(ranks[1] === ranks[3] || ranks[2] === ranks[4]) {
                    heightCard = cards[2];
                    kiker = cards[0];
                }
              return {title : "Three of a Kind", rank : 3, cidx: cidx,kiker:kiker, hcard:heightCard};
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
            var pairedCard = [];         
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
                if(count > 0) {
                    pairedCard.push(cards[j]);
                }
            }            
            pairedCard.sort(function(a,b) {
                if(a.point < b.point) {
                    return 1;
                }
                if(a.point > b.point) {
                    return -1;
                }
                return 0;
            });
            
            if (pairs === 2) {
              return {title : "Two Pair", rank : 2, cidx: cidx,kiker:kiker, hcard:pairedCard[0]};
            }
          
            // 원 페어 판정
            if (pairs === 1) {
              return {title : "One Pair", rank : 1, cidx: cidx,kiker:kiker, hcard:pairedCard[0]};
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


var blackjack = new Vue({
    el:'#blackjack',
    data:{
        isBetting:false,
        ctx:null,
        deck:[],
        dealer_deck:[],
        player_deck:[],
        game_status:'ready',
        player_result:null,
        dealer_result:null,
        game_result:null,
        notNeedHit:false,
    },
    methods: {
        betting : function() {
            var bettingMoney = 100;
            if(wallet.lastTakeoutMoney != null) {
                bettingMoney = wallet.lastTakeoutMoney;
            }            

            var newBetting = prompt("betting",bettingMoney);
            if(newBetting == null) {
                return false;
            }            
            var m = wallet.takeMoney(newBetting);
            if(m != null) {
                bettingBoard.betting(m,"blackjack");
                this.isBetting = true;
            }
            return true;
        },
        shuffleCard : function() {     
            console.log("shuffle")   
            if(poker.loadFinish == false) {
                console.log("shuffle !!")
                return 
            }
            var copyarr = Array.from(poker.cards);
            while (copyarr.length > 0) {
              shuffle(copyarr);
              this.deck.unshift(copyarr.pop());          
            }
            
        },
        isInitCard : function() {
            return poker.loadFinish;
        },
        start: function() {
            if(this.game_status!='ready') {
                return ;
            }

            console.log("start");
            if(this.deck.length == 0) {
                console.log("shuffle?")
                this.shuffleCard();
            }
            this.dealer_deck.push(this.deck.pop());
            this.dealer_deck.push(this.deck.pop());
            
            this.player_deck.push(this.deck.pop());
            this.player_deck.push(this.deck.pop());
            this.game_status = 'player_turn';
            this.player_result = this.check(this.player_deck);
        },
        hit : function () {
            if(!this.isBetting) {
                if(this.betting()) {
                    this.hit();
                }
                return;
            }
            this.player_deck.push(this.deck.pop());
            const check = this.check(this.player_deck);
            this.player_result = check;
            if(check.title != null) {
                this.stand();
            }
        },
        stand : function() {
            if(!this.isBetting) {
                if(this.betting()) {
                    this.stand();
                }
                return;
            }

            this.game_status = "dealer_turn"
            this.dealerAction() 
        },
        dealerAction : function() {
            const check = this.check(this.dealer_deck);
            this.dealer_result = check;
            if(this.player_result.rank == 0) {
                this.dealerEndGame();
                return;
            }

            if(check.title != null) {
                this.dealerEndGame();
                return;
            }
            if(this.player_result.point <= check.point &&  check.point < 21) {
                this.dealerEndGame();
                return;
            }

            if(check.point > 17) {
                if(getRandomInt(0,10) < 3) {
                    this.dealerEndGame();
                    return ;    
                }
            }
            
            setTimeout(() => {
                blackjack.dealer_deck.push(this.deck.pop());
                blackjack.dealerAction();                
            }, 1000);
        },
        dealerEndGame() {
            this.game_result = this.checkGameResult();          
            bettingBoard.processResult("blackjack",this.game_result);  
        },

        checkGameResult : function() {
            const p = this.player_result;
            const d = this.dealer_result;
            if(p == null || d == null) {
                return ;
            }
            // 버스트로 승패 
            const playerBust = p.rank != null && p.rank == 0;
            const dealerBust = d.rank != null && d.rank == 0;
            if(playerBust && dealerBust) {
                return "TIE";
            }
            if (dealerBust) {
                return "WIN";
            }
            if(playerBust) {
                return "LOSE";
            }

            const isDealer5Card = d.rank != null && d.rank == 2;
            const isPlaer5Card = p.rank != null && p.rank == 2;
            if(isDealer5Card && isPlaer5Card) {
                return "TIE";
            }
            if(isDealer5Card) {
                return "LOSE";
            }
            if(isPlaer5Card) {
                return "WIN"
            }

            // 랭크 비교 
            if(p.rank != null && d.rank != null) {
                if(p.rank > d.rank) {
                    return "WIN"
                }
                else if(p.rank == d.rank) {
                    return "TIE"
                }
                else {
                    return "LOSE"
                }
            }
            // 포인트 비교 
            if(p.point > d.point) {
                return "WIN"
            }
            // 무승부 
            if(p.point == d.point) {
                return "TIE"
            }
            // 패배
            return "LOSE"
        },

        reset : function() {
            this.isBetting = false;
            this.dealer_deck = [];
            this.player_deck = [];
            this.game_status = 'ready';
            this.game_result = null;
            this.player_result = null;
            this.dealer_result = null;
            this.notNeedHit = false;
            this.start();
        },
        draw : function() {
            this.ctx.clearRect(0,0,1000,1000);
            var img = poker.backImg;
            console.log(img);        
            for(var i=0;i<this.deck.length; i++) {                
                this.ctx.drawImage(img, i*2 + 10,10,20,30);
            }
            this.ctx.fillText("card length : " + this.deck.length, this.deck.length * 2 + 30,20);

            for(var i=0;i<this.dealer_deck.length; i++) {                
                var image = this.dealer_deck[i].img;
                if(this.game_status != 'dealer_turn' && i == 0) {
                    image = poker.backImg;
                }
                this.ctx.drawImage(image, i*50 + 10, 50, 50,70);
            }
            for(var i=0;i<this.player_deck.length; i++) {                
                this.ctx.drawImage(this.player_deck[i].img, i*50 + 10, 150, 50,70);
            }
            if(this.game_result != null) {
                this.ctx.font = "30px serif";
                this.ctx.fillStyle = 'yellow';
                this.ctx.fillText(this.game_result, 20, 145);
            }
            this.ctx.fillStyle = "white";
            if(this.player_result != null) {
                this.ctx.font = "15px serif";
                var y = 200;
                if(this.player_result.title == null) {
                    y += 15;
                }
                this.ctx.fillText(this.player_result.point, this.player_deck.length * 50 + 20, y);
                if(this.player_result.title != null) {
                    this.ctx.font = "10px serif"
                    this.ctx.fillText(this.player_result.title, this.player_deck.length * 50 + 20, 215);
                }
            }
            if(this.dealer_result != null && this.game_status == 'dealer_turn') {
                this.ctx.font = "15px serif";
                var y = 100;
                if(this.dealer_result.title == null) {
                    y += 15;
                }
                this.ctx.fillText(this.dealer_result.point, this.dealer_deck.length * 50 + 20, y);
                if(this.dealer_result.title != null) {
                    this.ctx.font = "10px serif"
                    this.ctx.fillText(this.dealer_result.title, this.dealer_deck.length * 50 + 20, 115);
                }
            }
        },
        check:function(cards) {
            const p = this.calculateHand(cards);

            if(cards.length == 5 && p <= 21) {
                return {title :"5 CARD", rank : 2, point : p}
            }

            if (p > 21) {
                return {title :"BURST", rank : 0, point : p}
            }
            if (p == 21) {
                return {title :"BLACK JACK", rank : 1, point : p}
            }            
            return {title:null, rank : null, point : p}
        },
        calculateHand:function(hand) {
            let sum = 0;
            let numAces = 0;
          
            // 카드를 한 장씩 처리합니다.
            for (let i = 0; i < hand.length; i++) {
              let card = hand[i];
              let value = card.point;
              if (value == 14) {
                numAces++;
                continue;
              }
              if (value > 10) {
                sum += 10;
              } else {
                sum += parseInt(value);
              }
            }
          
            // ACE 카드의 값을 계산합니다.
            var aces = [];
            switch (numAces) {
                case 1:
                    aces = [1,11];
                    break;
                case 2:
                    // aces = [1+1,11+1,11+11];
                    aces = [2,12,22];
                    break;
                case 3:
                    // aces = [1+1+1,11+1+1,11+11+1,11+11+11];
                    aces = [3,13,23,33];
                    break;
                case 4:
                    // aces = [1+1+1+1,11+1+1+1,11+11+1+1,11+11+11+1, 11+11+11+11];
                    aces = [4,14,24,34,44];
                    break;                
            }
            aces.reverse();
            console.log(aces);

            for(let i = 0; i < aces.length; i++) {
                if(sum + aces[i] <= 21) {
                    sum += aces[i];
                    console.log("sum : " + sum)
                    return sum;
                }
            }
            if(aces.length > 0) {
                sum += aces[0];            
            }
          
            return sum;
          }
    }, 
    watch : {
        game_status(a,b) {
            this.draw()
        },
        player_deck(a,b) {
            this.draw();
        },
        dealer_deck(a,b) {
            this.draw();
        },
        deck(a,b) {
            this.draw();
        },
        player_result(a,b) {
            if(this.player_result.title != null) {
                this.notNeedHit = true;
            }
            this.draw();
        },
        dealer_result(a,b) {
            this.draw();
        }
    },
    mounted() {
        const canvas = document.getElementById("blackjack_canvas");
        this.ctx = canvas.getContext('2d');
    }
})

