var images = [
    {number:1, url : "https://img.freepik.com/free-photo/close-up-portrait-on-beautiful-cat_23-2149214373.jpg", desc: "창가에 앉아있는 도도한 삼색고양이"},
    {number:2, url : "https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg", desc: "길 위에서 식빵굽는 어린 삼색고양이"},
    {number:3, url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8GSq_y-2Cr5j_6srGAfnGOTF4a6dEQHwQzIALkjY0earyawWrNx3fnIF7hGH17Fu2LE&usqp=CAU", desc: "작은 고양이"},
    {number:4, url : "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2D9/image/h_9JUWqGXTUGB9ZLyetUmpLpUhk.jpg", desc: "문 뒤에 이상하게 앉아 있는 하얀 고양이"},
    {number:5, url : "https://img.animalplanet.co.kr/thumbnail/2020/06/17/2000/9nie3n54mijq224a57l5.jpg", desc: "깜짝 놀란 고양이 사진과 그림"},
    {number:6, url : "https://img.animalplanet.co.kr/thumbnail/2019/12/30/2000/h53kvxf8tjftc7va0c48.jpg", desc: "깜짝 놀란 검은 고양이"},
    {number:7, url : "https://img.insight.co.kr/static/2017/12/01/2000/y92cr5i5d86lk21c1i87.jpg", desc: "망한 고양이 사진 콘테스트"},
    {number:8, url : "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/27750473_2074141789474495_4757947911887162111_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=9ttNzYTeMAEAX_UdOum&_nc_ht=scontent-gmp1-1.xx&oh=00_AfBpe4geHhyynUSlFYNd4gkIyo8vPVf3CPZRIktW9vRgIg&oe=6428B57D", desc: "8번 고양이"},
  ];
var random = getRandomInt(0,images.length-1);


var game1 = new Vue({
  el: '#gawebaweboh',
  data : {
    me : "",
    com : "",
    result : "",
    gaweBaweBohResults: [

    ],
    win : 0,
    lose : 0,
    tied : 0,
  },
  methods : {
    gawe: function() {
      game1.me = "가위";
      game1.com = getGaweBaweBoh();
      gaweBaweBohCheck();
    },
    bawe: function() {
      game1.me = "바위";
      game1.com = getGaweBaweBoh();
      gaweBaweBohCheck();
    },
    boh: function() {
      game1.me = "보";
      game1.com = getGaweBaweBoh();
      gaweBaweBohCheck();
    },
    reset : function() {
      game1.gaweBaweBohResults = [];
      game1.win = 0;
      game1.lose = 0;
      game1.tied = 0;      
    }
  }
})

function gaweBaweBohCheck() {
  game1.result = checkGaweBaweBoh(game1.me, game1.com);
  switch (game1.result) {
    case "이겼다":
      game1.win++;
      break;
    case "비겼다":
      game1.tied++;
      break;
    case "졌다":
      game1.lose ++;
      break;
  }
  game1.gaweBaweBohResults.push(
    {number:game1.gaweBaweBohResults.length+1,me:game1.me,com:game1.com,result:game1.result}
  )
}

var app1 = new Vue({
    el: '#app1',
    data: {
      msg1: '안녕하세요 Vue!',
      msg2: 'test!!'
    }
  })

var app2 = new Vue({
    el: '#app2',
    data: {
      msg: images[random].desc,
      on: "aaa",
      cat_image : images[random].url,
      desc : images[random].desc
    },
    methods : {
        cangePicture : function() {
            var random = getRandomInt(0,images.length-1);
            app2.cat_image = images[random].url;
            app2.desc = images[random].desc;        
        }
    }
  })
  
var app3 = new Vue({
    el : '#app3',
    data : {
        show : true,
        cat_images : images
    }
})

var app4 = new Vue({
    el: '#app4',
    data: {
      name: '홍길동',
      phone_number:''
    },
    methods : {
      searchChangeFunc : function (event) {
        console.log(event.target.value);
        app4.phone_number = formatPhoneNumber(app4.phone_number);
      }      
    }

  })


  Vue.component('todo-item', {
    props: ['todo'],
    template: '<tr><th>{{ todo.number }}</th><td>{{ todo.url }}</td></tr>'
  })
  
  var app7 = new Vue({
    el: '#app5',
    data: {
      groceryList:images
    }
  })
  


  var baseballGame = new Vue({
    el : '#baseballGame',
    data : {      
      numbers:[getRandomInt(0,9),getRandomInt(0,9),getRandomInt(0,9)],
      game_data:[],
      input_number:"",
      game_start:true
    },
    methods : {
      inputChange : function (event) {
        console.log(event.target.value);
        var value = event.target.value;
        if (value.length >= 3) {
          this.input_number =  value.substring(0, 3);
          var result = checkGame();
          console.log(result);
          console.log(baseballGame.numbers);
          this.game_data.push(
            {
              count:this.game_data.length + 1,
              input:this.input_number, 
              result:result
            }
          );
          this.input_number = "";
          if(result.strike == 3) {
            this.game_start = false 
          }
        }
      },
      new_game : function() {
        console.log("new game");
        this.numbers = [getRandomInt(0,9),getRandomInt(0,9),getRandomInt(0,9)];
        this.game_data = [];
        this.input_number = "";
        this.game_start = true;
      }
    }
  })

  function checkGame() {    
    var strike = 0
    var ball = 0
    console.log(baseballGame.numbers.length);
    console.log("_------------");
    var a = [];
    var b = baseballGame.numbers;

    var aa = [];
    var bb = [];

    for (var i=0;i<baseballGame.input_number.length;i++) {
      a.push(baseballGame.input_number[i])
    }

    //스트라이크 판정
    for (var i=0;i<b.length;i++) {
      if (a[i] == b[i]) {
        strike ++;
      } else {
        aa.push(a[i]);
        bb.push(b[i]);
      }
    }

    //볼 판정
    for (var i=0; i<aa.length; i++) {
      for (var j=0; j<bb.length; j++) {
        if (aa[i] == bb[j]) {
          ball ++;
        }
      }
    }
    return {strike:strike, ball:ball}
  }

  /** 포커 */
  var poker = new Vue ({
    el:'#poker',
    data:{
      cards:[
        {type:"S", value:"A", image:"./images/poker/SA.svg", desc:"SA", point:14, typepoint:4},
        {type:"S", value:"2", image:"./images/poker/S2.svg", desc:"S2", point:2, typepoint:4},
        {type:"S", value:"3", image:"./images/poker/S3.svg", desc:"S3", point:3, typepoint:4},
        {type:"S", value:"4", image:"./images/poker/S4.svg", desc:"S4", point:4, typepoint:4},
        {type:"S", value:"5", image:"./images/poker/S5.svg", desc:"S5", point:5, typepoint:4},
        {type:"S", value:"6", image:"./images/poker/S6.svg", desc:"S6", point:6, typepoint:4},
        {type:"S", value:"7", image:"./images/poker/S7.svg", desc:"S7", point:7, typepoint:4},
        {type:"S", value:"8", image:"./images/poker/S8.svg", desc:"S8", point:8, typepoint:4},
        {type:"S", value:"9", image:"./images/poker/S9.svg", desc:"S9", point:9, typepoint:4},
        {type:"S", value:"10", image:"./images/poker/S10.svg", desc:"S10", point:10, typepoint:4},
        {type:"S", value:"J", image:"./images/poker/SJ.svg", desc:"SJ", point:11, typepoint:4},
        {type:"S", value:"Q", image:"./images/poker/SQ.svg", desc:"SQ", point:12, typepoint:4},
        {type:"S", value:"K", image:"./images/poker/SK.svg", desc:"SK", point:13, typepoint:4},

        {type:"D", value:"A", image:"./images/poker/DA.svg", desc:"DA", point:14, typepoint:3},
        {type:"D", value:"2", image:"./images/poker/D2.svg", desc:"D2", point:2, typepoint:3},
        {type:"D", value:"3", image:"./images/poker/D3.svg", desc:"D3", point:3, typepoint:3},
        {type:"D", value:"4", image:"./images/poker/D4.svg", desc:"D4", point:4, typepoint:3},
        {type:"D", value:"5", image:"./images/poker/D5.svg", desc:"D5", point:5, typepoint:3},
        {type:"D", value:"6", image:"./images/poker/D6.svg", desc:"D6", point:6, typepoint:3},
        {type:"D", value:"7", image:"./images/poker/D7.svg", desc:"D7", point:7, typepoint:3},
        {type:"D", value:"8", image:"./images/poker/D8.svg", desc:"D8", point:8, typepoint:3},
        {type:"D", value:"9", image:"./images/poker/D9.svg", desc:"D9", point:9, typepoint:3},
        {type:"D", value:"10", image:"./images/poker/D10.svg", desc:"D10", point:10, typepoint:3},
        {type:"D", value:"J", image:"./images/poker/DJ.svg", desc:"DJ", point:11, typepoint:3},
        {type:"D", value:"Q", image:"./images/poker/DQ.svg", desc:"DQ", point:12, typepoint:3},
        {type:"D", value:"K", image:"./images/poker/DK.svg", desc:"DK", point:13, typepoint:3},

        {type:"H", value:"A", image:"./images/poker/HA.svg", desc:"HA", point:14, typepoint:2},
        {type:"H", value:"2", image:"./images/poker/H2.svg", desc:"H2", point:2, typepoint:2},
        {type:"H", value:"3", image:"./images/poker/H3.svg", desc:"H3", point:3, typepoint:2},
        {type:"H", value:"4", image:"./images/poker/H4.svg", desc:"H4", point:4, typepoint:2},
        {type:"H", value:"5", image:"./images/poker/H5.svg", desc:"H5", point:5, typepoint:2},
        {type:"H", value:"6", image:"./images/poker/H6.svg", desc:"H6", point:6, typepoint:2},
        {type:"H", value:"7", image:"./images/poker/H7.svg", desc:"H7", point:7, typepoint:2},
        {type:"H", value:"8", image:"./images/poker/H8.svg", desc:"H8", point:8, typepoint:2},
        {type:"H", value:"9", image:"./images/poker/H9.svg", desc:"H9", point:9, typepoint:2},
        {type:"H", value:"10", image:"./images/poker/H10.svg", desc:"H10", point:10, typepoint:2},
        {type:"H", value:"J", image:"./images/poker/HJ.svg", desc:"HJ", point:11, typepoint:2},
        {type:"H", value:"Q", image:"./images/poker/HQ.svg", desc:"HQ", point:12, typepoint:2},
        {type:"H", value:"K", image:"./images/poker/HK.svg", desc:"HK", point:13, typepoint:2},

        {type:"C", value:"A", image:"./images/poker/CA.svg", desc:"CA", point:14, typepoint:1},
        {type:"C", value:"2", image:"./images/poker/C2.svg", desc:"C2", point:2, typepoint:1},
        {type:"C", value:"3", image:"./images/poker/C3.svg", desc:"C3", point:3, typepoint:1},
        {type:"C", value:"4", image:"./images/poker/C4.svg", desc:"C4", point:4, typepoint:1},
        {type:"C", value:"5", image:"./images/poker/C5.svg", desc:"C5", point:5, typepoint:1},
        {type:"C", value:"6", image:"./images/poker/C6.svg", desc:"C6", point:6, typepoint:1},
        {type:"C", value:"7", image:"./images/poker/C7.svg", desc:"C7", point:7, typepoint:1},
        {type:"C", value:"8", image:"./images/poker/C8.svg", desc:"C8", point:8, typepoint:1},
        {type:"C", value:"9", image:"./images/poker/C9.svg", desc:"C9", point:9, typepoint:1},
        {type:"C", value:"10", image:"./images/poker/C10.svg", desc:"C10", point:10, typepoint:1},
        {type:"C", value:"J", image:"./images/poker/CJ.svg", desc:"CJ", point:11, typepoint:1},
        {type:"C", value:"Q", image:"./images/poker/CQ.svg", desc:"CQ", point:12, typepoint:1},
        {type:"C", value:"K", image:"./images/poker/CK.svg", desc:"CK", point:13, typepoint:1},
      ],
      deck : [], 
      player_deck : [],
      communiti_deck : [],
      dealer_deck : [],   
      game_status : "ready", // 게임 상태
      player_hand : "", // 플레이어 족보 출력 
      player_cidx : "", // 플레이어 족보에 사용된 커뮤니티카드 인덱스
      player_cidx_arr : [], // 플레이어 족보에 사용된 커뮤니티카드 출력 위한 배열 
      player_kiker : null, // 플레이어 키커

      dealer_hand: "",// 딜러 족보 출력 
      dealer_cidx : "", // 딜러 족보에 사용된 커뮤니티카드 인덱스 
      dealer_cidx_arr : [], // 플레이어 족보에 사용된 커뮤니티카드 출력 위한 배열 
      dealer_kiker : null, // 딜러 키커

      game_result : "" // 게임 결과 (승패)
    },
    methods : {
      shuffleCard : function() {
        var copyarr = Array.from(this.cards);
        while (copyarr.length > 0) {
          shuffle(copyarr);
          this.deck.unshift(copyarr.pop());          
        }
      },
      reset : function() {
        this.dealer_deck = [];
        this.communiti_deck = [];
        this.player_deck = [];
        this.game_status = "ready";
        this.player_hand = "";
        this.player_cidx = "";
        this.player_kiker = null;
        this.player_cidx_arr = [];

        this.dealer_hand = "";
        this.dealer_cidx = "";
        this.dealer_kiker = null;
        this.dealer_cidx_arr = [];

        this.game_result = "";
      },
      preflop : function() {        
        if (this.game_status != "ready") {
          return;
        }
        if (this.deck.length < 12) {
          this.deck = [];
          this.shuffleCard();
        }
        this.dealer_deck.push(this.deck.pop());
        this.dealer_deck.push(this.deck.pop());            

        this.player_deck.push(this.deck.pop());
        this.player_deck.push(this.deck.pop());
        this.game_status = "preflop";
        this.player_hand = "";
      },
      flop : function() {
        if (this.game_status != "preflop") {
          return;
        }
        this.communiti_deck.push(this.deck.pop());      
        this.communiti_deck.push(this.deck.pop());
        this.communiti_deck.push(this.deck.pop());
        this.checkPlayerHand();

        
        this.deck.pop();
        this.game_status = "flop";
        
      },
      turn : function() {
        if(this.game_status != "flop") {
          return;
        }
        this.communiti_deck.push(this.deck.pop());      
        this.deck.pop();
        this.game_status = "turn"
        this.checkPlayerHand();
      }, 
      river : function() {
        if(this.game_status != "turn") {
          return;
        }
        this.communiti_deck.push(this.deck.pop());      
        this.deck.pop();
        this.game_status = "river";
        this.checkPlayerHand();
        this.checkDelarHand();
        switch(this.compareHand()) {
          case 1:
            this.game_result = "WIN";
            break;
          case 0:
            this.game_result = "TIED";
            break;
          case -1:
            this.game_result = "LOSE";
            break
        }
      },
      compareHand : function() {
        const p = this.player_hand;
        const d = this.dealer_hand;
        if(p.rank > d.rank) {
          return 1;
        }
        if (p.rank < d.rank) {
          return -1;
        }

        if(p.rank == d.rank) {
          if (p.kiker.point > d.kiker.point) {
            return 1;
          }
          if (p.kiker.point < d.kiker.point) {
            return -1;
          }

          if (p.kiker.point == d.kiker.point) {
            if (p.kiker.typepoint > d.kiker.typepoint) {
              return 1;
            }
            if (p.kiker.typepoint < d.kiker.typepoint) {
              return -1;
            }
            if (p.kiker.typepoint == d.kiker.typepoint) {
              return 0;
            }
          }
        }        
        return -1;
      },
      getCCardForHandCheck : function() {
        var cd = this.communiti_deck;
        console.log("checkPlayerHand");
        var ccards = [[cd[0],cd[1],cd[2]]];

        var cidxs = ["012"];
        switch (cd.length) {
          case 4:
            cidxs = ["012","013","023","123"];
            break;
          case 5:
            cidxs = ["012","014","024","034","124","134","234","013","023","123"];
            break;
        }
        switch (cd.length) {
          case 5:
            ccards.push([cd[0],cd[1],cd[4]]);
            ccards.push([cd[0],cd[2],cd[4]]);
            ccards.push([cd[0],cd[3],cd[4]]);
            ccards.push([cd[1],cd[2],cd[4]]);
            ccards.push([cd[1],cd[3],cd[4]]);
            ccards.push([cd[2],cd[3],cd[4]]);
          case 4:
            ccards.push([cd[0],cd[1],cd[3]]);
            ccards.push([cd[0],cd[2],cd[3]]);
            ccards.push([cd[1],cd[2],cd[3]]);
        }
        console.log("커뮤니티드 "+cd.length+"개 : "+cidxs.length + " "+ccards.length);
        console.log(cidxs);
        console.log("_----------_")
        return {cards:ccards, idxs:cidxs};
      },
      
      checkPlayerHand: function() {
        if (this.communiti_deck.length < 3) {
          return 
        }
        var cc = this.getCCardForHandCheck();
        var handResuts = [];
        for(var i=0; i<cc.cards.length; i++) {
          var arr = [this.player_deck[0],this.player_deck[1]];
          for (var j=0; j<cc.cards[i].length; j++) {
            arr.push(cc.cards[i][j]);
          }
          console.log(arr);
          handResuts.push(this.evaluatePokerHand(arr,cc.idxs[i]));                    
        }
        this.player_hand = this.getHighHand(handResuts);
        console.log(handResuts)
        this.player_cidx = this.player_hand.cidx;
        this.player_cidx_arr = this.getCidsArr(this.player_cidx);
        this.player_kiker = this.player_hand.kiker;
      },

      checkDelarHand : function() {
        if (this.communiti_deck.length < 3) {
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
          handResuts.push(this.evaluatePokerHand(arr,cc.idxs[i]));                    
        }
        this.dealer_hand = this.getHighHand(handResuts);
        console.log(handResuts)
        this.dealer_cidx = this.dealer_hand.cidx;
        this.dealer_cidx_arr = this.getCidsArr(this.dealer_cidx);
        this.dealer_kiker = this.dealer_hand.kiker;
      },

      getCidsArr : function (idxs) {
        var result = []
        for (var i = 0; i < this.communiti_deck.length; i++) {
          var count = 0          
          for(var j = 0; j < idxs.length; j++) {
            if(i==idxs[j]) {
              count += 1;
            }
          }          
          result.push(count > 0);
        }
        console.log(result);
        return result;
      },

      getKikerCard : function(cards) {
        if (cards.length == 0) {
          return 
        }
        if (cards.length == 1) {
          return cards[0];
        }
        var card = cards[0];
        for (var i=0; i<cards.length; i++) {
          console.log("kiker check:"+cards[i].desc+" "+cards[i].point+":"+card.point);
          if(cards[i].point > card.point) {
            card = cards[i];            
          }
          if(cards[i].point == card.point && cards[i].typepoint > card.typepoint) {
              card = cards[i];
          }
        }
        console.log("kiker : "+card.desc);
        return card
      },
      evaluatePokerHand : function(cards,cidx) {
        const kiker = this.getKikerCard(cards);
        console.log("evaluatePokerHand kiker : "+kiker.desc);
        // 카드 무늬와 숫자를 분리해서 저장
        const suits = cards.map(card => card.type);
        const ranks = cards.map(card => card.point);
          
        ranks.sort();
        console.log("ranks ------");
        console.log(ranks);
        // 포커 판정
        if (ranks[0] === ranks[3] || ranks[1] === ranks[4]) {
          return {title : "Four of a Kind", rank:7, cidx: cidx, kiker:kiker};
        }
      
        // 풀하우스 판정
        if ((ranks[0] === ranks[1] && ranks[2] === ranks[4]) || (ranks[0] === ranks[2] && ranks[3] === ranks[4])) {
          return {title: "Full House", rank:6, cidx: cidx, kiker:kiker};
        }
      
        // 플러시 판정
        if (suits.every(suit => suit === suits[0])) {
          return {title: "Flush" , rank:5, cidx: cidx, kiker:kiker};
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
          return {title : "Straight", rank : 4, cidx: cidx, kiker:kiker};
        }
      
        // 스트레이트 플러시 판정
        if (straight && suits.every(suit => suit === suits[0])) {
          return {title : "Straight Flush", rank : 8, cidx: cidx, kiker:kiker};
        }
      
        // 쓰리카인드 판정
        if (ranks[0] === ranks[2] || ranks[1] === ranks[3] || ranks[2] === ranks[4]) {
          return {title : "Three of a Kind", rank : 3, cidx: cidx, kiker:kiker};
        }
      
        // 투페어 판정
        let pairs = 0;
        for (let i = 0; i < ranks.length - 1; i++) {
          if (ranks[i] === ranks[i + 1]) {
            pairs++;
          }
        }
        if (pairs === 2) {
          return {title : "Two Pair", rank : 2, cidx: cidx, kiker:kiker};
        }
      
        // 원 페어 판정
        if (pairs === 1) {
          return {title : "One Pair", rank : 1, cidx: cidx, kiker:kiker};
        }
      
        // 하이카드 판정
        return {title : "High Card", rank: 0, cidx: cidx, kiker:kiker};
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
          if (hands[i].rannk == hand.rank) {
            if (hands[i].kiker.point == hand.kiker.point && hands[i].kiker.typepoint > hand.kiker.typepoint) {
              hand = hands[i];
            }
            if (hands[i].kiker.point > hand.kiker.point) {
              hand = hands[i];
            }
          }
          console.log("getHighHand change to " + hand.kiker.desc);
        }
        console.log("best kiker : "+hand.kiker.desc + " hend : " + hand.title + " cidx : " + hand.cidx);        
        return hand
      }
    }
  })
