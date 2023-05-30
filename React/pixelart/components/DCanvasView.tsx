interface Size {
    width:number;
    height:number;
}

interface CanvasViewProps {
    screenSize:Size;
    doteSize:Size;
}

function DCanvasView(props:CanvasViewProps) {
    return (
        <div className="DCanvas">
            <canvas width={props.screenSize.width} height={props.screenSize.height}/>
        </div>
    )
}