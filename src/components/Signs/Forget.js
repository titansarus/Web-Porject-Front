import React, {Component} from 'react'
import "./sign.css"
import {Redirect} from "react-router-dom";


class Forget extends Component {

    async insideSubmit() {
        var email = document.getElementById("email").value
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (!(document.getElementById("email").validity.valid)) {
            alert("something in input is wrong")
            return
        }

        var raw = JSON.stringify({
            "email" : email,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/account/forgetPassword", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                let obj =  JSON.parse(result)
                let msg = obj.msg;
                alert(msg)
            })
            .catch(error => {
                alert('error' + error)
                localStorage.removeItem("ACCESS_TOKEN")
            });


    }


    render() {
        if (localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined) {
            return (<Redirect to="/"/>)
        }
        if (localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined) {
            return (<Redirect to="/"/>)
        }
        return (
            <div id="Container">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3 style={{color: "black"}}>Forget Password</h3>
                            </div>
                            <div className="card-body">

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="email" id="email" name="email" className="form-control"
                                           placeholder="mail@mail.com"/>

                                </div>
                                <div className="form-group">
                                    <input onClick={this.insideSubmit.bind(this)} type="submit" value="Send"
                                           className="btn float-right login_btn"/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default Forget