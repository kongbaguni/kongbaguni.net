function CategoryList() {
    const [categorys, setCategorys] = React.useState([]);    
    React.useEffect(()=> {
        axios.get('https://fakestoreapi.com/products/categories')
        .then((res)=>res.data)
        .then((json=> {
            console.log(json);
            console.log(json.length);
            setCategorys(json);
            console.log(categorys);
        }))
    },[])
    return (
        <div>
            categories
        <ul>
            <li key="all"><a href="/React/products/">all</a></li>
            {categorys.map(category => 
                <li key={category}><a href={"?category=" + category}>{category}</a></li>
            )}
        </ul>
        </div>
    )
}