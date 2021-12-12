import React, { Component } from 'react';
import {firestore, auth, createUserProfileDocument} from "../firebase";
import { collectIdsandDocs } from '../utilities';
import Posts from './Posts';
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    posts: [],
    user:null,
  };

unsubscribeFromFireStore = null;
unsubscribeFromAuth = null;
componentDidMount = async ()=>{

  this.unsubscribeFromFireStore = firestore.collection("posts").onSnapshot(snapshot => {
    const posts = snapshot.docs.map(collectIdsandDocs);
    this.setState({posts});
  })

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth)=>{
    if (userAuth){
      const user = await createUserProfileDocument(userAuth);
      console.log(user);
      this.setState({user});
    }else{
      this.setState({});
    }
  });
}

componentWillUnmount=()=>{
  this.unsubscribeFromFireStore();
}
 
  

  render() {
    const { posts} = this.state;
    return (
      
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={this.state.user} />
        <Posts posts={posts}   />
      </main>
    );
  }
}

export default Application;
