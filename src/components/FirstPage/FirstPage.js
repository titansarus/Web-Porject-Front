import React, {Component} from 'react';

class FirstPage extends Component {
    constructor() {
        super();
        this.loadPage = this.loadPage.bind(this)
        this.follow = this.follow.bind(this)
        this.hot = this.hot.bind(this)
        this.new = this.new.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prePage = this.prePage.bind(this)
    }

    state = {
        page_number: 1,
        followed: true,
        hotSort: false,
        newsSort: false,
    };

    follow() {
        this.state.followed = true
        this.state.hotSort = false
        this.state.newsSort = false
        console.log(this.state.followed)
        this.loadPage()
    }

    new() {
        this.state.followed = false
        this.state.hotSort = false
        this.state.newsSort = true
        console.log(this.state.newsSort)
        this.loadPage()
    }

    hot() {
        this.state.followed = false
        this.state.hotSort = true
        this.state.newsSort = false
        console.log(this.state.hotSort)
        this.loadPage()
    }

    nextPage() {
        this.state.page_number = this.state.page_number + 1
        this.loadPage()
    }

    prePage() {
        this.state.page_number = this.state.page_number - 1
        this.loadPage()
    }

    loadPage() {
        var thisIS = this;

        // console.log("load:")
        // console.log(thisIS.state)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        var body = {}
        body["page_number"] = thisIS.state.page_number
        if (thisIS.state.followed)
            body['followed'] = true
        else if (thisIS.state.hotSort)
            body['hotSort'] = true
        else if (thisIS.state.newsSort)
            body['newestSort'] = true
        console.log("body")
        console.log(body)
        console.log("state")
        console.log(thisIS.state)
        var raw = JSON.stringify(body)


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: raw,
        };


        document.getElementById("posts").innerHTML = ""
        fetch("http://127.0.0.1:8000/api/posts/get", requestOptions)
            .then(response => response.text())
            .then(function (result) {

                //console.log(result)

                let obj = JSON.parse(result);
                if (!obj.success) {
                    //todo
                }
                console.log("outer:" + result)

                for (const msg of obj.data) {
                    var myHeaders1 = new Headers();
                    myHeaders1.append("Content-Type", "application/json");
                    myHeaders1.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


                    var requestOptions1 = {
                        method: 'GET',
                        headers: myHeaders1,
                        redirect: 'follow',
                    };


                    document.getElementById("posts").innerHTML = ""
                    let url = "http://127.0.0.1:8000/api/chanel/get/" + msg.chanel
                    //console.log(url)
                    fetch(url, requestOptions1)
                        .then(response1 => response1.text())
                        .then(function (result1) {

                            // console.log(result)
                            let obj1 = JSON.parse(result1);
                            if (!obj1.success) {
                                //todo
                            }
                            console.log(result1)
                            //console.log("obj:" + obj1)
                            console.log(msg.title)
                            // console.log(document.getElementById("posts").innerHTML)
                            document.getElementById("posts").innerHTML += '<div class="row">\n' +
                                '    <div class="col">\n' +
                                '        <div class="card_new">\n' +
                                '            <div class="card-body">\n' +
                                '              <h4> <a class="card-title" href="http://localhost:3000/PostView/' + obj1.data.identifier + '/' + msg.id + '">' + msg.title + '</a> </h4>\n' +
                                '                <h6 class="text-muted card-subtitle mb-2">' + "author_name" + "::: " + msg.create_time + '</h6>\n' +
                                '                <p class="card-text">' + msg.body + '</p><a class="card-link" id =like_' + msg.id + ' href="' + window.location.href + '"><i class="fa fa-plus"></i><span>' + msg.like.liked + '</span></a>\n' +
                                '                <a\n' +
                                '                    class="card-link" href="' + window.location.href + '" id="dislike_' + msg.id + '"><i class="fa fa-minus"></i><span>' + msg.like.disLiked + '</span></a>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>'

                        })
                        .catch(error => {
                            alert('error1' + error)
                            return
                        });
                }
            })
            .catch(error => {
                alert('error' + error)
                return
            });
    }

    componentDidMount() {
        this.loadPage();
    }

    render() {
        //console.log("state" + this.state)
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <button className="nav-item btn-primary btn-sm dropdown-item"
                                        onClick={this.follow}>Followed
                                </button>
                                <button className="nav-item btn-primary btn-sm dropdown-item" onClick={this.hot}>Hot
                                </button>
                                <button className="nav-item btn-primary btn-sm dropdown-item" onClick={this.new}>New
                                </button>
                            </div>
                        </li>
                        <button className="nav-item btn-primary btn-sm" style={{margin: "5px", color: "white"}}>
                            pre
                        </button>
                        <button className="nav-item btn-primary btn-sm" style={{color: "white", margin: "5px"}}>
                            next
                        </button>
                    </ul>

                </nav>
                <div id="posts">
                </div>
            </div>
        )
    }
}


export default FirstPage