function NewCanvasForm(props) {
    const [width, setWidth] = React.useState(25);
    const [height, setHeight] = React.useState(25);
    const [backgroundColor, setBackgroundColor] = React.useState("#ffffff");

    function limitTest(value) {
        if(value < 0) {
            return 0
        }
        if(value > 100) {
            return 100
        }
        return value
    }

    const onChangeWidth = (event) => {
        setWidth(limitTest(event.target.value));        
    }

    const onChangeHeight = (event) => {
        setHeight(limitTest(event.target.value));
    }

    return (<article>
        <header>
            <h2>Make New Canvas</h2>
        </header>
        <form action="./" type="post">
        <TableViewLayout className="newCanvas"  datas = {[
            {
                title : "width",
                component : <input type="number" value={width} onChange={onChangeWidth}></input>
            },
            {
                title : "height",
                component : <input type="number" value={height} onChange={onChangeHeight}></input>
            }
        ]}
        />
        <p><input type="submit" /></p>
        </form>
    </article>
    )
}