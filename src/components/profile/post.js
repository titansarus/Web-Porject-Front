import React, {Component} from 'react'
import "./style.css"
import Follow from "./follow";
import Edit from "./edit";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";

class Post extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.insideSubmit = this.insideSubmit.bind(this)
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    }

    async insideSubmit() {
        const swal = require("sweetalert2");
        let title = document.getElementById("title").value;

        let edState = this.state.editorState;

        let content = draftToHtml(convertToRaw(edState.getCurrentContent()));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("title").validity.valid)) {
            swal.fire(
                "Error",
                "Some Required Field is Empty",
                "error"
            );
            return
        }
        let channelIdentifier = ""
        if (this.props.flag) {
            let a = window.location.href
            let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/post\/?$/
            channelIdentifier = a.match(re)[2];
        }
        else
            channelIdentifier = localStorage.getItem("CURRENT_USER")

        var raw = JSON.stringify({
            "chanelIdentifier": channelIdentifier,
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
                // alert(msg)

                swal.fire(
                    "Send",
                    "Post Successfully Created",
                    "success"
                )

            })
            .catch(error => {
                //alert('error' + error)
            });


    }

    uploadSubmit() {
        console.log(document.getElementById("PIC").files[0]);
        let picture = document.getElementById("PIC").files[0];
        if (!picture) {
            let swal = require("sweetalert2")
            swal.fire(
                "UPLOAD ERROR",
                "NO FILE UPLOADED",
                "error"
            )
            return
        }
        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))
        var form = new FormData();
        form.append("image", picture);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: form,
            redirect: 'follow'
        };
        let url = "http://127.0.0.1:8000/api/upload/"
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function (result) {
                console.log(result)
                let url = result.image;
                url = "http://127.0.0.1:8000" + url;
                console.log(url)
                let imgRef = document.getElementById("image_help_reference")
                imgRef.style = "visibility: visible";
                imgRef.innerHTML = imgRef.innerText + "<br/>" + url


            })
            .catch(error => {
                alert('error' + error)
            });
    }

    render() {
        let temp
        if ((this.props.flag))
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        const editorStyle = {
            border: '1px solid black',
            padding: '5px',
            borderRadius: '5%',
            height: '300px',
            width: '100%',
        };
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-10">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            {temp}
                        </nav>
                        <h3 className="card-title center">New Post Into Channel</h3>
                        <div className="card-body">
                            <div>
                                <div className="md-form">
                                    <label className="center">Title</label>
                                    <input required type="text" id="title" className="form-control" placeholder="title"
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group shadow-textarea">
                                    <label htmlFor="description">Content</label>
                                    <Editor
                                        editorState={this.state.editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        editorStyle={editorStyle}
                                        onEditorStateChange={this.onEditorStateChange.bind(this)}
                                    />

                                </div>
                                <button onClick={this.insideSubmit.bind(this)} type="submit"
                                        className="btn btn-primary">
                                    Post
                                </button>

                                <hr/>
                                <hr/>


                                <div>
                                    <h4>UPLOAD PICTURE</h4>
                                    <input id="PIC" input type="file" name="pic" accept="image/*"/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <button onClick={this.uploadSubmit.bind(this)} type="submit"
                                            className="btn btn-primary">
                                        UPLOAD PICTURE
                                    </button>
                                </div>

                                <div id="image_help_reference" style={{visibility: "hidden"}}>
                                    You Can Reference the Uploaded picture with this address:

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post