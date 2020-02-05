import React, {Component} from 'react'
import "./style.css"

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
        myHeaders.append("Authorization","Bearer "+localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("newPassword").validity.valid && document.getElementById("repeatPassword").validity.valid)) {
            alert("something in input is wrong")
            return
        }
        else if (!(password == repeatpassword)) {
            alert("Your repeatition is wrong")
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

    reset(){
        document.getElementById("newPassword").value = ''
        document.getElementById("newPassword").value = ''
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-sm-6 col-lg-8">
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
                                    <button onClick={this.insideSubmit} type="submit" className="btn btn-primary">Change</button>
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