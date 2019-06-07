import moment from 'moment';
import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import {
    Button,
    Col,
    Container,
    FormControlProps,
    Modal,
    Row,
    Table,
} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { MdAdd, MdCreate } from 'react-icons/md';
import { PacmanLoader } from 'react-spinners';
import ConfiguracionVariable from './ConfiguracionVariable';
import { Actuador, Cultivo, Sensor } from './Cultivos';

class ModificarCultivo extends Component<Props> {
    state = {
        abierto: false,
        listo: false,
        cargando: false,
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
        const {
            children,
            cultivo: { nombre },
            actuadores,
            sensores,
        } = this.props;
        return (
            <Fragment>
                <Button variant="outline-dark" onClick={ this.abrir }>
                    { children }
                </Button>
                <Modal show={ this.state.abierto } onHide={ this.cerrar } centered size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Configuración de '{ nombre }'
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container style={ { padding: 0 } }>
                            <Row>
                                <Col style={ { flexGrow: 0, paddingLeft: '10px' } }>
                                    <ConfiguracionVariable
                                        nombre="Humedad"
                                        unidad="%"
                                        actuadores={ actuadores }
                                        sensores={ sensores }
                                        border="primary"
                                    />
                                    <ConfiguracionVariable
                                        nombre="Temperatura"
                                        unidad="°C"
                                        actuadores={ actuadores }
                                        sensores={ sensores }
                                        border="danger"
                                    />
                                    <ConfiguracionVariable
                                        nombre="Luz"
                                        unidad="hs"
                                        actuadores={ actuadores }
                                        sensores={ sensores }
                                        tiempo
                                        border="warning"
                                    />
                                </Col>
                                <Col style={ { padding: '5px', paddingRight: '15px' } }>
                                    <h6>Sensores</h6>
                                    <Table responsive striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Descripción</th>
                                                <th>Tipo</th>
                                                <th>Activo</th>
                                                <th>Valor</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { sensores.map(
                                                ({
                                                    id,
                                                    descripcion,
                                                    tipo,
                                                    activo,
                                                    valor,
                                                }) => (
                                                    <tr key={ id }>
                                                        <td>{ id }</td>
                                                        <td>{ descripcion }</td>
                                                        <td>{ tipo }</td>
                                                        <td>{ activo ? 'Si' : 'No' }</td>
                                                        <td>{ valor }</td>
                                                        <th>
                                                            <MdCreate />
                                                        </th>
                                                    </tr>
                                                ),
                                            ) }
                                            <tr key="add">
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                                <td>
                                                    <MdAdd />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <h6>Actuadores</h6>
                                    <Table responsive striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Descripción</th>
                                                <th>Tipo</th>
                                                <th>Activo</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { actuadores.map(
                                                ({ id, descripcion, tipo, activo }) => (
                                                    <tr key={ id }>
                                                        <td>{ id }</td>
                                                        <td>{ descripcion }</td>
                                                        <td>{ tipo }</td>
                                                        <td>{ activo ? 'Si' : 'No' }</td>
                                                        <th>
                                                            <MdCreate />
                                                        </th>
                                                    </tr>
                                                ),
                                            ) }
                                            <tr key="add">
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                                <td>
                                                    <MdAdd />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
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
    cultivo: Cultivo;
    actuadores: Actuador[];
    sensores: Sensor[];
}

export default ModificarCultivo;
