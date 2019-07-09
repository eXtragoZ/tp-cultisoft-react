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
        const unidad = tipo ? this.unidades[tipo] : '';
        const ultimoEstado = estados[estados.length - 1];
        const mayorAlRango =
            valorMaximo !== undefined &&
            ultimoEstado !== undefined &&
            valorMaximo < ultimoEstado.valor;
        const menorAlRango =
            valorMinimo !== undefined &&
            ultimoEstado !== undefined &&
            valorMinimo > ultimoEstado.valor;
        const fueraDeRango = mayorAlRango || menorAlRango;
        return (
            <Card style={ style.Card } border={ fueraDeRango ? 'danger' : undefined }>
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

                            { valorMinimo && (
                                <tr>
                                    <td style={ style.Td }>Valor minimo</td>
                                    <td>
                                        { valorMinimo } { unidad }
                                    </td>
                                </tr>
                            ) }

                            { valorMaximo && (
                                <tr>
                                    <td style={ style.Td }>Valor maximo</td>
                                    <td>
                                        { valorMaximo } { unidad }
                                    </td>
                                </tr>
                            ) }
                            <tr>
                                <td style={ style.Subtitulo } colSpan={ 2 }>
                                    Valores censados
                                </td>
                            </tr>
                            { estados
                                .reverse()
                                .slice(0, 5)
                                .map(({ id, fechaHora, valor }) => (
                                    <tr key={ id }>
                                        <td style={ style.Td }>
                                            { moment(fechaHora).format('DD/MM/YYYY HH:mm') }
                                        </td>
                                        <td>
                                            { valor } { unidad }{ ' ' }
                                            { valorMinimo !== undefined &&
                                                valor !== undefined &&
                                                valorMinimo > valor && [
                                                    <MdReportProblem
                                                        key="atencion"
                                                        style={ { color: 'red' } }
                                                    />,
                                                    <FaAngleDoubleDown
                                                        key="valorBajo"
                                                        style={ { color: 'red' } }
                                                    />,
                                                ] }
                                            { valorMaximo !== undefined &&
                                                valor !== undefined &&
                                                valorMaximo < valor && [
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
    Card: { minWidth: '20rem', maxWidth: '25rem', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Td: { paddingLeft: '1.5rem' },
    Subtitulo: { backgroundColor: 'rgba(0,0,0,.03)', textAlign: 'center' } as any,
};

export default DetalleSensor;
