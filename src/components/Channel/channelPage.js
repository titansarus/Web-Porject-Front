import React, {Component} from 'react';
import channels from '../../static/jsons/Channels'
import ChannelCard from "../profile/ChannelCard";

class ChannelPage extends Component {
    constructor() {
        super();
        this.insideSubmit = this.insideSubmit.bind(this)
    }
    async insideSubmit() {

        let username = document.getElementById("name").value;
        let title = document.getElementById("title").value;
        let rules = document.getElementById("rules").value;
        let desc = document.getElementById("description").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization","Bearer "+localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("title").validity.valid && document.getElementById("name").validity.valid && document.getElementById("description").validity.valid && document.getElementById("rules").validity.valid)) {
            alert("something in input is wrong")
            return
        }

        var raw = JSON.stringify({
            "law": rules,
            "identifier": username,
            "description": desc,
            "title": title,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/chanel/", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                alert(msg)

            })
            .catch(error => {
                alert('error' + error)
            });


    }

    state = {
        channels: []
    }

    componentDidMount() {
        this.setState({
            channels: channels,
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Channels</h2>
                <hr/>
                <h3>my Channels</h3>
                <hr/>
                <div className="row">
                    {this.state.channels.map((channel) => {
                        if (this.props.user.channels.includes(channel.id))
                            return (
                                <ChannelCard channel={channel}/>
                            )
                    })}
                </div>
                <h3>Author in Channels</h3>
                <hr/>
                <div className="row">
                    {this.state.channels.map((channel) => {
                        if (this.props.user.authoredChannels.includes(channel.id))
                            return (
                                <ChannelCard channel={channel}/>
                            )
                    })}
                </div>
                <button className="btn btn-primary " style={{marginBottom: "10px"}} type="button" data-toggle="collapse"
                        data-target="#collapseInputForm"
                        aria-expanded="false" aria-controls="collapseExample">
                    Make New Channel
                </button>
                <div className="collapse" id="collapseInputForm">
                    <div>
                        <div className="md-form">
                            <label htmlFor="form1">Name</label>
                            <input type="text" id="name" className="form-control" placeholder="name"
                            />
                        </div>
                        <div className="md-form">
                            <label htmlFor="form1">Title</label>
                            <input type="text" id="title" className="form-control" placeholder="title"
                            />
                        </div>
                        <div className="md-form">
                            <label htmlFor="form1">Rules</label>
                            <input type="text" id="rules" className="form-control" placeholder="rules"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="form-group shadow-textarea">
                            <label htmlFor="description">description</label>
                            <textarea className="form-control z-depth-1" id="description" rows="3"
                                      placeholder="Describe your channel" maxLength="200"
                            ></textarea>
                        </div>

                    </div>
                    <button onClick={this.insideSubmit} type="submit" className="btn btn-primary">
                        Make
                    </button>
                </div>

            </div>
        )
    }

}

export default ChannelPage