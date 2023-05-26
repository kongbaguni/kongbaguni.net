function RangePicker(props) {

    const [value, setValue] = React.useState(props.default);

    const onChangeValue = (event)=> {
        setValue(event.target.value);
        props.callback(event.target.value);
    }
    return (
        <span><input type="range" value={value} min={props.min} max={props.max} onChange={onChangeValue}/> { value } {props.unit} </span>
    )
}