import axios from "axios";


const api = axios.create({

    baseURL:
    "https://webgisbanjir-production.up.railway.app/api"

});


export default api;