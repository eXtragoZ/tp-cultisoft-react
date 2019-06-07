import React, { Component, ReactNode } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Cultivos from './Cultivos';

class Principal extends Component {
    render(): ReactNode {
        return (
            <Jumbotron fluid style={ { minHeight: 'calc(100vh - 56px)', margin: 0 } }>
                <h2>Mis cultivos</h2>
                <br />
                <Cultivos />
            </Jumbotron>
        );
    }
}

export default Principal;
