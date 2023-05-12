import './App.scss';

import React from 'react';

import logo from './assets/images/logo.svg';

function App() {
    return (
        <div className='app'>
            <header className='app-header'>
                <img src={logo} className='app-logo' alt='logo' />
                <p>Loading...</p>
                <h1>Balaji's Personal Portfolio</h1>
            </header>
            <section></section>
        </div>
    );
}

export default App;
