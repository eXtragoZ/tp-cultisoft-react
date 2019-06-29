import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';

const IndicadorEstado: FC<Props> = ({ estado = 'Apagado' }) => {
    if (estado === false) {
        estado = 'Apagado';
    } else if (estado === true) {
        estado = 'Encendido';
    }
    return (
        <Badge
            variant={ estado === 'Encendido' ? 'success' : 'danger' }
            style={ style.Badge }>
            { estado ? estado : ' - ' }
        </Badge>
    );
};

interface Props {
    estado?: string | boolean;
}

const style = {
    Badge: { fontSize: '100%' },
};

export default IndicadorEstado;
