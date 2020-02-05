import React, {Component} from 'react'


class profile extends Component {
    render() {
        return (
            <div className="card-body">
                <img className="col-3 img" src="" alt=""/>
                <h2 className="card-title">{this.props.user.name}</h2>
                <div className="row">
                    <div className="col-3 item">
                        <a href="/profile/followers">
                            {this.props.user.followers.length}<br/>
                            follwers
                        </a>
                    </div>
                    <div className="col-3 item">
                        <a href="/profile/following">
                            {this.props.user.followingUsers.length + this.props.user.followingChannels.length}<br/>
                            following
                        </a>
                    </div>
                    <div className="col-3 item">
                        {this.props.user.posts.length}<br/>
                        posts
                    </div>
                    <div id="posts"></div>
                </div>
            </div>
        )
    }
}
export default profile