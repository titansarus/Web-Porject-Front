import React, {Component} from 'react'
import Follow from "./follow";
import Edit from "./edit";
import "./style2.css"


class profile extends Component {
    constructor() {
        super()
        console.log("SOMETHING")
        this.getProfile = this.getProfile.bind(this)
        this.buildPost = this.buildPost.bind(this)
    }

    state = {
        followerCount: 0,
        followingCount: 0,
        username: "",
        first_name: "",
        last_name: "",
        country: "",
        city: "",
        picture: null,

    }

    componentDidMount() {
        this.getProfile();
        this.buildPost()
    }

    async getProfile() {
        let thisIS = this;


        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        let username = "";
        let first_name = "";
        let last_name = "";
        let country = "";
        let city = "";
        let following_count = 0;
        let follower_count = 0;
        let post_count = 0;
        let picture = 0;
        let a = window.location.href
        let sp = a.split('/')
        console.log("LENGTH" + sp.length)
        let profile_name = sp[sp.length - 1]
        let url = "http://127.0.0.1:8000/api/account/"
        if (this.props.flag) {
            url = url + "get/" + profile_name
        } else {
            url = url + "me"
        }
        console.log(profile_name)
        console.log("BEFORE MATCH")
        console.log(this.props);
        if (this.props.match) {
            console.log("AFTER MATCH")
            console.log(this.props.match.params.id)
        }

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

                //console.log(result)
                let obj = JSON.parse(result);
                let user_data = obj.data.user_data;
                username = user_data.username;
                first_name = user_data.first_name;
                last_name = user_data.last_name;
                country = user_data.country;
                city = user_data.city;
                picture = user_data.picture
                following_count = obj.data.following_count
                follower_count = obj.data.follower_count
                post_count = obj.data.user_post_count

                picture = "http://127.0.0.1:8000" + picture;

                console.log(picture)
                console.log("flag:" + thisIS.props.flag)
                let url1 = window.location.href
                let url2 = window.location.href
                if (thisIS.props.flag) {
                    url1 += window.location.href.match(/^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/?/)[2]
                    url2 += window.location.href.match(/^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/?/)[2]
                }
                url1 += "/followers"
                url2 += "/following"
                document.getElementById("username").innerHTML = username
                document.getElementById("following_count").innerHTML = following_count + "<br/>" + "Following";
                document.getElementById("following_count").setAttribute("href", url2)
                document.getElementById("follower_count").innerHTML = follower_count + "<br/>" + "Followers";
                document.getElementById("follower_count").setAttribute("href", url1)
                document.getElementById("post_count").innerHTML = post_count + "<br/>" + "Posts";
                document.getElementById("names").innerHTML = first_name + "&nbsp&nbsp&nbsp&nbsp" + last_name;
                document.getElementById("location").innerHTML = "From " + country + "\\" + city + "<br/>" + " <br/>" + " <br/>";
                document.getElementById("picture").src = picture;


            })
            .catch(error => {
                alert('error' + error)
                return
            });

        console.log("IN FETCH:" + username)
        this.setState({
            followerCount: follower_count,
            followingCount: following_count,
            username: username,
            first_name: first_name,
            last_name: last_name,
            country: country,
            city: city,
            picture: picture,

        })

        this.forceUpdate()


    }

    buildPost() {
        let thisIS = this;


        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };



        let a = window.location.href
        let sp = a.split('/')
        console.log("LENGTH" + sp.length)
        let profile_name = sp[sp.length - 1]
        let url = "http://127.0.0.1:8000/api/posts/chanel/"
        if (this.props.flag) {
            url = url + profile_name
        } else {
            profile_name = localStorage.getItem("CURRENT_USER")
            url = url + profile_name
        }


        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log("msg:")
                console.log(url)
                let obj = JSON.parse(result);
                console.log(obj.msg)
                for(const msg of obj.msg){
                    document.getElementById("posts").innerHTML =document.getElementById("posts").innerHTML   + '<div class="row">\n' +
                    '    <div class="col">\n' +
                    '        <div class="card_new">\n' +
                    '            <div class="card-body">\n' +
                    '              <h4> <a class="card-title" href="http://localhost:3000/PostView/' + profile_name + '/' + msg.id + '">' + msg.title + '</a> </h4>\n' +
                    '                <h6 class="text-muted card-subtitle mb-2">' + profile_name +  "::: " + msg.create_time + '</h6>\n' +
                    '                <p class="card-text">' + msg.body + '</p><a class="card-link" id =like_' + msg.id + ' href="' + window.location.href + '"><i class="fa fa-plus"></i><span>' + msg.like.liked + '</span></a>\n' +
                    '                <a\n' +
                    '                    class="card-link" href="' + window.location.href + '" id="dislike_' + msg.id + '"><i class="fa fa-minus"></i><span>' + msg.like.disLiked + '</span></a>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
                }


            })
            .catch(error => {
                alert('error' + error)
                return
            });
    }


    render() {
        console.log("IN RENDER:")
        console.log(this.state.username)
        let temp
        if ((this.props.flag))
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        return (

            <div className="container">
                <div className="row">
                    <div className="card col-8" style={{margin: "auto"}}>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            {temp}
                        </nav>
                        <div className="card-body">
                            <img className="col-3 img" id="picture" src={this.state.picture} alt="profile_picture"/>
                            <h2 className="card-title" id="username"></h2>
                            <h5 className="card-title" id="names"></h5>
                            <h6 className="card-title" id="location"></h6>


                            {}
                            <div className="row">
                                <div className="col-3 item">
                                    <a href="" id="follower_count">

                                    </a>
                                </div>
                                <div className="col-3 item">
                                    <a href="" id="following_count">

                                    </a>
                                </div>
                                <div className="col-3 item" id="post_count">
                                    <br/>

                                </div>
                                <div className="container" id="posts"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default profile