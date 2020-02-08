import React, {Component} from 'react';
import "./post.css"
import 'uuid'

class Comment extends Component {
    constructor()
    {
        super()
        this.state ={
            contents: "",
            author_username: "",
            id: "",
            post_id: "0",
            likes: 0,
            dislikes: 0,

            children: []


        };
    }

    /*
    0:
value: comment
id: 1
contents: "good"
post_id: 6
Parent: ""
author_username: "namjoo"
likes: 0
dislikes: 0
children: []
__proto__: Object
children: [{…}]
     */

    componentDidMount() {

        console.log("ENTERED")
        let initer = this.props.comment;
        console.log(initer.value);
        let id = initer.value.id;
        let contents = initer.value.contents;
        let author_username = initer.value.author_username;
        let post_id = initer.value.post_id;
        let likes = initer.value.likes;
        let dislikes = initer.value.dislikes;
        let children = initer.children
        console.log("IDID")
        console.log(contents)
        this.setState({
                id: id,
                contents: contents,
                author_username: author_username,
                post_id: post_id,
                likes: likes,
                dislikes: dislikes,
                children: children,
            }
        );
        this.state={
            id: id,
            contents: contents,
            author_username: author_username,
            post_id: post_id,
            likes: likes,
            dislikes: dislikes,
            children: children,
        }
        console.log("COMMENT_STATE")
        console.log(this.state)
    }

    render() {
        if (this.state.children == undefined || this.state.children.length < 1) {
            return (
                <div className={"post_comment"}>
                    <p>{this.state.author_username}</p>

                    <p>{this.state.contents}</p>
                    <p>Likes: {this.state.likes}</p>
                    <p>DisLikes: {this.state.dislikes}</p>
                    <p><a href={"#"}>Reply</a></p>

                </div>
            );
        }
        return (
            <div className={"post_comment"}>
                <p>{this.state.author_username}</p>

                <p>{this.state.contents}</p>
                <p>Likes: {this.state.likes}</p>
                <p>DisLikes: {this.state.dislikes}</p>
                <p><a href={"#"}>Reply</a></p>
                <ul className={"simple_nested"}>
                    {this.state.children.map((post) => {
                        return (
                            <li>
                                <Comment comment={post}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}


export default Comment;
