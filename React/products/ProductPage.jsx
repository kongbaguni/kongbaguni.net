function ProductPage() {
    const [data,setData] = React.useState({rating:{rate:0,count:0}, price:0, title: ''});
    const params = new URLSearchParams(location.search);

    React.useEffect(()=> {
        reload();
    },[]);

    function reload() {
        const id = params.get('id');
        const url = 'https://fakestoreapi.com/products/' + id
        axios.get(url).then((res)=>res.data).then((json)=> {
            setData(json);   
            console.log(json);         
        })
    }

    return (
        <article>
            <header><h2>{data.title}</h2></header>
            <p>
            <img src={data.image} height={300} alt={data.title}/>
            </p>
            <ul>
                <li>price : ${data.price}</li>
                <li>rating : {data.rating.rate} </li>
                <li>count : {data.rating.count} </li>
                <li>category : {data.category}</li>
            </ul>
            <p>
                {data.description}
            </p>
        </article>
    )
}