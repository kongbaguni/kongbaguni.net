function CommentList() {
    const [mode, setMode] = React.useState('none');
    const [comments, setComments] = React.useState([{name:"123",comment:"kkk",id:0}])
    const [count, setCount] = React.useState(0);
    const [id, setId] = React.useState(null);
    let content = null;

    React.useEffect(()=> {
        console.log(comments.length);
    })

    const onclckComment = (event) => {
        setMode('none');
        setTimeout(()=> {
            console.log(event.target.id);
            setId(event.target.id);
            setMode('update');    
        },10)
    }

    const setModeCreate = () => {
        setMode('create');
        setId(null);
    }

    const deleteComment = () => {
        if(id == null) {
            console.log("id is null");
            return ;
        }
        const c = window.confirm('다음 댓글을 삭제합니다.\n'+comments[id].name + ' : ' +comments[id].comment)
        if(c==false) {
            return;
        }

        const list = comments;
        list.splice(id,1);
        for(let i = 0; i<list.length; i ++) {
            list[i].id = i;
        }
        setComments(list);
        console.log("comment delete sucess");
        setMode('none');
        setId(null);
    }

    if(mode == 'create') { 
        content = <CommentCreateForm data={{
            name : "test",
            comment : ""
        }} onSubmit = {(data)=> {
            data.id = comments.length
            const arr = comments;
            arr.push(data);
            setComments(arr);
            setCount(count + 1);
            setMode('none');
            return false;
        }}/>
    } 
    else if(mode == 'update') {
        content = <CommentUpdateForm data = {comments[id]} onSubmit = {(data)=> {
            console.log("update data recived")
            console.log(data)
            const list = comments;
            list[id].comment = data.comment;
            list[id].name = data.name;
            setComments(list);
            setMode('none');
        }} />
    }
    
    else {
        content = <div></div>
    }

    return (<div>
    <ul>
    {comments.map((comment)=> 
        <li key={comment.id} id={'comment'+comment.id} className={id == comment.id ? 'selected' : ''}>
        <a onClick={onclckComment} href={'#comment'+comment.id} id={comment.id}>{comment.name} : {comment.comment}  </a>
        </li>
    )}
    </ul>
    { mode != 'create' ? <button onClick={setModeCreate}>create</button> : <span></span> }
    { id != null ? <button onClick={deleteComment}>delete</button> : <span></span>}
    {content}
    </div>
    )
}