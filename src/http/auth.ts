// import axios from "axios";
//
// import { getCookieToken } from "@/lib/actions/auth.action";
//
// const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;
//
// const $auth = axios.create({
//     baseURL: URL
// });
//
// $auth.interceptors.request.use(async (config) => {
//     const token = await getCookieToken();
//
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//
//     return config;
// })
//
// export default $auth;

// import { getCookieToken } from "@/lib/actions/auth.action";
//
// const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL as string;
//
// interface FetchOptions extends RequestInit {
//     headers?: Record<string, string>;
// }
//
// async function authFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
//     const token = await getCookieToken();
//
//     const headers = {
//         ...options.headers,
//         ...(token && { Authorization: `Bearer ${token}` }),
//     };
//
//     const config: FetchOptions = {
//         ...options,
//         headers,
//     };
//
//     const response = await fetch(`${URL}${endpoint}`, config);
//
//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//
//     return response.json() as Promise<T>;
// }
//
// export default authFetch;

// import {getCookieToken} from "@/lib/actions/auth.action";
//
// const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;
//
// interface axiosProps {}
//
// export const $axios = async (endpoint: string, data?: any) => {
//     const token = await getCookieToken();
//
//     const init = data
//         ? {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         : undefined;
//
//     const response = await fetch(`${URL}/${endpoint}`, { ...init });
//
//     if (!response.ok) {
//         if (response.status === 401) {
//             throw new Error('Unauthorized');
//         }
//
//         throw new Error('Request Failed');
//     }
//
//     return response.json();
// };