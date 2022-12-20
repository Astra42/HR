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
import EditResume from './containers/auth/EditResume';
import Resumes from './containers/resumes/Resumes';
import Resume from './containers/resumes/Resume';
import EditProfile from './containers/auth/EditProfile';
import PrivateRoute from './containers/auth/PrivateRoute';
import DepartmentVacancies from './containers/vacancies/DepartmentVacancies';
import Replies from './containers/replies/Replies';
import EditVacancy from './containers/vacancies/EditVacancy';
import ResetPassword from './containers/auth/ResetPassword';
import Reply from './containers/replies/Reply';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='*' element={<Navigate to='/' />} />

                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/reset-password' element={<ResetPassword />} />

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
                    path='/profile/edit'
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/profile/edit-resume'
                    element={
                        <PrivateRoute>
                            <EditResume />
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
                    path='/vacancies/department'
                    element={
                        <PrivateRoute>
                            <DepartmentVacancies />
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
                    path='/vacancies/:slug/replies'
                    element={
                        <PrivateRoute>
                            <Replies />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/vacancies/:slug/replies/:rslug'
                    element={
                        <PrivateRoute>
                            <Reply />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/vacancies/:slug/edit'
                    element={
                        <PrivateRoute>
                            <EditVacancy />
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
            </Routes>
        </Layout>
    );
}

export default App;
