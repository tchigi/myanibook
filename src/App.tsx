import React from 'react';
import './App.css';
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage"
import AnimeList from "./pages/AnimeList"
import NotFoundPage from "./pages/NotFoundPage";
import UserInfo from './pages/UserInfo'
import AuthLogIn from './pages/AuthLogIn'
import AuthSignUp from './pages/AuthSignUp'

function App() {
    return (
        <div className={'wrapper'}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="anime" element={<AnimeList/>}/>
                    <Route path="user" element={<UserInfo/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
                <Route path="login" element={<AuthLogIn/>}/>
                <Route path="signup" element={<AuthSignUp/>}/>
            </Routes>
        </div>
    );
}

export default App;
