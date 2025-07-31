// 사이트를 배포할 때는 "development.js"를 "production.min.js"로 대체하세요. -->   
const regReacts = () => {
    const reactJss = [
        {
            src:"https://unpkg.com/react@18/umd/react.production.min.js",
            crossorigin:true
        },
        {
            src:"https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
            crossorigin:true
        },
        {src:"https://unpkg.com/babel-standalone@6/babel.min.js"},
        {src:"https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.1/axios.min.js"},
        {src:"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.2.2/jszip.min.js"},
        {src:"https://cdnjs.cloudflare.com/ajax/libs/amcharts/3.21.15/plugins/export/libs/FileSaver.js/FileSaver.min.js"}
    ]
    for (let i = 0; i < reactJss.length; i++) {
        let script = document.createElement('script');
        script.setAttribute('src',reactJss[i].src);
        if(reactJss[i].crossorigin == true) {
            script.setAttribute('crossorigin',"");
        }
        document.head.appendChild(script);
    }
}
regReacts();
