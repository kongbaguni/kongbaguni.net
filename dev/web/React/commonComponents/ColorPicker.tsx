interface ColorPickerProps {
    title:string;
    color:string;
    callback:(value:string)=>void;
}
const ColorPicker = (props:ColorPickerProps) => {
    const [color, setColor] = useState(props.color);

    const handleChange = (e) => {
        setColor(e.target.value);
        props.callback(e.target.value);
    }

    return (
    <div className="input-group mb-1" title={props.title}>
        <div className="input-group-text">
            <input type="color" value={color} onChange={handleChange} />
        </div>
        <input className="form-control" type="text" value={color} onChange={handleChange}></input>
    </div>
    )
}