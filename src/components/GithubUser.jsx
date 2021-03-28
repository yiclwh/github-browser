import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.Component{
    constructor(){
        super();
        //console.log(props, "My props")
        this.state = {};
    }
    
    render(){
        return(
            <div className>
                <Link className="user-info" to={`/user/${this.props.user.login}`}>
                    <img className="user-info__avatar_small" src={this.props.user.avatar_url} alt={`${this.props.user.login} avatar`}/>
                    <p className="user-info__text_small"> {this.props.user.login} </p>
                </Link>
            </div>
        )
    }
}

export default GithubUser;