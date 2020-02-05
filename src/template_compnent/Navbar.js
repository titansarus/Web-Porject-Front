import React, {Component} from 'react'
import logo from "../static/img/reddit-logo.png"
import {Link} from 'react-router-dom'

class Navbar extends Component {

    logout() {
        localStorage.removeItem("ACCESS_TOKEN")
        this.forceUpdate();
    }

    render() {

        if (localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined) {
            console.log("NAVBAR")
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/"><img
                    style={{width: "40px", height: "40px"}} src={logo}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/Home">Home <span className="sr-only">(current)</span></a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/notification">Notification <span><i
                                className="fas fa-bell"></i></span></a>
                        </li>


                    </ul>


                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    {(!(localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("ACCESS_TOKEN") != undefined)) ? (
                            <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                                <li className="nav-item btn-primary btn-sm" style={{margin: "5px"}}>
                                    <a className="nav-link" href="/sign" style={{color: "white"}}>Sign In</a>
                                </li>
                                <li className="nav-item btn-success btn-sm">
                                    <a className="nav-link" href="/signUp" style={{color: "white"}}>Sign Up</a>
                                </li>
                            </ul>
                        ) :
                        (
                            <ul className="form-inline my-2 my-lg-0 navbar-nav" style={{margin: "10px"}}>
                                <li className="nav-item btn-primary btn-sm">
                                    <a className="nav-link" href="/profile" style={{color: "white"}}>Profile</a>
                                </li>
                                <li className="nav-item btn-danger btn-sm" style={{margin: "5px"}}>
                                    <a className="nav-link" href="/sign" onClick={this.logout.bind(this)}
                                       style={{color: "white"}}>Log Out</a>
                                </li>


                            </ul>)}
                </div>
            </nav>


        );

    }
}

export default Navbar