import React, { Component } from 'react';
import {firestore, auth} from "../firebase";
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

  this.unsubscribeFromAuth = auth.onAuthStateChanged(user=>{
    this.setState({user});
    console.log(user);
  });
}

componentWillUnmount=()=>{
  this.unsubscribeFromFireStore();
}

  

  render() {
    const { posts ,user} = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts}   />
      </main>
    );
  }
}

export default Application;
