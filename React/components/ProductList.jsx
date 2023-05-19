function ProductList() {
    const [products, setProducts] = React.useState([]);
    const [sortDesc, setSortDesc] = React.useState(true);

    const params = new URLSearchParams(location.search);
    React.useEffect(()=> {        
        reload(sortDesc);
    },[]);

    function reload(sortDesc){       
        const category = params.get('category')
        console.log("params : " + category);
        console.log("react loaded!");
        const sort = sortDesc ? '?sort=desc' : '?sort=asc'; 
        let url = 'https://fakestoreapi.com/products'+ sort;
        if(category!=null) {
            url = 'https://fakestoreapi.com/products/category/'+category+sort;
        }
        console.log("sort : " + sortDesc + " : " + sort);
        console.log("request : " + url);
        axios.get(url)
        .then((res)=>res.data)
        .then((json)=> {
            console.log(json);
            setProducts(json);
        });
    }

    function toggleSort() {
        const newDesc = !sortDesc;
        setSortDesc(newDesc);
        reload(newDesc);            
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