import React, { Component, ReactNode } from 'react';
import {
    Card,
    CardProps,
    Col,
    Form,
    FormControlProps,
    InputGroup,
} from 'react-bootstrap';
import { Actuador, Sensor } from './Cultivos';

class ConfiguracionVariable extends Component<Props, State> {
    state: State = {};
    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value } as any);
    };

    render(): ReactNode {
        const { minimo, maximo, umbral, sensor, actuador } = this.state;

        const {
            nombre,
            actuadores = [],
            sensores = [],
            unidad = '%',
            tiempo,
            ...cardProps
        } = this.props;

        return (
            <Card style={ style.Card } { ...cardProps }>
                <Card.Header as="h6" style={ style.Header }>
                    { nombre }
                </Card.Header>
                <Card.Body style={ style.Body }>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="minimo" style={ style.Group }>
                            <Form.Label>{ tiempo ? 'Desde' : 'Mínimo' }</Form.Label>
                            <InputGroup size="sm">
                                <Form.Control
                                    type={ tiempo ? 'time' : 'number' }
                                    value={ String(minimo) }
                                    onChange={ this.handleChange }
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>{ unidad }</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="maximo" style={ style.Group }>
                            <Form.Label>{ tiempo ? 'Hasta' : 'Máximo' }</Form.Label>
                            <InputGroup size="sm">
                                <Form.Control
                                    type={ tiempo ? 'time' : 'number' }
                                    value={ String(maximo) }
                                    onChange={ this.handleChange }
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>{ unidad }</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        { !tiempo && (
                            <Form.Group as={ Col } controlId="umbral" style={ style.Group }>
                                <Form.Label>Umbral</Form.Label>
                                <InputGroup size="sm">
                                    <Form.Control
                                        type="number"
                                        value={ String(umbral) }
                                        onChange={ this.handleChange }
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>{ unidad }</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        ) }
                    </Form.Row>
                    <Form.Row>
                        { !tiempo && (
                            <Form.Group as={ Col } controlId="sensor" style={ style.Group }>
                                <Form.Label>Sensor</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={ sensor }
                                    onChange={ this.handleChange }
                                    size="sm">
                                    { sensores.map(({ id, descripcion }) => (
                                        <option key={ id }>{ `${descripcion} ${id}` }</option>
                                    )) }
                                </Form.Control>
                            </Form.Group>
                        ) }
                        <Form.Group as={ Col } controlId="actuador" style={ style.Group }>
                            <Form.Label>Actuador</Form.Label>
                            <Form.Control
                                as="select"
                                value={ actuador }
                                onChange={ this.handleChange }
                                size="sm">
                                { actuadores.map(({ id, descripcion }) => (
                                    <option key={ id }>{ `${descripcion} ${id}` }</option>
                                )) }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
            </Card>
        );
    }
}

interface Props extends CardProps {
    sensores: Sensor[];
    actuadores: Actuador[];
    nombre: string;
    unidad?: string;
    tiempo?: boolean;
}
interface State {
    sensor?: string;
    actuador?: string;
    minimo?: number | string;
    maximo?: number | string;
    umbral?: number | string;
}

const style = {
    Card: { width: '20rem', margin: '0.5rem', fontSize: 'small' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: '1rem' },
    Group: { margin: '.1rem' },
};

export default ConfiguracionVariable;
