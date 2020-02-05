import React, {Component} from 'react';
import "./post.css";
import data from "../../static/jsons/posts"
import Post from "./Post";

class PostMaker extends Component {
    render() {
        return (
            <ul className={"simple_nested"}>
                {
                    data.map(
                        (post) => {
                            return (
                                <li>
                                    <Post post={post}/>
                                </li>
                            )
                        }
                    )
                }

            </ul>

        )
    }
}


export default PostMaker