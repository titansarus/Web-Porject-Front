import React, {Component} from 'react';
import "./topic.css"
import {Redirect} from "react-router-dom";


class NewPostPage extends Component {


    state = {
        title: "",
        body: "",
        author: "",
        date: "",
        like: 0,
        dislike: 0,
        comments: [],
        channel: ""

    };

    componentDidMount() {
        console.log("SOMETHING")
        const that = this;
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/PostView\/(\w+)\/(\w+)\/?$/
        let a = window.location.href;
        let profile_name = a.match(re)[2];
        let post_id = a.match(re)[3];
        let url = "http://127.0.0.1:8000/api/posts/" + post_id;
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var author_id= 0;

        var requestOptions = {
            method: 'GET',
            headers: myHeaders2,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

                let obj = JSON.parse(result);
                let msg = obj.msg;

                that.state.channel=msg.chanel;
                that.state.title=msg.title;
                that.state.body=msg.body;
                that.state.like =msg.like.liked;
                that.state.dislike =msg.like.disLiked;
                that.state.date =msg.create_time;

                that.setState({
                    channel: msg.chanel,
                    title: msg.title,
                    body: msg.body,
                    like: msg.like.liked,
                    dislike: msg.like.disLiked,
                    date: msg.create_time,
                })
                author_id = msg.author;
                var myHeaders3 = new Headers();
                myHeaders3.append("Content-Type", "application/json");
                myHeaders3.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))
                let url2 = "http://127.0.0.1:8000/api/chanel/get/"+profile_name;
                var requestOptions2 = {
                    method: 'GET',
                    headers: myHeaders3,
                    redirect: 'follow'
                };

                fetch(url2, requestOptions2)
                    .then(response2 => {

                        return response2.text()
                    })
                    .then(function (result2) {

                        let authors = JSON.parse(result2).data.author
                        let len = JSON.parse(result2).data.author.length;
                        for (let i=0;i<len;i++)
                        {
                            if (authors[i].id == author_id)
                            {
                                that.setState({
                                    author: authors[i].username
                                })
                            }
                        }



                     console.log(that.state)

                        // alert(msg)


                    })
                    .catch(error => {
                        alert('error' + error)
                    });



                // alert(msg)


            })
            .catch(error => {
                // alert('error' + error)
            });



    }

    async addLikeDislike(value, post_id) {
        console.log("INSIDE LIKE FUNCTION" + value + "  " + post_id)

        let thisIS = this;


        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        var raw = JSON.stringify({
            "value": parseInt(value),
            "post": parseInt(post_id)
        });
        alert(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders2,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/like/", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                // console.log(msg)
                // alert(msg)


            })
            .catch(error => {
                // alert('error' + error)
            });

    }

    async deletePost(post_id) {
        console.log("INSIDE DELETE FUNCTION" + "  " + post_id)

        let thisIS = this;


        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders2,
            redirect: 'follow'
        };

        let url = "http://127.0.0.1:8000/api/posts/delete/" + post_id;
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                // console.log(msg)
                // alert(msg)


            })
            .catch(error => {
                // alert('error' + error)
            });
    }

    async addEventListeners(msgs, that, amIAuthor) {
        for (let msg of msgs) {
            console.log("MSG.id: " + msg.id)
            document.getElementById("like_" + msg.id).addEventListener("click", function () {
                that.addLikeDislike(1, msg.id)
            });

            document.getElementById("dislike_" + msg.id).addEventListener("click", function () {
                that.addLikeDislike(-1, msg.id)
            });
            if (amIAuthor) {

                document.getElementById("delete_post_" + msg.id).addEventListener("click", function () {

                    const Swal = require('sweetalert2')
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            that.deletePost(msg.id).catch((error) => {

                            })
                            Swal.fire(
                                'Deleted!',
                                'Your Post has been deleted.',
                                'success'
                            ).then((result) => {
                                window.location.reload(true);
                            })
                        }
                    })
                })
            }
        }
    }

    async setChannelInfo(data, that) {
        let title = data.title;
        if (!title) {
            title = "NO TITLE";
        }
        let rule = data.law;
        if (!rule) {
            rule = "NO RULES"
        }
        let description = data.description;
        if (!description) {
            description = "NO DESCRIPTION"
        }
        let identifier = data.identifier;
        let owners = data.owner;
        var authors = data.author;

        let owner_string = owners.username
        //console.log(authors)
        let isThisUserAuthor = false;
        let author_str = ""
        for (let author of authors) {
            // console.log("AUTHORAR: "+author)
            author_str = author_str + "<a href=\"http://localhost:3000/profile/other/" + author.username + "\">" + author.username + "</a> <br/>"
            //console.log(author_str)
        }
        for (let author of authors) {

            if (author.username === localStorage.getItem("CURRENT_USER")) {
                console.log(localStorage.getItem("CURRENT_USER") + " === " + author.username)
                isThisUserAuthor = true
            }
            //console.log(author_str)
        }

        document.getElementById("Authors").innerHTML = author_str;

        that.setState({
            title: title,
            rule: rule,
            description: description,
            identifier: identifier,
            owner: owner_string,
            authors: author_str,
            isUserAuthor: isThisUserAuthor,

        });
    }


    setPostsContent(msgs, authors, that) {
        let output_str = "<br/>"
        var amIAuthor = false;
        for (let msg of msgs) {

            let author_id = msg.author;
            let author_name

            for (let author_ of authors) {
                if (author_.id == author_id) {
                    author_name = author_.username;
                }
                if (localStorage.getItem("CURRENT_USER_ID") == author_.id) {
                    amIAuthor = true
                }

            }
            console.log("AM I AUTHOR: " + amIAuthor);
            let msgBody = msg.body;
            let stringRes = "";
            if (!amIAuthor) {
                stringRes = '<div class="row">\n' +
                    '    <div class="col">\n' +
                    '        <div class="card_new">\n' +
                    '            <div class="card-body">\n' +
                    '                <h4 class="card-title">' + msg.title + '</h4>\n' +
                    '                <h6 class="text-muted card-subtitle mb-2">' + author_name + "::: " + msg.create_time + '</h6>\n' +
                    '                <p class="card-text">' + msgBody + '</p><a class="card-link" id =like_' + msg.id + ' href="' + window.location.href + '"><i class="fa fa-plus"></i><span>' + msg.like.liked + '</span></a>\n' +
                    '                <a\n' +
                    '                    class="card-link" href="' + window.location.href + '" id="dislike_' + msg.id + '"><i class="fa fa-minus"></i><span>' + msg.like.disLiked + '</span></a>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            } else {
                stringRes = '<div class="row">\n' +
                    '    <div class="col">\n' +
                    '        <div class="card_new">\n' +
                    '            <div class="card-body">\n' +
                    '                <h4 class="card-title">' + msg.title + '</h4>\n' +
                    '                <h6 class="text-muted card-subtitle mb-2">' + author_name + "::: " + msg.create_time + '</h6>\n' +
                    '                <p class="card-text">' + msgBody + '</p><a class="card-link" id =like_' + msg.id + ' href="' + window.location.href + '"><i class="fa fa-plus"></i><span>' + msg.like.liked + '</span></a>\n' +
                    '                <a\n' +
                    '                    class="card-link" href="' + window.location.href + '" id="dislike_' + msg.id + '"><i class="fa fa-minus"></i><span>' +
                    msg.like.disLiked * (-1) +
                    '</span></a><a class="card-link" href="http://localhost:3000/postEdit/' + that.state.identifier + '/' + msg.id + '"><i class="fa fa-edit"></i>' +
                    '<span>Edit</span></a><a class="card-link" id = "delete_post_' + msg.id + '"><i class="fa fa-trash"></i><span>Delete Post</span></a></div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            }
            console.log(stringRes)
            output_str = output_str + stringRes;


        }
        return Array(output_str, amIAuthor)
    }

    componentDidMount2() {
        const that = this;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?/
        let profile_name = a.match(re)[2];
        let url = "http://127.0.0.1:8000/api/chanel/get/";
        url = url + profile_name;
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

                console.log(result)
                let obj = JSON.parse(result);
                let data = obj.data;

                that.setChannelInfo(data, that);
                const authors = data.author;
                {
                    var myHeaders2 = new Headers();
                    myHeaders2.append("Content-Type", "application/json");
                    myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

                    var requestOptions2 = {
                        method: 'GET',
                        headers: myHeaders2,
                        redirect: 'follow'
                    };
                    let url2 = "http://127.0.0.1:8000/api/posts/chanel/"; //FOR GETTING POSTS
                    url2 = url2 + profile_name;
                    fetch(url2, requestOptions2)
                        .then(response2 => {
                            return response2.json()
                        })
                        .then(function (result2) {
                            let res = that.setPostsContent(result2.msg, authors, that)
                            console.log("RES" + res)
                            let output_str = res[0];
                            console.log("OUTPUT STR" + output_str)
                            let amIAuthor = res[1];
                            document.getElementById("post-container").innerHTML = output_str;

                            setTimeout(function () {
                                that.addEventListeners(result2.msg, that, amIAuthor)
                            }, 500)

                        })
                        .catch(error2 => {
                            alert('error0 ' + error2)
                        });
                }


            })
            .catch(error => {
                alert('error0 ' + error)
            });


    }


    render() {
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }


        return (

            <div className="container">
                <div className="row text-center">
                    <div className="col-8" id="post-container">

                    </div>
                </div>
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            </div>
        )
    }

}

export default NewPostPage