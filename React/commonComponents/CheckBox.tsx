interface CheckboxProps {
    title:string;
    callback:(value:boolean)=>void;
}

const Checkbox = (props:CheckboxProps) => {
    const onChangeValueHandler = (event) => {        
        console.log(event.target.checked);
        props.callback(event.target.checked);
    }

    return (
        <div className="input-group mb-1">
            <div className="input-group-text">
                <input className="form-check-input" type="checkbox" onChange={onChangeValueHandler} />
            </div>
            <label className="form-control">{props.title}</label>
        </div>        
    )
}