import Axios from 'axios';

const axiosServer = Axios.create({
    withCredentials: true,
    baseURL: "http://192.168.18.2:3353"
});

export default axiosServer;
