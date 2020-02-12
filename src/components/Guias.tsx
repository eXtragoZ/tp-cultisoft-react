import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Table } from 'react-bootstrap';
import { Usuario } from '../App';

class Guias extends Component<Props> {
   
    render() {
        return (
            <Fragment>
                <h2>Guias</h2>
                <br />
               
                    <Table responsive hover >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Eliminar</th>
                                <th>Ejecutar</th>
                                <th>Configuración</th>
                            </tr>
                        </thead>
                        <ReactCSSTransitionGroup
                            transitionName="list-item"
                            component="tbody"
                            transitionAppear
                            transitionAppearTimeout={ 500 }>
                            
                            <tr key="add">
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>
                                   
                                </td>
                            </tr>
                        </ReactCSSTransitionGroup>
                    </Table>
            </Fragment>
        );
    }
}

interface Props {
    usuario: Usuario;
}

export default Guias;
