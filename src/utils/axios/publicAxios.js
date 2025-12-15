import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1/",
});

export default publicAxios;