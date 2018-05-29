import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyTickSlider from './tickSlider/MyTickSlider';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React tick slider</h1>
                </header>
                <section className="App-content">
                    <MyTickSlider />
                </section>
            </div>
        );
    }
}

export default App;
