function People(props) {
    React.useEffect(()=> {
        console.log(props);
    })
    return (
        <ul>
            <li>이름 : {props.data.name}</li>
            <li>생년월일 : {props.data.birthday.year}년 {props.data.birthday.month}월 {props.data.birthday.day}일 </li>
        </ul>
    )
}