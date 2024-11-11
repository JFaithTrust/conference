// import {revalidatePath} from "next/cache";
//
// const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL
//
// interface AuthProps {
//     endpoint: string;
//     options: {
//         method?: string;
//         headers: Record<string, string>;
//         body: Record<string, any>;
//     };
// }
//
// export async function $axios({endpoint, options}: AuthProps){
//     const response = await fetch(`${URL}${endpoint}`, {
//         method: options.method || "GET",
//         headers: {
//             ...options.headers,
//         },
//         body: JSON.stringify(options.body)
//     })
//
//     if (response.status === 401) {
//         console.warn('Unauthorized access - redirecting to login');
//     }
//
//     const data = await response.json();
//
//     revalidatePath('/')
//     return { data };
// }

// interface Props {
//     endpoint: string;
//     options: {
//         method?: string;
//         headers: Record<string, string>;
//         body: Record<string, any>;
//     };
// }
//
// export const $axios = async ({endpoint, options}: Props) => {
//
//     const init = options
//         ? {
//             method: options.method,
//             body: JSON.stringify(options.body),
//             headers: {
//                 'Content-Type': 'application/json',
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