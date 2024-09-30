import axios from "axios";

const URL = process.env.NEXT_PUBLIC_LOCALE_API_URL;

const $axios = axios.create({
    baseURL: URL
});

export default $axios;
