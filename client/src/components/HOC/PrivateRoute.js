import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            return <Component {...props} />
        } else {
            return <Redirect to={`/admin/signin`} />
        }
    }} />
}

export default PrivateRoute
