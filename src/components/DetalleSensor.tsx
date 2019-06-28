import moment from 'moment';
import React, { Component, ReactNode } from 'react';
import { Card, CardProps, Table } from 'react-bootstrap';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { Sensor } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';

class DetalleSensor extends Component<Props> {
    unidades = { Humedad: '%', Temperatura: '°C', Luz: 'lx' };
    render(): ReactNode {
        const {
            sensor: {
                id,
                descripcion,
                tipo,
                estado,
                valorMinimo,
                valorMaximo,
                estados = [],
            },
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
                                <td style={ style.Td }>Codigo</td>
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
                            { estado && (
                                <tr>
                                    <td style={ style.Td }>Estado</td>
                                    <td>
                                        <IndicadorEstado estado={ estado } />
                                    </td>
                                </tr>
                            ) }
                            <tr>
                                <td style={ style.Subtitulo } colSpan={ 2 }>
                                    Valores censados
                                </td>
                            </tr>
                            { estados.slice(0, 5).map(({ fechaHora, valor }) => (
                                <tr key={ fechaHora }>
                                    <td style={ style.Td }>
                                        { moment(fechaHora).format('DD/MM/YYYY hh:ss') }
                                    </td>
                                    <td>
                                        { valor } { tipo ? this.unidades[tipo] : '' }{ ' ' }
                                        { valorMinimo &&
                                            valor &&
                                            valorMinimo >= valor && [
                                                <MdReportProblem
                                                    key="atencion"
                                                    style={ { color: 'red' } }
                                                />,
                                                <FaAngleDoubleDown
                                                    key="valorBajo"
                                                    style={ { color: 'red' } }
                                                />,
                                            ] }
                                        { valorMaximo &&
                                            valor &&
                                            valorMaximo <= valor && [
                                                <MdReportProblem
                                                    key="atencion"
                                                    style={ { color: 'red' } }
                                                />,
                                                <FaAngleDoubleUp
                                                    key="valorAlto"
                                                    style={ { color: 'red' } }
                                                />,
                                            ] }
                                    </td>
                                </tr>
                            )) }
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
