import React, {Component} from 'react'
import logo from "../static/img/reddit-logo.png"
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
// import 'react-notifications/lib/notifications.css';
// import {NotificationContainer, NotificationManager} from 'react-notifications';

class Navbar extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this)
        this.f = this.f.bind(this)
    }

    logout() {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("CURRENT_USER");
        localStorage.removeItem("CURRENT_USER_ID");
        this.forceUpdate();
    }

    componentDidMount() {
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

        if (localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined) {
            console.log("NAVBAR")
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/*<NotificationContainer/>*/}
                <ReactNotification />
                <a className="navbar-brand" href="/"><img
                    style={{width: "40px", height: "40px"}} src={logo}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/Home">Home <span className="sr-only">(current)</span></a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/notification">Notification <span><i
                                className="fas fa-bell"></i></span></a>
                        </li>


                    </ul>


                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    {(!(localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined)) ? (
                            <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                                <li className="nav-item btn-primary btn-sm" style={{margin: "5px"}}>
                                    <a className="nav-link" href="/sign" style={{color: "white"}}>Sign In</a>
                                </li>
                                <li className="nav-item btn-success btn-sm">
                                    <a className="nav-link" href="/signUp" style={{color: "white"}}>Sign Up</a>
                                </li>
                            </ul>
                        ) :
                        (
                            <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                                <li className="nav-item btn-primary btn-sm">
                                    <a className="nav-link" href="/profile" style={{color: "white"}}>Profile</a>
                                </li>
                                <li className="nav-item btn-danger btn-sm" style={{margin: "5px"}}>
                                    <a className="nav-link" href="/sign" onClick={this.logout}
                                       style={{color: "white"}}>Log Out</a>
                                </li>


                            </ul>)}
                </div>
            </nav>


        );

    }
}

export default Navbar