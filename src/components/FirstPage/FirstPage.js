import React, {Component} from 'react';

class FirstPage extends Component {
    constructor() {
        super();
        this.loadPage = this.loadPage.bind(this)
        this.follow = this.follow.bind(this)
        this.hot = this.hot.bind(this)
        this.new = this.new.bind(this)
        this.default = this.default.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prePage = this.prePage.bind(this)
    }
    state = {
        page_number: 1,
        followed: false,
        hotSort: false,
        newsSort: false,
    };
    follow(){
        this.setState({
            followed: true,
            hotSort: false,
            newsSort: false,
        })
        console.log(this.state)
        this.loadPage()
    }
    new(){
        this.setState({
            followed: false,
            hotSort: false,
            newsSort: true,
        })
        console.log(this.state)
        this.loadPage()
    }
    default(){
        this.setState({
            followed: false,
            hotSort: false,
            newsSort: false,
        })
        console.log(this.state)
        this.loadPage()
    }
    hot(){
        this.setState({
            followed: false,
            hotSort: true,
            newsSort: false,
        })
        console.log(this.state)
        this.loadPage()
    }
    nextPage(){
        this.setState({
            page_number: this.state.page_number+1
        })
        this.loadPage()
    }
    prePage(){
        this.setState({
            page_number: this.state.page_number-1
        })
        this.loadPage()
    }

    loadPage() {
        var thisIS = this;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var raw = JSON.stringify({
            "followed": true,
            "page_number": thisIS.state.page_number,
            "hotSort": thisIS.state.hotSort,
            "newsSort": thisIS.state.newsSort,
        });


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
                    console.log(url)
                    fetch(url, requestOptions1)
                        .then(response => response.text())
                        .then(function (result) {

                            console.log(result)
                            let obj1 = JSON.parse(result);
                            if (!obj1.success) {
                                //todo
                            }
                            console.log("obj:" + obj1)
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
        console.log("state"+this.state)
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    mode
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <span className="dropdown-item" onClick={this.follow} >Followed</span>
                                    <span className="dropdown-item" onClick={this.hot} >Hot</span>
                                    <span className="dropdown-item" onClick={this.new} >New</span>
                                    <span className="dropdown-item" onClick={this.default} >Default</span>
                                </div>
                            </li>
                        </ul>

                        <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                            <li className="nav-item btn-primary btn-sm">
                                <a className="nav-link" href={window.location.href} style={{margin: "5px" , color:"white"}}>pre</a>
                            </li>
                            <li className="nav-item btn-primary btn-sm" style={{margin: "5px"}}>
                                <a className="nav-link" href={window.location.href} onClick={this.logout}
                                   style={{color: "white", margin:"5px"}}>next</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div id="posts">

                </div>
            </div>
        )
    }
}


export default FirstPage