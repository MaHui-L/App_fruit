//
import {SUCCESS} from "./base";

/**
 * 封装fetch
 * params
 *
 *
 *
 **/
import {HOSTNAME} from "./base";

function api(method,url,data) {
    //GET DELETE 请求方式是headers只有token;
    //1.
    url = HOSTNAME+url;
    method = method.toUpperCase();
    let token = sessionStorage.getItem('token');
    let headers={
        token,
    };
    let option = {method,headers};
    if(method ==='GET'&& data && Object.keys(data).length){
        let str = '?';
        for(let i in data){
            str += `${i}=${data[i]}&`;
        }
        str = str.slice(0,-1);
        url += str;
    }
    if(method==='POST' || method==='PUT'){
        let body = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
        option.body = body;
    }
    option.headers = headers;

    let promise = new Promise((resolve, reject) =>{
        fetch(url,option).then(res=>res.json())
            .then(data=>{
                let {code} = data;
                if(code == SUCCESS){
                    resolve(data)
                }else{
                    reject(data)
                }
            })
    });
    return promise;
}

export {api};