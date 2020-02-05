import React, {Component} from 'react';
import data from '../../static/jsons/topic'


class TopicPage extends Component {

    state = {
        whole_id: ""
        , topic: {}

    }


    componentDidMount() {

        const id = this.props.match.params.topic_id;
        const whole_id = id;
        const topic = data.find((element) => element.id == id)
        this.setState({
            whole_id: whole_id,
            topic: topic

        })
        console.log(this.state)
    }

    render() {
        let content = (this.state.topic != null && this.state.topic.content != undefined)
            ? this.state.topic.content : "nothing";
        let title = (this.state.topic != null && this.state.topic.title != undefined)
            ? this.state.topic.content : "nothing";


        return (
            <div>
                <div className="container py-3">
                    <div className="card" style={{width: "100%", maxHeight: "auto", height: "auto"}}>
                        <div className="row ">
                            <div className="col-md-1" style={{margin: "15px"}}>
                                <img src="https://via.placeholder.com/100x150"
                                     className="w-100"/>
                            </div>

                            <div className="col-md-8 px-3">
                                <div className="card-block px-3">
                                    <h4 className="card-title">{title}</h4>
                                    <p className="card-text" dangerouslySetInnerHTML={{__html: content}}/>

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


            </div>
        )
    }
}

export default TopicPage;