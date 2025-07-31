interface DoteCanvasViewProps {
    width:number,
    layers:Array<Array<Array<string>>>,
    forgroundColor:string,
    selectLayer:number,
}

let isMouseDown = false ;
let forgroundColor = "#000000";

const DoteCanvasView = (props:DoteCanvasViewProps) => {
    let canvas: HTMLCanvasElement | null = null
    let rect: DOMRect | null = null

    const [canvasSize,setCanvasSize] = useState({width:300,height:300});
    const [pointer, setPointer] = useState({x:0,y:0});
    const [zoom, setZoom] = useState(1.0);
    const [offset, setOffset] = useState({x:0, y:0});
    const [layerData, setLayerData] = useState(props.layers);        

    useEffect(()=> {
        forgroundColor = props.forgroundColor;
        canvas = document.getElementById("drawCanvas");
        rect = canvas.getBoundingClientRect();
        draw();
        initCanvas();
        return (()=> {

        })
    })

    const getPoint = (event:MouseEvent)=> {
        if(rect == null) { return {x:0, y:0}; }
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const cols = props.layers[0][0].length;
        const is = props.width / cols;
        const xx = Math.floor(x / is);
        const yy = Math.floor(y / is);
        return {x:xx, y:yy};
    }
    
    const doteDraw = (point:{x:number, y:number}) => {
        const data = layerData;
        data[props.selectLayer][point.y][point.x] = forgroundColor;
        console.log(forgroundColor);
        setLayerData(data);
    }

    const handleMouseDown = (event:MouseEvent) => {
        const point = getPoint(event);
        doteDraw(point);
        isMouseDown = true;
        console.log("mousedown x:" + point.x + " y:" + point.y  + ' mouse down:'+ isMouseDown);        
    }

    const handleMouseOver = (event:MouseEvent) => {
        const point = getPoint(event);
        setPointer(point)
        if(isMouseDown) {
            doteDraw(point);
        }
        console.log("mouse over xx:" + point.x + " yy:" + point.y + ' mouse down:'+ isMouseDown);
    }

    const handleMouseMove = (event:MouseEvent) => {
        const point = getPoint(event);
        setPointer(point)
        if(isMouseDown) {
            doteDraw(point);
        }
        console.log("mouseMove");
    }

    const handleMouseUp = (event:MouseEvent) => {        
        console.log("mouseUp");
        isMouseDown = false;
    }
    
    const [initCanvasOnce,setInitCanvasOnce] = useState(false) ;
    const initCanvas = () => {
        if(initCanvasOnce) {
            return;
        }
        const canvas: HTMLCanvasElement | null = document.getElementById("drawCanvas");
        canvas.onmouseup = handleMouseUp;
        canvas.onmousedown = handleMouseDown;
        canvas.onmouseover = handleMouseOver;
        canvas.onmousemove = handleMouseMove;

        const ctx = canvas.getContext('2d')        
        const rows = props.layers[0].length;
        const cols = props.layers[0][0].length;
        const is = props.width / cols;
        const height = rows * is;
        setCanvasSize({width: props.width, height: height})
        setInitCanvasOnce(true) 
    }

    const draw = () => {
        const canvas: HTMLCanvasElement | null = document.getElementById("drawCanvas");
        canvas.addEventListener('mousedown', handleMouseDown);

        const ctx = canvas.getContext('2d')
        
        const rows = props.layers[0].length;
        const cols = props.layers[0][0].length;
        const is = props.width / cols;
        const height = rows * is;
        if(ctx != null) {
            ctx.clearRect(0,0,props.width,height)

            for(let l = 0; l < layerData.length; l ++) {
                for(let y =0; y<rows; y++) {
                    for(let x=0; x<cols; x++) {
                        fillDoteRect(x,y,l);
                    }
                }
            }
    
            for(let y =0; y<rows; y++) {
                for(let x=0; x<cols; x++) {
                    drawLine(x,y)
                }
            }
            drawLine(pointer.x, pointer.y);
        }

        function drawLine(x:number,y:number) {
            if(ctx == null) return;
            ctx.strokeStyle = "#eeeeee";
            if(pointer.x == x && pointer.y == y) {
                ctx.strokeStyle = "#ff0000";
            }            
            const xx = x * is 
            const yy = y * is 
            ctx.beginPath();
            ctx.moveTo(xx,yy);
            ctx.lineTo(xx + is, yy);
            ctx.lineTo(xx + is, yy + is);
            ctx.lineTo(xx, yy + is );
            ctx.lineTo(xx,yy);
            ctx.stroke();
        }

        function fillDoteRect(x:number,y:number, layer:number) {            
            if(ctx == null) return;
            ctx.fillStyle = layerData[layer][y][x];
            const xx = x * is * zoom + offset.x;
            const yy = y * is * zoom + offset.y;
            ctx.fillRect(xx,yy,is,is);
        }
    }

    return (<div>
        <canvas width ={canvasSize.width} height={canvasSize.height} id="drawCanvas"/>
    </div>
    )
}