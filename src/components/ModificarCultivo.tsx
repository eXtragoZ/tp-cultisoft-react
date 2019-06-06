import moment from 'moment';
import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    FormControlProps,
    InputGroup,
    Modal,
} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';

class ModificarCultivo extends Component<Props> {
    opciones = ['Prender', 'Apagar'];
    actuadores = ['Actuador 5', 'Actuador 12', 'Actuador 7'];

    state = {
        abierto: false,
        listo: false,
        cargando: false,
        actuador: this.actuadores[0],
        opcion: this.opciones[0],
        desde: moment().format('hh:ss'),
        hasta: moment()
            .add(1, 'hour')
            .format('hh:ss'),
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.setState({ abierto: false, listo: true, cargando: false });
    };

    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value });
    };

    render(): ReactNode {
        const { children } = this.props;
        return (
            <Fragment>
                <Button variant="outline-dark" onClick={ this.abrir }>
                    { children }
                </Button>
                <Modal show={ this.state.abierto } onHide={ this.cerrar } centered size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Configuración de
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card border="primary" style={ { width: '24rem', margin: '1rem' } }>
                            <Card.Header as="h5">Humedad</Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={ Col } controlId="minimo">
                                        <Form.Label>Mínimo</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                value={ this.state.desde }
                                                onChange={ this.handleChange }
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="maximo">
                                        <Form.Label>Máximo</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                value={ this.state.desde }
                                                onChange={ this.handleChange }
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="umbral">
                                        <Form.Label>Umbral</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                value={ this.state.desde }
                                                onChange={ this.handleChange }
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={ Col } controlId="sensor">
                                        <Form.Label>Sensor</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={ this.state.actuador }
                                            onChange={ this.handleChange }>
                                            { this.actuadores.map((actuador) => (
                                                <option key={ actuador }>{ actuador }</option>
                                            )) }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="actuador">
                                        <Form.Label>Actuador</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={ this.state.actuador }
                                            onChange={ this.handleChange }>
                                            { this.actuadores.map((actuador) => (
                                                <option key={ actuador }>{ actuador }</option>
                                            )) }
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                        </Card>
                        <Card border="danger" style={ { width: '24rem', margin: '1rem' } }>
                            <Card.Header as="h5">Temperatura</Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={ Col } controlId="minimo">
                                        <Form.Label>Mínimo</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                value={ this.state.desde }
                                                onChange={ this.handleChange }
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>°C</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="maximo">
                                        <Form.Label>Máximo</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                value={ this.state.desde }
                                                onChange={ this.handleChange }
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>°C</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="umbral">
                                        <Form.Label>Umbral</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                value={ this.state.desde }
                                                onChange={ this.handleChange }
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>°C</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={ Col } controlId="sensor">
                                        <Form.Label>Sensor</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={ this.state.actuador }
                                            onChange={ this.handleChange }>
                                            { this.actuadores.map((actuador) => (
                                                <option key={ actuador }>{ actuador }</option>
                                            )) }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={ Col } controlId="actuador">
                                        <Form.Label>Actuador</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={ this.state.actuador }
                                            onChange={ this.handleChange }>
                                            { this.actuadores.map((actuador) => (
                                                <option key={ actuador }>{ actuador }</option>
                                            )) }
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                        </Card>
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
}

export default ModificarCultivo;
