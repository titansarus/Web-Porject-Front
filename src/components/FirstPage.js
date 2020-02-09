import React, {Component} from 'react';
import TopicThumbnail from "./Topic/TopicThumbnail";
import data from "../static/jsons/topic"
import Navbar from "../template_compnent/Navbar";
import TextArea from "../template_compnent/TextInput/TextArea";

class FirstPage extends Component {
    constructor() {
        super();
        this.loadPage = this.loadPage.bind(this)
    }

    state = {
        page_number: 1,
    }

    loadPage() {
        var thisIS = this;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var raw = JSON.stringify({
            "followed": true,
            "page_number": thisIS.state.page_number
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
                    let url ="http://127.0.0.1:8000/api/chanel/get/"+msg.chanel
                    console.log(url)
                    fetch(url, requestOptions1)
                        .then(response => response.text())
                        .then(function (result) {

                            console.log(result)
                            let obj1 = JSON.parse(result);
                            if (!obj1.success) {
                                //todo
                            }
                            console.log("obj:"+obj1)
                            document.getElementById("posts").innerHTML+='<div class="row">\n' +
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
        return (

            <div className="container">
                <div id="posts">

                </div>
            </div>
        )
    }
}


export default FirstPage