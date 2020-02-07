import React, {Component} from 'react';
import logo from './logo.svg';
import Navbar from "./template_compnent/Navbar";
import './App.css';
import Sign from './components/Signs/Sign.js'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import SignUp from "./components/Signs/SignUp";
import TopicThumbnail from "./components/Topic/TopicThumbnail";
import FirstPage from "./components/FirstPage";
import PostMaker from "./components/Posts/PostMaker";
import NotificationPage from "./components/NotificationPage";
import TopicPage from "./components/Topic/TopicPage";
import ProfileContainer from "./components/profile/ProfileContainer";
import Post from "./components/profile/post";
import ChangePassword from "./components/profile/changePass";
import Users from "./static/jsons/profiles"
import Forget from "./components/Signs/Forget";

import ChannelCreator from "./components/Channel/channelCreator";
import ChannelContainer from "./components/Channel/ChannelContainer";
import ReactNotification, {store} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
// import 'react-notifications/lib/notifications.css';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import EditPost from "./components/Channel/EditPost";

class App extends Component {
    constructor() {
        super();
        this.f = this.f.bind(this)
    }
    state = {
        users: [],
        onlineUser : ""
    }
    componentDidMount() {
        console.log("he")
        this.setState({
            users : Users
        })
        setTimeout(this.f, 500)
    }


    f() {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };

            fetch("http://127.0.0.1:8000/api/notify/get", requestOptions)
                .then(response => response.text())
                .then(function (result) {

                    let obj = JSON.parse(result);
                    if (obj.success) {
                        console.log(obj.data)
                        for (const alter of obj.data) {
                            console.log(alter)
                            store.addNotification({
                                title: "Alert!",
                                message: alter.body,
                                type: "info",
                                insert: "top",
                                container: "bottom-right",
                                animationIn: ["animated", "fadeIn"],
                                animationOut: ["animated", "fadeOut"],
                                dismiss: {
                                    duration: 6000,
                                }
                            });
                            console.log("inja")
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

                            var requestOptions = {
                                method: 'GET',
                                headers: myHeaders,
                                redirect: 'follow',
                            };
                            let url = "http://127.0.0.1:8000/api/notify/get/"
                            url += alter.id

                            fetch(url, requestOptions)
                                .then(response => response.text())
                                .then(function (result) {

                                    let obj = JSON.parse(result);

                                })
                                .catch(error => {
                                    alert('error' + error)
                                });
                        }
                    }

                })
                .catch(error => {
                    alert('error' + error)
                });
        }
        setTimeout(this.f, 5000)
    }

    render() {
        let onlineUser
        Users.map((user) => {
            //console.log(user.id, user.id === "98102345")
            if (user.id === "98102345"){
                onlineUser = user
            }
        })
        //console.log("LLLLLLLLL",onlineUser)
        return (
            <BrowserRouter>
                {/*<NotificationContainer/>*/}
                <ReactNotification />
                <Navbar/>


                <Switch>
                    <Route exact path="/" render={() => <FirstPage/>}></Route>
                    <Route exact path="/forgetpass" render={() => <Forget/>}></Route>
                    <Route exact path="/sign" render={() => <Sign/>}></Route>
                    <Route exact path="/signUp" render={() => <SignUp/>}></Route>
                    <Route exact path="/Home" render={() => <FirstPage/>}></Route>
                    <Route exact path="/PostMaker" render={() => <PostMaker/>}></Route>
                    <Route path="/topic/:topic_id"  component={TopicPage}></Route>
                    <Route path="/profile"  render={() => <ProfileContainer  me={{checked:true , follow:false}}/>}></Route>
                    <Route path="/notification" render={() => <NotificationPage/>} ></Route>
                    <Route path="/channel/:identifier" render={() => <ChannelContainer/>} ></Route>
                    <Route path="/postEdit/:identifier/:post_id" render={() => <EditPost/>} ></Route>
                </Switch>


            </BrowserRouter>


        )
    }


}

export default App;
