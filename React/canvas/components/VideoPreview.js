function VidoePreview(props) {
    const [idx, setIdx] = React.useState(0);
    React.useEffect(()=> {
        const interval = setInterval(()=> {
            let newIdx = idx + 1;
            if(newIdx >= props.data.length) {
                newIdx = 0;
            }
            setIdx(newIdx);

        }, 1000 / 60);
        return(()=> {
            clearInterval(interval)
        })
    })
    return (
        <img src={props.data[idx]} alt="preview" width={props.width} height={props.height}></img>
    )
}