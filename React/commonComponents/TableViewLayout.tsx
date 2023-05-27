interface TableViewLayoutRow {
    title:string; 
    component:JSX.Element;
}
interface TableViewLayoutProps {
    datas:Array<TableViewLayoutRow>;
}

const TableViewLayout = (props:TableViewLayoutProps) => {
    return (
        <table className="table-primary table-striped-columns"> 
            <tbody>
            { 
                props.datas.map(data => (
                    <tr key={data.title}>
                        <th>{data.title}</th>
                        <td>{data.component}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
} 