import React, {Component} from 'react';
import NewFollowers from "./NewFollowers/NewFollowers";
import data from "../static/jsons/profiles"
import newComments from '../static/jsons/NewComments'
import NewComment from "./NewComments/NewComment";

class NotificationPage extends Component {
    state = {
        usersData : [],
        newComments:[]
    }

    componentDidMount() {
        console.log(data)
        this.setState({
            usersData : data,
            newComments : newComments
        })
        console.log(this.state.usersData)
    }

    render() {
        console.log(this.state.usersData)
        return(
            <div className="container">
                {this.state.usersData.map((user) => {
                       return(
                           <NewFollowers user={user}/>
                       )
                   })}
                {this.state.newComments.map((comment) => {
                    return(
                        <NewComment comment={comment}/>
                    )
                })}
            </div>
        )
    }
}
export default NotificationPage