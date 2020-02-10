import React, {Component} from 'react';
import channels from '../../static/jsons/Channels'
import ChannelCard from "../profile/ChannelCard";
import {Redirect} from "react-router-dom";

class Search extends Component {
    constructor() {
        super();
        this.post = this.post.bind(this)
        this.user = this.user.bind(this)
        this.channel = this.channel.bind(this)
    }

    componentDidMount() {
        console.log("search")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        let a = window.location.href
        let re = /http:\/\/(localhost|127\.0\.0\.1):3000\/search\/\?search\=(\w+)/
        let body = a.match(re)[2];

        var raw = JSON.stringify({
            "body": body
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/search/", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                for (const channel of obj.data.chanel) {
                    document.getElementById("channels").innerHTML += '<a href="/channel/' + channel.identifier + '"><div class="card-body"> <h6 class="card-title">' + channel.identifier + '</h6></div></a>'
                }
                for (const user of obj.data.user) {

                    document.getElementById("users").innerHTML += '<div class="card"><a href="/profile/other/' + user.username + '"><h6 class="card-title">' + user.username + '</h6><p class="card-body">' + user.first_name + ' ' + user.last_name + '</p></a></div>'


                }
                for (const msg of obj.data.post) {
                    var myHeaders1 = new Headers();
                    myHeaders1.append("Content-Type", "application/json");
                    myHeaders1.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


                    var requestOptions1 = {
                        method: 'GET',
                        headers: myHeaders1,
                        redirect: 'follow',
                    };


                    document.getElementById("posts").innerHTML = ""
                    let url = "http://127.0.0.1:8000/api/chanel/get/" + msg.chanel
                    console.log(url)
                    fetch(url, requestOptions1)
                        .then(response => response.text())
                        .then(function (result) {

                            console.log(result)
                            let obj1 = JSON.parse(result);
                            if (!obj1.success) {
                                //todo
                            }
                            console.log("obj:" + obj1)
                            document.getElementById("posts").innerHTML += '<div class="row">\n' +
                                '    <div class="col">\n' +
                                '        <div class="card_new">\n' +
                                '            <div class="card-body">\n' +
                                '              <h4> <a class="card-title" href="http://localhost:3000/PostView/' + obj1.data.identifier + '/' + msg.id + '">' + msg.title + '</a> </h4>\n' +
                                '                <h6 class="text-muted card-subtitle mb-2">' + "author" + "::: " + msg.create_time + '</h6>\n' +
                                '                <p class="card-text">' + msg.body + '</p><a class="card-link" id =like_' + msg.id + ' href="' + window.location.href + '"><i class="fa fa-plus"></i><span>' + msg.like.liked + '</span></a>\n' +
                                '                <a\n' +
                                '                    class="card-link" href="' + window.location.href + '" id="dislike_' + msg.id + '"><i class="fa fa-minus"></i><span>' + msg.like.disLiked + '</span></a>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>'

                        })
                        .catch(error => {
                            alert('error1' + error)
                            return
                        });
                }

            })
            .catch(error => {
                alert('error' + error)
            });


    }

    user() {
        console.log(document.getElementById("user_show").style.display)
        console.log(document.getElementById("user_show").style.display == "none")
        if (document.getElementById("user_show").style.display == "none")
            document.getElementById("user_show").style.display = "inherit"
        else
            document.getElementById("user_show").style.display = "none"
    }

    channel() {
        if (document.getElementById("channel_show").style.display === "none")
            document.getElementById("channel_show").style.display = "inherit"
        else
            document.getElementById("channel_show").style.display = "none"
    }

    post() {
        if (document.getElementById("post_show").style.display === "none")
            document.getElementById("post_show").style.display = "inherit"
        else
            document.getElementById("post_show").style.display = "none"
    }

    render() {
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                        <button onClick={this.user} className="nav-item btn-primary btn-sm"
                                style={{margin: "5px", color: "white"}}>
                            user
                        </button>
                        <button onClick={this.channel} className="nav-item btn-primary btn-sm"
                                style={{color: "white", margin: "5px"}}>
                            channel
                        </button>
                        <button onClick={this.post} className="nav-item btn-primary btn-sm"
                                style={{color: "white", margin: "5px"}}>
                            post
                        </button>
                    </ul>

                </nav>
                <div className="row">
                    <div className="card col" style={{margin: "auto"}} id="channel_show">
                        <h3 className="card-header">channels</h3>
                        <div className="card-body">
                            <div className="row" id="channels"></div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col" style={{margin: "auto"}} id="user_show">
                        <h3 className="card-header">User</h3>
                        <div className="card-body">
                            <div className="row" id="users"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col" style={{margin: "auto"}} id="post_show">
                        <h3 className="card-header">Post</h3>
                        <div className="card-body">
                            <div className="row" id="posts"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Search