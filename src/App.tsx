import React from 'react';
import './App.css';
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage"
import AnimeList from "./pages/AnimeList"
import BookList from "./pages/BookList"
import NotFoundPage from "./pages/NotFoundPage";
import UserAnimeList from './pages/UserAnimeList'

function App() {
    return (
        <div className={'wrapper'}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="anime" element={<AnimeList/>}/>
                    <Route path="user/animelist" element={<UserAnimeList/>}/>
                    <Route path="books" element={<BookList/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
