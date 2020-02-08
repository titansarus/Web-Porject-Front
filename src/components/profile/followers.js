import React, {Component} from 'react'
import "./style.css"
import UserCard from "./UserCard";
import Follow from "./follow";
import Edit from "./edit";
import ChannelCard from "./ChannelCard";

class Followers extends Component {
    state = {
        channels: [],
    }

    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let url = "http://127.0.0.1:8000/api/account/"
        if (window.location.href.match(/^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/?/)) {
            let profile_name = window.location.href.match(/^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/?/)[2]
            url = url + "get/" + profile_name
        } else {
            url = url + "me"
        }
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

                //console.log(result)
                let obj = JSON.parse(result);
                console.log()
                for (const channel of obj.data.follower) {
                    document.getElementById("row").innerHTML += '<a href="/channel/'+channel.chanel.identifier+'"><div className="card-body"> <h6 className="card-title">'+channel.chanel.identifier+'</h6></div></a>'
                }


            })
            .catch(error => {
                alert('error' + error)
                return
            });
    }


    render() {
        let temp
        if ((this.props.flag))
            temp = <Follow/>
        else
            temp = <Edit/>
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    {temp}
                </nav>
                <h2>Follwers</h2>
                <div className="row" id="row">

                </div>
            </div>
        )
    }
}


export default Followers