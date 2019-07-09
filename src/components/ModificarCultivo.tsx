import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import {
    Button,
    FormControl,
    FormControlProps,
    FormGroup,
    FormLabel,
    Modal,
} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';
import cultiFetch from '../CultiAPI';
import ConfiguracionActuadores from './ConfiguracionActuadores';
import ConfiguracionSensores from './ConfiguracionSensores';
import { Actuador, Cultivo, Sensor } from './Cultivos';
import { Usuario } from './Principal';

class ModificarCultivo extends Component<Props, State> {
    constructor(props: Props) {
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
        const {
            nombre = '',
            descripcion = '',
            sensores = [],
            actuadores = [],
        } = this.props.cultivo;
        this.setState({ abierto: true, nombre, descripcion, sensores, actuadores });
    };

    cerrar = () => {
        if (this.hayModificaciones()) {
            this.setState({ cerrar: true });
        } else {
            this.setState({ abierto: false });
        }
    };

    terminar = () => {
        const { actualizarCultivos } = this.props;
        this.setState({ listo: false }, actualizarCultivos);
    };

    cerrarTerminar = () => {
        this.setState({ cerrar: false, abierto: false });
    };

    cerrarVolver = () => {
        this.setState({ cerrar: false });
    };

    enviar = async () => {
        const {
            cultivo: { id },
        } = this.props;
        if (id != null) {
            this.modificarCultivo();
        } else {
            this.nuevoCultivo();
        }
    };
    modificarCultivo = async () => {
        const {
            cultivo: { id },
        } = this.props;
        const { nombre, descripcion } = this.state;
        const sensores = this.sensoresAEnviar();
        const actuadores = this.actuadoresAEnviar();
        this.setState({ cargando: true });
        try {
            // const json =
            await cultiFetch('cultivo/modificarCultivo/', {
                id,
                nombre,
                descripcion,
                sensores,
                actuadores,
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
        const { usuario, actualizarCultivos } = this.props;
        const { nombre, descripcion } = this.state;
        const sensores = this.sensoresAEnviar();
        const actuadores = this.actuadoresAEnviar();
        this.setState({ cargando: true });

        try {
            // const json =
            await cultiFetch('cultivo/insertCultivo/', {
                id_usuario: usuario.id,
                nombre,
                descripcion,
                sensores,
                actuadores,
            });
            this.setState(
                { abierto: false, listo: true, cargando: false },
                actualizarCultivos,
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

    sensoresAEnviar = () => {
        const { sensores = [] } = this.state;
        const sensoresAgregados = sensores.filter(
            (sensor) => !sensor.id && !sensor.eliminado,
        );
        const sensoresModificados = sensores.filter(
            (sensor) => sensor.id && this.esModificado(sensor, this.sensorPorId(sensor.id)),
        );
        return [...sensoresAgregados, ...sensoresModificados];
    };

    actuadoresAEnviar = () => {
        const { actuadores = [] } = this.state;
        const actuadoresAgregados = actuadores.filter(
            (actuador) => !actuador.id && !actuador.eliminado,
        );
        const actuadoresModificados = actuadores.filter(
            (actuador) =>
                actuador.id &&
                this.esModificado(actuador, this.actuadorPorId(actuador.id)),
        );
        return [...actuadoresAgregados, ...actuadoresModificados];
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
        const { cultivo } = this.props;
        const { nombre, descripcion, sensores = [], actuadores = [] } = this.state;
        if ((cultivo.nombre || '') !== nombre) {
            return true;
        }
        if ((cultivo.descripcion || '') !== descripcion) {
            return true;
        }
        const sensoresAgregados = sensores.some(
            (sensor) => !sensor.id && !sensor.eliminado,
        );
        const sensoresModificados = sensores.some(
            (sensor) => sensor.id && this.esModificado(sensor, this.sensorPorId(sensor.id)),
        );
        const actuadoresAgregados = actuadores.some(
            (actuador) => !actuador.id && !actuador.eliminado,
        );
        const actuadoresModificados = actuadores.some(
            (actuador) =>
                actuador.id &&
                this.esModificado(actuador, this.actuadorPorId(actuador.id)),
        );
        if (
            sensoresAgregados ||
            sensoresModificados ||
            actuadoresAgregados ||
            actuadoresModificados
        ) {
            return true;
        }
        return false;
    }

    esModificado = (objeto1: any, objeto2: any) => {
        if (objeto1 === objeto2) {
            return false;
        }
        return [...Object.keys(objeto1), ...Object.keys(objeto2)].some(
            (key) =>
                objeto1[key] !== objeto2[key] &&
                !(objeto1[key] === '' && !objeto2[key]) &&
                !(objeto2[key] === '' && !objeto1[key]),
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

    sensorPorId = (id: number) => {
        const { cultivo } = this.props;
        if (cultivo.sensores) {
            return cultivo.sensores.find((sensor) => sensor.id === id);
        }
    };

    actuadorPorId = (id: number) => {
        const { cultivo } = this.props;
        if (cultivo.actuadores) {
            return cultivo.actuadores.find((actuador) => actuador.id === id);
        }
    };

    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value } as any);
    };

    handleChangeSensores = (sensores: Sensor[]) => {
        this.setState({ sensores });
    };

    handleChangeActuadores = (actuadores: Actuador[]) => {
        this.setState({ actuadores });
    };

    render(): ReactNode {
        const {
            children,
            cultivo: { actuadores, sensores },
        } = this.props;
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
                        <ConfiguracionSensores
                            sensores={ sensores }
                            onChange={ this.handleChangeSensores }
                        />
                        <ConfiguracionActuadores
                            actuadores={ actuadores }
                            onChange={ this.handleChangeActuadores }
                        />
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
    cultivo: Cultivo;
    usuario: Usuario;
    actualizarCultivos: () => void;
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

export default ModificarCultivo;
