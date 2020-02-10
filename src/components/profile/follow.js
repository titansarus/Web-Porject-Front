import React, {Component} from 'react'
import "./style.css"

class Follow extends Component {
    state = {
        shouldShowFollow: true,

    }

    componentDidMount() {
        const that = this;
        console.log(that)

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
                //let user_data = obj.data.user_data;
                let following = obj.data.following;


                let a = window.location.href
                let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/?$/
                let profile_name = a.match(re)[2];
                for (const vari of following) {
                    console.log("INSIDE FOR:" + vari.chanel.identifer)
                    if (vari.chanel.identifier === profile_name) {
                        that.setState({
                            shouldShowFollow: false,
                        })

                    } else
                        that.setState({
                            shouldShowFollow: true,
                        })
                }


            })
            .catch(error => {
                // alert('error0 ' + error)
                //return
            });
    }

    async insideSubmit() {
        const that = this;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        let url = "http://127.0.0.1:8000/api/chanel/follow/";
        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/profile\/other\/(\w+)\/?/
        let profile_name = a.match(re)[2];

        url = url + profile_name;


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        var obj
        var msg;
        console.log("pushed")
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                obj = JSON.parse(result);
                msg = obj.msg;
                console.log("msg" + msg)


            })
            .catch(error => {
                //alert('error1 ' + error)
                //return
            });
        that.setState({shouldShowFollow: !that.state.shouldShowFollow})


    }

    render() {
        let button;
        // if(this.props.me.follow)
        //     button = <a href="#" class="nav-item nav-link activer" title="unfollow"><i className="	fas fa-user-minus"></i> </a>;
        // else
        if (!(this.state.shouldShowFollow))
            button =
                <a href={window.location.href} onClick={this.insideSubmit.bind(this)}
                   className="nav-item nav-link activer"
                   title="unfollow"><i
                    className="	fas fa-user-minus"></i> </a>;
        else
            button = <a href={window.location.href} onClick={this.insideSubmit.bind(this)}
                        className="nav-item nav-link active" title="Follow"><i
                className="fas fa-user-plus"></i> </a>;
        return (
            <div className="navbar-nav">
                {button}
            </div>
        )
    }
}

export default Follow