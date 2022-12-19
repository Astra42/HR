import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoute({ isAuthenticated, children }) {
    const location = useLocation();

    return isAuthenticated ? children : <Navigate to='/login' replace state={{ from: location }} />;
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, {  })(PrivateRoute);
