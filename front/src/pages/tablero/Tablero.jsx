import React, { useState, useEffect } from 'react';

import '../../styles/Tablero.css';

import { APIService } from '../../services/APIService';

import Card from './Card';

const Tablero = () => {
    const [noticias, setNoticias] = useState([]);
    const [noticiasPendientes, setNoticiasPendientes] = useState([]);
    const [noticiasRevision, setNoticiasRevision] = useState([]);
    const [noticiasCompletadas, setNoticiasCompletadas] = useState([]);
    const [noticiasDescartadas, setNoticiasDescartadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNoticias = async () => {
        const api = new APIService();
        try {
            const data = await api.consultaNoticias();
            setNoticias(data);
            console.log(data);
        } catch (err) {
            setError('Error al cargar noticias');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNoticias();
    }, []);

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <p>{error}</p>;

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
                        contenido="tralalero tralala"
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