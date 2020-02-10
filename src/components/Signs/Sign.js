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
            const swal = require("sweetalert2");
            swal.fire(
                "ERROR",
                "Username and Password Cannot be Empty",
                "error"
            )
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
                if (access == undefined) {

                    const swal = require("sweetalert2");
                    swal.fire(
                        "ERROR",
                        "ERROR  " + obj.detail,
                        "error"
                    )


                    return;
                }
                if (access != undefined) {
                    localStorage.setItem("ACCESS_TOKEN", access);
                    localStorage.setItem("CURRENT_USER", username);
                    {
                        var myHeaders2 = new Headers();
                        myHeaders2.append("Content-Type", "application/json");
                        myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


                        var requestOptions2 = {
                            method: 'GET',
                            headers: myHeaders2,
                            redirect: 'follow'
                        };

                        let url2 = "http://127.0.0.1:8000/api/account/me"

                        fetch(url2, requestOptions2)
                            .then(response => response.text())
                            .then(function (result) {

                                let obj = JSON.parse(result);
                                let user_data = obj.data.user_data;
                                localStorage.setItem("CURRENT_USER_ID", user_data.id)


                            })
                            .catch(error => {
                                alert('error' + error)
                                return
                            });
                    }


                }

                console.log(localStorage.getItem("ACCESS_TOKEN"))
                console.log("OK");
                thisIS.forceUpdate();

            })
            .catch(error => {
                const swal = require("sweetalert2");
                swal.fire(
                    "ERROR",
                    "ERROR " + error,
                    "error"
                )
                localStorage.removeItem("ACCESS_TOKEN")
                localStorage.removeItem("CURRENT_USER");
                localStorage.removeItem("CURRENT_USER_ID");
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
                                    <input required type="text" id="username" name="username" className="form-control"
                                           placeholder="username"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input required id="password" name="password" type="password" className="form-control"
                                           placeholder="password"/>
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