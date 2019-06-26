import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';

const IndicadorEstado: FC<Props> = ({ estado = 'Apagado' }) => {
    return (
        <Badge variant={ estado === 'Encendido' ? 'success' : 'danger' } style={ style.Badge }>
            { estado }
        </Badge>
    );
};

interface Props {
    estado?: string;
}

const style = {
    Badge: { fontSize: '100%' },
};

export default IndicadorEstado;
