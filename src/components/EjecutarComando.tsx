import moment from 'moment';
import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import { Button, Col, Form, FormControlProps, InputGroup, Modal } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';
import cultiFetch from '../CultiAPI';
import { Actuador } from './Cultivos';
class EjecutarComando extends Component<Props, State> {
    opciones = ['Prender', 'Apagar'];
    constructor(props: Props) {
        super(props);
        const { actuadores = [] } = props;
        this.state = {
            abierto: false,
            listo: false,
            cargando: false,
            opcion: this.opciones[0],
            actuador: actuadores[0]
                ? `${actuadores[0].descripcion} - Codigo: ${actuadores[0].id}`
                : '',
            desde: moment().format('hh:ss'),
            hasta: moment()
                .add(1, 'hour')
                .format('hh:ss'),
        };
    }

    abrir: MouseEventHandler = () => {
        this.setState({ abierto: true });
    };

    cerrar = () => {
        this.setState({ abierto: false });
    };

    terminar = () => {
        this.setState({ listo: false });
    };

    enviarDeshabilitado = () => {
        const { desde, hasta, cargando } = this.state;
        return cargando || desde === '' || hasta === '';
    };

    enviar = async () => {
        const { actuadores = [] } = this.props;
        const { actuador, opcion, desde, hasta } = this.state;
        const acuadorEntidad = actuadores.find(
            ({ id, descripcion = 'ID' }) => `${descripcion} - Codigo: ${id}` === actuador,
        ) || { id: undefined };
        const desdeMoment = moment(desde, 'hh:ss');
        const hastaMoment = moment(hasta, 'hh:ss');
        const dayAfter = desdeMoment.isAfter(hastaMoment);

        this.setState({ cargando: true });
        try {
            // const json =
            await cultiFetch('comando/enviarComando/', {
                id_actuador: acuadorEntidad.id,
                tipo: opcion,
                desde: desdeMoment.format('YYYY-MM-DDThh:ssZ'),
                hasta: (dayAfter ? hastaMoment.add(1, 'day') : hastaMoment).format(
                    'YYYY-MM-DDThh:ssZ',
                ),
            });
            this.setState({ abierto: false, listo: true });
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
        this.setState({ cargando: false });
    };

    handleChange: React.FormEventHandler<FormControlProps | HTMLInputElement> = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value } as any);
    };

    render(): ReactNode {
        const { children, actuadores = [] } = this.props;
        return (
            <Fragment>
                <Button
                    variant="outline-dark"
                    onClick={ this.abrir }
                    disabled={ !actuadores.length }>
                    { children }
                </Button>
                <Modal show={ this.state.abierto } onHide={ this.cerrar } centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Ejecutar comando
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={ this.enviar }>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="opcion">
                                    <Form.Label>Acción</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ this.state.opcion }
                                        onChange={ this.handleChange }>
                                        { this.opciones.map((opcion) => (
                                            <option key={ opcion }>{ opcion }</option>
                                        )) }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="actuador">
                                    <Form.Label>Actuador</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ this.state.actuador }
                                        onChange={ this.handleChange }>
                                        { actuadores.map(
                                            ({ id, descripcion = 'Actuador' }) => (
                                                <option
                                                    key={
                                                        id
                                                    }>{ `${descripcion} - Codigo: ${id}` }</option>
                                            ),
                                        ) }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="desde">
                                    <Form.Label>Desde</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="time"
                                            value={ this.state.desde }
                                            onChange={ this.handleChange }
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="hs">hs</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="hasta">
                                    <Form.Label>Hasta</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="time"
                                            value={ this.state.hasta }
                                            onChange={ this.handleChange }
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="hs">hs</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ this.cerrar }>
                            Cerrar
                        </Button>
                        <Button
                            onClick={ this.enviar }
                            disabled={ this.enviarDeshabilitado() }>
                            { this.state.cargando ? (
                                <PacmanLoader
                                    size={ 10 }
                                    color="#ffc107"
                                    css={ 'margin: 2px 40px 12px 0px;' }
                                />
                            ) : (
                                'Enviar'
                            ) }
                        </Button>
                    </Modal.Footer>
                </Modal>

                <SweetAlert
                    success
                    title="Listo!"
                    onConfirm={ this.terminar }
                    show={ this.state.listo }>
                    Tu comando fue enviado!
                </SweetAlert>
            </Fragment>
        );
    }
}

interface Props {
    children: ReactNode;
    actuadores?: Actuador[];
}
interface State {
    abierto: boolean;
    listo: boolean;
    cargando: boolean;
    opcion: string;
    actuador: string;
    desde: string;
    hasta: string;
    error?: string;
}

export default EjecutarComando;
