function VidoePreview(props) {
    const [idx, setIdx] = React.useState(0);
    const [downloadUrl, setDownloadUrl] = React.useState(null);
    React.useEffect(()=> {
        const interval = setInterval(()=> {
            let newIdx = idx + 1;
            if(newIdx >= props.data.length) {
                newIdx = 0;
            }
            setIdx(newIdx);

        }, 1000 / props.fps);
        return(()=> {
            clearInterval(interval)
        })
    })

    const makeMp4 = () => {
        var encoder = new Whammy.Video(props.fps);
        for (let i=0; i< props.data.length; i++) {
            encoder.add(props.data[i]);
        } 

        encoder.compile(false,function(output){
            console.log(output);
            const url = (window.webkitURL || window.URL).createObjectURL(output);

            var downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'animation.webm';
            downloadLink.textContent = 'Download webm';  
            document.body.appendChild(downloadLink);
            downloadLink.click();
        });
    }
    return (
        <div>
            <img src={props.data[idx]} alt="preview" width={props.width} height={props.height}></img>
            <button onClick={makeMp4}>download mp4</button>
        </div>
    )
}