import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Toast } from 'primereact/toast';

import '../../styles/Tablero.css';

import { APIService } from '../../services/APIService';
import { TableroService } from '../../services/TableroServices';

import Card from './Card';

const Tablero = () => {
    const Service = useMemo(() => new TableroService(), []);
    const toast = useRef(null);
    const [noticias, setNoticias] = useState([]);
    const [noticiasPendientes, setNoticiasPendientes] = useState({});
    const [noticiasRevision, setNoticiasRevision] = useState([]);
    const [noticiasCompletadas, setNoticiasCompletadas] = useState([]);
    const [noticiasDescartadas, setNoticiasDescartadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNoticias = useCallback(async () => {
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
    }, [APIService]);

    useEffect(() => {
        document.title = "Noticias";
        fetchNoticias();
    }, [fetchNoticias]);

    const agregarNoticias = useCallback(async () => {
        const lista = [];
        noticias.forEach(element => {
            const param = {
                autor: element?.author || '',
                contenido: element?.content || '',
                descripcion: element?.description || '',
                fecha: element?.publishAt || '',
                fuente: element?.source.name || '',
                titulo: element?.title || '',
                url: element?.url || '',
                urlImagen: element?.urlToImage || ''
            }
            lista.push(param);
        });
        Service.agregaNoticia(lista).then(data => {
            if (data.code === 0) {
                toast.current.show([
                    { severity: 'success', summary: 'Datos Guardados', detail: data.message, life: 3000 }
                ]);
            } else {
                toast.current.show([
                    { severity: 'warn', summary: 'Datos No Guardados', detail: data.message, life: 3000 }
                ]);
            }
        }).catch(e => {
            console.log(e);
        })
    }, [Service]);

    const consultaNoticias = () => {
        Service.consultaNoticias(1).then(data => {
            if (data.code === 0) {
                setNoticiasPendientes(data.objResponse);
            } else {
                toast.current.show([
                    { severity: 'warn', summary: 'No hay Datos en Pendientes ', detail: data.message, life: 3000 }
                ]);
            }
        }).catch(e => {
            console.log(e);
        })
        Service.consultaNoticias(2).then(data => {
            if (data.code === 0) {
                setNoticiasRevision(data.objResponse);
            } else {
                toast.current.show([
                    { severity: 'warn', summary: 'No hay Datos en Revisión ', detail: data.message, life: 3000 }
                ]);
            }
        }).catch(e => {
            console.log(e);
        })
        Service.consultaNoticias(3).then(data => {
            if (data.code === 0) {
                setNoticiasCompletadas(data.objResponse);
            } else {
                toast.current.show([
                    { severity: 'warn', summary: 'No hay Datos en Pendientes ', detail: data.message, life: 3000 }
                ]);
            }
        }).catch(e => {
            console.log(e);
        })
        Service.consultaNoticias(4).then(data => {
            if (data.code === 0) {
                setNoticiasDescartadas(data.objResponse);
            } else {
                toast.current.show([
                    { severity: 'warn', summary: 'No hay Datos en Descartadas ', detail: data.message, life: 3000 }
                ]);
            }
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        agregarNoticias();
    }, [noticias, agregarNoticias]);

    useEffect(() => {
        consultaNoticias();
    }, [])

    const verificar = () => {
        consultaNoticias();
    }

    if (loading) return <p>Cargando noticias...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Toast ref={toast} position="top-right" />
            <div className='header'>
                <h1>Noticias</h1>
                <button className='buttonUpdate'>Actualizar</button>
            </div>
            <div class="container">
                <div className='block'>
                    {noticiasPendientes.map((noticia) => {
                        return (
                            <Card
                                idNoticia={noticia.idNoticia}
                                idEstatus={1}
                                autor={noticia.autor}
                                contenido={noticia.contenido}
                                descripcion={noticia.descripcion} 
                                fecha={noticia.fecha} 
                                fuente={noticia.fuente} 
                                titulo={noticia.titulo} 
                                url={noticia.url} 
                                urlImagen={noticia.urlImagen} 
                                actualizado={verificar}
                            />
                        );
                    })}
                </div>
                <div class="divider"></div>
                <div className='block'>
                    {noticiasRevision.map((noticia) => {
                        return (
                            <Card
                                idNoticia={noticia.idNoticia}
                                idEstatus={2}
                                autor={noticia.autor}
                                contenido={noticia.contenido}
                                descripcion={noticia.descripcion} 
                                fecha={noticia.fecha} 
                                fuente={noticia.fuente} 
                                titulo={noticia.titulo} 
                                url={noticia.url} 
                                urlImagen={noticia.urlImagen} 
                                actualizado={verificar}
                            />
                        );
                    })}
                </div>
                <div class="divider"></div>
                <div className='block'>
                    {noticiasCompletadas.map((noticia) => {
                        return (
                            <Card
                                idNoticia={noticia.idNoticia}
                                idEstatus={3}
                                autor={noticia.autor}
                                contenido={noticia.contenido}
                                descripcion={noticia.descripcion} 
                                fecha={noticia.fecha} 
                                fuente={noticia.fuente} 
                                titulo={noticia.titulo} 
                                url={noticia.url} 
                                urlImagen={noticia.urlImagen} 
                                actualizado={verificar}
                            />
                        );
                    })}
                </div>
                <div class="divider"></div>
                <div className='block'>
                    {noticiasDescartadas.map((noticia) => {
                        return (
                            <Card
                                idNoticia={noticia.idNoticia}
                                idEstatus={4}
                                autor={noticia.autor}
                                contenido={noticia.contenido}
                                descripcion={noticia.descripcion} 
                                fecha={noticia.fecha} 
                                fuente={noticia.fuente} 
                                titulo={noticia.titulo} 
                                url={noticia.url} 
                                urlImagen={noticia.urlImagen} 
                                actualizado={verificar}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Tablero;