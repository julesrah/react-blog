import React, { Component } from 'react';

import { Route, Navigate } from 'react-router-dom';

import { getUser } from './helpers';



const PrivateRoute = ({  children, redirectTo }) => {

    console.log(children.type.name)

       return getUser() ? children :  <Navigate to={redirectTo} />;

} ;


export default PrivateRoute;