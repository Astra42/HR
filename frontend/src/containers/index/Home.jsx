import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

function Home(props) {
    return (
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>HR App</h1>
                <hr className='my-4' />
                <p className='lead'>Описание будет добавлено в следующем patch'е</p>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, { logout })(Home);
