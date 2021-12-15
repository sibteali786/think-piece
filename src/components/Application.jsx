import React, { Component } from 'react';
import { auth, createUserProfileDocument} from "../firebase";

import Posts from './Posts';
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    user:null,
  };

unsubscribeFromAuth = null;
componentDidMount = async ()=>{
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
    return (
      
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication />
        <Posts   />
      </main>
    );
  }
}

export default Application;
