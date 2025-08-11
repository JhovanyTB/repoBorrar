import axios from 'axios';

const key = 'f2da616946b24c4d8ec679ce3deba539';
const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-07-11&sortBy=publishedAt`;

export class APIService {
    constructor() {
        this.headersGET = {
            accept: "*/*",
            'X-Api-Key': key
        };
    }

    consultaNoticias = async () => {
        try {
            const response = await axios.get(url, { headers: this.headersGET });
            return response.data.articles;
        } catch (e) {
            console.error('Error en consultaNoticias:', e);
            throw e;
        }
    }
}
