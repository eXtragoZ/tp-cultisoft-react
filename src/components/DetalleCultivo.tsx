import React, { Component, ReactNode } from 'react';
import { Button, Col, Container, FormControlProps, Modal, Row } from 'react-bootstrap';
import { Cultivo } from './Cultivos';
import DetalleActuador from './DetalleActuador';
import DetalleSensor from './DetalleSensor';

class DetalleCultivo extends Component<Props> {
    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value });
    };

    render(): ReactNode {
        const {
            cultivo: { id, nombre, descripcion, actuadores = [], sensores = [] },
            abierto,
            cerrar,
        } = this.props;
        return (
            <Modal show={ abierto } onHide={ cerrar } centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={ { display: 'flex', alignItems: 'baseline' } }>
                        Detalle de
                        <h2 style={ { margin: ' 0 .75rem 0 .75rem' } }>{ nombre }</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { descripcion } - Codigo: { id }
                    <Container style={ { display: 'flex', justifyContent: 'center' } }>
                        <Row>
                            <Col style={ { flexGrow: 0 } }>
                                { sensores.map((sensor, index) => (
                                    <DetalleSensor key={ index } sensor={ sensor } />
                                )) }
                            </Col>
                            <Col style={ { flexGrow: 0 } }>
                                { actuadores.map((actuador, index) => (
                                    <DetalleActuador key={ index } actuador={ actuador } />
                                )) }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ cerrar }>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

interface Props {
    cultivo: Cultivo;
    abierto: boolean;
    cerrar: () => void;
}

export default DetalleCultivo;
