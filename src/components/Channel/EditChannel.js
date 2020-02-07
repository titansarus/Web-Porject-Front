import React, {Component} from 'react';

class EditChannel extends Component {
    constructor() {
        super();
        this.insideSubmit = this.insideSubmit.bind(this)
    }

    async insideSubmit() {
        let body = {}

        let title = document.getElementById("title").value;
        let rules = document.getElementById("rules").value;
        let desc = document.getElementById("description").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("title").validity.valid)) {
            body["title"] = title
        }
        if (!(document.getElementById("rules").validity.valid)) {
            body["law"] = rules
        }
        if (!(document.getElementById("description").validity.valid)) {
            body["description"] = desc
        }

        var raw = JSON.stringify(body);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?/
        let profile_name = a.match(re)[2];
        let url = "http://127.0.0.1:8000/api/chanel/update/"
        url+= profile_name
        console.log(url)

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                console.log(obj)
                alert(msg)

            })
            .catch(error => {
                alert('error' + error)
            });


    }

    render() {
        return (
            <div className="container">
                <h2>Edit channel</h2>
                <div>
                    <div className="md-form">
                        <label htmlFor="form1">Title</label>
                        <input type="text" id="title" className="form-control" placeholder="title"
                        />
                    </div>
                    <div className="md-form">
                        <label htmlFor="form1">Rules</label>
                        <input type="text" id="rules" className="form-control" placeholder="rules"
                        />
                    </div>
                    <div className="form-group shadow-textarea">
                        <label htmlFor="description">description</label>
                        <textarea className="form-control z-depth-1" id="description" rows="3"
                                  placeholder="Describe your channel" maxLength="200"
                        ></textarea>
                    </div>
                    <button onClick={this.insideSubmit} type="submit" className="btn btn-primary">
                        Edit
                    </button>

                </div>
            </div>
        )
    }

}

export default EditChannel