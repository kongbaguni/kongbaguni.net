function BlendModeSelector(props) {
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

    const [currentmode, setCurrentMode] = React.useState(props.default);

    const onChangeValue = (mode) => {
        setCurrentMode(mode);
        console.log(props.default);
        props.callback(mode);
    }
    
    return (
        <div className="blend">
            {
                modes.map((mode)=>
                    <button key={mode} className = {mode == currentmode ? 'on' : 'off'} onClick={(e) => onChangeValue(mode)}>{mode}</button>
                )
            }
        </div>
    )
}