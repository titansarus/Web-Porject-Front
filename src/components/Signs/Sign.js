import React, {Component} from 'react'
import "./sign.css"
import {Redirect} from "react-router-dom";


class Sign extends Component {

    async insideSubmit() {
        let thisIS = this;

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (!(document.getElementById("password").validity.valid && document.getElementById("username").validity.valid)) {
            alert("something in input is wrong")
            return
        }

        var raw = JSON.stringify({
            "password": password,
            "username": username,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/account/login", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                console.log(localStorage.getItem("ACCESS_TOKEN"))
                let obj = JSON.parse(result);
                let access = obj.access;
                if (access != undefined) {
                    localStorage.setItem("ACCESS_TOKEN", access)
                }

                console.log(localStorage.getItem("ACCESS_TOKEN"))
                console.log("OK");
                thisIS.forceUpdate();

            })
            .catch(error => {
                alert('error' + error)
                localStorage.removeItem("ACCESS_TOKEN")
                thisIS.forceUpdate();
            });


    }


    render() {

        if (localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined) {
            return (<Redirect to="/"/>)
        }
        console.log("Hello")
        return (
            <div id="signUpContainer">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3 style={{color: "black"}}>Sign In</h3>
                            </div>
                            <div className="card-body">

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" id="username" name="username" className="form-control"
                                           placeholder="username"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input id="password" name="password" type="password" className="form-control"
                                           placeholder="password"/>
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox"/><span style={{color: "black"}}>Remember Me</span>
                                </div>
                                <div className="form-group">
                                    <input onClick={this.insideSubmit.bind(this)} type="submit" value="Login"
                                           className="btn float-right login_btn"/>
                                </div>

                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links" style={{color: "black"}}>
                                    Don't have an account?<a href="/signUp " style={{color: "blue"}}>Sign Up</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="/forgetpass" style={{color: "blue"}}>Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default Sign