import React, {Component} from 'react'
import "./style.css"

class ChannelCard extends Component {
    render() {
        return (
            <div className="card col-md-3">
                <div className="card-body">
                    <h6 className="card-title">{this.props.channel.chanel.identifier}</h6>

                </div>
            </div>
        )
    }
}
export default ChannelCard