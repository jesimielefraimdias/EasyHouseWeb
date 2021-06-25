import Axios from 'axios';

const axiosViaCep = Axios.create({
    baseURL: "https://viacep.com.br"

});

export default axiosViaCep;