import axios from "axios"
import url from "../url/url";

export class TableroService {
    constructor() {
        this.url = url.URLTablero
        this.headersGET = {
            accept: "*/*",
        };
        this.headersPOST = {
            accept: "*/*",
            "Content-Type": "application/json-patch+json",
        };
    }

    consultaNoticias = async (idTipo) => {
        try {
            const response = await axios.get(this.url + 'Tablero?idTipo='+idTipo, { headers: this.headersGET });
            return response.data;
        } catch (e) {
            console.error('Error Clase Service, consultaColor', e);
            throw e;
        }
    }

    actualizaEstatus = async (idNoticia,idTipo) => {
        try {
            const response = await axios.put(this.url + 'Tablero?idNoticia='+idNoticia+'&idTipo='+idTipo, { headers: this.headersGET });
            return response.data;
        } catch (e) {
            console.error('Error Clase Service, consultaColor', e);
            throw e;
        }
    }

    agregaNoticia = async (param) => {
        try {
            const response = await axios.post(this.url + 'Tablero', param);
            return response.data;
        } catch (e) {
            console.error('Error Clase Service, consultaColor', e);
            throw e;
        }
    }

}