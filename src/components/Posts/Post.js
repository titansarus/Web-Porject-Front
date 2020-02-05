import React, {Component} from 'react';
import "./post.css"
import 'uuid'

class Post extends Component {
    state = {
        content: "",
        author: "",
        date: "",
        order: "0",
        id: "",
        comments: []


    };

    componentDidMount() {
        const uuidv4 = require('uuid/v4');
        console.log(uuidv4());

        console.log(this.props.post);
        this.setState(
            this.props.post
        )
    }

    render() {
        if (this.state.comments == undefined || this.state.comments.length < 1) {
            return (
                <div className={"post_comment"}>
                    <p>{this.state.author}</p>
                    <em>{this.state.date}</em>
                    <p>{this.state.content}</p>
                    <p><a href={"#"}>Reply</a></p>

                </div>
            );
        }
        return (
            <div className={"post_comment"}>
                <p>{this.state.author}</p>
                <em>{this.state.date}</em>
                <p>{this.state.content}</p>
                <p><a href={"#"}>Reply</a></p>
                <ul className={"simple_nested"}>
                    {this.state.comments.map((post) => {
                        return (
                            <li>
                                <Post post={post}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}


export default Post;
