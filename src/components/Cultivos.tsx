import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Table } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import { Usuario } from '../App';
import cultiFetch from '../CultiAPI';
import CultivoRow from './CultivoRow';
import ModificarCultivo from './ModificarCultivo';

class Cultivos extends Component<Props> {
    state: { cultivos: Cultivo[]; cargando: boolean; error?: string } = {
        cultivos: [],
        cargando: false,
    };

    componentDidMount = () => {
        this.obtenerCultivos();
    };

    obtenerCultivos = async () => {
        const { usuario } = this.props;
        this.setState({ cargando: true });
        try {
            const json = await cultiFetch('cultivo/getCultivos/', usuario.id);
            this.setState({ cultivos: json.cultivos });
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
        this.setState({ cargando: false });
    };

    render() {
        const { usuario } = this.props;
        const { cultivos, cargando, error } = this.state;
        return (
            <Fragment>
                <h2>Mis cultivos</h2>
                <br />
                { cargando ? (
                    <div style={ { color: 'yellow' } }>Cargando...</div>
                ) : error ? (
                    <div style={ { color: 'red' } }>Error al cargar los cultivos</div>
                ) : (
                    <Table responsive hover >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Eliminar</th>
                                <th>Ejecutar</th>
                                <th>Configuración</th>
                            </tr>
                        </thead>
                        <ReactCSSTransitionGroup
                            transitionName="list-item"
                            component="tbody"
                            transitionAppear
                            transitionAppearTimeout={ 500 }>
                            { cultivos.map((cultivo) => (
                                <CultivoRow
                                    key={ cultivo.id }
                                    cultivo={ cultivo }
                                    usuario={ usuario }
                                    actualizarCultivos={ this.obtenerCultivos }
                                />
                            )) }
                            <tr key="add">
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>
                                    <ModificarCultivo
                                        cultivo={ { nombre: 'Nuevo Cultivo' } }
                                        usuario={ usuario }
                                        actualizarCultivos={ this.obtenerCultivos }>
                                        <MdAdd size={ 24 } />
                                    </ModificarCultivo>
                                </td>
                            </tr>
                        </ReactCSSTransitionGroup>
                    </Table>
                ) }
            </Fragment>
        );
    }
}

interface Props {
    usuario: Usuario;
}

export interface Cultivo {
    id?: number;
    nombre?: string;
    descripcion?: string;
    actuadores?: Actuador[];
    sensores?: Sensor[];
}

export interface Actuador {
    id?: number;
    descripcion?: string;
    tipo?: 'Humedad' | 'Temperatura' | 'Luz';
    estado?: 'Encendido' | 'Apagado' | boolean;
    activarDesde?: string;
    activarHasta?: string;
    eliminado: boolean;
    comandos?: any[];
}
export interface Sensor {
    id?: number;
    descripcion?: string;
    tipo?: 'Humedad' | 'Temperatura' | 'Luz';
    estado?: 'Encendido' | 'Apagado';
    valor?: number;
    valorMinimo?: number;
    valorMaximo?: number;
    eliminado: boolean;
    estados?: any[];
}

export default Cultivos;
