import React, {Component} from 'react'
import "./style.css"

class EditProf extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this)
    }

    async submit() {
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let city = document.getElementById("city").value;
        let country = document.getElementById("country").value;
        let last_name = document.getElementById("last_name").value;
        let first_name = document.getElementById("first_name").value;
        let phone_number = document.getElementById("phone_number").value;
        let picture = document.getElementById("pic").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))
        //
        // if (!(document.getElementById("username").validity.valid && document.getElementById("email").validity.valid && document.getElementById("last_name").validity.valid && document.getElementById("first_name").validity && document.getElementById("phone_number").validity.valid &&document.getElementById("pic").validity.valid &&document.getElementById("city").validity.valid && document.getElementById("country").validity.valid)){
        //     alert("some required input is not given")
        //     return
        // }

            var raw = JSON.stringify({
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "phone_number": phone_number,
                "city": city,
                "username": username,
                "country": country,
                "picture": picture,
            });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/account/update", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                var obj = JSON.parse(result);
                console.log(result)
                alert(obj.msg)
            })
            .catch(error => alert('error' + error));

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-sm-6 col-lg-8">
                        <h3 className="card-title">Edit profile</h3>
                        <div className="card-body">
                            <div className="form-group row">
                                <label htmlFor="name">Username</label>
                                <input type="text" className="form-control" id="username"
                                       placeholder="username" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name">First name</label>
                                <input type="text" className="form-control" id="first_name"
                                       placeholder="first_name" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name">Last name</label>
                                <input type="text" className="form-control" id="last_name"
                                       placeholder="last_name" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="tel" className="form-control" id="phone_number"
                                       placeholder="phone number" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email"
                                       placeholder="mail@mail.com" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="country">Country</label>
                                <input type="text" className="form-control" id="country"
                                       placeholder="country"/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="city">city</label>
                                <input type="text" className="form-control" id="city"
                                       placeholder="city"/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="pic">Picture</label>
                                <input type="file" className="form-control" id="pic" accept="image/*"
                                       formenctype="multipart/form-data"/>
                            </div>
                            <div className="center">
                                <button onClick={this.submit} type="submit" className="btn btn-primary col-6">Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProf