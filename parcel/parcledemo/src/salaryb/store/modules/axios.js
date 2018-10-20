import axios from 'axios'
import Qs from 'qs'
// axios基本配置
var god = axios.create({
    // baseURL:'casinoweb/',
    timeout:20000
});

// 添加请求拦截器
// god.interceptors.request.use(function (config) {
//     console.log(config);
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });
//
// 添加响应拦截器
god.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (
        response.status == 401
      || (response.status == 302 && response.request.responseURL.indexOf('casinoweb') != -1)
    ) {
      swal({
          title: '登录超时',
          text: '请您重新登录',
          type: 'warning'
      },
      function() {
          window.location.reload();
      }); // 状态码=401 登录超时
    }

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
export const axios_get = ({
        url,
        query
    }, commit) => {
        if (commit) commit('START_LOADING')
        commit('IS_IN_PROCESS', true)
        // var currLang = $vue.$localStorage.get('lang');
        // currLang !== 'undefined' ? currLang : currLang = 'zh_CN';
        let _url
        if (query) {
            _url = `/${url}?${query}` + ''
        } else {
            _url = `/${url}` + ''
        }

        return god.get(_url).then((res) => {
            if (commit) commit('FINISH_LOADING')
            commit('IS_IN_PROCESS', false)
            if (typeof res.data === "string" && (res.data.indexOf("loginPage") != -1 || res.data == -1 || res.data.indexOf("登录") != -1)) { // 假如没有登录或者登录超时
                commit('CHANGE_LOGIN_INFO_STATE', false);
                setCookie('loginSuccess','no',30);
                window.location.href = '/';
            }else if (res.status >= 200 && res.status < 300) {
                return res.data
            }
            return Promise.reject(new Error(res.status))
        })
        .catch((error) => {
            if (commit) commit('FINISH_LOADING')
            commit('IS_IN_PROCESS', false)
            return Promise.reject(error)
        })
    }
/**
 * post请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
export const axios_post = ({
        url,
        query
    }, params, commit) => {
        if (commit) commit('START_LOADING')
        commit('IS_IN_PROCESS', true)
        // var currLang = $vue.$localStorage.get('lang');
        // currLang !== 'undefined' ? currLang : currLang = 'zh_CN';
        let _url
        if (query) {
            _url = `/${url}?${query}` + ''
        } else {
            _url = `/${url}` + ''
        }
        return god.post(_url, params, {
            transformRequest: [function (data) {
                data = Qs.stringify(data, {
                    arrayFormat: 'repeat'
                })
                return data
            }],
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function(status) {
                if (status === 401) {
                    setCookie('loginSuccess','no',30)
                }
                return status < 500 // 状态码在大于或等于500时才会 reject
            }
        }).then((res) => {
            if (commit) commit('FINISH_LOADING')
            commit('IS_IN_PROCESS', false)
            if (typeof res.data === "string" && (res.data.indexOf("loginPage") != -1 || res.data == -1 || res.data.indexOf("登录") != -1)) { // 假如没有登录或者登录超时
                commit('CHANGE_LOGIN_INFO_STATE', false);
                setCookie('loginSuccess','no',30);
                window.location.href = '/';
            }else if (res.status >= 200 && res.status < 300) {
                res = res.data;
                return res
            }
            return Promise.reject(new Error(res.status))
        })
        .catch((error) => {
            if (commit) commit('FINISH_LOADING')
            commit('IS_IN_PROCESS', false)
            return Promise.reject(error)
        })
    }

export const getCookie = (c_name) => {
    if (document.cookie.length>0){
　　　　　　var c_start=document.cookie.indexOf(c_name + "=")
　　　　　　if (c_start!=-1){
　　　　　　　　c_start=c_start + c_name.length+1
　　　　　　　　var c_end=document.cookie.indexOf(";",c_start)
　　　　　　　　if (c_end==-1) c_end=document.cookie.length　　
　　　　　　　　return unescape(document.cookie.substring(c_start,c_end))
　　　　　　}
　　　　}
　　　　return ""
}

export const setCookie = (c_name, value, expiredays) => {
　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
　　}


export default {axios_get, axios_post}
