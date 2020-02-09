import React, {Component} from 'react'
import "../profile/style.css"
import {Editor} from "react-draft-wysiwyg";
import {EditorState, convertToRaw, ContentState, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import {convertFromHTML} from 'draft-convert'

class EditComment extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            id: -1,
        };
        this.insideSubmit = this.insideSubmit.bind(this)
    }

    onEditorStateChange(editorState) {


        this.setState({
            editorState,
            id: this.state.id,
        });
    }

    componentDidMount() {
        const convertFromHTML = require('draft-convert').convertFromHTML;
        const that = this;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))



        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/commentEdit\/(\w+)\/(\w+)\/?$/;
        let post_identifier = a.match(re)[2];
        let comment_identifier = a.match(re)[3];
        let url = "http://127.0.0.1:8000/api/comment/post/" + post_identifier;

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function (result) {
                let data = result.data;
                console.log(result.data)
                let body
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == comment_identifier) {
                        body = data[i].body;
                    }
                }
                console.log(body)


                var contentState = convertFromHTML(body);
                let editorState_ = EditorState.createWithContent(contentState);
                console.log(editorState_);
                that.setState({
                    editorState: editorState_
                });


            })
            .catch(error => {
                //alert('error' + error)
            });

    }

    async insideSubmit() {
        //
        //let pic = document.getElementById("file").value;

        let edState = this.state.editorState;
        // console.log(draftToHtml(convertToRaw(edState.getCurrentContent())))
        let content = draftToHtml(convertToRaw(edState.getCurrentContent()));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))




        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/commentEdit\/(\w+)\/(\w+)\/?$/;
        let post_identifier = a.match(re)[2];
        let comment_identifier = a.match(re)[3];

        var raw = JSON.stringify({
            "body": content,

        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = "http://127.0.0.1:8000/api/comment/update/" + comment_identifier;
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                const Swal = require('sweetalert2')
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: true,

                }).then((result2) => {
                    if (result2.value) {
                        window.history.go(-1)
                    }
                })

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
                    <div className="card col-8">
                        {/*<nav className="navbar navbar-expand-lg navbar-light">*/}
                        {/*    {temp}*/}
                        {/*</nav>*/}
                        <h3 className="card-title center">Edit Comment</h3>
                        <div className="card-body">
                            <div>

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

                            </div>
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

                            <hr/>
                            <hr/>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditComment