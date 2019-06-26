import React, { Component, ReactNode } from 'react';
import { Card, CardProps, Table } from 'react-bootstrap';
import { MdReportProblem } from 'react-icons/md';
import { Sensor } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';

class DetalleSensor extends Component<Props> {
    unidades = { Humedad: '%', Temperatura: '°C', Luz: 'lx' };
    render(): ReactNode {
        const {
            sensor: { id, descripcion, tipo, estado, valor, valorMinimo, valorMaximo },
        } = this.props;

        return (
            <Card style={ style.Card }>
                <Card.Header as="h6" style={ style.Header }>
                    { 'Sensor ' } { id }
                    { descripcion && ' - ' + descripcion }
                </Card.Header>
                <Card.Body style={ style.Body }>
                    <Table responsive size="sm">
                        <tbody>
                            <tr>
                                <td style={ style.Td }>ID</td>
                                <td>{ id }</td>
                            </tr>
                            <tr>
                                <td style={ style.Td }>Descripcion</td>
                                <td>{ descripcion || '-' }</td>
                            </tr>
                            <tr>
                                <td style={ style.Td }>Tipo</td>
                                <td>{ tipo || '-' }</td>
                            </tr>
                            <tr>
                                <td style={ style.Td }>Estado</td>
                                <td>
                                    <IndicadorEstado estado={ estado } />
                                </td>
                            </tr>
                            <tr>
                                <td style={ style.Subtitulo } colSpan={ 2 }>
                                    Valores censados
                                </td>
                            </tr>
                            <tr>
                                <td style={ style.Td }>18/06/2019 23:30</td>
                                <td>
                                    { valor } { tipo ? this.unidades[tipo] : '' }{ ' ' }
                                    { valorMinimo && valor && valorMinimo >= valor && (
                                        <MdReportProblem />
                                    ) }
                                    { valorMaximo && valor && valorMaximo <= valor && (
                                        <MdReportProblem />
                                    ) }
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
    sensor: Sensor;
}

const style = {
    Card: { width: '20rem', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Td: { paddingLeft: '1.5rem' },
    Subtitulo: { backgroundColor: 'rgba(0,0,0,.03)', textAlign: 'center' } as any,
};

export default DetalleSensor;
