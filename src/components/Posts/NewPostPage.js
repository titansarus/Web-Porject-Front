import React, {Component} from 'react';
import "./topic.css"
import {Redirect} from "react-router-dom";
import {Editor} from "react-draft-wysiwyg";
import {EditorState, convertToRaw, ContentState, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import {convertFromHTML} from 'draft-convert'
import "./post.css";
import Comment from "./Comment";
import data from "../../static/jsons/posts";
import Post from "./Post";

class comment {

    constructor(id_, content_, post_id_, derived_comment_, author_username_, like_, dislike_) {
        this.id = id_;
        this.contents = content_;
        this.post_id = post_id_;
        this.Parent = derived_comment_;
        this.author_username = author_username_;
        this.likes = like_;
        this.dislikes = dislike_;
        this.children = [];

    }


}

class NewPostPage extends Component {

    constructor() {
        super()

        this.state = {
            title: "",
            body: "",
            author: "",
            date: "",
            like: 0,
            dislike: 0,
            comments: [],
            channel: "",
            id: -1,
            editorState: EditorState.createEmpty(),
            post_id: 0,

        };
    }

    onEditorStateChange(editorState) {


        this.setState({
            editorState,
            id: this.state.id,
        });
    }

    buildHierarchy(arry) {
        console.log("INSIDE_HIEARARCH")

        var roots = [], children = {};

        // find the top level nodes and hash the children based on parent
        for (var i = 0, len = arry.length; i < len; ++i) {
            var item = arry[i],
                p = item.Parent,


                target = !p ? roots : (children[p] || (children[p] = []));
            // console.log("parent:"+p)

            target.push({value: item});
        }

        // function to recursively build the tree
        var findChildren = function (parent) {
            if (children[parent.value.id]) {
                parent.children = children[parent.value.id];
                for (var i = 0, len = parent.children.length; i < len; ++i) {
                    findChildren(parent.children[i]);
                }
            }
        };

        // enumerate through to handle the case where there are multiple roots
        for (var i = 0, len = roots.length; i < len; ++i) {
            findChildren(roots[i]);
        }

        console.log("END_HIEREARCH")
        return roots;
    }


    componentDidMount() {
        console.log("SOMETHING")
        const that = this;
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/PostView\/(\w+)\/(\w+)\/?$/
        let a = window.location.href;
        let channelName = a.match(re)[2];
        let post_id = a.match(re)[3];
        let url = "http://127.0.0.1:8000/api/posts/" + post_id;
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var author_id = 0;

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


                that.setState({
                    channel: msg.chanel,
                    title: msg.title,
                    body: msg.body,
                    like: msg.like.liked,
                    dislike: msg.like.disLiked,
                    date: msg.create_time,
                    id: msg.id,
                    post_id: post_id
                })
                author_id = msg.author;
                var myHeaders3 = new Headers();
                myHeaders3.append("Content-Type", "application/json");
                myHeaders3.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))
                let url2 = "http://127.0.0.1:8000/api/chanel/get/" + channelName;
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
                        for (let i = 0; i < len; i++) {
                            if (authors[i].id == author_id) {
                                that.setState({
                                    author: authors[i].username
                                })
                            }
                        }

                        that.addEventListeners(that.state.id, that, false)


                        console.log(that.state)


                        var myHeaders4 = new Headers();
                        myHeaders4.append("Content-Type", "application/json");
                        myHeaders4.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"));
                        let url3 = "http://127.0.0.1:8000/api/comment/post/" + that.state.post_id;
                        var requestOptions3 = {
                            method: 'GET',
                            headers: myHeaders4,
                            redirect: 'follow'
                        };

                        fetch(url3, requestOptions3)
                            .then(response => response.text())
                            .then(function (result) {

                                let obj = JSON.parse(result);
                                let comment_list = []
                                console.log("COMMENT" + result)
                                console.log(obj.data)

                                /*
                                0:
id: 1
owner: {username: "namjoo", first_name: "amir", last_name: "namjoo", picture: null, city: "Tehran", …}
like: {liked: 0, disLiked: 0}
body: "good"
post: 6
comment: null
                                 */
                                let comment_tree = null;
                                for (let comment__ of obj.data) {
                                    let parent = comment__.comment
                                    if (comment__.comment == null) {
                                        parent = "";
                                    }
                                    let coMM = new comment(comment__.id, comment__.body, comment__.post, parent, comment__.owner.username, comment__.like.liked, comment__.like.disLiked);
                                    comment_list.push(coMM)


                                }
                                comment_tree = that.buildHierarchy(comment_list);
                                that.setState({
                                    comments: comment_tree
                                });
                                console.log("COMMENT:TREE")
                                console.log(comment_tree)
                                console.log(that.state.comments)

                            })
                            .catch(error => {
                                alert('error' + error)
                            });

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

    async addEventListeners(id, that, amIAuthor) {

        console.log("MSG.id: " + id)
        document.getElementById("like_" + id).addEventListener("click", function () {
            that.addLikeDislike(1, id)
        });

        document.getElementById("dislike_" + id).addEventListener("click", function () {
            that.addLikeDislike(-1, id)
        });
        // if (amIAuthor) {
        //
        //     document.getElementById("delete_post_" + msg.id).addEventListener("click", function () {
        //
        //         const Swal = require('sweetalert2')
        //         Swal.fire({
        //             title: 'Are you sure?',
        //             text: "You won't be able to revert this!",
        //             icon: 'warning',
        //             showCancelButton: true,
        //             confirmButtonColor: '#3085d6',
        //             cancelButtonColor: '#d33',
        //             confirmButtonText: 'Yes, delete it!'
        //         }).then((result) => {
        //             if (result.value) {
        //                 that.deletePost(msg.id).catch((error) => {
        //
        //                 })
        //                 Swal.fire(
        //                     'Deleted!',
        //                     'Your Post has been deleted.',
        //                     'success'
        //                 ).then((result) => {
        //                     window.location.reload(true);
        //                 })
        //             }
        //         })
        //     })
        // }

    }

    // async setChannelInfo(data, that) {
    //     let title = data.title;
    //     if (!title) {
    //         title = "NO TITLE";
    //     }
    //     let rule = data.law;
    //     if (!rule) {
    //         rule = "NO RULES"
    //     }
    //     let description = data.description;
    //     if (!description) {
    //         description = "NO DESCRIPTION"
    //     }
    //     let identifier = data.identifier;
    //     let owners = data.owner;
    //     var authors = data.author;
    //
    //     let owner_string = owners.username
    //     //console.log(authors)
    //     let isThisUserAuthor = false;
    //     let author_str = ""
    //     for (let author of authors) {
    //         // console.log("AUTHORAR: "+author)
    //         author_str = author_str + "<a href=\"http://localhost:3000/profile/other/" + author.username + "\">" + author.username + "</a> <br/>"
    //         //console.log(author_str)
    //     }
    //     for (let author of authors) {
    //
    //         if (author.username === localStorage.getItem("CURRENT_USER")) {
    //             console.log(localStorage.getItem("CURRENT_USER") + " === " + author.username)
    //             isThisUserAuthor = true
    //         }
    //         //console.log(author_str)
    //     }
    //
    //     document.getElementById("Authors").innerHTML = author_str;
    //
    //     that.setState({
    //         title: title,
    //         rule: rule,
    //         description: description,
    //         identifier: identifier,
    //         owner: owner_string,
    //         authors: author_str,
    //         isUserAuthor: isThisUserAuthor,
    //
    //     });
    // }


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

    async sumbitComment() {
        const that = this;
        //
        //let pic = document.getElementById("file").value;

        let edState = this.state.editorState;
        // console.log(draftToHtml(convertToRaw(edState.getCurrentContent())))
        let content = draftToHtml(convertToRaw(edState.getCurrentContent()));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))


        var raw = JSON.stringify({
            "body": content,
            "post": that.state.post_id,
            "comment": null
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://127.0.0.1:8000/api/comment/", requestOptions)
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
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }

        let element = '<div class="row">\n' +
            '    <div class="col">\n' +
            '        <div class="card_new">\n' +
            '            <div class="card-body">\n' +
            '                <h4 class="card-title">' + this.state.title + '</h4>\n' +
            '                <h6 class="text-muted card-subtitle mb-2">' + this.state.author + "::: " + this.state.date + '</h6>\n' +
            '                <p class="card-text">' + this.state.body + '</p><a class="card-link" id =like_' + this.state.id + ' href="' + window.location.href + '"><i class="fa fa-plus"></i><span>' + this.state.like + '</span></a>\n' +
            '                <a\n' +
            '                    class="card-link" href="' + window.location.href + '" id="dislike_' + this.state.id + '"><i class="fa fa-minus"></i><span>' + this.state.dislike + '</span></a>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        const editorStyle = {
            border: '1px solid black',
            padding: '5px',
            borderRadius: '5%',
            height: '150px',
            width: '100%',
        };
        console.log("BEFORE RENDER ")
        console.log(this.state)
        let comm = <br/>
        const that = this;

        if (this.state.comments.length > 0) {

            return (


                <div className="container">
                    <div className="row text-center">

                        <div className="post_container" dangerouslySetInnerHTML={{__html: element}}></div>

                        <div className="form-group shadow-textarea">
                            <label htmlFor="description">Content</label>
                            <p id="reply_to_comment_id">nothing</p>
                            <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorStyle={editorStyle}
                                onEditorStateChange={this.onEditorStateChange.bind(this)}
                            />

                        </div>

                        <button className="btn btn-primary" onClick={this.sumbitComment.bind(this)}
                                type="submit">Comment to
                            Post
                        </button>


                    </div>
                    {
                        this.state.comments.map(
                            (comment) => {
                                return (
                                    <li>
                                        <Comment comment={comment}/>
                                    </li>
                                )
                            }
                        )
                    }

                    <script src="assets/js/jquery.min.js"></script>
                    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                </div>
            )
        } else {
            return (


                <div className="container">
                    <div className="row text-center">

                        <div className="post_container" dangerouslySetInnerHTML={{__html: element}}></div>

                        <div className="form-group shadow-textarea">
                            <label htmlFor="description">Content</label>
                            <p id="reply_to_comment_id">nothing</p>
                            <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorStyle={editorStyle}
                                onEditorStateChange={this.onEditorStateChange.bind(this)}
                            />

                        </div>

                        <button className="btn btn-primary" onClick={this.sumbitComment.bind(this)}
                                type="submit">Comment to
                            Post
                        </button>


                    </div>

                    <script src="assets/js/jquery.min.js"></script>
                    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                </div>
            )
        }

    }

}

export default NewPostPage