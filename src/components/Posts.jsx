import React, {useContext} from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../providers/PostProvider';

const Posts = () => {
  const posts = useContext(PostsContext);
  console.log(posts);
  return (
    <section className="Posts">
      <AddPost  />
      
      {posts.map(post => <Post {...post} key={post.id} />)}
      
      
    </section>
  )
}

export default Posts;
