import React from 'react';
import GithubUser from './GithubUser';
import InfiniteScroll from 'react-infinite-scroll-component';

class Followers extends React.Component {
    constructor() {
        super();
        this.state={
           page: 1,
           followers: [],
           hasMore: true,
           isLoading: false
        };
    }

    fetchData(){
        if(this.state.isLoading || !this.state.hasMore){
			 return;
		  }
        this.state.isLoading = true;
        var url = `https://api.github.com/users/${this.props.params.username}/followers?access_token=c928d47fdada7099bc8e145e17acc48e714f0c73&page=${this.state.page}&per_page=50`;
  
        fetch(url)
        .then(response => response.json())
        .then(
           data => {
              this.setState({
                 followers: this.state.followers.concat(data),
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
        //console.log(this.state, "My props")
        if(!this.state.followers){
            return <div>LOADING FOLLOWERS....</div>
         }
         return(
            <div className = "followers-page">
               <h3>Followers of {this.props.params.username}</h3>
               <InfiniteScroll
                dataLength={this.state.followers.length}
                next={this.fetchData()}
                hasMore={!this.state.isLoading && this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>All Followers Are Showing</b>
                    </p>
                }
              >
                  {this.state.followers.map((followerInfo, i) => <GithubUser user={followerInfo} key={i}/>)}
              </InfiniteScroll>
            </div>
         )
    }
};

export default Followers;