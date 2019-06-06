import React, { Component, Fragment, MouseEventHandler, ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PacmanLoader } from 'react-spinners';

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
        this.setState({ listo: false });
    };

    enviar = async () => {
        this.setState({ cargando: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.setState({ eliminacion: false, listo: true, cargando: false });
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
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Estas seguro?"
                    onConfirm={ this.enviar }
                    onCancel={ this.cerrar }
                    show={ this.state.eliminacion }
                    disabled={ this.state.cargando }>
                    Se eliminaran el cultivo de tu lista!
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
}

export default EliminarCultivo;
