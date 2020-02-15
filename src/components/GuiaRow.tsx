import React, { Component, MouseEventHandler } from 'react';
import { Usuario } from '../App';
import { Guia } from './Guias';
import { FaStar } from "react-icons/fa";

const estrellas = Array(5).fill(<FaStar className="estrella-calificacion" />);

class GuiaRow extends Component<Props> {
    state = {
        abierto: false,
    };
    abrirDetalle: MouseEventHandler = ({ target, currentTarget }) => {
        if (
            target === currentTarget ||
            (target as HTMLElement).parentNode === currentTarget
        ) {
            this.setState({ abierto: true });
        }
    };
    cerrarDetalle = () => {
        this.setState({ abierto: false });
    };

    render() {
        const { guia, usuario } = this.props;
        const { id, nombre, tipo, descripcion, autor, comentarios, calificacion = 0 } = guia;
        const { abierto } = this.state;
        const porcentajeEstrellas = calificacion * 10;

        return (
            <tr key={ id } onClick={ this.abrirDetalle } style={ { cursor: 'pointer' } }>
                <td>{ nombre }</td>
                <td>{ tipo }</td>
                <td>{ autor }</td>
                <td>{ comentarios?.length }</td>
                <td>{ calificacion != null && <div className="estrellas" style={ { WebkitMaskImage: `linear-gradient(90deg, black, black ${ porcentajeEstrellas }%, transparent ${ porcentajeEstrellas + 10 }%, transparent)` } }>{ estrellas }</div> } ({ calificacion })</td>
            </tr>
        );
    }
}

interface Props {
    guia: Guia;
    usuario: Usuario;
    actualizarGuias: () => void;
}

export default GuiaRow;
