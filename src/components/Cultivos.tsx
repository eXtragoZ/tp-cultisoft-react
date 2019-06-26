import React, { FC, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import CultivoRow from './CultivoRow';
import ModificarCultivo from './ModificarCultivo';

const Cultivos: FC<Props> = () => {
    const actua: Actuador[] = [
        {
            id: 3,
            descripcion: 'Manguera',
            tipo: 'Humedad',
            estado: 'Encendido',
            eliminado: false,
        },
        {
            id: 53,
            descripcion: 'Luz UV',
            tipo: 'Luz',
            estado: 'Encendido',
            eliminado: false,
        },
        {
            id: 23,
            descripcion: 'Luz Blanca',
            tipo: 'Luz',
            estado: 'Apagado',
            eliminado: false,
        },
    ];

    const sens: Sensor[] = [
        {
            id: 12,
            tipo: 'Humedad',
            estado: 'Encendido',
            valor: 33,
            eliminado: false,
        },
        {
            id: 48,
            descripcion: 'Estufa',
            tipo: 'Temperatura',
            estado: 'Encendido',
            valor: 22,
            eliminado: false,
        },
        {
            id: 5,
            estado: 'Apagado',
            eliminado: false,
        },
    ];

    const cultivos: Cultivo[] = [
        {
            id: 5,
            nombre: 'La granjita',
            actuadores: actua,
            sensores: sens,
        },
        {
            id: 7,
            nombre: 'Prueba 2',
            descripcion: 'babblablalbbalablablbalablbalablbalbal',
            actuadores: actua,
        },
        {
            id: 12,
            nombre: 'Mi potus',
            sensores: sens,
        },
    ];

    return (
        <Fragment>
            <h2>Mis cultivos</h2>
            <br />
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
                    { cultivos.map((cultivo) => (
                        <CultivoRow key={ cultivo.id } cultivo={ cultivo } />
                    )) }
                    <tr key="add">
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>
                            <ModificarCultivo cultivo={ { nombre: 'Nuevo Cultivo' } }>
                                <MdAdd size={ 24 } />
                            </ModificarCultivo>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
};

interface Props {
    cultivos: Cultivo[];
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
    estado?: 'Encendido' | 'Apagado';
    activarDesde?: string;
    activarHasta?: string;
    eliminado: boolean;
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
}

export default Cultivos;
