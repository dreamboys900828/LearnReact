import axios from "axios";

export const getData = (url = '', data = {}) => {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    });

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
    return axios.get(url)
}

export const postData = () => {
    return axios.post()
}