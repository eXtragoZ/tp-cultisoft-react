import React, { Component, ReactNode } from 'react';
import { Button, Col, Form, FormControlProps, Modal } from 'react-bootstrap';
import { PacmanLoader } from 'react-spinners';
import cultiFetch from '../CultiAPI';
import { Usuario } from './Principal';

class Login extends Component<Props> {
    state = {
        cargando: false,
        usuario: '',
        password: '',
        error: undefined,
        loginDeshabilitado: false,
    };

    login = async () => {
        const { onLogin } = this.props;
        const { usuario, password } = this.state;
        this.setState({ cargando: true, error: undefined });
        try {
            const json = await cultiFetch('usuario/login/', { usuario, password });
            onLogin(json.usuario as Usuario);
        } catch (error) {
            if (error.message === 'Incorrecto') {
                this.setState({
                    error: 'Usuario y Contraseña incorrecto',
                    loginDeshabilitado: true,
                });
            } else if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
        this.setState({ cargando: false });
    };

    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value,
            error: undefined,
            loginDeshabilitado: false,
        });
    };

    loginDeshabilitado = () => {
        const { cargando, usuario, password, loginDeshabilitado } = this.state;
        if (cargando || loginDeshabilitado || !usuario || !password) {
            return true;
        }
    };

    render(): ReactNode {
        const { cargando, usuario, password, error } = this.state;
        return (
            <Modal show onHide={ () => {} } centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ this.login }>
                        <Form.Row>
                            <Form.Group as={ Col } controlId="usuario">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    value={ usuario }
                                    onChange={ this.handleChange }
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={ Col } controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={ password }
                                    onChange={ this.handleChange }
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    { error && <div style={ { color: 'red' } }>{ error }</div> }
                    <Button onClick={ this.login } disabled={ this.loginDeshabilitado() }>
                        { cargando ? (
                            <PacmanLoader
                                size={ 10 }
                                color="#ffc107"
                                css={ 'margin: 2px 40px 12px 0px;' }
                            />
                        ) : (
                            'Entrar'
                        ) }
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

interface Props {
    onLogin: (usuario: Usuario) => void;
}

export default Login;
