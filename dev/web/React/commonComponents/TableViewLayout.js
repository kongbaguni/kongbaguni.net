/**
 * 테이블 레이아웃 출력 
 * @param { className, datas } props 
 * className 
 * datas = {
 * title : "" // 타이틀 th 안에 들어감
 * component : "" // td 안에 들어갈 컴포넌트 
 * }
 * @returns 
 */
function TableViewLayout (props) {
    return (
        <table className={props.className}> 
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