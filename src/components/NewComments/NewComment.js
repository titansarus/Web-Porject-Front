import React, {Component} from 'react';
import './NewComments.css'

class NewComment extends Component {
    render() {
        return (
            <div className="container " style={{marginTop : "10px"}}>
                <div className="card newCommentsContainer" style={{padding : "10px"}}>
                    <div ><span style={{color : "red"}}><b>{this.props.comment.user}</b> Added New Comment To Your Post</span></div>
                    <a className="btn btn-primary button1" style={{color : "white"}} href={this.props.comment.url}>See Post</a>
                </div>
            </div>
        )
    }
}

export default NewComment