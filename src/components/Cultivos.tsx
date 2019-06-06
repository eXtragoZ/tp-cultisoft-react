import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import { MdAdd, MdDeleteForever, MdPlayArrow, MdSettings } from 'react-icons/md';
import EjecutarComando from './EjecutarComando';
import EliminarCultivo from './EliminarCultivo';
import ModificarCultivo from './ModificarCultivo';

const Cultivos: FC<Props> = (props) => {
    const cultivos: Cultivo[] = [
        {
            id: 5,
            nombre: 'La granjita',
        },
        {
            id: 7,
            nombre: 'Prueba 2',
            descripcion: 'babblablalbbalablablbalablbalablbalbal',
        },
        {
            id: 12,
            nombre: 'Mi potus',
        },
    ];

    return (
        <Table responsive striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Eliminar</th>
                    <th>Ejecutar</th>
                    <th>Configuración</th>
                </tr>
            </thead>
            <tbody>
                { cultivos.map(({ id, nombre, descripcion }) => {
                    return (
                        <tr key={ id }>
                            <td>{ nombre }</td>
                            <td>{ descripcion }</td>
                            <td>
                                <EliminarCultivo>
                                    <MdDeleteForever size={ 24 } />
                                </EliminarCultivo>
                            </td>
                            <td>
                                <EjecutarComando>
                                    <MdPlayArrow size={ 24 } />
                                </EjecutarComando>
                            </td>
                            <td>
                                <ModificarCultivo>
                                    <MdSettings size={ 24 } />
                                </ModificarCultivo>
                            </td>
                        </tr>
                    );
                }) }
                <tr key="add">
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                        <MdAdd size={ 24 } />
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

interface Cultivo {
    id: number;
    nombre: string;
    descripcion?: string;
}

interface Props {}

export default Cultivos;
