import moment from 'moment';
import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import { Button, Col, Form, FormControlProps, InputGroup, Modal } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';
import { Actuador } from './Cultivos';

class EjecutarComando extends Component<Props> {
    opciones = ['Prender', 'Apagar'];

    state = {
        abierto: false,
        listo: false,
        cargando: false,
        opcion: this.opciones[0],
        desde: moment().format('hh:ss'),
        hasta: moment()
            .add(1, 'hour')
            .format('hh:ss'),
        actuador: undefined,
    };

    abrir: MouseEventHandler = () => {
        this.setState({ abierto: true });
    };

    cerrar = () => {
        this.setState({ abierto: false });
    };

    terminar = () => {
        this.setState({ listo: false });
    };

    enviar = async () => {
        this.setState({ cargando: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.setState({ abierto: false, listo: true, cargando: false });
    };

    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value });
    };

    render(): ReactNode {
        const { children, actuadores } = this.props;
        return (
            <Fragment>
                <Button variant="outline-dark" onClick={ this.abrir }>
                    { children }
                </Button>
                <Modal show={ this.state.abierto } onHide={ this.cerrar } centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Ejecutar comando
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={ this.enviar }>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="accion">
                                    <Form.Label>Acción</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ this.state.opcion }
                                        onChange={ this.handleChange }>
                                        { this.opciones.map((opcion) => (
                                            <option key={ opcion }>{ opcion }</option>
                                        )) }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="actuador">
                                    <Form.Label>Actuador</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ this.state.actuador }
                                        onChange={ this.handleChange }>
                                        { actuadores.map(({ id, descripcion }) => (
                                            <option
                                                key={ id }>{ `${descripcion} ${id}` }</option>
                                        )) }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="desde">
                                    <Form.Label>Desde</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="time"
                                            value={ this.state.desde }
                                            onChange={ this.handleChange }
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="hs">hs</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="hasta">
                                    <Form.Label>Hasta</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="time"
                                            value={ this.state.hasta }
                                            onChange={ this.handleChange }
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="hs">hs</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ this.cerrar }>
                            Cerrar
                        </Button>
                        <Button onClick={ this.enviar } disabled={ this.state.cargando }>
                            { this.state.cargando ? (
                                <PacmanLoader
                                    size={ 10 }
                                    color="#ffc107"
                                    css={ 'margin: 2px 40px 12px 0px;' }
                                />
                            ) : (
                                'Enviar'
                            ) }
                        </Button>
                    </Modal.Footer>
                </Modal>

                <SweetAlert
                    success
                    title="Listo!"
                    onConfirm={ this.terminar }
                    show={ this.state.listo }>
                    Tu comando fue enviado!
                </SweetAlert>
            </Fragment>
        );
    }
}

interface Props {
    children: ReactNode;
    actuadores: Actuador[];
}

export default EjecutarComando;
