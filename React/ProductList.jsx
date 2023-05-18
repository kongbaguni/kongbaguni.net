function ProductList() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(()=> {
        if(products.length > 0) {
            return;
        }
        console.log("react loaded!")
        axios.get('https://fakestoreapi.com/products')
        .then((res)=>res.data)
        .then((json)=> {
            console.log(json);
            setProducts(json);
        })
    });

    return (
        <div>
            <h3>Product List</h3>
            <p>product length : {products.length}</p>
            <ol>
                {products.map(product=> <li key={product.id}><Product data = {product} /></li>)}
            </ol>
        </div>
    )
}