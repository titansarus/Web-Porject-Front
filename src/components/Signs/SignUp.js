import React, {Component} from 'react'
import "./sign.css"


async function submit() {
    console.log("Sdaskldj")
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;
    let last_name = document.getElementById("last_name").value;
    let first_name = document.getElementById("first_name").value;
    let phone_number = document.getElementById("phone_number").value;
    let picture = null;
    if (!(document.getElementById("username").validity.valid && document.getElementById("email").validity.valid && document.getElementById("password").validity.valid && document.getElementById("first_name").validity.valid && document.getElementById("last_name").validity.valid)){
        alert("one of username, email, password, first name, last name is wrong")
        return
    }


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "password": password,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "phone_number": phone_number,
        "city": city,
        "username": username,
        "country": country
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/account/signup", requestOptions)
        .then(response => response.text())
        .then(result => alert('You signed up successfully'))
        .catch(error => alert('error' + error));

}

class SignUp extends Component {


    render() {
        console.log("Hello")
        return (
            <div id="signUpContainer">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header">
                                <h3 style={{color: "black"}}>Sign Up</h3>
                            </div>
                            <div className="card-body">

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input id="username" type="text" className="form-control" name="username"
                                           placeholder="username" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input id="first_name" type="text" className="form-control" name="first_name"
                                           placeholder="first name" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input id="last_name" type="text" className="form-control" name="last_name"
                                           placeholder="last name" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input id="password" type="password" className="form-control" name="password"
                                           placeholder="password" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                    </div>
                                    <input id="phone_number" type="tel" className="form-control" name="phone_number"
                                           placeholder="phone number" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text"><i
                                                className="fas fa-envelope"></i></span>
                                    </div>
                                    <input id="email" type="email" className="form-control" name="email"
                                           placeholder="email@mail.com" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-flag"></i></span>
                                    </div>
                                    <input id="country" type="text" className="form-control" name="country"
                                           placeholder="country"/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-city"></i></span>
                                    </div>
                                    <input id="city" type="text" className="form-control" name="city"
                                           placeholder="your city"/>
                                </div>
                                <div className="input-group form-group" style={{display: "none"}}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-city"></i></span>
                                    </div>
                                    <input type="file" className="form-control" name="picture"/>
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox"/><span style={{color: "black"}}>Remember Me</span>
                                </div>
                                <div className="form-group">
                                    <input onClick={function () {
                                        console.log("BUTTON ON CLICK")
                                        submit()

                                    }} type="submit" value="Sign Up" className="btn float-right login_btn"/>
                                </div>

                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links" style={{color: "black"}}>
                                    Have an account?<a href="/sign" style={{color: "blue"}}>Sign in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default SignUp