import React, { Component, ReactNode } from 'react';
import { Button, Card, CardProps, Table } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import ConfiguracionSensor from './ConfiguracionSensor';
import { Sensor } from './Cultivos';

class ConfiguracionSensores extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            sensores: props.sensores || [],
        };
    }

    nuevo = () => {
        this.setState(
            (prevState) => ({
                sensores: [...prevState.sensores, { eliminado: false }],
            }),
            this.onChange,
        );
    };

    handleChange = (prevSensor: Sensor, sensor: Sensor) => {
        const sensoresModificados = [...this.state.sensores];
        sensoresModificados[sensoresModificados.indexOf(prevSensor)] = sensor;
        this.setState(
            {
                sensores: sensoresModificados,
            },
            this.onChange,
        );
    };

    onChange() {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.state.sensores);
        }
    }

    render(): ReactNode {
        const { sensores } = this.state;
        return (
            <Card style={ style.Card }>
                <Card.Header as="h6" style={ style.Header }>
                    Sensores
                </Card.Header>
                <Card.Body style={ style.Body }>
                    <Table responsive striped size="sm">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Valor Mínimo</th>
                                <th>Valor Máximo</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { sensores.map((sensor, index) => (
                                <ConfiguracionSensor
                                    key={
                                        sensor.id
                                            ? 'sensor' + sensor.id
                                            : 'nuevoSensor' + index
                                    }
                                    sensor={ sensor }
                                    index={ index }
                                    onChange={ this.handleChange }
                                />
                            )) }

                            <tr key="add">
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>
                                    <Button variant="outline-dark" onClick={ this.nuevo }>
                                        <MdAdd />
                                    </Button>
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
    onChange?: (sensores: Sensor[]) => void;
}

interface State {
    sensores: Sensor[];
}

const style = {
    Card: { width: '100%', margin: '.5rem 0 .5rem 0' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
};

export default ConfiguracionSensores;
