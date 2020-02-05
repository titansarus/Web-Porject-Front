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
import ChannelPage from "../Channel/channelPage";

class ProfileContainer extends Component {

    componentDidMount() {
        // console.log(this.props.user)
    }

    render() {
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }
        let temp;
        //console.log("fuck",this.props.user,this.props)
        if (!this.props.me.checked)
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8" style={{margin: "auto"}}>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            {temp}
                        </nav>
                        <Route exact path="/profile"  render={() => <Profile user={this.props.user} />}></Route>
                        <Route exact path="/profile/changepass" render={() => <ChangePassword />}></Route>
                        <Route exact path="/profile/Post" render={() => <Post/>}></Route>
                        <Route exact path="/profile/edit" render={() => <EditProf />}></Route>
                        <Route exact path="/profile/following" render={() => <Following user={this.props.user}/>}></Route>
                        <Route exact path="/profile/followers" render={() => <Followers user={this.props.user}/>}></Route>
                        <Route exact path="/profile/makeChannel" render={() => <ChannelPage user={this.props.user}/>}></Route>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileContainer