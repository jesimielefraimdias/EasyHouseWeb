import Axios from 'axios';

const axiosServer = Axios.create({
    withCredentials: true,
    // baseURL: "http://162.214.54.8:3353"
    // baseURL: "http://192.168.56.1:3353"
    baseURL: "http://192.168.18.2:3353"
});

export default axiosServer;
