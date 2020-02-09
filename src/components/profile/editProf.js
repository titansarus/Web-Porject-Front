import React, {Component} from 'react'
import "./style.css"
import Follow from "./follow";
import Edit from "./edit";

class EditProf extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this)
    }

    async submit() {

        /*
        console.log(document.getElementById("PIC").files[0]);
        let picture = document.getElementById("PIC").files[0];
        if (!picture) {
            let swal = require("sweetalert2")
            swal.fire(
                "UPLOAD ERROR",
                "NO FILE UPLOADED",
                "error"
            )
            return
        }
        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))
        var form = new FormData();
        form.append("image", picture);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: form,
            redirect: 'follow'
        };
        let url = "http://127.0.0.1:8000/api/upload/"
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function (result) {
                console.log(result)
                let url = result.image;
                url = "http://127.0.0.1:8000" + url;
                console.log(url)
                let imgRef = document.getElementById("image_help_reference")
                imgRef.style = "visibility: visible";
                imgRef.innerHTML = imgRef.innerText + "<br/>" + url


            })
            .catch(error => {
                alert('error' + error)
            });
         */
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let city = document.getElementById("city").value;
        let country = document.getElementById("country").value;
        let last_name = document.getElementById("last_name").value;
        let first_name = document.getElementById("first_name").value;
        let phone_number = document.getElementById("phone_number").value;
        let picture = document.getElementById("pic").files[0];


        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        var form = new FormData();
        // var body = {}
        if (document.getElementById("username").validity.valid) {
            form.append("username", username);
        }
        // body['username'] = username
        if (document.getElementById("email").validity.valid) {
            form.append("email", email);
        }
        // body['email'] = email
        if (document.getElementById("last_name").validity.valid) {
            form.append("last_name", last_name);
        }
        // body['last_name']= last_name
        if (document.getElementById("first_name").validity.valid) {
            form.append("first_name", first_name);
        }
        // body['first_name']= first_name
        if (document.getElementById("city").validity.valid) {
            form.append("city", city);
        }
        // body['city']= city
        if (document.getElementById("country").validity.valid) {
            form.append("country", country);
        }
        // body['country']= country
        if (document.getElementById("phone_number").validity.valid) {
            form.append("phone_number", phone_number);
        }
        // body['phone_number']= phone_number
        if (picture) {
            form.append("picture", picture);
        }


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: form,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/account/update", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                var obj = JSON.parse(result);
                console.log(result)
                const swal = require("sweetalert2");
                swal.fire(
                    "SUCCESS",
                    "User Profile Updated",
                    "success"
                )
            })
            .catch(error => alert('error' + error));

    }

    render() {
        let temp
        if ((this.props.flag))
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-sm-6 col-lg-8">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            {temp}
                        </nav>
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
                                       placeholder="country" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="city">city</label>
                                <input type="text" className="form-control" id="city"
                                       placeholder="city" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="pic">Picture</label>
                                <input type="file" className="form-control" id="pic" accept="image/*"
                                       formenctype="multipart/form-data" required/>
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