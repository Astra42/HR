import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';

import Layout from './hocs/Layout';

import './css/index.css';

import Home from './containers/index/Home'
import Vacancies from './containers/vacancies/Vacancies'
import Vacancy from './containers/vacancies/Vacancy'
import AddVacancy from './containers/vacancies/AddVacancy'
import Signup from './containers/auth/Signup'
import Profile from './containers/auth/Profile'
import Login from './containers/auth/Login'
import AddResume from './containers/resumes/AddResume'


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
