//当前这个模块：API进行统一管理
//引入二次封装的axios（带有请求、响应的拦截器）
import requests from "./request";
import mockRequests from "./mockAjax";
//三级联动接口
// /api/product/getBaseCategoryList      get请求    无参数


//发请求:axios发请求返回结果是promise对象
export const reqgetCategoryList = () => requests.get(`/product/getBaseCategoryList`);

export const reqTodyList = () => mockRequests.get('/today')
export const reqHotList = () => mockRequests.get('/hot')
export const reqLikeList = () => mockRequests.get('/like')
//mock模拟Search获取数据
export const reqShowList = () => mockRequests.get('/showList')
export const reqGetSearchInfo = (params) => mockRequests({ url: "/showList", method: "post", data: params });

export const reqSearchNav = (params) => mockRequests.get('/searchNav', { data: params })

//Search获取数据


export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: "post" })

export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' });

export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

export const reqLoginout = () => requests({ url: '/user/passport/logout', method: 'get' })