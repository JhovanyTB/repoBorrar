import React from 'react';
import '../../styles/Card.css';

const Card = ({ titulo, fecha }) => {
    return (
        <div className="noticia-card">
            <div className="noticia-header">
                <h2>{titulo}</h2>
                <span className="noticia-fecha">{fecha}</span>
            </div>
        </div>
    );
}

export default Card