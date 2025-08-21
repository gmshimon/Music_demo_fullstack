
/* eslint-disable no-unused-vars */
import axios from "axios"; 

const prod = "http://s000ow4csgccs8o00ck40gs8.31.97.71.226.sslip.io/api/v1/"

const local = 'http://localhost:5000/api/v1/'

const instance = axios.create({
  baseURL : prod,
});

export default instance;