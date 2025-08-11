import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

import '../../styles/Card.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // o tu tema actual
import 'primereact/resources/primereact.min.css';

const Card = ({ titulo, fecha, contenido }) => {
    const [visible, setVisible] = useState(false);

    const handleCardClick = () => {
        setVisible(true);
    };

    return (
        <>
            <div className="noticia-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <div className="noticia-header">
                    <h2>{titulo}</h2>
                    <span className="noticia-fecha">{fecha}</span>
                </div>
            </div>
            <Dialog
                header={titulo}
                visible={visible}
                onHide={() => setVisible(false)}
                modal
            >
                <p><strong>Fecha:</strong> {fecha}</p>
                <p>{contenido}</p>
            </Dialog>
        </>
    );
}

export default Card