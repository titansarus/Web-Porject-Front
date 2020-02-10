import React, {Component} from 'react'
import "./style.css"
import Follow from "./follow";
import Edit from "./edit";

class ChangePassword extends Component {
    constructor() {
        super();
        this.reset = this.reset.bind(this)
        this.insideSubmit = this.insideSubmit.bind(this)
    }

    async insideSubmit() {
        let thisIS = this;

        let password = document.getElementById("newPassword").value;
        let repeatpassword = document.getElementById("repeatPassword").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("newPassword").validity.valid && document.getElementById("repeatPassword").validity.valid)) {
            const swal = require("sweetalert2");
            swal.fire(
                "ERROR",
                "something in input is wrong",
                "error"
            )
            return
        } else if (!(password == repeatpassword)) {
            const swal = require("sweetalert2");
            swal.fire(
                "ERROR",
                "repeat password is wrong",
                "error"
            )

            return
        }

        var raw = JSON.stringify({
            "password": password,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/account/changePassword", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                alert(msg)


            })
            .catch(error => {
                alert('error' + error)
            });


    }

    reset() {
        document.getElementById("newPassword").value = ''
        document.getElementById("newPassword").value = ''
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
                        <h3 className="card-title">Change password</h3>
                        <div className="card-body">

                            <div className="form-group row">
                                <label htmlFor="newPassword">New password</label>
                                <input type="password" className="form-control" id="newPassword"
                                       placeholder="new pass" required/>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="repeatPassword">Confirm password</label>
                                <input type="password" className="form-control" id="repeatPassword"
                                       placeholder="repeat pass" required/>
                            </div>
                            <div className="button-container">
                                <button onClick={this.insideSubmit} type="submit" className="btn btn-primary">Change
                                </button>
                                <button onClick={this.reset} type="reset" className="btn btn-primary">reset</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword