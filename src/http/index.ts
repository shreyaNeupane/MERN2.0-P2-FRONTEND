import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    // kun format ma data janxa yo url bata tesko type
    "Content-type": "application/json",
    // kun format ko data accept garne backend bata
    'Accept': "application/json",
   
  },
});
// when we require login and token
const APIAuthenticated = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
    'Accept': "application/json",
    'Authorization' : `${localStorage.getItem('token')}`
  }
})

export  {API,APIAuthenticated  }
