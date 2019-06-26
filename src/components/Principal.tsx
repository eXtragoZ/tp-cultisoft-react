import React, { Component, ReactNode } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Cultivos, { Cultivo } from './Cultivos';
import Login from './Login';
import { Usuario } from './Principal';

class Principal extends Component<{}, State> {
    state: State = {};

    onLogin = (usuario: Usuario) => {
        this.setState({ usuario });
    };

    render(): ReactNode {
        const { usuario } = this.state;
        return (
            <Jumbotron fluid style={ { minHeight: 'calc(100vh - 56px)', margin: 0 } }>
                { usuario ? (
                    <Cultivos cultivos={ usuario.cultivos } />
                ) : (
                    <Login onLogin={ this.onLogin } />
                ) }
            </Jumbotron>
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

export default Principal;
