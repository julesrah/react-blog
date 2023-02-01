// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import axios from 'axios';
import { getUser } from './helpers';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API}/posts`)
            .then(response => {
                // console.log(response);
                setPosts(response.data);
            })
            .catch(error => alert('Error fetching posts'));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            deletePost(slug);
        }
    };

    const deletePost = slug => {
        // console.log('delete', slug, ' post');
        axios
            .delete(`${process.env.REACT_APP_API}/post/${slug}`)
            .then(response => {
                alert(response.data.message);
                fetchPosts();
            })
            .catch(error => alert('Error deleting post'));
    };

    //FORM WITH UPDATE
    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>MERN CRUD</h1>
            <hr />
            {posts.map((post, i) => (
                <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        <Link to={`/post/${post.slug}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <p className="lead">{post.content.substring(0, 100)}</p>
                        <p>
                            Author <span className="badge">{post.user}</span> Published on{' '}
                            <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                        </p>
                    </div>
                    {/* <div className="col-md-2">
                        <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                            Update
                        </Link>
                        <button
                            onClick={() => deleteConfirm(post.slug)}
                            className="btn btn-sm btn-outline-danger ml-1">
                            Delete
                        </button>
                    </div> */}
                    {getUser() && (
                        <div className="col-md-2">
                            <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                                Update
                            </Link>
                            <button
                                onClick={() => deleteConfirm(post.slug)}
                                className="btn btn-sm btn-outline-danger ml-1"
                            >
                                Delete
                            </button>
                        </div>
                        )}
                </div>
            ))}
        </div>
    );
};

export default App;
