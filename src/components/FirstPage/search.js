import React, {Component} from 'react';
import channels from '../../static/jsons/Channels'
import ChannelCard from "../profile/ChannelCard";

class Search extends Component {
    async insideSubmit() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        let body = ""

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
                let msg = obj.msg;
                alert(msg)

            })
            .catch(error => {
                alert('error' + error)
            });


    }

    render() {
        return (
            <div className="container">


            </div>
        )
    }

}

export default Search