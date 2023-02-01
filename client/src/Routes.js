import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Create from './Create';
import SinglePost from './singlepost';
import UpdatePost from './UpdatePost';
import Login from './Login';
import PrivateRoute from './PrivateRoute';


const RoutedApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact="true" element={<App />} />
                {/* <Route path="/create" exact="true" element={<Create />} />
                <Route path="/post/:slug" exact="true" element={<SinglePost />} />
                <Route path="/post/update/:slug" exact="true" element={<UpdatePost />} /> */}
                <Route path="/login" exact="true" element={<Login />} />
                <Route path="/create" exact="true"
                    element={
                     <PrivateRoute redirectTo="/login">
                         <Create />
                      </PrivateRoute>
                    }
                  />
                <Route path="/post/:slug" exact="true"
                    element={
                     <PrivateRoute redirectTo="/login">
                         <SinglePost />
                      </PrivateRoute>
                    }
                  />
                <Route path="/post/update/:slug" exact="true"
                    element={
                     <PrivateRoute redirectTo="/login">
                         <UpdatePost />
                      </PrivateRoute>
                    }
                  />
            </Routes>
        </Router>
    );
};

export default RoutedApp;



