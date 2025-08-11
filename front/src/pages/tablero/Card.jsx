import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import '../../styles/Card.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // o tu tema actual
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { TableroService } from '../../services/TableroServices';

const Card = ({ idNoticia, idEstatus, autor, contenido, descripcion, fecha, fuente, titulo, url, urlImagen, actualizado }) => {
    const Service = new TableroService();
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);

    const handleCardClick = () => {
        setVisible(true);
    };

    const actualizar = (estatus) => {
        Service.actualizaEstatus(idNoticia,estatus).then(data => {
            setVisible(false);
            if (data.code === 0) {
                actualizado(true)
                toast.current.show([
                    { severity: 'warn', summary: 'Actualizado Correctamente', detail: "Actualizado correctamente", life: 3000 }
                ]);
            } else {
                actualizado(false)
                toast.current.show([
                    { severity: 'warn', summary: 'Hubo un error', detail: data.message, life: 3000 }
                ]);
            }
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <>
            <Toast ref={toast} position="top-right" />
            <div className="noticia-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <div className="noticia-header">
                    <p>{titulo}</p>
                    <p className="noticia-fecha">{fecha}</p>
                </div>
            </div>
            <Dialog
                header={titulo}
                visible={visible}
                onHide={() => setVisible(false)}
                style={{ width: '90%', }}
                modal
            >
                <p><strong>Fecha:</strong> {fecha}</p>
                <p>Autor: {autor}</p>
                <p>Contenido: {contenido}</p>
                <img src={urlImagen} style={{ width: '50%', height: 'auto', borderRadius: '6px' }} ></img>
                <p></p><a href={url} target="_blank">URL</a>
                <p>Fuente: {fuente}</p>
                {
                    idEstatus == 3 ? <></> :
                        idEstatus == 4 ?
                            <>
                                <Button
                                    icon="pi pi-fast-backward"
                                    onClick={() => actualizar(1)}
                                    rounded
                                    label={'Aprovar'}
                                    className="btn-form-icons"
                                    severity="success"
                                />
                            </> :
                            <>
                                <Button
                                    icon="pi pi-trash"
                                    onClick={() => actualizar(4)}
                                    rounded
                                    label={'Cancelar'}
                                    className="btn-form-icons"
                                    severity="danger"
                                />
                                <Button
                                    icon="pi pi-fast-forward"
                                    onClick={() => actualizar(idEstatus+1)}
                                    rounded
                                    label={'Aprovar'}
                                    className="btn-form-icons"
                                    severity="success"
                                />
                            </>
                }
            </Dialog>
        </>
    );
}

export default Card