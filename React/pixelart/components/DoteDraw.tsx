interface DoteModel {
    x:number;
    y:number;
    color:string;
}

interface CanvasModel {
    width:number;
    height:number;
    layers: Array<Array<string>>
}

const DoteDraw = () => {
    const [canvasSize, setCanvasSize] = useState({width:32, height:32})
    const [layers, setLayers] = useState([]);
    const [forgroundColor, setForgroundColor] = useState("#000000");
    return (
        <article>
            <header>
            <h2>dote draw</h2>            
            </header>            
            {
                <DoteMainMenuView items={
                    [
                        {
                            isActive : layers.length > 0,
                            title:"delete",
                            callback:()=> {
                                setLayers([]);
                            }
                        },
                    ]

                }                
                />
            }    
            {layers.length > 0 ? 
            <ColorPicker title="forgroundColor" color={forgroundColor} callback={(color:string)=> {
                setForgroundColor(color);
            }}/> : <span></span>}
        
            {
                layers.length == 0 ? <MakeNewCanvasView callback={(size:CanvasSize)=> {
                    let layer = [];                    
                    for(let x=0; x<size.height; x++) {
                        let rows = [];
                        for(let y=0; y<size.width; y++) {
                            rows.push("#00000000");
                        }
                        layer.push(rows);                        
                    }
                    setLayers([layer]);                    
                }} /> : <DoteCanvasView layers={layers} width={400} forgroundColor={forgroundColor} selectLayer={0}/>
            }
        </article>
    )
}