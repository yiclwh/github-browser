import React from "react";
import PropTypes from 'prop-types';

class GithubRepo extends React.Component{
   static propTypes = {
      repo: PropTypes.object.isRequired
   }

   render(){
      return(
         <a href={this.props.repo.html_url}>
            <p>{this.props.repo.full_name}</p>
         </a>
      )
   }
}



export default GithubRepo;