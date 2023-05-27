function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHexColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function KCanvasView(props) {
    const [isRecording, setIsRecording] = React.useState(false);
    const [units, setUnits] = React.useState([]);
    const [unitCount, setUnitCount] = React.useState(0); 
    const [speed, setSpeed] = React.useState(1.0);
    const [blendMode, setBlendMode] = React.useState('lighter');
    const [backgroundColor, setBackgroundColor] = React.useState('#336699');
    const [isPause, setIsPause] = React.useState(false);
    const [isControllerOpen, setIsControllerOpen] = React.useState(false);

    const [dropshadowOffsetX, setDropShadowOffsetX] = React.useState(0);
    const [dropShadowOffsetY, setDropShadowOffsetY] = React.useState(0);
    const [dropShadowColor, setDropShadowColor] = React.useState('#000000');
    const [dropShadowBlurRadius, setDropShadowBlurRadios] = React.useState(10);
    const [isApplyDropShadow, setIsApplyDropShadow] = React.useState(false);
    const [isChangeColorWhenBound, setIsChangeColorWhenBound] = React.useState(false);

    const [frameRate,setFrameRate] = React.useState(60);
    const [filterValues, setFilterValues] = React.useState({
        blur        : 'blur(0px)', 
        contrast    : 'contrast(100%)', 
        invert      : 'invert(0%)', 
        saturate    : 'saturate(100%)',
        sepia       : 'sepia(0%)',
        opacity     : 'opacity(100%)',
        huerotate   : 'hue-rotate(0deg)',
        brightness  : 'brightness(100%)',
        grayscale   : 'grayscale(0%)', 
    })

    const [captureData, setCaptureData] = React.useState([]);
    const [captureCount, setCaptureCount] = React.useState(0);

    const getFilterTxt = () => {
        return filterValues.blur + ' ' 
        + filterValues.contrast + ' ' 
        + filterValues.invert + ' ' 
        + filterValues.saturate + ' ' 
        + filterValues.sepia + ' '
        + filterValues.opacity + ' '
        + filterValues.huerotate + ' '
        + filterValues.brightness + ' '
        + filterValues.grayscale + ' '
        ;
    }

    let drawCount = 0;
    React.useEffect(()=> {
       draw();
        const int = setInterval(()=> {
            draw();
            record();
        },1000 / frameRate);  
        return () => {
            clearInterval(int);
       }
    })

    const record = ()=> {
        if(isRecording == false) {
            return;
        }
        if(captureCount >= props.recordlimit) {
            setIsRecording(false);
            return;
        }
        const canvas = document.getElementById(props.canvasid);
        const data = canvas.toDataURL('image/webp');        
        captureData.push(data);
        setCaptureCount(captureCount + 1);
        setCaptureData(captureData);
    } 

    const clearRecord = () => {
        setCaptureData([]);
        setCaptureCount(0);
        setIsRecording(false);
    }

    const addUnits = () => {
        const arr = units;
    
        const unitTempletes = [
            {
                center: {x:getRandomInt(150,200),y:getRandomInt(150,200)},
                range : getRandomInt(10,20),
                color: getRandomHexColor(),
                movement : {x:getRandomInt(-10,10)/10, y : getRandomInt(-10,10)/10}
            },
            {
                center: {x:getRandomInt(150,200),y:getRandomInt(150,200)},
                range : getRandomInt(20,30),
                color: getRandomHexColor(),
                movement : {x:getRandomInt(-10,10)/10, y : getRandomInt(-10,10)/10}
            },
            {
                center: {x:getRandomInt(150,200),y:getRandomInt(150,200)},
                range : getRandomInt(5,15),
                color: getRandomHexColor(),
                movement : {x:getRandomInt(-10,10)/10, y : getRandomInt(-10,10)/10}
            },
            {
                center: {x:getRandomInt(150,200),y:getRandomInt(150,200)},
                range : getRandomInt(30,40),
                color: getRandomHexColor(),
                movement : {x:getRandomInt(-10,10)/10, y : getRandomInt(-10,10)/10}
            },
        ]
        arr.push(unitTempletes[units.length%unitTempletes.length]);
        setUnits(arr);
        setUnitCount(units.length);
    }

    const clearUnits = () => {
        while (units.length > 0) {
            units.pop();
        }
        setUnitCount(units.length);
    }

    const toggleIsRecording = (event)=> {
        setIsRecording(!isRecording);
    }

    const draw = () => {
        drawCount ++;
        const canvas = document.getElementById(props.canvasid);        
        if(canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,props.width,props.height);
            ctx.globalCompositeOperation = blendMode;
            ctx.filter = getFilterTxt() + (isApplyDropShadow ? 'drop-Shadow('+dropshadowOffsetX+'px '+dropShadowOffsetY+'px '+ dropShadowBlurRadius+'px '+dropShadowColor+' )' : '');
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(-200,-200,props.width+400,props.height+400);
            for(var i = 0; i < units.length; i++) {
                const u = units[i];
                ctx.fillStyle = u.color;
                ctx.beginPath();
                ctx.arc(u.center.x, u.center.y, u.range, 0, 2 * Math.PI)
                ctx.fill();
                u.center.x += u.movement.x * speed * (isPause ? 0 : 1);
                u.center.y += u.movement.y * speed * (isPause ? 0 : 1);

                if(u.center.y + u.range + u.movement.y >= props.height || u.center.y < u.range - u.movement.y) {
                    u.movement.y *= -1;
                    if(isChangeColorWhenBound) {
                        u.color = getRandomHexColor();
                    }
                }
                if(u.center.x + u.range + u.movement.x >= props.width || u.center.x < u.range - u.movement.x) {
                    u.movement.x *= -1;
                    if(isChangeColorWhenBound) {
                        u.color = getRandomHexColor();
                    }
                }           
            }
        }
    }    


    const dropSadowPanner = (
            <TableViewLayout className="dropShadowController" datas = {[
                {
                    title : "Shadow Color",
                    component : <ColorPicker title = "Drop Shadow" color = {dropShadowColor} callback = {(color) => {
                        setDropShadowColor(color);
                    }} />
                },
                {
                    title : "Offset X",
                    component : <RangePicker title = "Drop Shadow offset x" min={-30} max={30} unit="px" default={dropshadowOffsetX} callback = {(value) => {
                        setDropShadowOffsetX(value);
                    }} />
                },
                {
                    title : "Offset Y",
                    component : <RangePicker title = "Drop Shadow offset y" min={-30} max={30} unit="px" default={dropShadowOffsetY} callback = {(value) => {
                        setDropShadowOffsetY(value);
                    }} />
                },
                {
                    title : "blur range",
                    component : <RangePicker title = "Drop Shadow blur range " min={0} max={30} unit="px" default={dropShadowBlurRadius}  callback = {(value) => {
                        setDropShadowBlurRadios(value);
                    }} />
                }
            ]} />        
    )    

    const dropShadow = (
    <div>
        <Checkbox title = "use drop shadow" callback = {(value)=> {
            setIsApplyDropShadow(value);
        }}/>
        {isApplyDropShadow ? dropSadowPanner : <span></span>}
    </div>
    )


    const recording = (
        <div className="recording">
            <VidoePreview fps = {frameRate} data = {captureData} width={props.width} height={props.height} /> 
            <TableViewLayout className = "recordController" 
            datas = {[
                {
                    title:"record",
                    component : <span>
                        <button onClick={toggleIsRecording}>{isRecording ? materialSymbol_pause_circle : materialSymbol_fiber_manual_record}</button>
                        {captureData.length > 0 ? <button onClick={clearRecord}>{materialSymbol_delete}</button> : <span></span>}
                        </span>
                },
                { 
                    title:"record progress",
                    component : <span><progress value={captureCount} max={props.recordlimit} /> {captureCount} / {props.recordlimit} </span>
                },
            ]} />            
        </div>
    )

    const controller = (<div className="controller">        
        <TableViewLayout className = "filtterController" datas = {[
            {
                title:"blend Mode",
                component:<BlendModeSelector default={blendMode} callback = {(value)=> {
                    setBlendMode(value);
                }} />
            },
            {
                title : "Speed",
                component:<RangePicker min={1} max={20} default={1} unit = "배속" callback = {(value)=> {
                    setSpeed(value);
                    }} />
            },
            {
                title : "Frame Rate",
                component : <RangePicker min={10} max = {60} default={60} unit = "fps" callback = {(value)=> {
                    setFrameRate(value);
                }} />
            },
            {
                title : "blur",
                component : <RangePicker min={0} max={20} default={0} unit = "px" callback = {(value)=> {
                    const blurtxt = 'blur('+value+'px)';
                    filterValues.blur =  blurtxt;
                }} />  
            },
            {
                title : "contrast",
                component : <RangePicker min={0} max={100} default={100} unit = "%" callback = {(value)=> {
                    const txt = 'contrast('+value+'%)';
                    filterValues.contrast = txt;
                }} />                
            },
            {
                title : "invert",
                component : <RangePicker min={0} max={100} default={0} unit = "%" callback = {(value)=> {
                    const txt = 'invert('+value+'%)';
                    filterValues.invert = txt;
                 }} />
            },
            {
                title : "saturate",
                component : <RangePicker min={0} max={100} default={100} unit = "%" callback = {(value)=> {
                    const txt = 'saturate('+value+'%)';
                    filterValues.saturate = txt;
                }} />
            },
            {
                title : "sepia",
                component : <RangePicker  min={0} max={100} default={0} unit = "%" callback = {(value)=> {
                    const txt = 'sepia('+value+'%)';
                    filterValues.sepia = txt;
                }} /> 
            }, 
            {
                title : "opacity",
                component : <RangePicker  min={0} max={100} default={100} unit="%" callback = {(value)=> {
                    const txt = 'opacity('+value+'%)';
                    filterValues.opacity = txt;
    
                }} />
            }, 
            {
                title : "hue-rotate",
                component : <RangePicker min={0} max={360} default={0} unit="deg" callback = {(value)=> {
                    const txt = 'hue-rotate('+value+'deg)';
                    filterValues.huerotate = txt;
                }} />
            },
            {
                title : "brightness",
                component :  <RangePicker min={0} max={100} default={100} unit="%" callback = {(value)=> {
                    const txt = 'brightness('+value+'%)';
                    filterValues.brightness = txt;
                }} />
            }, 
            {
                title : "grayscale",
                component : <RangePicker min={0} max={100} unit = "%" default={0} callback = {(value)=> {
                    const txt = 'grayscale('+value+'%)';
                    filterValues.grayscale =  txt;
                }} />
            },
            {
                title : "backgroundColor",
                component : <ColorPicker title = "background" color = {backgroundColor} callback = {(color) => {                
                    setBackgroundColor(color)
                }} />
            }
        ]}/>

        <Checkbox title="change color when bound" callback = {(value)=> {
            setIsChangeColorWhenBound(value);
        }} />     
        {dropShadow}       
        <p>
        <ToggleButton on={materialSymbol_pause} off={materialSymbol_resume} default = "true" callback = {(isOn) => {
            setIsPause(isOn);
        }} /> <button onClick={addUnits}>{materialSymbol_add}</button> <button onClick={clearUnits}>{materialSymbol_delete}</button>
        </p>
    </div>
    );

    return (
        <div className="canvas">
            {controller}
            
            <canvas width={props.width} height={props.height} id={props.canvasid}></canvas>
            {unitCount > 0 ? recording : <span></span>}
            <p>Unit Count : {[unitCount]}</p>
                        
        </div>
    )
}