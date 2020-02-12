import moment from 'moment';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Card, CardProps, Table } from 'react-bootstrap';
import { MdClose, MdDoneAll, MdSchedule } from 'react-icons/md';
import { Actuador } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';

class DetalleActuador extends Component<Props> {
    render() {
        const {
            actuador: {
                id,
                descripcion,
                tipo,
                estado = 'Apagado',
                activarDesde,
                activarHasta,
                comandos = [],
            },
        } = this.props;

        comandos.reverse();
        const ultimosComandos = comandos.slice(0, 5);
        const ultimoComandoTemporal = comandos.find((comando) => !!comando.desde);
        if (ultimoComandoTemporal && moment(ultimoComandoTemporal.hasta).isAfter(moment())) {
            const indxComando = ultimosComandos.indexOf(ultimoComandoTemporal);
            if (indxComando !== -1) {
                ultimosComandos.splice(indxComando, 1);
            } else {
                ultimosComandos.pop();
            }
            ultimosComandos.unshift(ultimoComandoTemporal);
        }

        return (
            <Card
                style={ style.Card }
                border={
                    estado === 'Encendido' || estado === true ? 'success' : undefined
                }>
                <Card.Header as="h6" style={ style.Header }>
                    { 'Actuador ' } { id }
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
                            <tr>
                                <td style={ style.Td }>Estado</td>
                                <td>
                                    <IndicadorEstado estado={ estado } />
                                </td>
                            </tr>
                            { activarDesde && (
                                <tr>
                                    <td style={ style.Td }>Activación</td>
                                    <td>{ activarDesde + '-' + activarHasta }</td>
                                </tr>
                            ) }
                            <tr>
                                <td style={ style.Subtitulo } colSpan={ 2 }>
                                    Comandos
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
                            { ultimosComandos.map(
                                (
                                    {
                                        id: idComando,
                                        fechaHora,
                                        desde,
                                        hasta,
                                        tipo: tipoComando,
                                        confirmacion,
                                    },
                                    index,
                                ) => (
                                    <tr key={ idComando }>
                                        <td style={ style.Td }>
                                            { moment(desde || fechaHora).format(
                                                'DD/MM/YYYY HH:mm',
                                            ) }
                                            { hasta &&
                                                ` - ${moment(hasta).format(
                                                    'DD/MM/YYYY HH:mm',
                                                )}` }
                                        </td>
                                        <td>
                                            { tipoComando }
                                            { '  ' }
                                            { confirmacion ? (
                                                <MdDoneAll />
                                            ) : index === 0 ? (
                                                <MdSchedule />
                                            ) : (
                                                <MdClose />
                                            ) }
                                        </td>
                                    </tr>
                                ),
                            ) }
                        </ReactCSSTransitionGroup>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

interface Props extends CardProps {
    actuador: Actuador;
}

const style = {
    Card: { minWidth: '20rem', maxWidth: '25rem', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Td: { paddingLeft: '1.5rem' },
    Subtitulo: { backgroundColor: 'rgba(0,0,0,.03)', textAlign: 'center' } as any,
};

export default DetalleActuador;
