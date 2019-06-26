import React, { Component, ReactNode } from 'react';
import { Card, CardProps, Table } from 'react-bootstrap';
import { Actuador } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';

class DetalleActuador extends Component<Props> {
    render(): ReactNode {
        const {
            actuador: { id, descripcion, tipo, estado, activarDesde, activarHasta },
        } = this.props;

        return (
            <Card style={ style.Card }>
                <Card.Header as="h6" style={ style.Header }>
                    { 'Actuador ' } { id }
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
                            <tr>
                                <td style={ style.Td }>18/06/2019 23:30</td>
                                <td>Prender</td>
                            </tr>
                        </tbody>
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
    Card: { width: '20rem', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Td: { paddingLeft: '1.5rem' },
    Subtitulo: { backgroundColor: 'rgba(0,0,0,.03)', textAlign: 'center' } as any,
};

export default DetalleActuador;
