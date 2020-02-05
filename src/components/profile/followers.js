import React, {Component} from 'react'
import "./style.css"
import UserCard from "./UserCard";
import data from "../../static/jsons/profiles";

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
        return (
            <div className="container">
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