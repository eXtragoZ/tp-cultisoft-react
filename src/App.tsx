import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Principal from './components/Principal';

const App: React.FC = () => {
    return (
        <div className="App">
            <Menu />
            <Principal />
        </div>
    );
};

export default App;
