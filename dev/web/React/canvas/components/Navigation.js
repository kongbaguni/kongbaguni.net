function Navigation(props) {
    const [url,setUrl] = React.useState(null);

    React.useEffect(()=> {
        setUrl(window.location.pathname);
        console.log(url);
        return (()=> {
            console.log(url);  
        })
    })
    return (
        <nav>
            <ul>
                {props.datas.map((data) => 
                <li key={data.id}><NavLink to={data.url}>{data.title}</NavLink></li>
                )}
                
            </ul>
        </nav>
    )
}