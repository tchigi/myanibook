import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {

    return (
        <main className={'homepage-wrapper main'}>
            <div className="description-block">
                <div className="description-title">Создай свой список. Ничего не забудь!</div>
                <div className="description-text">
                    MyAnibook - это проект разработанный для создания списка просмотренных аниме.
                </div>
                <Link className={'big__button'} to={'anime'} style={{ textDecoration: 'none' , color: '#FFFFFF'}}>
                    Start
                </Link>
            </div>
            <figure className="img-block">
                <div className="img-wrap">
                    <div className="img"></div>
                </div>
            </figure>
        </main>
    )
}

export default HomePage
