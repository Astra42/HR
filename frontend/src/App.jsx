import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';

import Layout from './hocs/Layout';

import './css/index.css';

import Home from './containers/Home';
import Vacancy from './containers/Vacancy'
import Signup from './containers/Signup';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Activate from './containers/Activate';
import Vacancies from './containers/Vacancies';
import Profile from './containers/Profile';
import AddVacancy from './containers/AddVacancy';
import AddResume from './containers/AddResume';

function App(props) {
    return (
        <Provider store={props.store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/vacancies/' element={<Vacancies />} />
                        <Route path='/vacancies/add' element={<AddVacancy />} />
                        <Route path='/vacancies/:slug' element={<Vacancy />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/resumes/add' element={<AddResume />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
