interface TextSelectorProps {
    currentIdx:number;
    texts:Array<string>,
    callback:(value:string)=>void,
}

const TextSelector = (props:TextSelectorProps) => {

    const [currentText, setCurrentText] = useState(props.texts[props.currentIdx]);

    const onChangeValue = (mode:string) => {
        setCurrentText(mode);
        props.callback(mode);
    }
    
    return (
        <div className="blend">
            {
                props.texts.map((text)=>
                <button key={props.texts.indexOf(text)} className = {'btn btn-primary' + (text == currentText ? ' disabled' : ' ')} onClick={(e) => onChangeValue(text)}>{text}</button>                    
                )
            }
        </div>
    )
}

