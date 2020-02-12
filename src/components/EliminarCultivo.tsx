import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';
import cultiFetch from '../CultiAPI';
import { Cultivo } from './Cultivos';

class EliminarCultivo extends Component<Props> {
    state = {
        eliminacion: false,
        listo: false,
        cargando: false,
    };

    abrir: MouseEventHandler = () => {
        this.setState({ eliminacion: true });
    };

    cerrar = () => {
        this.setState({ eliminacion: false });
    };

    listo = () => {
        const { actualizarCultivos } = this.props;
        this.setState({ listo: false }, actualizarCultivos);
    };

    eliminar = async () => {
        const { cultivo } = this.props;
        this.setState({ cargando: true });
        try {
            // const json =
            await cultiFetch('cultivo/modificarCultivo/', {
                ...cultivo,
                eliminado: true,
            });
            this.setState({ abierto: false, listo: true, eliminacion: false });
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                this.setState({ error: 'Error de conexión' });
            } else {
                this.setState({ error: error.message || 'Error de conexión' });
            }
        }
        this.setState({ cargando: false });
    };

    render(): ReactNode {
        const { children } = this.props;
        return (
            <Fragment>
                <Button variant="outline-dark" onClick={ this.abrir }>
                    { children }
                </Button>

                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText={
                        this.state.cargando ? (
                            <PacmanLoader
                                size={ 10 }
                                color="#ffc107"
                                css={ 'margin: 5px 40px 15px 0px;' }
                            />
                        ) : (
                            'Si, eliminarlo!'
                        )
                    }
                    cancelBtnText={
                        'Cancelar'
                    }
                    confirmBtnBsStyle="danger"
                    title="Estas seguro?"
                    onConfirm={ this.eliminar }
                    onCancel={ this.cerrar }
                    show={ this.state.eliminacion }
                    disabled={ this.state.cargando }>
                    Se eliminaran el cultivo de tu lista!<br />Y toda su configuración!
                </SweetAlert>
                <SweetAlert
                    success
                    title="Listo!"
                    onConfirm={ this.listo }
                    show={ this.state.listo }>
                    Tu cultivo fue eliminado!
                </SweetAlert>
            </Fragment>
        );
    }
}

interface Props {
    children: ReactNode;
    cultivo: Cultivo;
    actualizarCultivos: () => void;
}

export default EliminarCultivo;
