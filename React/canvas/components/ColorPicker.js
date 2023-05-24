function ColorPicker(params) {
    const [color, setColor] = React.useState(params.color);

    const handleChange = (e) => {
        setColor(e.target.value);
        params.callback(e.target.value);
    }

    return (
        <p><input type="color" value={color} onChange={handleChange} />
        </p>
    )
}