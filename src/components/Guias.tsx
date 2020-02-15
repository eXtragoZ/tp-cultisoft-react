import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Table, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Usuario } from '../App';
import { MdAdd } from 'react-icons/md';
import ModificarGuia from './ModificarGuia';
import GuiaRow from './GuiaRow';

const guiaTest: Guia = {
    id: 1,
    nombre: 'Manzanas de invierno',
    tipo: 'Manzano',
    descripcion: 'blablabalballbablalbalbalbalalb\nblalbalblablalablablab\nababaabbadadaadd',
    autor: 'Yo no',
    humedadMinima: 10,
    humedadMaxima: 100,
    temperaturaMinima: 20,
    temperaturaMaxima: 40,
    luzDesde: '11:00',
    luzHasta: '18:30',
    comentarios: [
        {id: 1, autor: 'otro', texto: 'Perfecto'},
        {id: 2, autor: 'Yo no', texto: 'Correcto'}
    ],
    calificacion: 8.25
}
class Guias extends Component<Props, State> {
    state: State = {
        guias: [guiaTest],
        cargando: false,
        filtroTipo: '',
        filtroAutor: ''
    };

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

    handleChange = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [ event.currentTarget.id ]: event.currentTarget.value } as any);
    };

    render() {
        const { usuario } = this.props;
        const { guias, filtroTipo, filtroAutor, filtroCalificacion, cargando, error } = this.state;
        return (
            <>
                <h2>Guias</h2>
                <br />
                <div className="filtros-guias">
                    <FormGroup>
                        <FormLabel>Filtrar por tipo de cultivo</FormLabel>
                        <FormControl
                            value={ filtroTipo }
                            id="filtroTipo"
                            onChange={ this.handleChange }
                            placeholder="Tipo..."
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Filtrar por autor</FormLabel>
                        <FormControl
                            value={ filtroAutor }
                            id="filtroAutor"
                            onChange={ this.handleChange }
                            placeholder="Autor..."
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Filtrar por calificación</FormLabel>
                        <FormControl
                            type="number"
                            value={ String(filtroCalificacion) }
                            id="filtroCalificacion"
                            onChange={ this.handleChange }
                            placeholder="Calificación..."
                        />
                    </FormGroup>
                </div>
                { cargando ? (
                    <div style={ { color: 'yellow' } }>Cargando...</div>
                ) : error ? (
                    <div style={ { color: 'red' } }>Error al cargar los cultivos</div>
                ) : (<Table responsive hover >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo de cultivo</th>
                            <th>Autor</th>
                            <th>Comentarios</th>
                            <th>Calificación</th>
                        </tr>
                    </thead>
                    <ReactCSSTransitionGroup
                        transitionName="list-item"
                        component="tbody"
                        transitionAppear
                        transitionAppearTimeout={ 500 }>
                        { guias.map(guia => (
                            <GuiaRow
                                key={ guia.id }
                                guia={ guia }
                                usuario={ usuario }
                                actualizarGuias={ this.obtenerGuias }
                            />
                        )) }
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
                </Table>) }
            </>
        );
    }
}

interface Props {
    usuario: Usuario;
}

interface State {
    guias: Guia[];
    cargando: boolean;
    error?: string;
    filtroTipo: string;
    filtroAutor: string;
    filtroCalificacion?: number;
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
    comentarios?: Comentario[];
    calificacion?: number;
}

export interface Comentario {
    id?: number;
    autor?: string;
    texto?: string;
}

export default Guias;
