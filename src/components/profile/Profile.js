import React, {Component} from 'react'
import ChangePassword from "./changePass";
import Post from "./post";
import EditProf from "./editProf";
import Following from "./following";
import Followers from "./followers";
import ChannelCreator from "../Channel/channelCreator";
import Follow from "./follow";
import Edit from "./edit";


class profile extends Component {
    constructor()
    {
        super()
        console.log("SOMETHING")
        this.getProfile=this.getProfile.bind(this)


    }
    state = {
        followerCount: 0,
        followingCount: 0,
        username: "",
        first_name: "",
        last_name: "",
        country: "",
        city: ""

    }

    componentDidMount() {
        this.getProfile();
    }

    async getProfile()
    {
        var thisIS = this;




        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization","Bearer "+localStorage.getItem("ACCESS_TOKEN"))



        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        var username = "";
        var first_name = "";
        var last_name = "";
        var country = "";
        var city = "";
        var following_count = 0;
        var follower_count =0;
        var post_count=0;
        let a = window.location.href
        let sp= a.split('/')
        console.log("LENGTH" + sp.length)
        let profile_name = sp[sp.length-1]
        let url = "http://127.0.0.1:8000/api/account/"
        if (this.props.flag)
        {
            url = url + "get/"+profile_name
        }
        else
        {
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
                 following_count = obj.data.following_count
                 follower_count = obj.data.follower_count
                 post_count = obj.data.user_post_count




                //console.log(username)
                //console.log(first_name)
                //console.log(last_name)
                //console.log(country)
                //console.log(city)

               // console.log(obj.data)

                document.getElementById("username").innerHTML= username
                document.getElementById("following_count").innerHTML= following_count+ "<br/>" + "Following";
                document.getElementById("follower_count").innerHTML= follower_count+ "<br/>" + "Followers";
                document.getElementById("post_count").innerHTML= post_count+ "<br/>" + "Posts";
                document.getElementById("names").innerHTML= first_name+ "&nbsp&nbsp&nbsp&nbsp" + last_name;
                document.getElementById("location").innerHTML= "From " + country+ "\\" + city + "<br/>" +" <br/>" + " <br/>";



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

        })

        this.forceUpdate()



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
                            <img className="col-3 img" src="" alt=""/>
                            <h2 className="card-title" id = "username"></h2>
                            <h5 className="card-title" id = "names"></h5>
                            <h6 className="card-title" id = "location"></h6>



                            <div className="row">
                                <div  className="col-3 item">
                                    <a href="/profile/followers" id = "follower_count">

                                    </a>
                                </div>
                                <div className="col-3 item">
                                    <a href="/profile/following" id = "following_count">

                                    </a>
                                </div>
                                <div className="col-3 item" id = "post_count">
                                    <br/>

                                </div>
                                <div id="posts"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
export default profile