import React, { Component, ReactNode } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { MdCheck, MdClose, MdCreate, MdUndo } from 'react-icons/md';
import { Actuador } from './Cultivos';
import IndicadorEstado from './IndicadorEstado';
import { unidades } from '../App';

class ConfiguracionActuador extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            actuador: props.actuador,
            edicion: !props.actuador.id,
        };
    }

    editar = () => {
        this.setState((prevState) => ({ edicion: !prevState.edicion }));
    };

    eliminar = () => {
        const actuadorModificado = {
            ...this.state.actuador,
            eliminado: !this.state.actuador.eliminado,
        };
        this.onChange(actuadorModificado);
    };

    actuadorInvalido = () => {
        const { descripcion = '' } = this.state.actuador;
        return descripcion === '';
    };

    handleChange = (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        if (!event.currentTarget.id) {
            return;
        }
        const id = event.currentTarget.id;
        const value = event.currentTarget.value;
        const actuadorModificado = {
            ...this.state.actuador,
            [id]: value,
        };
        this.onChange(actuadorModificado);
    };

    onChange = (actuadorModificado: Actuador) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.state.actuador, actuadorModificado);
        }
        this.setState({
            actuador: actuadorModificado,
        });
    };

    render(): ReactNode {
        const {
            actuador: {
                id,
                descripcion = '',
                tipo,
                estado,
                activarDesde = '',
                activarHasta = '',
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
                            { Object.keys(unidades).map((tipoVariable) => (
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
                { false && (
                    <td>
                        { edicion ? (
                            <InputGroup size="sm">
                                <FormControl
                                    type="time"
                                    value={ activarDesde }
                                    id="activarDesde"
                                    onChange={ this.handleChange }
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>hs</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        ) : (
                            activarDesde + ' hs'
                        ) }
                    </td>
                ) }
                { false && (
                    <td>
                        { edicion ? (
                            <InputGroup size="sm">
                                <FormControl
                                    type="time"
                                    value={ activarHasta }
                                    id="activarHasta"
                                    onChange={ this.handleChange }
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>hs</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        ) : (
                            activarHasta && activarHasta + ' hs'
                        ) }
                    </td>
                ) }
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
                        disabled={ eliminado || (this.actuadorInvalido() && edicion)  }>
                        { edicion ? <MdCheck /> : <MdCreate /> }
                    </Button>
                </th>
            </tr>
        );
    }
}

interface Props {
    actuador: Actuador;
    index: number;
    onChange?: (prevActuador: Actuador, actuador: Actuador) => void;
}

interface State {
    actuador: Actuador;
    edicion: boolean;
}

export default ConfiguracionActuador;
