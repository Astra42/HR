import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './hocs/Layout';

import './css/index.css';

import Home from './containers/index/Home';
import Vacancies from './containers/vacancies/Vacancies';
import Vacancy from './containers/vacancies/Vacancy';
import AddVacancy from './containers/vacancies/AddVacancy';
import Signup from './containers/auth/Signup';
import Profile from './containers/auth/Profile';
import Login from './containers/auth/Login';
import AddResume from './containers/resumes/AddResume';
import Resumes from './containers/resumes/Resumes';
import Resume from './containers/resumes/Resume';
import UpdateProfile from './containers/auth/UpdateProfile';
import PrivateRoute from './containers/auth/PrivateRoute';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='*' element={<Navigate to='/' />} />

                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                <Route
                    path='/'
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/profile/update'
                    element={
                        <PrivateRoute>
                            <UpdateProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/vacancies'
                    element={
                        <PrivateRoute>
                            <Vacancies />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/vacancies/:slug'
                    element={
                        <PrivateRoute>
                            <Vacancy />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/vacancies/add'
                    element={
                        <PrivateRoute>
                            <AddVacancy />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/resumes'
                    element={
                        <PrivateRoute>
                            <Resumes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/resumes/:slug'
                    element={
                        <PrivateRoute>
                            <Resume />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/resumes/add'
                    element={
                        <PrivateRoute>
                            <AddResume />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Layout>
    );
}

export default App;
