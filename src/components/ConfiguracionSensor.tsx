import React, { Component, ReactNode } from 'react';
import { Button, FormControl, FormControlProps, InputGroup } from 'react-bootstrap';
import { MdCheck, MdClose, MdCreate, MdUndo } from 'react-icons/md';
import { Sensor } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';

class ConfiguracionSensor extends Component<Props, State> {
    unidades = { Humedad: '%', Temperatura: '°C', Luz: 'lx' };
    constructor(props: Props) {
        super(props);

        this.state = {
            sensor: props.sensor,
            edicion: !props.sensor.id,
        };
    }

    editar = () => {
        this.setState((prevState) => ({ edicion: !prevState.edicion }));
    };

    eliminar = () => {
        const sensorModificado = {
            ...this.state.sensor,
            eliminado: !this.state.sensor.eliminado,
        };
        this.onChange(sensorModificado);
    };

    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        if (!event.currentTarget.id) {
            return;
        }
        const id = event.currentTarget.id;
        const value = event.currentTarget.value;
        const sensorModificado = {
            ...this.state.sensor,
            [id]: value,
        };
        this.onChange(sensorModificado);
    };

    onChange = (sensorModificado: Sensor) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.state.sensor, sensorModificado);
        }
        this.setState({
            sensor: sensorModificado,
        });
    };

    render(): ReactNode {
        const {
            sensor: {
                id,
                descripcion,
                tipo,
                estado,
                valorMinimo = '',
                valorMaximo = '',
                eliminado,
            },
            edicion,
        } = this.state;

        return (
            <tr key={ id } style={ eliminado ? { background: 'grey' } : {} }>
                <td>{ id }</td>
                <td>
                    { edicion ? (
                        <FormControl
                            value={ descripcion || '' }
                            size="sm"
                            id="descripcion"
                            onChange={ this.handleChange }
                        />
                    ) : (
                        descripcion
                    ) }
                </td>
                <td>
                    { edicion ? (
                        <FormControl
                            as="select"
                            value={ tipo || '' }
                            size="sm"
                            id="tipo"
                            onChange={ this.handleChange }>
                            <option key="none" />
                            { Object.keys(this.unidades).map((tipoVariable) => (
                                <option key={ tipoVariable }>{ tipoVariable }</option>
                            )) }
                        </FormControl>
                    ) : (
                        tipo
                    ) }
                </td>
                <td>
                    <IndicadorEstado estado={ estado } />
                </td>
                <td>
                    { edicion ? (
                        <InputGroup size="sm">
                            <FormControl
                                type="number"
                                value={ String(valorMinimo) }
                                id="valorMinimo"
                                onChange={ this.handleChange }
                            />
                            { tipo && (
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        { this.unidades[tipo] || '' }
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            ) }
                        </InputGroup>
                    ) : (
                        valorMinimo && `${valorMinimo} ${tipo ? this.unidades[tipo] : ''}`
                    ) }
                </td>
                <td>
                    { edicion ? (
                        <InputGroup size="sm">
                            <FormControl
                                type="number"
                                value={ String(valorMaximo) }
                                id="valorMaximo"
                                onChange={ this.handleChange }
                            />
                            { tipo && (
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        { this.unidades[tipo] || '' }
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            ) }
                        </InputGroup>
                    ) : (
                        valorMaximo && `${valorMaximo} ${tipo ? this.unidades[tipo] : ''}`
                    ) }
                </td>
                <th>
                    <Button
                        variant="outline-dark"
                        onClick={ this.eliminar }
                        disabled={ edicion }>
                        { eliminado ? <MdUndo /> : <MdClose /> }
                    </Button>
                </th>
                <th>
                    <Button
                        variant="outline-dark"
                        onClick={ this.editar }
                        disabled={ eliminado }>
                        { edicion ? <MdCheck /> : <MdCreate /> }
                    </Button>
                </th>
            </tr>
        );
    }
}

interface Props {
    sensor: Sensor;
    index: number;
    onChange?: (prevSensor: Sensor, sensor: Sensor) => void;
}

interface State {
    sensor: Sensor;
    edicion: boolean;
}

export default ConfiguracionSensor;
