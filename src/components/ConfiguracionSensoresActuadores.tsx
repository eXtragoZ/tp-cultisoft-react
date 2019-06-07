import React, { Component, ReactNode } from 'react';
import { Badge, Card, CardProps, Table } from 'react-bootstrap';
import { MdAdd, MdCreate } from 'react-icons/md';
import { Actuador, Sensor } from './Cultivos';

class ConfiguracionSensoresActuadores extends Component<Props> {
    unidades = { Humedad: '%', Temperatura: '°C', Luz: 'hs' };
    render(): ReactNode {
        const { nombre, actuadores, sensores, ...cardProps } = this.props;
        return (
            <Card style={ style.Card } { ...cardProps }>
                <Card.Header as="h6" style={ style.Header }>
                    { nombre }
                </Card.Header>
                <Card.Body style={ style.Body }>
                    <Table responsive striped hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Activo</th>
                                { sensores && <th>Valor</th> }
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            { sensores &&
                                sensores.map(
                                    ({ id, descripcion, tipo, activo, valor }) => (
                                        <tr key={ id }>
                                            <td>{ id }</td>
                                            <td>{ descripcion }</td>
                                            <td>{ tipo }</td>
                                            <td>
                                                { activo ? (
                                                    <Badge
                                                        variant="success"
                                                        style={ style.Badge }>
                                                        Si
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="danger"
                                                        style={ style.Badge }>
                                                        No
                                                    </Badge>
                                                ) }
                                            </td>
                                            <td>
                                                { valor }
                                                { tipo && this.unidades[tipo] }
                                            </td>
                                            <th>
                                                <MdCreate />
                                            </th>
                                        </tr>
                                    ),
                                ) }
                            { actuadores &&
                                actuadores.map(({ id, descripcion, tipo, activo }) => (
                                    <tr key={ id }>
                                        <td>{ id }</td>
                                        <td>{ descripcion }</td>
                                        <td>{ tipo }</td>
                                        <td>
                                            { activo ? (
                                                <Badge
                                                    variant="success"
                                                    style={ style.Badge }>
                                                    Si
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="danger"
                                                    style={ style.Badge }>
                                                    No
                                                </Badge>
                                            ) }
                                        </td>
                                        <th>
                                            <MdCreate />
                                        </th>
                                    </tr>
                                )) }

                            <tr key="add">
                                <td />
                                <td />
                                <td />
                                <td />
                                { sensores && <td /> }
                                <td>
                                    <MdAdd />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

interface Props extends CardProps {
    sensores?: Sensor[];
    actuadores?: Actuador[];
    nombre: string;
}

const style = {
    Card: { width: '100%', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Badge: { fontSize: '100%' },
};

export default ConfiguracionSensoresActuadores;
