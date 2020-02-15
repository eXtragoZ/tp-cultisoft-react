import deepEqual from 'deep-equal';
import React, { Component, Fragment, ReactNode } from 'react';
import { Button, Card, Form, FormControl, FormGroup, FormLabel, InputGroup, Modal, Table } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';
import { unidades, Usuario } from '../App';
import cultiFetch from '../CultiAPI';
import { Actuador, Sensor } from './Cultivos';
import { Guia } from './Guias';

class ModificarGuia extends Component<Props, State> {
    constructor (props: Props) {
        super(props);
        this.state = {
            abierto: false,
            listo: false,
            cargando: false,
            cerrar: false
        };
    }

    abrir = () => {
        const { guia } = this.props;
        this.setState({ abierto: true, guia: {...guia} });
    };

    cerrar = () => {
        if (this.hayModificaciones()) {
            this.setState({ cerrar: true });
        } else {
            this.setState({ abierto: false });
        }
    };

    terminar = () => {
        const { actualizarGuias } = this.props;
        this.setState({ listo: false }, actualizarGuias);
    };

    cerrarTerminar = () => {
        this.setState({ cerrar: false, abierto: false });
    };

    cerrarVolver = () => {
        this.setState({ cerrar: false });
    };

    enviar = async () => {
        const {
            guia: { id },
        } = this.props;
        if (id != null) {
            this.modificarCultivo();
        } else {
            this.nuevoCultivo();
        }
    };
    modificarCultivo = async () => {
        const { guia } = this.state;
        this.setState({ cargando: true });
        try {
            // const json =
            await cultiFetch('guia/modificar/', guia);
            this.setState({ abierto: false, listo: true, cargando: false });
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
        this.setState({ cargando: false });
    };

    nuevoCultivo = async () => {
        const { usuario, actualizarGuias } = this.props;
        const { guia } = this.state;
        this.setState({ cargando: true });

        try {
            // const json =
            await cultiFetch('guia/nueva/', {
                id_usuario: usuario.id,
                ...guia
            });
            this.setState(
                { abierto: false, listo: true, cargando: false },
                actualizarGuias,
            );
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
        this.setState({ cargando: false });
    };

    guardarDeshabilitado() {
        const { cargando, guia = {} } = this.state;
        const { nombre, tipo, descripcion } = guia;
        if (cargando || !nombre || !tipo || !descripcion) {
            return true;
        }
        return !this.hayModificaciones();
    }

    hayModificaciones() {
        const { guia } = this.props;
        const { guia: guiaModificada } = this.state;
        return !deepEqual(guia, guiaModificada);
    }

    handleChange = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        const newValue = { [ event.currentTarget.id ]: event.currentTarget.value };
        this.setState(({ guia }) => ({
            guia: {
                ...guia,
                ...newValue
            }
        }));
    };

    render() {
        const { children } = this.props;
        const { guia = {}, abierto, error } = this.state;
        const {
            nombre,
            tipo,
            descripcion,
            humedadMinima,
            humedadMaxima,
            temperaturaMinima,
            temperaturaMaxima,
            luzDesde,
            luzHasta
        } = guia;
        return (
            <Fragment>
                <Button variant="outline-dark" onClick={ this.abrir }>
                    { children }
                </Button>
                <Modal className="modificar-guia" show={ abierto } onHide={ this.cerrar } centered size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            style={ { display: 'flex', width: '100%' } }>
                            <span style={ { whiteSpace: 'nowrap' } }>Edición de</span>
                            <FormControl
                                style={ { flexGrow: 1, margin: ' 0 .75rem 0 .75rem' } }
                                value={ nombre }
                                id="nombre"
                                onChange={ this.handleChange }
                                isInvalid={ !nombre }
                            />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <FormGroup>
                                <FormLabel>Tipo de cultivo</FormLabel>
                                <FormControl
                                    value={ tipo }
                                    id="tipo"
                                    onChange={ this.handleChange }
                                    isInvalid={ !tipo }
                                />
                            </FormGroup>
                            <FormGroup className="form-descripcion">
                                <FormLabel>Descripción</FormLabel>
                                <FormControl
                                    value={ descripcion }
                                    id="descripcion"
                                    onChange={ this.handleChange }
                                    as="textarea"
                                    rows="2"
                                    isInvalid={ !descripcion }
                                />
                            </FormGroup>
                        </div>
                        <div>
                            Valores recomendados
                            <Card>
                                <Card.Header as="h6">
                                    Humedad
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive size="sm">
                                        <tbody>
                                            <tr>
                                                <th>Valor Mínimo</th>
                                                <td>
                                                    <InputGroup size="sm">
                                                        <FormControl
                                                            type="number"
                                                            value={ String(humedadMinima) }
                                                            id="humedadMinima"
                                                            onChange={ this.handleChange }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>{ unidades.Humedad }</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Valor Máximo</th>
                                                <td>
                                                    <InputGroup size="sm">
                                                        <FormControl
                                                            type="number"
                                                            value={ String(humedadMaxima) }
                                                            id="humedadMaxima"
                                                            onChange={ this.handleChange }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>{ unidades.Humedad }</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header as="h6">
                                    Temperatura
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive size="sm">
                                        <tbody>
                                            <tr>
                                                <th>Valor Mínimo</th>
                                                <td>
                                                    <InputGroup size="sm">
                                                        <FormControl
                                                            type="number"
                                                            value={ String(temperaturaMinima) }
                                                            id="temperaturaMinima"
                                                            onChange={ this.handleChange }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>{ unidades.Temperatura }</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Valor Máximo</th>
                                                <td>
                                                    <InputGroup size="sm">
                                                        <FormControl
                                                            type="number"
                                                            value={ String(temperaturaMaxima) }
                                                            id="temperaturaMaxima"
                                                            onChange={ this.handleChange }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>{ unidades.Temperatura }</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header as="h6">
                                    Luz
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive size="sm">
                                        <tbody>
                                            <tr>
                                                <th>Desde</th>
                                                <td>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="time"
                                                            value={ luzDesde }
                                                            id="luzDesde"
                                                            onChange={ this.handleChange }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text id="hs">hs</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Hasta</th>
                                                <td>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="time"
                                                            value={ luzHasta }
                                                            id="luzHasta"
                                                            onChange={ this.handleChange }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text id="hs">hs</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        { error && <div style={ { color: 'red' } }>{ error }</div> }
                        <Button variant="secondary" onClick={ this.cerrar }>
                            Cerrar
                        </Button>
                        <Button
                            onClick={ this.enviar }
                            disabled={ this.guardarDeshabilitado() }>
                            { this.state.cargando ? (
                                <PacmanLoader
                                    size={ 10 }
                                    color="#ffc107"
                                    css={ 'margin: 2px 40px 12px 0px;' }
                                />
                            ) : (
                                    'Guardar'
                                ) }
                        </Button>
                    </Modal.Footer>
                </Modal>

                <SweetAlert
                    success
                    title="Listo!"
                    onConfirm={ this.terminar }
                    show={ this.state.listo }>
                    Tus cambios fueron guardados!
                </SweetAlert>
                <SweetAlert
                    warning
                    showCancel
                    title="No se guardaran tus cambios!"
                    confirmBtnText="Confirmar"
                    cancelBtnText="Volver"
                    onCancel={ this.cerrarVolver }
                    onConfirm={ this.cerrarTerminar }
                    show={ this.state.cerrar }>
                    ¿Estas seguro?
                </SweetAlert>
            </Fragment>
        );
    }
}

interface Props {
    children: ReactNode;
    guia: Guia;
    usuario: Usuario;
    actualizarGuias: () => void;
}

interface State {
    abierto: boolean;
    listo: boolean;
    cargando: boolean;
    cerrar: boolean;
    guia?: Guia;
    error?: string;
}

export default ModificarGuia;
