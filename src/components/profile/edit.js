import React, {Component} from 'react'
import "./style.css"

class Edit extends Component {
    render() {
        return (
            <div className="navbar-nav">
                <a className="nav-item nav-link" href="/profile" title="Profile"><i
                    className="fas fa-user"></i></a>
                <a className="nav-item nav-link" href="/profile/post" title="Write a post"><i
                    className="fas fa-pencil-alt"></i></a>
                <a className="nav-item nav-link" href="/profile/changepass" title="Change password"><i
                    className="fas fa-lock"></i></a>
                <a className="nav-item nav-link" href="/profile/edit" title="Edit profile"><i className="fas fa-edit"></i>
                </a>
                <a className="nav-item nav-link" href="/profile/makeChannel" title="Channels"><i className="fas fa-rss"></i>
                </a>
            </div>
        )
    }
}

export default Edit