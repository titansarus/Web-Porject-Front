import React, {Component} from 'react';
import "./post.css"
import 'uuid'

class Comment extends Component {
    constructor() {
        super()
        this.state = {
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
        if (!initer) {
            return
        }
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
        this.state = {
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

    replySetter() {
        document.getElementById("reply_to_comment_id").innerText = this.state.id;
    }

    render() {
        if (this.state.children == undefined || this.state.children.length < 1) {
            return (
                <div className={"post_comment"}>
                    <p>{this.state.author_username}</p>

                    <p dangerouslySetInnerHTML={{__html:this.state.contents}}></p>
                    <a className="card-link" id={"like_comment_" + this.state.id}><i
                        className="fa fa-plus" href={window.location.href}></i><span></span>{this.state.likes}</a>

                    <a className="card-link" id={"dislike_comment_" + this.state.id}><i
                        className="fa fa-minus" href={window.location.href}></i><span></span>{this.state.dislikes}</a>
                    <p><button className="btn btn-primary" onClick={this.replySetter.bind(this)}>Set Reply To</button></p>

                </div>
            );
        }
        return (
            <div className={"post_comment"}>
                <p>{this.state.author_username}</p>

                <p dangerouslySetInnerHTML={{__html:this.state.contents}}></p>
                <a className="card-link" id={"like_comment_" + this.state.id}><i
                    className="fa fa-plus" href={window.location.href}></i><span></span>{this.state.likes}</a>

                <a class="card-link" id={"dislike_comment_" + this.state.id}><i
                    className="fa fa-minus" href={window.location.href}></i><span></span>{this.state.dislikes}</a>

                <p><button className="btn btn-primary" onClick={this.replySetter.bind(this)}>Set Reply To</button></p>
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
