
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
    const $images = $("ol.imageSlide img");
    let currentIndex = 0;
    
    $("ol.imageSlide img").click(function () {
        showPreview($(this));
        return false;
    });

    function showPreview($imgEl) {
        currentIndex = $images.index($imgEl);
        $("#preview").remove();

        
        const fullsize = $imgEl.data("fullsize");
        if (fullsize == undefined) {
            fullsize = this.src;
        }
        let $preview = $(`
            <div id="preview" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:#000c; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:9999; color:white;">
                <div style="flex-grow:1; display:flex; align-items:center; justify-content:center;">
                    <img id="previewImage" src="${fullsize}" alt="preview" style="max-width:90vw; max-height:80vh;">
                </div>
                <h1>${currentIndex + 1}</h1>
                <div id="exifInfo" style="padding:10px; background:rgba(0,0,0,0.7); font-size:14px; white-space:pre-line;"></div>
                <a href="#" id="prevImage" style="position:absolute; left:20px; color:white; font-size:3em;">&#8592;</a>
                <a href="#" id="nextImage" style="position:absolute; right:20px; color:white; font-size:3em;">&#8594;</a>
            </div>
        `);

        $("body").append($preview);

        $preview.click(function (e) {
            if (e.target.id === "preview") {
                $preview.remove();
            }
        });

        $("#preview img").click(function (e) {
            $preview.remove();
        })

        function navigateToLeft() {
            currentIndex -= 1;
            if (currentIndex < 0) {
                currentIndex = $images.length - 1 
            }
            $images.eq(currentIndex).click();
        }

        $("#prevImage").click(function (e) {
            e.preventDefault();
            navigateToLeft(e);
        });

        function navigateToRight() {
            currentIndex += 1;
            if (currentIndex > $images.length - 1) {
                currentIndex = 0;
            }
            $images.eq(currentIndex).click();
        }

        $("#nextImage").click(function (e) {
            e.preventDefault();
            navigateToRight(e);
        });


        // ⌨️ 키보드 왼쪽/오른쪽 입력 이벤트 처리
        function keyHandler(e) {
            e.preventDefault();
            if (e.key === "ArrowLeft") {
                navigateToLeft(e);
            } else if (e.key === "ArrowRight") {
                navigateToRight(e);
            } else if (e.key === "Escape") {
                $preview.remove();
            }
            $(document).off("keydown", keyHandler); // 이벤트 제거
        }

        $(document).on("keydown", keyHandler);


        const $previewImg = $("#previewImage");
        $previewImg.onload = null;
        
        // EXIF 추출
        const imageEl = document.getElementById("previewImage");
        
        imageEl.onload = function () {
            EXIF.getData(imageEl, function () {
                const make = EXIF.getTag(this, "Make") || "Unknown Make";
                const model = EXIF.getTag(this, "Model") || "Unknown Model";
                const iso = EXIF.getTag(this, "ISOSpeedRatings") || "Unknown ISO";
                const exposureTime = EXIF.getTag(this, "ExposureTime") || "Unknown Exposure";
                if (make == "Unknown Make") {
                    return;
                }
                let exposureStr = exposureTime;
                if (typeof exposureTime === 'number') {
                exposureStr = `1/${Math.round(1 / exposureTime)}`;
                } else if (typeof exposureTime === 'object' && exposureTime.numerator && exposureTime.denominator) {
                exposureStr = `${exposureTime.numerator}/${exposureTime.denominator}`;
                }

                const fNumber = EXIF.getTag(this, "FNumber") || "Unknown Aperture";
                const focalLength = EXIF.getTag(this, "FocalLength") || "Unknown Focal Length";

                const exifText = 
`📷 ${make} ${model}
🌡 ISO: ${iso}
⏱ Exposure: ${exposureStr}
🔘 Aperture: f/${fNumber}
🔭 Focal Length: ${focalLength}mm`;

                $("#exifInfo").text(exifText);
            });
        };

        return false;
    };
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
  

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function addCommas(num) {
    // 입력받은 숫자를 문자열로 변환합니다.
    let str = num.toString();
    // 문자열의 길이가 3보다 작으면 그대로 반환합니다.
    if (str.length < 3) {
      return str;
    }
    // 문자열을 뒤에서부터 3자리씩 끊어서 배열에 저장합니다.
    let arr = [];
    for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
      if (j % 3 === 0 && j !== 0) {
        arr.push(',');
      }
      arr.push(str[i]);
    }
    // 배열을 뒤집어서 문자열로 합칩니다.
    return arr.reverse().join('');
}
  