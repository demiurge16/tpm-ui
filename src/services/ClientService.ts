import axios from 'axios';

export class ClientService {

    public static async getClients(): Promise<any> {
        const response = await axios.get('http://localhost:8080/api/v1/client');
        return response.data;
    }
}
