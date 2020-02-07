import React, {Component} from 'react';

import "./topic.css"
import {Redirect, Route} from "react-router-dom";
import Profile from "../profile/Profile";
import ChangePassword from "../profile/changePass";
import Post from "./post";
import ChannelPage from "./channel";
import AddAuthor from "./AddAuthor";
import EditChannel from "./EditChannel";



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
                        <Route exact path="/channel/:identifier/Post" render={() => <Post/>}></Route>
                        <Route exact path="/channel/:identifier/edit" render={() => <EditChannel/>}></Route>*
                        <Route exact path="/channel/:identifier/addAuthor" render={() => <AddAuthor/>}></Route>
                        {/*<Route exact path="/channel/:identifier/delAuthor" render={() => <EditProf flag={false}/>}></Route>*/}
                    </div>
                </div>
            </div>
        )
    }

}

export default ChannelContainer