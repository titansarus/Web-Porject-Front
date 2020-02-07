import React, {Component} from 'react'
import "../profile/style.css"

class Post extends Component {
    constructor() {
        super();
        this.insideSubmit = this.insideSubmit.bind(this)
    }
    async insideSubmit() {
        let title = document.getElementById("title").value;
        let content = document.getElementById("textarea").value;
        let pic = document.getElementById("file").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization","Bearer "+localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("title").validity.valid && document.getElementById("textarea").validity.valid)) {
            alert("something in input is wrong")
            return
        }


        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?/
        let profile_name = a.match(re)[2];

        var raw = JSON.stringify({
            "chanelIdentifier": profile_name,
            "body": content,
            "title": title,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://127.0.0.1:8000/api/posts/", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                alert(msg)

            })
            .catch(error => {
                //alert('error' + error)
            });


    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8">
                        {/*<nav className="navbar navbar-expand-lg navbar-light">*/}
                        {/*    {temp}*/}
                        {/*</nav>*/}
                        <h3 className="card-title"></h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Title"
                                           required/>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="textarea">Content</label>
                                    <textarea className="form-control" id="textarea" placeholder="write"
                                              required></textarea>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="file">Attach File</label>
                                    <input type="file" className="form-control" id="file"/>
                                </div>
                                <div>
                                    <button onClick={this.insideSubmit} type="submit" className="btn btn-primary">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post