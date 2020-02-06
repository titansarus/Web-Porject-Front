import React, {Component} from 'react'
import "./style.css"
import Follow from "./follow";
import Edit from "./edit";

class Post extends Component {
    render() {
        let temp
        if ((this.props.flag))
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            {temp}
                        </nav>
                        <h3 className="card-title"></h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Title"
                                           required/>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="textarea">Content</label>
                                    <textarea className="form-control" id="textarea" placeholder="write"
                                              required></textarea>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="file">Attach File</label>
                                    <input type="file" className="form-control" id="file"/>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post