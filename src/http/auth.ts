import axios from "axios";
import { getCookieToken } from "@/lib/actions/auth.action";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

const $auth = axios.create({
    baseURL: URL
});

$auth.interceptors.request.use(async (config) => {
    const token = await getCookieToken();

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default $auth;