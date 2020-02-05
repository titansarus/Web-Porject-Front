import React, {Component} from 'react'
import "./style.css"

class Follow extends Component {
    state = {
        shouldShowFollow: [],

    }

    componentDidMount() {
        const that = this;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let url = "http://127.0.0.1:8000/api/account/";

        url = url + "me";


        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

                //console.log(result)
                let obj = JSON.parse(result);
                let user_data = obj.data.user_data;
                console.log(obj)
                console.log(that)


            })
            .catch(error => {
                alert('error' + error)
                return
            });
    }

    async insideSubmit() {
        let thisIS = this;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        let url = "http://127.0.0.1:8000/api/chanel/follow/";
        let a = window.location.href
        let sp = a.split('/')
        console.log("LENGTH" + sp.length)
        let profile_name = sp[sp.length - 1]

        url = url + profile_name;


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        var obj
        var msg;
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                obj = JSON.parse(result);
                msg = obj.msg;
                console.log("msg" + msg)


            })
            .catch(error => {
                alert('error' + error)
                return
            });
        console.log(msg);
        console.log(thisIS)


    }

    render() {
        let button;
        // if(this.props.me.follow)
        //     button = <a href="#" class="nav-item nav-link activer" title="unfollow"><i className="	fas fa-user-minus"></i> </a>;
        // else
        button = <a onClick={this.insideSubmit.bind(this)} className="nav-item nav-link active" title="Follow"><i
            className="fas fa-user-plus"></i> </a>;
        return (
            <div className="navbar-nav">
                {button}
            </div>
        )
    }
}

export default Follow