import axios from "axios";
import { getCookie } from "@/lib/actions/auth.action";

const URL = process.env.NEXT_PUBLIC_LOCALE_API_URL;

const $auth = axios.create({
    baseURL: URL
});

$auth.interceptors.request.use(async (config) => {
    let token = await getCookie();

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default $auth;
