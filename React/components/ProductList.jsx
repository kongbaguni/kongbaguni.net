function ProductList() {
    const [products, setProducts] = React.useState([]);
    const [sortDesc, setSortDesc] = React.useState(true);
    const [loadFinish, setLoadFinish] = React.useState(false);

    React.useEffect(()=> {
        reload();
    });

    function reload(){
        if(loadFinish) {
            return;
        }
        console.log("react loaded!");
        const url = 'https://fakestoreapi.com/products'+ (sortDesc ? '?sort=desc' : '' );
        console.log("request : " + url);
        axios.get(url)
        .then((res)=>res.data)
        .then((json)=> {
            console.log(json);
            setProducts(json);
            setLoadFinish(true);
        });
    }

    function toggleSort() {
        setSortDesc(!sortDesc);
        setLoadFinish(false);
        reload();
    }

    return (
        <article>
            <header><h2>Product List</h2></header>
            <p>product length : {products.length}</p>
            <p>Sort : <button onClick={toggleSort}>{sortDesc ? 'DESC' : 'ASC'}</button></p>
            <ol>
                {products.map(product=> <li key={product.id}><Product data = {product} /></li>)}
            </ol>
        </article>
    )
}