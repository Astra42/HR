import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoutes({ isAuthenticated }) {
    const location = useLocation();

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />;
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, {  })(PrivateRoutes);
