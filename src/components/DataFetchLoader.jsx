import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Posts Component
function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div>
      <Link to="/">Application Home</Link>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Loader function for posts
async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export { Posts, fetchPosts };
