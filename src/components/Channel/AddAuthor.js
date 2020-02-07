import React, {Component} from 'react'


class AddAuthor extends Component {
    constructor() {
        super();
        this.insideSubmit = this.insideSubmit.bind(this)
    }

    async insideSubmit() {
        let thisIS = this;

        let username = document.getElementById("username").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("username").validity.valid)) {
            alert("something in input is wrong")
            return
        }
        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?/
        let profile_name = a.match(re)[2];

        var raw = JSON.stringify({
            "username": username,
            "identifier": profile_name
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/chanel/author", requestOptions)
            .then(response => response.text())
            .then(function (result) {

                let obj = JSON.parse(result);
                alert(obj.msg)

            })
            .catch(error => {
                alert('error' + error)
            });


    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-sm-6 col-lg-8">
                        <h3 className="card-title">Add author</h3>
                        <div className="card-body">
                            <div className="form-group row">
                                <label htmlFor="name">Username</label>
                                <input type="text" className="form-control" id="username"
                                       placeholder="username" required/>
                            </div>
                            <div className="center">
                                <button onClick={this.insideSubmit} type="submit" className="btn btn-primary col-6">Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default AddAuthor