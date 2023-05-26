function CommentCreateForm(props) {
    const [id, setId] = React.useState(props.data.id);
    const [name,setName] = React.useState(props.data.name);
    const [comment, setComment] = React.useState(props.data.comment);

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeComment = (event) => {
        setComment(event.target.value);
    }

    return (
        <article>
        <header><h2>create comment</h2></header>
        <form method="post" onSubmit={event => {
            event.preventDefault();
            const name = event.target.name.value;
            const comment = event.target.comment.value;
            const id = Number(event.target.id.value);
            props.onSubmit({name : name, comment:comment, id:id});
        }
        } action="./"> 
        <p>name : <input type="text" value={name || ""} name="name" onChange={onChangeName}/></p>
        <p><textarea name="comment" value={comment || ""}  onChange={onChangeComment}/></p>
        <input type="hidden" value={id || 0} name="id" />
        <input type="submit" />
        </form>
        </article>
    )
}