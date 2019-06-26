import React, { Component, ReactNode } from 'react';
import { Button, Col, Form, FormControlProps, Modal } from 'react-bootstrap';
import { PacmanLoader } from 'react-spinners';
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
            const response = await fetch('http://192.168.0.100:8080/usuario/login/  ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            if (json.mensaje !== 'Logueado') {
                if (json.mensaje === 'Incorrecto') {
                    this.setState({ loginDeshabilitado: true });
                    throw Error('Usuario y Contraseña incorrecto.');
                }
                this.setState({ loginDeshabilitado: true });
                throw Error(response.statusText);
            }
            // this.setState({ data: json, cargando: false });
            onLogin(json.usuario as Usuario);
        } catch (error) {
            console.log(error);
            this.setState({
                error: error.message || 'Error de conexión',
                cargando: false,
            });
        }
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
