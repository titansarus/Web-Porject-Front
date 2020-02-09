import React, {Component} from 'react';
import channels from '../../static/jsons/Channels'
import ChannelCard from "../profile/ChannelCard";

class Search extends Component {
    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        let a = window.location.href
        let re = /http:\/\/(localhost|127\.0\.0\.1):3000\/search\/(\w+)\/?$/
        let body = a.match(re)[2];

        var raw = JSON.stringify({
            "body":body
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/search/", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                for(const channel of obj.data.chanel){

                }
                for(const user of obj.data.user){

                }
                for(const msg of obj.data.post){
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
                                '                <h6 class="text-muted card-subtitle mb-2">' + "author" + "::: " + msg.create_time + '</h6>\n' +
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
            });


    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col" style={{margin: "auto"}}>
                        <h3 className="card-header">channels</h3>
                        <div className="card-body" id="channels">

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col" style={{margin: "auto"}}>
                        <h3 className="card-header">User</h3>
                        <div className="card-body" id="users">

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col" style={{margin: "auto"}}>
                        <h3 className="card-header">Post</h3>
                        <div className="card-body" id="posts">

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Search