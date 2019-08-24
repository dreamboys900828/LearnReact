/**
 * 拆分get请求的api参数
 * @param {url} url api请求地址
 */
export const getUrl = (url, data) => {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    });

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
    return url;
}
