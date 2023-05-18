const rootElement = document.getElementById("react1");
function SiteHeader(props) {      
    return (
        <header>
        <h2>
            { props.title }
        </h2>
        </header>
    );
};

function Product(props) {
    return (
        <div>
            <h3>{props.data.title}</h3>
            <img src={props.data.image} alt={props.data.title} width = "100px" height = "100px" />
            <p>{props.data.descrIption}</p>
        </div>
    )
}

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

function App() {
    return (
        <div>
        <SiteHeader title="react1" />
        <ProductList />
        </div>
    );
};

ReactDOM.createRoot(rootElement).render(
    <App />
);