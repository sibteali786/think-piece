import React, { Component } from 'react';
import {firestore, auth} from "../firebase";
import { collectIdsandDocs } from '../utilities';
import Posts from './Posts';
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    posts: [],
    User:null,
  };

unsubscribeFromFireStore = null;
unsubscribeFromAuth = null;
componentDidMount = async ()=>{

  this.unsubscribeFromFireStore = firestore.collection("posts").onSnapshot(snapshot => {
    const posts = snapshot.docs.map(collectIdsandDocs);
    this.setState({posts});
  })

  this.unsubscribeFromAuth = auth.onAuthStateChanged((user)=>{
    const User = user.multiFactor.user;
    this.setState({User});
  });
}

componentWillUnmount=()=>{
  this.unsubscribeFromFireStore();
  this.unsubscribeFromAuth();
}

  

  render() {
    const { posts ,User} = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication User={User} />
        <Posts posts={posts}   />
      </main>
    );
  }
}

export default Application;
