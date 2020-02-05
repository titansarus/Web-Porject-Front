import React, {Component} from 'react';
import UserCard from "../profile/UserCard";
import ChannelCard from "../profile/ChannelCard";
import Users from "./../../static/jsons/profiles"


class ChannelPage extends Component {


    render() {
        return (
            <div className="container">
                <h2>{this.props.channel.name}</h2>
                <br/>
                <h3>Rules</h3>
                <hr/>
                <h4>
                    {this.props.channel.rule}
                </h4>
                <h3>Description</h3>
                <hr/>
                <h4>
                    {this.props.channel.description}
                </h4>
                <h3>Description</h3>
                <hr/>
                <h4>
                    {this.props.channel.description}
                </h4>
                <h3>Admin</h3>
                <hr/>
                {Users.map((user) => {
                    if (this.props.channel.admin === user.id)
                        return (
                            <UserCard user={user}/>
                        )
                })}
                <h3>Authors</h3>
                <hr/>
                {Users.map((user) => {
                    if (this.props.channel.authors.includes(user.id))
                        return (
                            <UserCard user={user}/>
                        )
                })}
                <div id="posts"></div>
            </div>
        )
    }

}

export default ChannelPage