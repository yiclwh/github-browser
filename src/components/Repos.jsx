import React from 'react';
import GithubRepo from "./GithubRepo";
import InfiniteScroll from 'react-infinite-scroll-component';

class Repos extends React.Component {
    constructor() {
        super();
        this.state={
         page: 1,
         repos: [],
         hasMore: true,
         isLoading: false
        };
    }

    fetchData(){
      if(this.state.isLoading || !this.state.hasMore){
         return;
       }
        var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=c928d47fdada7099bc8e145e17acc48e714f0c73&page=${this.state.page}&per_page=50`;
        this.state.isLoading = true;
        fetch(url)
        .then(response => response.json())
        .then(
         data => {
              this.setState({
                 repos: this.state.repos.concat(data),
                 page: this.state.page + 1,
                 hasMore: data.length!==0,
                 isLoading: false
              })
           }
        )
     }

     componentDidMount(){
        this.fetchData();
     }
     
     componentDidUpdate(prevProps, prevState){
        if(prevProps.username !==this.props.params.username){
           this.fetchData();
        }
     }

     render() {
         if (!this.state.repos){
             return <div>LOADING REPOS....</div>
         }
         return(
            <div className="repo-page">
                <h3>{this.props.params.username} repos include </h3>
                <InfiniteScroll
                dataLength={this.state.repos.length}
                next={this.fetchData()}
                hasMore={!this.state.isLoading && this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>All Repos Are Showing</b>
                    </p>
                }
               >
                    {this.state.repos.map((repoInfo, i) => <GithubRepo repo={repoInfo} key={i}/>)}
               </InfiniteScroll>
         </div>
         )
     }
}

export default Repos;