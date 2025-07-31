interface RangePickerProps {
    title:string;
    min:number;
    max:number;
    default:number;
    unit:string;
    callback:(value:number)=>void;
}

const RangePicker = (props:RangePickerProps) => {

    const [value, setValue] = useState(props.default);

    const onChangeValue = (event)=> {
        setValue(event.target.value);
        props.callback(event.target.value);
    }
    return (
        <div className="input-group mb-1" title={props.title}>
            <span className="form-control">
            <input  type="range" value={value} min={props.min} max={props.max} onChange={onChangeValue}/>
            </span>
            <div className="input-group-text">
                <span> { value } {props.unit} </span>
            </div>
        </div>        
    )
}