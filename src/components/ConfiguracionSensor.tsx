import React, { Component, ReactNode } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { MdCheck, MdClose, MdCreate, MdUndo } from 'react-icons/md';
import { Sensor } from './Cultivos';

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

    handleChange = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        if (!event.currentTarget.id) {
            return;
        }
        const id = event.currentTarget.id;
        const isNumber =
            (id === 'valorMinimo' || id === 'valorMaximo') &&
            event.currentTarget.value !== '';
        const value = isNumber
            ? parseInt(event.currentTarget.value, 10)
            : event.currentTarget.value;
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

    sensorInvalido = () => {
        const { descripcion = '' } = this.state.sensor;
        if (descripcion === '') {
            return true;
        }
        return this.minimoMayorAMaximo();
    };

    minimoMayorAMaximo = () => {
        const { valorMinimo, valorMaximo } = this.state.sensor;
        if (
            valorMinimo !== undefined &&
            valorMaximo !== undefined &&
            Number.isInteger(valorMinimo) &&
            Number.isInteger(valorMaximo)
        ) {
            return valorMinimo >= valorMaximo;
        }
        return false;
    };

    render(): ReactNode {
        const {
            sensor: {
                id,
                descripcion = '',
                tipo,
                valorMinimo = '',
                valorMaximo = '',
                eliminado,
            },
            edicion,
        } = this.state;
        const unidad = tipo ? this.unidades[tipo] : '';
        return (
            <tr key={ id } style={ eliminado ? { background: 'grey' } : {} }>
                <td>{ id }</td>
                <td>
                    { edicion ? (
                        <FormControl
                            value={ descripcion }
                            size="sm"
                            id="descripcion"
                            onChange={ this.handleChange }
                            isInvalid={ descripcion === '' }
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
                    { edicion ? (
                        <InputGroup size="sm">
                            <FormControl
                                type="number"
                                value={ String(valorMinimo) }
                                id="valorMinimo"
                                onChange={ this.handleChange }
                                isInvalid={ this.minimoMayorAMaximo() }
                            />
                            { tipo && (
                                <InputGroup.Append>
                                    <InputGroup.Text>{ unidad }</InputGroup.Text>
                                </InputGroup.Append>
                            ) }
                        </InputGroup>
                    ) : (
                        valorMinimo && `${valorMinimo} ${unidad}`
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
                                isInvalid={ this.minimoMayorAMaximo() }
                            />
                            { tipo && (
                                <InputGroup.Append>
                                    <InputGroup.Text>{ unidad }</InputGroup.Text>
                                </InputGroup.Append>
                            ) }
                        </InputGroup>
                    ) : (
                        valorMaximo && `${valorMaximo} ${unidad}`
                    ) }
                    { this.minimoMayorAMaximo() && (
                        <div style={ { color: 'red', fontSize: '60%' } }>
                            Mínimo es mayor o igual al máximo
                        </div>
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
                        disabled={ eliminado || (this.sensorInvalido() && edicion) }>
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
