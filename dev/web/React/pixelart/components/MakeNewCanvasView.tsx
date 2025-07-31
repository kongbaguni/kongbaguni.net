interface CanvasSize {
    width:number,
    height:number
}
interface MakeNewCanvasViewProps {
    callback:(size:CanvasSize)=>void;
}

const MakeNewCanvasView = (props:MakeNewCanvasViewProps) => {
    const sizeTemplete = [16,32,64,128];
    const [width, setWidth] = useState(32);
    const [height, setHeight] = useState(32);

    const makeCanvas = () => {
        console.log("width : " + width + " height : " + height);
        props.callback({width:width,height:height});
    }

    return (<div>
        <TableViewLayout datas = {
            [
                {
                    title: "width",
                    component: <TextSelector currentIdx={sizeTemplete.indexOf(width)} texts={sizeTemplete.map((value)=>value.toString())} callback={(value)=> {
                        setWidth(Number(value));
                    }} />
                    
                },
                {
                    title:"height",
                    component: <TextSelector currentIdx={sizeTemplete.indexOf(height)} texts={sizeTemplete.map((value)=>value.toString())} callback={(value)=> {
                        setHeight(Number(value));
                    }} />
                },
                {
                    title:"",
                    component: <button className="btn btn-primary" onClick={makeCanvas}>만들기</button>
                }
            ]
        } />

    </div>)
}