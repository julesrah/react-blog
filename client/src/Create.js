import React, { useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { getUser, getToken } from './helpers';
import { useNavigate } from 'react-router-dom';


const Create = () => {

    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: getUser()
    });

    // destructure values from state
    const { title, content, user } = state;
    let navigate = useNavigate()

    // onchange event handler
    const handleChange = name => event => {
        console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };
    console.log(state);

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
        .post(`${process.env.REACT_APP_API}/post`, { title, content, user },{
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
        .then(response => {
            console.log(response);

            // empty state
            setState({ ...state, title: '', content: '', user: '' });
            // setState('');

            // show sucess alert
            alert(`Post titled ${response.data.title} is created`);
            return navigate("/");
        })
            //error response
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    // function handleChange(name) {
    //     return function(event) {
    //         setState({ ...state, [name]: event.target.value });
    //     };
    // }




//FORM
    return (

        <div className="container p-5">
        <Nav/>
            <h1>CREATE POST</h1>
            <br />
            {JSON.stringify(state)}
            <form  onSubmit={handleSubmit}>
             <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input
                        onChange={handleChange('title')}
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea
                        onChange={handleChange('content')}
                        value={content}
                        type="text"
                        className="form-control"
                        placeholder="Write something.."
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
//END FORM
};

export default Create;