function importCommons(useJquery) {
    const jss = [
        //bootStrap 
        {
            src:"https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js",
            integrity:"sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE",
            crossorigin:"anonymous",
        },
        {
            src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js",
            integrity:"sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ",
            crossorigin:"anonymous",
        },
    ];
    if(useJquery === true) {
        jss.push({src:"https://code.jquery.com/jquery-3.6.0.min.js"});
        jss.push({src:"/java.js"})                
    }
        
    const csss = [
        // Material Icon
        {
            href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        },
        // bootstrap
        {
            href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css",
            integrity:"sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ",
            crossorigin:"anonymous",
        },
        //custom css
        {
            href:"/style.css"
        },
    ];
    
    for (let i = 0; i < jss.length; i++) {
        let script = document.createElement('script');
        if(jss[i].integrity != null) {
            script.setAttribute('integrity',jss[i].integrity);
        }
        if(jss[i].crossorigin != null) {
            script.setAttribute('crossorigin',jss[i].crossorigin);
        }
        script.setAttribute('src', jss[i].src);
        document.head.appendChild(script);
    }
    
    for (let i=0; i<csss.length; i++) {
        let link = document.createElement("link");
        link.setAttribute('href',csss[i].href);
        link.setAttribute('rel','stylesheet');
        if(csss[i].crossorigin != null) {
            link.setAttribute('crossOrigin',csss[i].crossorigin);
        }
        if(csss[i].integrity != null) {
            link.setAttribute('integrity', csss[i].integrity);
        }
        document.head.appendChild(link);
    }
}