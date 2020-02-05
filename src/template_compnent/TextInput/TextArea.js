import React, {Component} from 'react'
import './style.css'
import data from "../../static/jsons/topic.json"
class TextArea extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }

    state = {
        isVisible: true,
        isTopicNameVisible: true,
        isForChannel: true,
        content: "",
        title: "",
    };

    componentDidMount() {
        const {isVisible, isTopicNameVisible, isForChannel} = this.props;
        if (isVisible == "true") {
            this.setState({
                isVisible: true
            })
        } else {
            this.setState({
                isVisible: false
            })
        }
        if (isTopicNameVisible == "true") {
            this.setState({
                isTopicNameVisible: true
            })
        } else {
            this.setState({
                isTopicNameVisible: false
            })
        }
        if (isForChannel == "true") {
            this.setState({
                isForChannel: true
            })
        } else {
            this.setState({
                isForChannel: false
            })
        }

    }

    render() {
        //console.log("ENTER")
        let whole_display = "block";
        if (!this.state.isVisible) {
            whole_display = "none";
        }
        let topic_display = "block";
        if (!this.state.isTopicNameVisible) {
            topic_display = "none";
        }
        let MakeNew = "Make New Comment";
        if (this.state.isForChannel) {
            MakeNew = "Make New Channel"
        }
        return (
            <div className={"container"}>
                <button className="btn btn-primary" type="button" data-toggle="collapse"
                        data-target="#collapseInputForm"
                        aria-expanded="false" aria-controls="collapseExample">
                    {MakeNew}
                </button>
                <div className={"collapse"} id={"collapseInputForm"}>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{display: {topic_display}}}>
                            <div className="md-form">
                                <label htmlFor="form1">Title</label>
                                <input type="text" id="form1" className="form-control" value={this.state.title}
                                       onChange={this.handleChangeTitle}/>

                            </div>
                        </div>
                        <div style={{display: {whole_display}}}>
                            <div className="form-group shadow-textarea">
                                <label htmlFor="exampleFormControlTextarea6">Content</label>
                                <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3"
                                          placeholder="Write something here to make a new channel"
                                          value={this.state.content}
                                          onChange={this.handleChangeContent}></textarea>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-labeled btn-success">
                            <span className="btn-label"><span className="glyphicon glyphicon-ok"></span></span>Post
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log(this.state.title);
        //console.log(this.state.content);
        const uuidv4 = require('uuid/v4');
        let id = uuidv4();
        let date = new Date();
        //console.log(date.toDateString())
        let obje = {
            id: id,
            title: this.state.title,
            content: this.state.content,
            Date: date,
            author: "Ali",
            CommentId: []
        };

        const newData = [obje , ...data];
       // console.log(newData);
        const jsoner = JSON.stringify( newData);
        //console.log(jsoner)
        //TODO SAVE IN FILE



    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }
}

export default TextArea