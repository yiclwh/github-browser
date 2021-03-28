import React from 'react';
import GithubUser from './GithubUser';
import InfiniteScroll from 'react-infinite-scroll-component';

class Following extends React.Component {
    constructor() {
        super();
        this.state={
         page: 1,
         following: [],
         hasMore: true,
         isLoading: false
        };
    }

    fetchData(){
      if(this.state.isLoading || !this.state.hasMore){
         return;
       }
        var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=c928d47fdada7099bc8e145e17acc48e714f0c73&page=${this.state.page}&per_page=50`;

        this.state.isLoading = true;
        fetch(url)
        .then(response => response.json())
        .then(
         data => {
              this.setState({
                 following: this.state.following.concat(data),
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
        if(!this.state.following){
            return <div>LOADING Following Users....</div>
         }
         return(
            <div className = "following-page">
               <h3>{this.props.params.username} is following </h3>
               <InfiniteScroll
                dataLength={this.state.following.length}
                next={this.fetchData()}
                hasMore={!this.state.isLoading && this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>All Following Are Showing</b>
                    </p>
                }
               >
                  {this.state.following.map((followingInfo, i) => <GithubUser user={followingInfo} key={i}/>)}
               </InfiniteScroll>
            </div>
         )
    }
};

export default Following;