function ColorPicker(params) {
    const [color, setColor] = React.useState(params.color);

    const handleChange = (e) => {
        setColor(e.target.value);
        params.callback(e.target.value);
    }

    return (
        <input type="color" value={color} onChange={handleChange} />
    )
}