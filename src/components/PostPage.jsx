import React, { Component } from 'react'
import { firestore } from '../firebase';
import { collectIdsandDocs } from '../utilities';

import Comments from "./Comments";

class PostPage extends Component {
    state = {post:null, comments:[]};

    render(){
        return <div>
            POST PAGE!
        </div>
    }
}


export default PostPage;