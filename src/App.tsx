import React, { Component, ReactNode } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Cultivos, { Cultivo } from './components/Cultivos';
import Login from './components/Login';
import Menu from './components/Menu';
import Guias from './components/Guias';

class App extends Component<{}, State> {
    state: State = {};

    onLogin = (usuario: Usuario) => {
        this.setState({ usuario });
    };
    render(): ReactNode {
        const { usuario } = this.state;
        console.log(usuario);
        return (
            <Router>
                <div className='App'>
                    <Menu />
                    <Jumbotron fluid style={ { minHeight: 'calc(100vh - 56px)', margin: 0 } }>
                        <Switch>
                            { usuario && <Redirect from='/login' to='/cultivos' /> }
                            <Route path='/login'>
                                <Login onLogin={ this.onLogin } />
                            </Route>
                            { !usuario && <Redirect to='/login' /> }
                            <Route path='/cultivos'>
                                { usuario && <Cultivos usuario={ usuario } /> }
                            </Route>
                            <Route path='/guias'>
                                { usuario && <Guias usuario={ usuario } /> }
                            </Route>
                            <Redirect to='/login' />
                        </Switch>
                    </Jumbotron>
                </div>
            </Router>
        );
    }
}
interface State {
    usuario?: Usuario;
}

export interface Usuario {
    id: number;
    cultivos: Cultivo[];
}

export default App;
