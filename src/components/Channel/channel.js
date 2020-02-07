import React, {Component} from 'react';
import UserCard from "../profile/UserCard";
import ChannelCard from "../profile/ChannelCard";
import Users from "./../../static/jsons/profiles"
import "./topic.css"
import {Redirect} from "react-router-dom";


class ChannelPage extends Component {
    state = {
        title: "",
        rule: "",
        description: "",
        identifier: "",
        owner: "",
        authors: "",

    };

    componentDidMount() {

        const that = this;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?$/
        let profile_name = a.match(re)[2];

        let url = "http://127.0.0.1:8000/api/chanel/get/";

        url = url + profile_name;


        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

                console.log(result)
                let obj = JSON.parse(result);
                let data = obj.data;
                let title = data.title;
                if (!title) {
                    title = "NO TITLE";
                }
                let rule = data.law;
                if (!rule) {
                    rule = "NO RULES"
                }
                let description = data.description;
                if (!description) {
                    description = "NO DESCRIPTION"
                }
                let identifier = data.identifier;
                let owners = data.owner;
                let authors = data.author;

                let owner_string = owners.username
                console.log(authors)

                let author_str = ""
                for (let author of authors) {
                    // console.log("AUTHORAR: "+author)
                    author_str = author_str + "<a href=\"http://localhost:3000/profile/other/ " + author.username + "\">" + author.username + "</a> <br/>"
                    console.log(author_str)
                }

                document.getElementById("Authors").innerHTML = author_str;

                that.setState({
                    title: title,
                    rule: rule,
                    description: description,
                    identifier: identifier,
                    owner: owner_string,
                    authors: author_str,
                })

                console.log(data.author)


            })
            .catch(error => {
                alert('error0 ' + error)
                return
            });
    }

    render() {
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }
        return (

            <div className="container">
                <div className="row text-center">
                    <div className="col channel-titr-container"
                         style={{backgroundColor: 'rgb(119,255,180)', minHeight: '400px'}}>
                        Title:
                        <br/>
                        <div className="row channel-titr" id="channel-Title"> {this.state.title}</div>

                        <hr/>
                        Identifier:
                        <br/>
                        <div className="row channel-titr"
                             id="channel-identifier">{this.state.identifier}</div>
                        <hr/>
                        Description:
                        <br/>
                        <div className="row channel-titr"
                             id="Channel-description">{this.state.description}</div>
                        <hr/>
                        Rules
                        <br/>
                        <div className="row channel-titr" id="Channel-Rules">{this.state.rule}</div>
                        <hr/>
                        Admin
                        <br/>
                        <div className="row channel-titr" id="Admins"> {<a
                            href={"http://localhost:3000/profile/other/" + this.state.owner}>  {"    " + this.state.owner}</a>}</div>
                        <hr/>
                        Authors<br/>
                        <div className="row channel-titr" id="Authors">


                        </div>
                    </div>
                    <div className="col-8" id="post-container">
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>

                        <div className="row"></div>
                    </div>
                </div>
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            </div>
        )
    }

}

export default ChannelPage