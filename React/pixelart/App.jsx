function App() {
    const [canvasData, setCanvasData] = React.useState(null);


    return <div>
        {canvasData == null ? <NewCanvasForm callback = {(value)=> {
            setCanvasData(value)
        }} /> : <span></span>}    
    </div>
};