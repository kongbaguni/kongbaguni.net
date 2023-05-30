interface TableViewLayoutRow {
    title:string; 
    component:JSX.Element;
}
interface TableViewLayoutProps {
    datas:Array<TableViewLayoutRow>;
}

const TableViewLayout = (props:TableViewLayoutProps) => {
    function makeRow(data:TableViewLayoutRow,id:number) {
        if(data.title==="") {
            return (
                <tr key={id}>
                    <td colSpan={2}>{data.component}</td>
                </tr>
            )
        } else {
            return (
                <tr key={id}>
                    <th>{data.title}</th>
                    <td>{data.component}</td>
                </tr>
            )
        }
    }
    return (
        <table className="table-primary table-striped-columns"> 
            <tbody>
            { 
                props.datas.map(data => {
                    const id = props.datas.indexOf(data);
                    return makeRow(data,id)
                })
            }
            </tbody>
        </table>
    )
} 