interface DoteMainMenuItem {
    isActive:boolean;
    title:string;
    callback:()=>void;
}
interface DoteMainMenuViewProps {
    items:Array<DoteMainMenuItem>;    
}


const DoteMainMenuView = (props:DoteMainMenuViewProps) => {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Menu</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {props.items.map((item)=> {
                   return (
                    <li className={"nav-item"}>
                        <a 
                        id={props.items.indexOf(item).toString()} 
                        className={"nav-link" + (item.isActive ? " active" : "")}
                        href="#" onClick={item.callback}>{item.title}</a>
                    </li>                        
                   ) 
                })}
            </ul>
          </div>
        </div>
      </nav>
    )
}