interface RangePickerProps {
    min:number;
    max:number;
    default:string;
    unit:string;
    callback:(value:string)=>void;
}

const RangePicker = (props:RangePickerProps) => {

    const [value, setValue] = React.useState(props.default);

    const onChangeValue = (event)=> {
        setValue(event.target.value);
        props.callback(event.target.value);
    }
    return (
        <div className="input-group mb-1">
            <span className="form-control">
            <input  type="range" value={value} min={props.min} max={props.max} onChange={onChangeValue}/>
            </span>
            <div className="input-group-text">
                <span> { value } {props.unit} </span>
            </div>
        </div>        
    )
}