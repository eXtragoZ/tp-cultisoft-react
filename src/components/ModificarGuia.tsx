import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import { Button, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';
import { Usuario } from '../App';
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
            cerrar: false,
            nombre: '',
            descripcion: '',
        };
    }

    abrir: MouseEventHandler = () => {
        const { nombre = '', descripcion = '' } = this.props.guia;
        this.setState({ abierto: true, nombre, descripcion });
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
        const {
            guia: { id },
        } = this.props;
        const { nombre, descripcion } = this.state;
        this.setState({ cargando: true });
        try {
            // const json =
            await cultiFetch('cultivo/modificarCultivo/', {
                id,
                nombre,
                descripcion
            });
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
        const { nombre, descripcion } = this.state;
        this.setState({ cargando: true });

        try {
            // const json =
            await cultiFetch('cultivo/insertCultivo/', {
                id_usuario: usuario.id,
                nombre,
                descripcion
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
        const {
            cargando,
            nombre,
            descripcion,
            sensores = [],
            actuadores = [],
        } = this.state;
        if (cargando || !nombre.length || !descripcion.length) {
            return true;
        }
        if (sensores.some((sensor) => this.sensorInvalido(sensor))) {
            return true;
        }
        if (actuadores.some((actuador) => this.actuadorInvalido(actuador))) {
            return true;
        }
        return !this.hayModificaciones();
    }

    hayModificaciones() {
        const { guia } = this.props;
        const { nombre, descripcion, sensores = [], actuadores = [] } = this.state;
        if ((guia.nombre || '') !== nombre) {
            return true;
        }
        if ((guia.descripcion || '') !== descripcion) {
            return true;
        }
        return false;
    }

    esModificado = (objeto1: any, objeto2: any) => {
        if (objeto1 === objeto2) {
            return false;
        }
        return [ ...Object.keys(objeto1), ...Object.keys(objeto2) ].some(
            (key) =>
                objeto1[ key ] !== objeto2[ key ] &&
                !(objeto1[ key ] === '' && !objeto2[ key ]) &&
                !(objeto2[ key ] === '' && !objeto1[ key ]),
        );
    };

    sensorInvalido = ({ valorMinimo, valorMaximo, descripcion }: Sensor) => {
        if ((descripcion || '') === '') {
            return true;
        }
        if (
            valorMinimo !== undefined &&
            valorMaximo !== undefined &&
            Number.isInteger(valorMinimo) &&
            Number.isInteger(valorMaximo)
        ) {
            return valorMinimo >= valorMaximo;
        }
        return false;
    };
    actuadorInvalido = ({ descripcion }: Actuador) => {
        if ((descripcion || '') === '') {
            return true;
        }
        return false;
    };


    handleChange = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [ event.currentTarget.id ]: event.currentTarget.value } as any);
    };

    handleChangeSensores = (sensores: Sensor[]) => {
        this.setState({ sensores });
    };

    handleChangeActuadores = (actuadores: Actuador[]) => {
        this.setState({ actuadores });
    };

    render() {
        const { children, guia } = this.props;
        const { descripcion, nombre, abierto, error } = this.state;
        return (
            <Fragment>
                <Button variant="outline-dark" onClick={ this.abrir }>
                    { children }
                </Button>
                <Modal show={ abierto } onHide={ this.cerrar } centered size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            style={ { display: 'flex', width: '100%' } }>
                            <span style={ { whiteSpace: 'nowrap' } }>Configuración de</span>
                            <FormControl
                                style={ { flexGrow: 1, margin: ' 0 .75rem 0 .75rem' } }
                                value={ nombre }
                                id="nombre"
                                onChange={ this.handleChange }
                                isInvalid={ !nombre.length }
                            />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <FormLabel>Descripción:</FormLabel>
                            <FormControl
                                value={ descripcion }
                                id="descripcion"
                                onChange={ this.handleChange }
                                as="textarea"
                                rows="2"
                                isInvalid={ !descripcion.length }
                            />
                        </FormGroup>
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
    nombre: string;
    descripcion: string;
    sensores?: Sensor[];
    actuadores?: Actuador[];
    error?: string;
}

export default ModificarGuia;
