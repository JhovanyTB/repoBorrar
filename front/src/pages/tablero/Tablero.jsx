import React, { useState, useEffect } from 'react';
import { Divider } from 'primereact/divider';
import '../../styles/Tablero.css';

import Card from './Card';

const Tablero = () => {
    const [noticias, setNoticias] = useState([]);
    const [noticiasPendientes, setNoticiasPendientes] = useState([]);
    const [noticiasRevision, setNoticiasRevision] = useState([]);
    const [noticiasCompletadas, setNoticiasCompletadas] = useState([]);
    const [noticiasDescartadas, setNoticiasDescartadas] = useState([]);

    useEffect(() => {
        setNoticias([
            {
                titulo: "noti1",
                fecha: "10/08/2025",
            },
        ]);
    }, []);

    return (
        <>
            <div className='header'>
                <h1>Noticias</h1>
                <button className='buttonUpdate'>Actualizar</button>
            </div>
            <div class="container">
                <div className='block'>
                    <Card
                        titulo="Noticia 1"
                        fecha="10 de agosto de 2025"
                    />
                    <Card
                        titulo="Noticia 1"
                        fecha="10 de agosto de 2025"
                    />
                </div>
                <div class="divider"></div>
                <div className='block'>
                    <Card
                        titulo="Noticia 1"
                        fecha="10 de agosto de 2025"
                    />
                </div>
                <div class="divider"></div>
                <div className='block'>
                    <Card
                        titulo="Noticia 1"
                        fecha="10 de agosto de 2025"
                    />
                </div>
                <div class="divider"></div>
                <div className='block'>
                    <Card
                        titulo="Noticia 1"
                        fecha="10 de agosto de 2025"
                    />
                </div>
            </div>
        </>
    );
}

export default Tablero;