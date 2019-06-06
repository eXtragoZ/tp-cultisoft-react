import React, { Component, ReactNode } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import Cultivos from './Cultivos';

class Principal extends Component {
    render(): ReactNode {
        return (
            <Jumbotron fluid style={ { minHeight: 'calc(100vh - 56px)', margin: 0 } }>
                <Container>
                    <h2>Mis cultivos</h2>
                    <br />
                    <Cultivos />
                </Container>
            </Jumbotron>
        );
    }
}

export default Principal;
