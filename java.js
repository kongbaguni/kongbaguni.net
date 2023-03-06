
function makeIndex() {
    function makeLink(id,item,index) {
        var link = document.createElement("a");
        $(link).text(item);
        $(link).attr("href","#"+id+index)
        var li = document.createElement("li");
        $(li).append(link)
        return li
    }
    
    var count = 0
    var titles = new Array();
    var subtitles = new Array();
    $("article").each(function() {
        var subTitleArr = new Array();
        var scount = 0
        $(this).attr("id","article"+count);
        var h2 = $(this).find("h2")
        h2.attr("id","h2"+count);
        if ($(h2).text() != "") {
            titles.push($(h2).text());
        }
        $(this).find("h3").each(function() {
            $(this).attr("id","h3"+count+"_"+scount);
            scount += 1
            subTitleArr.push($(this).text());
        });
        subtitles.push(subTitleArr);
        count += 1;
    });
    
    if (titles.length > 0) {
        var aside = document.createElement("aside")
        aside.innerHTML = "<h2>index</h2>"        
        var nav = document.createElement("nav")
        aside.appendChild(nav)
        $(nav).attr("id","navi")
        $("article:first-of-type").before(aside);
        var ul = document.createElement("ol")
        $(nav).append(ul);
    }
    
    for (var i = 0 ; i < titles.length ; i ++) {
        var item = makeLink("h2",titles[i],i);
        var ulid = "ol_"+i
        $(item).attr("id",ulid)
        $("#navi > ol").append(item);
        
        if (subtitles[i].length > 0) {
            var ul = document.createElement("ol");
            
            for (var j = 0; j < subtitles[i].length; j ++) {
                var item = makeLink("h3",subtitles[i][j],i+"_"+j)
                $(ul).append(item);
            }
            $("#"+ulid).append(ul);
        }
    }
    
    if (titles.length > 0) {
        var naviLink = document.createElement("a");
        $(naviLink).attr("href","#navi");
        $(naviLink).text("#toTop");
        $(naviLink).attr("class","toTop");
        $("h2,h3").append(naviLink);
    }
}

$(document).ready(function(){
    makeIndex();
    makeImagePreview();
})

function changeMode(name) {
    $("body").attr("class",name)
}

function makeImagePreview() {
    $("img").click(function() {
        $("#preview").remove();        
        let img = $("<div id=\"preview\"><img src='"+ this.src + "' alt=\"preview\" /></div>");
        $("body").append(img);
        img.click(function() {
            this.remove();
        });
    })    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function getGaweBaweBoh() {
    const num = getRandomInt(0,2);
    switch(num) {
        case 0:
            return "가위";            
        case 1:
            return "바위";
        case 2:
            return "보";
    }
    return "??"
}

function checkGaweBaweBoh(me,com) {
    console.log(me +" "+com);
    switch(me) {
        case "가위":
            switch(com) {
                case "가위":
                    return "비겼다";
                case "바위":
                    return "졌다";
                case "보":
                    return "이겼다";
            }
        case "바위":
            switch(com) {
                case "가위":
                    return "이겼다";
                case "바위":
                    return "비겼다";
                case "보":
                    return "졌다";
            }
        case "보":
            switch(com) {
                case "가위":
                    return "졌다";
                case "바위":
                    return "이겼다";
                case "보":
                    return "비겼다";
            }            
    }
    return "이상한거 냈다. 나는 "+me+" 컴퓨터는 "+com;

}

function formatPhoneNumber(phoneNumberString) {
    // 문자열에서 숫자만 추출
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    console.log("clean : "+cleaned);    
  
    // 국가 코드를 추출
    
    const country = (cleaned[0] != "0" && cleaned.length > 10) ? '+' : '';
    
    // 국가 코드와 지역 코드, 전화번호를 구분
    const areaCode = cleaned.substring(0, Math.min(3, cleaned.length));
    const main = cleaned.substring(Math.min(3, cleaned.length), Math.min(7, cleaned.length));
    const remaining = cleaned.substring(Math.min(7, cleaned.length), Math.min(11, cleaned.length));
  
    console.log("contry:"+country+" areaCode:"+areaCode+" main:"+main+ " remaining:"+remaining);
    // 전화번호 형식에 맞게 조합
    let formattedNumber = `${country}${areaCode}-${main}`;
    if (remaining) {
        if (cleaned.length >= 9) {
            formattedNumber += `-${remaining}`;
        }  
        else {
            formattedNumber += `${remaining}`;
        }
      
    }
  
    return formattedNumber;
}
  