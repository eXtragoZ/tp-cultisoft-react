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

    const actuadores: Actuador[] = [
        {
            id: 3,
            descripcion: 'Manguera',
            tipo: 'Humedad',
            activo: true,
        },
        {
            id: 53,
            descripcion: 'Luz UV',
            tipo: 'Luz',
            activo: true,
        },
        {
            id: 23,
            descripcion: 'Luz Blanca',
            tipo: 'Luz',
            activo: false,
        },
    ];

    const sensores: Sensor[] = [
        {
            id: 12,
            tipo: 'Humedad',
            activo: true,
            valor: 33,
        },
        {
            id: 48,
            descripcion: 'Estufa',
            tipo: 'Temperatura',
            activo: true,
            valor: 22,
        },
        {
            id: 5,
            activo: false,
        },
    ];
    return (
        <Table responsive striped hover>
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
                { cultivos.map((cultivo) => {
                    const { id, nombre, descripcion } = cultivo;
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
                                <EjecutarComando actuadores={ actuadores }>
                                    <MdPlayArrow size={ 24 } />
                                </EjecutarComando>
                            </td>
                            <td>
                                <ModificarCultivo
                                    cultivo={ cultivo }
                                    actuadores={ actuadores }
                                    sensores={ sensores }>
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
                        <ModificarCultivo
                            cultivo={ { id: 0, nombre: 'Nuevo Cultivo' } }
                            actuadores={ actuadores }
                            sensores={ sensores }>
                            <MdAdd size={ 24 } />
                        </ModificarCultivo>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export interface Cultivo {
    id?: number;
    nombre?: string;
    descripcion?: string;
}

export interface Actuador {
    id: number;
    descripcion?: string;
    tipo?: 'Humedad' | 'Temperatura' | 'Luz';
    activo: boolean;
}
export interface Sensor extends Actuador {
    valor?: number;
}

interface Props {}

export default Cultivos;
