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

class App extends Component {
    state = {
        users: [],
        onlineUser : ""
    }
    componentDidMount() {
        console.log("he")
        this.setState({
            users : Users
        })
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
                <Navbar/>


                <Switch>
                    <Route exact path="/" render={() => <FirstPage/>}></Route>
                    <Route exact path="/forgetpass" render={() => <Forget/>}></Route>
                    <Route exact path="/sign" render={() => <Sign/>}></Route>
                    <Route exact path="/signUp" render={() => <SignUp/>}></Route>
                    <Route exact path="/Home" render={() => <FirstPage/>}></Route>
                    <Route exact path="/PostMaker" render={() => <PostMaker/>}></Route>
                    <Route path="/topic/:topic_id"  component={TopicPage}></Route>
                    <Route path="/profile"  render={() => <ProfileContainer user={onlineUser} me={{checked:true , follow:false}}/>}></Route>
                    <Route path="/notification" render={() => <NotificationPage/>} ></Route>
                </Switch>


            </BrowserRouter>


        )
    }


}

export default App;
