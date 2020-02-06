import React, {Component} from 'react'
import "./style.css"
import UserCard from "./UserCard";
import data from "../../static/jsons/profiles";
import Follow from "./follow";
import Edit from "./edit";

class Followers extends Component {
    state = {
        users: [],
    }

    componentDidMount() {
        console.log(data)
        this.setState({
            users: data
        })

    }

    render() {
        let temp
        if ((this.props.flag))
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    {temp}
                </nav>
                <h2>Follwers</h2>
                <div className="row">
                    {this.state.users.map((user) => {
                        if (this.props.user.followers.includes(user.id))
                            return (
                                <UserCard user={user}/>
                            )
                    })}
                </div>
            </div>
        )
    }
}

export default Followers