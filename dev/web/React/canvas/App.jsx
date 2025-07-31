const { useState , useEffect } = React
const App = ()=>{
    return <div>
        <article>
        <header><h2>Canvas Test</h2></header>
        <KCanvasView width={300} height={300} canvasid = "canvas1" recordlimit = {200}/>
        </article>
    </div>
};