
import axios from 'axios';
const ApiService = {
    get(path: string, params: any = {}) {
        return axios.get(path, { params: params });
    },
    post(path: string, params: any = {}) {
        return axios.post(path, params);
    },
    put(path: string, params: any = {}) {
        return axios.put(path, params);
    },
    delete(path: string, params: any = {}) {
        return axios.delete(path, params);
    }
};


export default ApiService;