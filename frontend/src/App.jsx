import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
import PrivateRoutes from './containers/auth/PrivateRoutes';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/vacancies' element={<Vacancies />} />
                    <Route path='/vacancies/:slug' element={<Vacancy />} />
                    <Route path='/vacancies/add' element={<AddVacancy />} />
                    <Route path='/resumes' element={<Resumes />} />
                    <Route path='/resumes/add' element={<AddResume />} />
                    <Route path='/resumes/:slug' element={<Resume />} />
                </Route>
            </Routes>
        </Layout>
    );
}

export default App;
