declare const JSZip: any;
declare const saveAs: any;

function dataURItoBlob(dataURI) {
    if(typeof dataURI !== 'string'){
        throw new Error('Invalid argument: dataURI must be a string');
    }
    dataURI = dataURI.split(',');
    var type = dataURI[0].split(':')[1].split(';')[0],
        byteString = atob(dataURI[1]),
        byteStringLength = byteString.length,
        arrayBuffer = new ArrayBuffer(byteStringLength),
        intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteStringLength; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], {
        type: type
    });
}

interface VidoePreviewProps {
    data:Array<string>;
    fps:number;
    width:number;
    height:number;
}

const VidoePreview = (props:VidoePreviewProps) =>  {
    const [idx, setIdx] = React.useState(0);
    const [fileName, setFileName] = React.useState("capture.zip");

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

        const zip = new JSZip(); // JSZip 인스턴스 생성
        for (let i = 0; i < props.data.length; i++) {
            const fileName = "captureImage" + String(i).padStart(5, '0');;
            const dataURL = props.data[i]; // 이미지 얻기
            const blob = dataURItoBlob(dataURL); // blob 만들기
            zip.file(`${fileName}.png`, blob, { binary: true }); // zip 파일에 추가
        }
        
        // zip 파일을 Blob으로 만들기
        zip.generateAsync({ type: "blob" }).then(zipFile => {           
            saveAs(zipFile, fileName); // zip 파일 다운로드 실행
        });
    }

    const onChangeFileName = (event) => {
        setFileName(event.target.value);
    }

    return (
        <div className="videopreview">       
        <img src={props.data.length == 0 ? 'https://via.placeholder.com/'+props.width+'/FFFF00/000000' : props.data[idx]} alt="preview" width={props.width} height={props.height} />             
        <TableViewLayout datas = {
        [{
            title : "fileName",
            component : <span>
                <input type="text" value={fileName} name="fileName" onChange={onChangeFileName}/>
                <button onClick={makeMp4} hidden={props.data.length == 0}>{materialSymbol_download}</button>             
            </span>
        }]
        } />
        </div>
    )
}