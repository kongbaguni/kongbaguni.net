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


var app = new Vue({
  el: '#app',
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
      app.me = "가위";
      app.com = getGaweBaweBoh();
      gaweBaweBohCheck();
    },
    bawe: function() {
      app.me = "바위";
      app.com = getGaweBaweBoh();
      gaweBaweBohCheck();
    },
    boh: function() {
      app.me = "보";
      app.com = getGaweBaweBoh();
      gaweBaweBohCheck();
    }
  }
})

function gaweBaweBohCheck() {
  app.result = checkGaweBaweBoh(app.me, app.com);
  switch (app.result) {
    case "이겼다":
      app.win++;
      break;
    case "비겼다":
      app.tied++;
      break;
    case "졌다":
      app.lose ++;
      break;
  }
  app.gaweBaweBohResults.push(
    {number:app.gaweBaweBohResults.length+1,me:app.me,com:app.com,result:app.result}
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
  