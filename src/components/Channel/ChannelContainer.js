import React, {Component} from 'react';

import "./topic.css"
import {Redirect, Route} from "react-router-dom";
import Profile from "../profile/Profile";
import ChangePassword from "../profile/changePass";
import Post from "./post";
import ChannelPage from "./channel";



class ChannelContainer extends Component {
    render(){
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }
        return (

            <div className="container">
                <div className="row">
                    <div className="card col-8" style={{margin: "auto"}}>

                        <Route exact path="/channel/:identifier"  render={() => <ChannelPage/>}></Route>
                        <Route exact path="/channel/:identifier/Post" render={() => <Post flag={false}/>}></Route>
                        {/*<Route exact path="/channel/:identifier/edit" render={() => <EditProf flag={false}/>}></Route>*/}
                        {/*<Route exact path="/channel/:identifier/addAuthor" render={() => <EditProf flag={false}/>}></Route>*/}
                        {/*<Route exact path="/channel/:identifier/delAuthor" render={() => <EditProf flag={false}/>}></Route>*/}
                    </div>
                </div>
            </div>
        )
    }

}

export default ChannelContainer