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



  var poker = new Vue ({
    el:'#poker',
    data:{
      cards:[
        {type:"S", value:"A", image:"./images/poker/SA.svg", desc:"SA"},
        {type:"S", value:"2", image:"./images/poker/S2.svg", desc:"S2"},
        {type:"S", value:"3", image:"./images/poker/S3.svg", desc:"S3"},
        {type:"S", value:"4", image:"./images/poker/S4.svg", desc:"S4"},
        {type:"S", value:"5", image:"./images/poker/S5.svg", desc:"S5"},
        {type:"S", value:"6", image:"./images/poker/S6.svg", desc:"S6"},
        {type:"S", value:"7", image:"./images/poker/S7.svg", desc:"S7"},
        {type:"S", value:"8", image:"./images/poker/S8.svg", desc:"S8"},
        {type:"S", value:"9", image:"./images/poker/S9.svg", desc:"S9"},
        {type:"S", value:"10", image:"./images/poker/S10.svg", desc:"S10"},
        {type:"S", value:"J", image:"./images/poker/SJ.svg", desc:"SJ"},
        {type:"S", value:"Q", image:"./images/poker/SQ.svg", desc:"SQ"},
        {type:"S", value:"K", image:"./images/poker/SK.svg", desc:"SK"},

        {type:"D", value:"A", image:"./images/poker/DA.svg", desc:"DA"},
        {type:"D", value:"2", image:"./images/poker/D2.svg", desc:"D2"},
        {type:"D", value:"3", image:"./images/poker/D3.svg", desc:"D3"},
        {type:"D", value:"4", image:"./images/poker/D4.svg", desc:"D4"},
        {type:"D", value:"5", image:"./images/poker/D5.svg", desc:"D5"},
        {type:"D", value:"6", image:"./images/poker/D6.svg", desc:"D6"},
        {type:"D", value:"7", image:"./images/poker/D7.svg", desc:"D7"},
        {type:"D", value:"8", image:"./images/poker/D8.svg", desc:"D8"},
        {type:"D", value:"9", image:"./images/poker/D9.svg", desc:"D9"},
        {type:"D", value:"10", image:"./images/poker/D10.svg", desc:"D10"},
        {type:"D", value:"J", image:"./images/poker/DJ.svg", desc:"DJ"},
        {type:"D", value:"Q", image:"./images/poker/DQ.svg", desc:"DQ"},
        {type:"D", value:"K", image:"./images/poker/DK.svg", desc:"DK"},

        {type:"H", value:"A", image:"./images/poker/HA.svg", desc:"HA"},
        {type:"H", value:"2", image:"./images/poker/H2.svg", desc:"H2"},
        {type:"H", value:"3", image:"./images/poker/H3.svg", desc:"H3"},
        {type:"H", value:"4", image:"./images/poker/H4.svg", desc:"H4"},
        {type:"H", value:"5", image:"./images/poker/H5.svg", desc:"H5"},
        {type:"H", value:"6", image:"./images/poker/H6.svg", desc:"H6"},
        {type:"H", value:"7", image:"./images/poker/H7.svg", desc:"H7"},
        {type:"H", value:"8", image:"./images/poker/H8.svg", desc:"H8"},
        {type:"H", value:"9", image:"./images/poker/H9.svg", desc:"H9"},
        {type:"H", value:"10", image:"./images/poker/H10.svg", desc:"H10"},
        {type:"H", value:"J", image:"./images/poker/HJ.svg", desc:"HJ"},
        {type:"H", value:"Q", image:"./images/poker/HQ.svg", desc:"HQ"},
        {type:"H", value:"K", image:"./images/poker/HK.svg", desc:"HK"},

        {type:"C", value:"A", image:"./images/poker/CA.svg", desc:"CA"},
        {type:"C", value:"2", image:"./images/poker/C2.svg", desc:"C2"},
        {type:"C", value:"3", image:"./images/poker/C3.svg", desc:"C3"},
        {type:"C", value:"4", image:"./images/poker/C4.svg", desc:"C4"},
        {type:"C", value:"5", image:"./images/poker/C5.svg", desc:"C5"},
        {type:"C", value:"6", image:"./images/poker/C6.svg", desc:"C6"},
        {type:"C", value:"7", image:"./images/poker/C7.svg", desc:"C7"},
        {type:"C", value:"8", image:"./images/poker/C8.svg", desc:"C8"},
        {type:"C", value:"9", image:"./images/poker/C9.svg", desc:"C9"},
        {type:"C", value:"10", image:"./images/poker/C10.svg", desc:"C10"},
        {type:"C", value:"J", image:"./images/poker/CJ.svg", desc:"CJ"},
        {type:"C", value:"Q", image:"./images/poker/CQ.svg", desc:"CQ"},
        {type:"C", value:"K", image:"./images/poker/CK.svg", desc:"CK"},
      ],
      deck : [], 
      player_deck : [],
      communiti_deck : [],
      dealer_deck : [],   
      game_status : "ready"   
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
        this.dealer_deck = []
        this.communiti_deck = []
        this.player_deck = []
        this.game_status = "ready"
      },
      preflop : function() {        
        if (this.game_status != "ready") {
          return;
        }
        if (this.deck.length < 12) {
          this.shuffleCard();
        }
        setTimeout(function () {
          poker.dealer_deck.push(poker.deck.pop());
          poker.dealer_deck.push(poker.deck.pop());            
        }, 1000);

        setTimeout(function () {
          poker.player_deck.push(poker.deck.pop());
          poker.player_deck.push(poker.deck.pop());
        }, 2000);
        this.game_status = "preflop";
      },
      flop : function() {
        if (this.game_status != "preflop") {
          return;
        }
        this.communiti_deck.push(this.deck.pop());      
        setTimeout(function () {
          poker.communiti_deck.push(poker.deck.pop());
        }, 1000);
        setTimeout(function () {
          poker.communiti_deck.push(poker.deck.pop());
        }, 2000);
        
        this.deck.pop();
        this.game_status = "flop"
      },
      turn : function() {
        if(this.game_status != "flop") {
          return;
        }
        this.communiti_deck.push(this.deck.pop());      
        this.deck.pop();
        this.game_status = "turn"
      }, 
      river : function() {
        if(this.game_status != "turn") {
          return;
        }
        this.communiti_deck.push(this.deck.pop());      
        this.deck.pop();
        setTimeout(function () {
          poker.game_status = "river"
        }, 1000)
        
      }

    }
  }

  )