interface ToggleButtonProps {
    on:string;
    off:string;
    default:boolean;
    callback:(value:boolean)=>void;
}

const ToggleButton = (props:ToggleButtonProps) => {
    const [isOn,setIsOn] = useState(props.default);

    const btnHandler = (event) => {
        setIsOn(!isOn);
        props.callback(isOn);
    }

    return (
        <button className="btn btn-primary" onClick={btnHandler} > { isOn ? props.on : props.off} </button>
    )
}