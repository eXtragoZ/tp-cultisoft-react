import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Table } from 'react-bootstrap';
import { Usuario } from '../App';
import { MdAdd } from 'react-icons/md';
import ModificarGuia from './ModificarGuia';

class Guias extends Component<Props> {
   
    obtenerGuias = async () => {
        /*const { usuario } = this.props;
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
        this.setState({ cargando: false });*/
    };

    render() {
        const { usuario } = this.props;
        return (
            <Fragment>
                <h2>Guias</h2>
                <br />
               
                    <Table responsive hover >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo de cultivo</th>
                                <th>Autor</th>
                                <th>Comentarios</th>
                                <th>Clasificacón</th>
                            </tr>
                        </thead>
                        <ReactCSSTransitionGroup
                            transitionName="list-item"
                            component="tbody"
                            transitionAppear
                            transitionAppearTimeout={ 500 }>
                            
                            <tr key="add">
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>
                                    <ModificarGuia
                                        guia={ { nombre: 'Nueva Guia' } }
                                        usuario={ usuario }
                                        actualizarGuias={ this.obtenerGuias }>
                                        <MdAdd size={ 24 } />
                                    </ModificarGuia>
                                </td>
                            </tr>
                        </ReactCSSTransitionGroup>
                    </Table>
            </Fragment>
        );
    }
}

interface Props {
    usuario: Usuario;
}


export interface Guia {
    id?: number;
    nombre?: string;
    tipo?: string;
    descripcion?: string;
    autor?: string;
    humedadMinima?: number;
    humedadMaxima?: number;
    temperaturaMinima?: number;
    temperaturaMaxima?: number;
    luzDesde?: string;
    luzHasta?: string;
    comentarios?: string[];
    calificacion?: number;
}

export default Guias;
