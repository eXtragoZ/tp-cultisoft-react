import moment from 'moment';
import React, { PureComponent, ReactNode } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Card, CardProps, Table } from 'react-bootstrap';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { Sensor } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

class DetalleSensor extends PureComponent<Props> {
    unidades = { Humedad: '%', Temperatura: '°C', Luz: 'lx' };
    formatDate = (fechaHora: string | number) => moment(fechaHora).format('DD/MM/YYYY HH:mm');

    formatHour = (fechaHora: string | number) => moment(fechaHora).format('HH:mm');
    formatValue = (value: string | number) => {
        const { tipo } = this.props.sensor;
        const unidad = tipo ? this.unidades[ tipo ] : '';
        return `${ value } ${ unidad }`;
    };

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
        const ultimoEstado = estados[ estados.length - 1 ];
        const mayorAlRango =
            valorMaximo !== undefined &&
            ultimoEstado !== undefined &&
            Number.isInteger(valorMaximo) &&
            Number.isInteger(ultimoEstado) &&
            valorMaximo < ultimoEstado.valor;
        const menorAlRango =
            valorMinimo !== undefined &&
            ultimoEstado !== undefined &&
            Number.isInteger(valorMinimo) &&
            Number.isInteger(ultimoEstado) &&
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
                                        { this.formatValue(valorMinimo) }
                                    </td>
                                </tr>
                            ) }

                            { valorMaximo && (
                                <tr>
                                    <td style={ style.Td }>Valor maximo</td>
                                    <td>
                                        { this.formatValue(valorMaximo) }
                                    </td>
                                </tr>
                            ) }
                            <tr>
                                <td style={ style.Subtitulo } colSpan={ 2 }>
                                    Valores censados
                                </td>
                            </tr>
                        </tbody>
                        <ReactCSSTransitionGroup
                            transitionName="list-item"
                            component="tbody"
                            transitionAppear
                            transitionAppearTimeout={ 500 }
                            transitionEnter
                            transitionEnterTimeout={ 500 }
                            transitionLeave
                            transitionLeaveTimeout={ 300 }>
                            { estados
                                .slice(-5)
                                .reverse()
                                .map(({ id, fechaHora, valor }) => (
                                    <tr key={ id } style={ { width: '100%' } }>
                                        <td style={ style.Td }>
                                            { this.formatDate(fechaHora) }
                                        </td>
                                        <td>
                                            { this.formatValue(valor) }{ ' ' }
                                            { valorMinimo !== undefined &&
                                                valor !== undefined &&
                                                Number.isInteger(valorMinimo) &&
                                                Number.isInteger(valor) &&
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
                                                Number.isInteger(valorMaximo) &&
                                                Number.isInteger(valor) &&
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
                        </ReactCSSTransitionGroup>
                        <tbody>
                            <tr>
                                <td colSpan={ 2 }>
                                    <AreaChart
                                        width={ 350 }
                                        height={ 180 }
                                        data={ estados.slice(-100) }
                                        syncId="anyId"
                                        style={ { fontSize: '12px', lineHeight: '1' } }>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fechaHora" tickFormatter={ this.formatHour } height={ 20 } />
                                        <YAxis width={ 60 } tickFormatter={ this.formatValue } />
                                        <Tooltip
                                            contentStyle={ {
                                                backgroundColor: 'rgb(255, 255, 255, 0.8)',
                                                padding: '5px',
                                            } }
                                            labelStyle={ { fontSize: '12px', lineHeight: '1' } }
                                            labelFormatter={ this.formatDate }
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="valor"
                                            stroke="hsl(195, 100%, 33%)"
                                            fill="hsl(195, 100%, 53%)"
                                            name="Valor"
                                        />
                                        <ReferenceLine y={ valorMaximo } label="Maximo" stroke="red" strokeDasharray="3 3" />
                                        <ReferenceLine y={ valorMinimo } label="Minimo" stroke="red" strokeDasharray="3 3" />
                                    </AreaChart>
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
    Card: { minWidth: '20rem', maxWidth: '25rem', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Td: { paddingLeft: '1.5rem' },
    Subtitulo: { backgroundColor: 'rgba(0,0,0,.03)', textAlign: 'center' } as any,
};

export default DetalleSensor;
