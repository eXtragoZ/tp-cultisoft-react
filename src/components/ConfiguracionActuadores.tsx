import React, { Component, ReactNode } from 'react';
import { Button, Card, CardProps, Table } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import ConfiguracionActuador from './ConfiguracionActuador';
import { Actuador } from './Cultivos';

class ConfiguracionActuadores extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            actuadores: props.actuadores || [],
        };
    }

    nuevo = () => {
        this.setState(
            (prevState) => ({
                actuadores: [...prevState.actuadores, { eliminado: false }],
            }),
            this.onChange,
        );
    };

    handleChange = (prevActuador: Actuador, actuador: Actuador) => {
        const actuadoresModificados = [...this.state.actuadores];
        actuadoresModificados[actuadoresModificados.indexOf(prevActuador)] = actuador;
        this.setState(
            {
                actuadores: actuadoresModificados,
            },
            this.onChange,
        );
    };

    onChange() {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.state.actuadores);
        }
    }

    render(): ReactNode {
        const { actuadores } = this.state;
        return (
            <Card style={ style.Card }>
                <Card.Header as="h6" style={ style.Header }>
                    Actuadores
                </Card.Header>
                <Card.Body style={ style.Body }>
                    <Table responsive striped size="sm">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                { false && <th>Activar Desde</th> }
                                { false && <th>Activar Hasta</th> }
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { actuadores.map((actuador, index) => (
                                <ConfiguracionActuador
                                    key={
                                        actuador.id
                                            ? 'actuador' + actuador.id
                                            : 'nuevoActuador' + index
                                    }
                                    actuador={ actuador }
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
    actuadores?: Actuador[];
    onChange?: (actuadores: Actuador[]) => void;
}

interface State {
    actuadores: Actuador[];
}

const style = {
    Card: { width: '100%', margin: '.5rem 0 .5rem 0' },
    Header: { padding: '.35rem 1.25rem' },
    Body: { padding: 0 },
    Badge: { fontSize: '100%' },
};

export default ConfiguracionActuadores;
