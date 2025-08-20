
import axios from "axios"; 

// const prod = "https://e-commerce-henna-beta-50.vercel.app/api/v1/"

const local = 'http://localhost:5000/api/v1/'

const instance = axios.create({
  baseURL : local,
});

export default instance;