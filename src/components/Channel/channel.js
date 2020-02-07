import React, {Component} from 'react';
import UserCard from "../profile/UserCard";
import ChannelCard from "../profile/ChannelCard";
import Users from "./../../static/jsons/profiles"
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
                let rule = data.law;
                let description = data.description;
                let identifier = data.identifier;
                let owner = data.owner;
                let authors = data.author;


                that.setState({
                    title: title,
                    rule: rule,
                    description: description,
                    identifier: identifier,
                    owner: owner,
                    authors: authors,
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
                <div className="row">
                    <div className="card col-10">
                        <h2 className="card-header card-title">{this.state.title + "  " + this.state.identifier}</h2>
                        <div className="card-body">
                            <br/>
                            <h3>Rules</h3>
                            <hr/>
                            <h4>
                                {this.state.rule}
                            </h4>
                            <br/>
                            <h3>Description</h3>
                            <hr/>
                            <h4>
                                {this.state.description}
                            </h4>
                            <br/>
                            <h3>Admin</h3>
                            <hr/>
                            <UserCard user={this.state.owner}/>
                            <br/>
                            <h3>Authors</h3>
                            <hr/>
                            {/*{this.state.authors.map((author) =>*/}
                            {/*    <UserCard user={author} />*/}
                            {/*)}*/}
                            <br/>
                        </div>
                    </div>
                </div>
                <div id="posts"></div>
            </div>
        )
    }

}

export default ChannelPage