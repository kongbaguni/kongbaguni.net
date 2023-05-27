interface BlendModeSelectorProps {
    default:string;
    callback:(mode:string)=>void;
}

const BlendModeSelector = (props:BlendModeSelectorProps) => {
    const modes = [
        "lighter", 
        "multiply",
        "source-over",
        "xor",
        // "source-atop",
        // "source-in",
        // "source-out",
        // "destination-over",
        // "destination-atop", 
        // "destination-in",
        // "destination-out", 
        // "copy", 
    ];
    
    const [currentmode, setCurrentMode] = useState(props.default);

    const onChangeValue = (mode) => {
        setCurrentMode(mode);
        console.log(props.default);
        props.callback(mode);
    }
    const btnClssName = 'btn btn-primary';
    return (
        <div className="blend">
            {
                modes.map((mode)=>(
                    <span className="p-1">
                        <button key={mode} className = {btnClssName + ( mode == currentmode ? ' disabled' : '')} onClick={(e) => onChangeValue(mode)}>{mode}</button>
                    </span>
                ))
            }
        </div>
    )
}