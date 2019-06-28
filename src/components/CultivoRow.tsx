import React, { Component, MouseEventHandler } from 'react';
import { MdDeleteForever, MdPlayArrow, MdSettings } from 'react-icons/md';
import { Cultivo } from './Cultivos';
import DetalleCultivo from './DetalleCultivo';
import EjecutarComando from './EjecutarComando';
import EliminarCultivo from './EliminarCultivo';
import ModificarCultivo from './ModificarCultivo';
import { Usuario } from './Principal';

class CultivoRow extends Component<Props> {
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
        const { cultivo, usuario, actualizarCultivos } = this.props;
        const { id, nombre, descripcion, actuadores } = cultivo;
        const { abierto } = this.state;
        return (
            <tr key={ id } onClick={ this.abrirDetalle } style={ { cursor: 'pointer' } }>
                <td>
                    <DetalleCultivo
                        cultivo={ cultivo }
                        abierto={ abierto }
                        cerrar={ this.cerrarDetalle }
                    />
                    { nombre }
                </td>
                <td>{ descripcion }</td>
                <td>
                    <EliminarCultivo
                        cultivo={ cultivo }
                        actualizarCultivos={ actualizarCultivos }>
                        <MdDeleteForever size={ 24 } />
                    </EliminarCultivo>
                </td>
                <td>
                    <EjecutarComando actuadores={ actuadores }>
                        <MdPlayArrow size={ 24 } />
                    </EjecutarComando>
                </td>
                <td>
                    <ModificarCultivo
                        cultivo={ cultivo }
                        usuario={ usuario }
                        actualizarCultivos={ actualizarCultivos }>
                        <MdSettings size={ 24 } />
                    </ModificarCultivo>
                </td>
            </tr>
        );
    }
}

interface Props {
    cultivo: Cultivo;
    usuario: Usuario;
    actualizarCultivos: () => void;
}

export default CultivoRow;
