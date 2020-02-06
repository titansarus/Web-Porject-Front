import React, {Component} from 'react'
import Follow from "./follow";
import Edit from "./edit";
import "./style.css"
import {Redirect, Route} from "react-router-dom";
import Profile from "./Profile";
import ChangePassword from "./changePass";
import Post from "./post";
import EditProf from "./editProf"
import Followers from "./followers";
import Following from "./following";
import ChannelCreator from "../Channel/channelCreator";

class ProfileContainer extends Component {

    componentDidMount() {
        // console.log(this.props.user)
    }

    render() {
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8" style={{margin: "auto"}}>

                        <Route exact path="/profile"  render={() => <Profile  flag={false}/>}></Route>
                        <Route exact path="/profile/changepass" render={() => <ChangePassword flag={false}/>}></Route>
                        <Route exact path="/profile/Post" render={() => <Post flag={false}/>}></Route>
                        <Route exact path="/profile/edit" render={() => <EditProf flag={false}/>}></Route>
                        <Route exact path="/profile/following" render={() => <Following user={this.props.user} flag={false}/>}></Route>
                        <Route exact path="/profile/followers" render={() => <Followers user={this.props.user} flag={false}/>}></Route>
                        <Route exact path="/profile/makeChannel" render={() => <ChannelCreator user={this.props.user} flag={false}/>}></Route>
                        <Route exact path="/profile/other/:id"  render={() => <Profile flag={true}/>}></Route>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileContainer