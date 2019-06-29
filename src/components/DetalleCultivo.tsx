import deepEqual from 'deep-equal';
import React, { Component, ReactNode } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import cultiFetch from '../CultiAPI';
import { Cultivo } from './Cultivos';
import DetalleActuador from './DetalleActuador';
import DetalleSensor from './DetalleSensor';

class DetalleCultivo extends Component<Props, State> {
    timer?: NodeJS.Timeout;
    constructor(props: Props) {
        super(props);

        this.state = {
            cultivo: props.cultivo,
            error: undefined,
        };
    }

    componentDidMount = () => {
        this.timer = setInterval(this.obtenerCultivo, 5000);
    };

    componentWillUnmount = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };

    obtenerCultivo = async () => {
        const { cultivo } = this.props;
        const { cultivo: prevCultivo } = this.state;
        try {
            const json = await cultiFetch('cultivo/getCultivo/', cultivo.id);
            if (!deepEqual(prevCultivo, json.cultivos[0])) {
                this.setState({ cultivo: json.cultivos[0], error: undefined });
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
    };

    render(): ReactNode {
        const { abierto, cerrar } = this.props;
        const {
            cultivo: { id, nombre, descripcion, actuadores = [], sensores = [] },
            error,
        } = this.state;
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
                    { error && (
                        <div style={ { color: 'red' } }>Error al actualizar datos</div>
                    ) }
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
interface State {
    cultivo: Cultivo;
    error?: string;
}

export default DetalleCultivo;
