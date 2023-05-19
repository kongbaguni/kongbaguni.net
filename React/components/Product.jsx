function Product(props) {
    return (
        <div>
            <h3><a href={"/React/ProductPage.html?id="+props.data.id}>{props.data.title}</a></h3>
            <img src={props.data.image} alt={props.data.title} width = "100px" height = "100px" />
            <ul>
                <li>${props.data.price}</li>
                <li>rating : {props.data.rating.rate} count : {props.data.rating.count}</li>
            </ul>
            <p>{props.data.description}</p>
        </div>
    )
}