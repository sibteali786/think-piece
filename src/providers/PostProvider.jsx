import React, { Component, createContext } from 'react'
import { firestore } from '../firebase'
import { collectIdsandDocs } from '../utilities'

export const PostsContext = createContext();
class PostsProvider extends Component {
    state = {posts:[]};
    unsubscribeFromFireStore = null;
    componentDidMount = () => {
        this.unsubscribeFromFireStore = firestore.collection("posts").onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsandDocs);
            this.setState({posts});
          })
    }

    componentWillUnmount = ()=> {
        this.unsubscribeFromFireStore() ;
    }
    
    render(){
        const {posts} = this.state;
        const {children} = this.props;
        return(
            <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
        );
    }
}


export default PostsProvider;