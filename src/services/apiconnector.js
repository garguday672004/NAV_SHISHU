import axios from 'axios';

export const instance = axios.create({}); // Create a new instance of axios

export const apiConnector = async(method, url, bodyData, headers, params) => {
    return await instance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
}