import axios from "axios"


const axiosInstance = axios.create({
  baseURL: "https://study-notion-rohitag-1.onrender.com/api/v1",
  withCredentials: true,  // ✅ Important for cookies/auth
});


export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method,
        url,
        data: bodyData || null,
        headers: headers || null,
        params: params || null,
    });
};
