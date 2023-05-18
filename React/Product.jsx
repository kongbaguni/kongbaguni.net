function Product(props) {
    return (
        <div>
            <h3>{props.data.title}</h3>
            <img src={props.data.image} alt={props.data.title} width = "100px" height = "100px" />
            <p>{props.data.descrIption}</p>
        </div>
    )
}