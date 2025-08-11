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

    consultaColor = async () => {
        try {
            const response = await axios.get(this.url + 'ConsultaColor', { headers: this.headersGET });
            return response.data.Data;
        } catch (e) {
            console.error('Error Clase Service, consultaColor', e);
            throw e;
        }
    }

}