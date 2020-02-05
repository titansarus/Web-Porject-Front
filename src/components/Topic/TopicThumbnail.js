import React, {Component} from 'react';
import "./topic.css"
import Axios from "axios";
import {Link} from "react-router-dom";

class TopicThumbnail extends Component {

    state = {
        topic: {}
    };

    componentDidMount() {
        const topic = this.props.topicObject;
        console.log(topic)
        console.log("heloo")
        this.setState({
            topic: topic
        })

    }

    render() {
        let content = this.state.topic.content != undefined ? this.state.topic.content.substr(0, 47) + "..." : "nothing";
        let redirect = "/topic/"+this.state.topic.id;
        return (

            <div className="container py-3" >
                <div className="card" style={{width: "100%", maxHeight: "175px"}}>
                    <div className="row ">
                        <div className="col-md-1" style={{margin: "15px"}}>
                            <img src="https://via.placeholder.com/80x120"
                                 className="w-100"/>
                        </div>

                        <div className="col-md-8 px-3">
                            <div className="card-block px-3">
                                <h4 className="card-title">{this.state.topic.title}</h4>
                                <p className="card-text" dangerouslySetInnerHTML={{__html:content}}/>
                                {/*TODO PRIOR TO XSS ATTACK*/}

                                <Link to={redirect} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>


                    </div>
                    <div className={"row post_footer"}>
                        <div className={"post_footer_element"}>author: {this.state.topic.author}</div>
                        <div className={"post_footer_element"}>Date: {this.state.topic.Date}</div>
                        <div className={"post_footer_element"}></div>
                    </div>

                </div>
            </div>


        );
    }
}


export default TopicThumbnail;
