import React, {Component} from 'react';
import TopicThumbnail from "./Topic/TopicThumbnail";
import data from "../static/jsons/topic"
import Navbar from "../template_compnent/Navbar";
import TextArea from "../template_compnent/TextInput/TextArea";

class FirstPage extends Component {
    state = {}

    render() {
        return (

            <div>
                {/*<TextArea isVisible={"true"} isTopicVisible={"true"} isForChannel = {"true"}/>*/}
                <div>
                    {data.map((topic) => {
                        console.log(topic)
                        return (
                            <TopicThumbnail topicObject={topic} key={topic.id}/>

                        )

                    })}
                </div>
            </div>
        )
    }
}


export default FirstPage