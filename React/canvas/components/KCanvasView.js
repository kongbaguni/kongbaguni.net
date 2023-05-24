function KCanvasView(props) {
    const [isRecording, setIsRecording] = React.useState(false);
    const [units, setUnits] = React.useState([]);
    const [unitCount, setUnitCount] = React.useState(0); 
    const [speed, setSpeed] = React.useState(1.0);
    const [blendMode, setBlendMode] = React.useState('sorce-over');
    const [backgroundColor, setBackgroundColor] = React.useState('#ffffff');
    const [isPause, setIsPause] = React.useState(false);
    const [isControllerOpen, setIsControllerOpen] = React.useState(false);

    const [dropshadowOffsetX, setDropShadowOffsetX] = React.useState(0);
    const [dropShadowOffsetY, setDropShadowOffsetY] = React.useState(0);
    const [dropShadowColor, setDropShadowColor] = React.useState('#000000');
    const [dropShadowBlurRadius, setDropShadowBlurRadios] = React.useState(10);
    const [isApplyDropShadow, setIsApplyDropShadow] = React.useState(false);
    const [isChangeColorWhenBound, setIsChangeColorWhenBound] = React.useState(false);
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
        },1000 / 60);  
        return () => {
            clearInterval(int);
       }
    })

    const record = ()=> {
        if(isRecording == false) {
            if(captureData.length > 0) {        
                captureData.map(data=> {
                    console.log(data);
                });
            }
            return;
        }
        const canvas = document.getElementById(props.canvasid);
        const data = canvas.toDataURL('image/webp');
        captureData.push(data);
        setCaptureData(captureData);
    } 

    const clearRecord = () => {
        setCaptureData([]);
        setIsRecording(false);
    }

    const addUnits = () => {
        const arr = units;
    
        const unitTempletes = [
            {
                center: {x:40,y:40},
                range : 20,
                color:"#ff00ff",
                movement : {x:0.5, y : 0.1}
            },
            {
                center: {x:50,y:50},
                range : 30,
                color:"#369",
                movement : {x:0.5, y : -0.4}
            },
            {
                center: {x:30,y:20},
                range : 10,
                color:"#ffa",
                movement : {x:0.1, y : 0.3}
            },
            {
                center: {x:30,y:30},
                range : 15,
                color:"#98f",
                movement : {x:0.4, y : -0.3}
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
        const colors = [
            "#369", "#693", "#936", "#963", "#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"
        ]
        const canvas = document.getElementById(props.canvasid);
        
        function getNextColor(now) {
            const nextColor = colors[drawCount % colors.length];
            if(nextColor == now) {
                drawCount ++;
                return getNextColor(now)
            }
            return nextColor
        }

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
                        u.color = getNextColor(u.color);
                    }
                }
                if(u.center.x + u.range + u.movement.x >= props.width || u.center.x < u.range - u.movement.x) {
                    u.movement.x *= -1;
                    if(isChangeColorWhenBound) {
                        u.color = getNextColor(u.color);
                    }
                }           
            }
        }
    }


    const dropSadowPanner = (
        <div>
        <table>
            <tbody>
                <tr>
                    <th>Drop Shadow</th>
                    <td><ColorPicker title = "Drop Shadow" color = {dropShadowColor} callback = {(color) => {
                        setDropShadowColor(color);
                    }} />   
                    </td>
                </tr>
                <tr>
                    <th>offset x</th>
                    <td>
                        <RangePicker title = "Drop Shadow offset x" min={-30} max={30} unit="px" default={dropshadowOffsetX} callback = {(value) => {
                            setDropShadowOffsetX(value);
                        }} />
                    </td>
                </tr>
                <tr>
                    <th>offset y</th>
                    <td>
                    <RangePicker title = "Drop Shadow offset y" min={-30} max={30} unit="px" default={dropShadowOffsetY} callback = {(value) => {
                        setDropShadowOffsetY(value);
                    }} />
                    </td>
                </tr>
                <tr>
                    <th>blur range</th>
                    <td>
                    <RangePicker title = "Drop Shadow blur range " min={0} max={30} unit="px" default={dropShadowBlurRadius}  callback = {(value) => {
                        setDropShadowBlurRadios(value);
                    }} />
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    )    
    const dropShadow = (<div>
        <Checkbox title = "use drop shadow" callback = {(value)=> {
            setIsApplyDropShadow(value);
        }}/>

        {isApplyDropShadow ? dropSadowPanner : <span></span>}
    </div>

    )

    const recording = (
        <div>
        <button onClick={toggleIsRecording}>{isRecording ? "recording stop" : "recording start"}</button>
        {captureData.length > 0 ? <button onClick={clearRecord}>clear Record</button> : <span></span>}
        </div>
    )

    const controller = (<div>
    <table>
        <tbody>
            <tr>
                <th>blend mode</th>
                <td><BlendModeSelector callback = {(value)=> {
                    console.log("new blend : " + value);
                    setBlendMode(value);
                }} />
                </td>
            </tr>
            <tr>
                <th>Speed</th>
                <td>
                <RangePicker min={1} max={20} default={1} unit = "배속" callback = {(value)=> {
                setSpeed(value);
                }} />
                </td>
            </tr>
            <tr>
                <th>blur</th>                
                <td>
                <RangePicker min={0} max={20} default={0} unit = "px" callback = {(value)=> {
                const blurtxt = 'blur('+value+'px)';
                filterValues.blur =  blurtxt;
            }} />  
                </td>
            </tr>
            <tr>
                <th>contrast</th>
                <td> <RangePicker min={0} max={100} default={100} unit = "%" callback = {(value)=> {
                const txt = 'contrast('+value+'%)';
                filterValues.contrast = txt;
            }} /></td>
            </tr>
            <tr>
                <th>invert</th>
                <td>  <RangePicker min={0} max={100} default={0} unit = "%" callback = {(value)=> {
               const txt = 'invert('+value+'%)';
               filterValues.invert = txt;
            }} /></td>
            </tr>
            <tr>
                <th>saturate</th>
                <td>
                    <RangePicker min={0} max={100} default={100} unit = "%" callback = {(value)=> {
                        const txt = 'saturate('+value+'%)';
                        filterValues.saturate = txt;
                    }} />
                </td>
            </tr>
            <tr>
                <th>sepia</th>
                <td>  
                    <RangePicker  min={0} max={100} default={0} unit = "%" callback = {(value)=> {
                const txt = 'sepia('+value+'%)';
                filterValues.sepia = txt;
            }} />  </td>
            </tr>
            <tr>
                <th>opacity</th>
                <td>   <RangePicker  min={0} max={100} default={100} unit="%" callback = {(value)=> {
                const txt = 'opacity('+value+'%)';
                filterValues.opacity = txt;

            }} /></td>
            </tr>
            <tr>
                <th>hue-rotate</th>
                <td> <RangePicker min={0} max={360} default={0} unit="deg" callback = {(value)=> {
                const txt = 'hue-rotate('+value+'deg)';
                filterValues.huerotate = txt;
            }} /></td>
            </tr>
            <tr>
                <th>brightness</th>
                <td>      <RangePicker min={0} max={100} default={100} unit="%" callback = {(value)=> {
                const txt = 'brightness('+value+'%)';
                filterValues.brightness = txt;
            }} />
            </td>
            </tr>
            <tr>
                <th>grayscale</th>
                <td>
                    <RangePicker min={0} max={100} unit = "%" default={0} callback = {(value)=> {
                        const txt = 'grayscale('+value+'%)';
                        filterValues.grayscale =  txt;
                    }} />
                </td>
            </tr>

            <tr>
                <th>backgroundColor</th>
                <td>
                <ColorPicker title = "background" color = {backgroundColor} callback = {(color) => {                
                    console.log(color);
                    setBackgroundColor(color)
                }} />
                </td>
            </tr>
         </tbody>
    </table>
            <Checkbox title="change color when bound" callback = {(value)=> {
                setIsChangeColorWhenBound(value);
            }} />     
            {dropShadow}       
            <p>
            <ToggleButton on="pause" off="resume" default = "true" callback = {(isOn) => {
                console.log(isOn);
                setIsPause(isOn);
            }} /> <button onClick={addUnits}>addUnit</button> <button onClick={clearUnits}>clearUnits</button>
            </p>
    </div>
    );
    return (
        <div className="canvas">
            {controller}
            
            <canvas width={props.width} height={props.height} id={props.canvasid}></canvas>
            <p>아이템 개수 : {[unitCount]}개</p>

            {(captureData.length > 0 && isRecording == false) ? <VidoePreview data = {captureData} width={300} height={300} /> : <span></span>} 
            <p>{recording}</p>
        </div>
    )
}