import Axios from "axios";

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

export default instance;
