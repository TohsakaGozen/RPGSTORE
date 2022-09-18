import axios from "axios"
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginout } from '@/api'
const state = {
    temCode: '',
    token: JSON.parse(localStorage.getItem('token')) || '',
    userInfo: {}
}
const actions = {
    //获得验证码
    async getCode({ commit }, number) {
        let result = await axios.get(
            `/api/user/passport/sendCode/${number}`
        )

        // let result = await reqGetCode(number)
        commit('GETCODE', result)
    },
    //注册业务
    async userRegister({ commit }, userData) {
        let result = await reqUserRegister(userData)
        // let result = await reqGetCode(number)
        if (result.code == 200) {
            return 'ok'
        } else if (result.code == 223) {
            return Promise.reject(new Error('该手机号已被注册'))
        }
        else {
            return Promise.reject(new Error('接口调试，注册失败'))
        }
    },
    //登录业务
    async userLogin({ commit }, userData) {
        let result = await reqUserLogin(userData)
        // let result = await reqGetCode(number)
        if (result.code == 200) {
            console.log(result)
            commit('USERLOGINDATA', result.data)
            return 'ok'
        }
        else {
            return Promise.reject(new Error('账号或密码错误'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        try {
            let result = await reqUserInfo()
            console.log(result)
            if (result.code == 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'

            }
            else {
                return Promise.reject(new Error('登陆错误'))
            }
        }
        catch {
            return Promise.reject(new Error('获取用户信息失败'))
        }


    },
    async exitLogin({ commit }) {
        let result = await reqLoginout()
        if (result.code == 200) {
            localStorage.removeItem('token')
            commit('EXITLOGIN')
            return 'ok'
        }
        else {
            return Promise.reject(new Error('退出失败'))
        }

    }
}
const mutations = {
    GETCODE(state, code) {
        state.temCode = code.data.data

    },
    USERLOGINDATA(state, data) {
        state.token = data.token
        JSON.stringify(state.token)
        localStorage.setItem('token', JSON.stringify(state.token))
    },
    GETUSERINFO(state, userInfo) {
        userInfo.name = 'Tohsaka'
        state.userInfo = userInfo

    },
    EXITLOGIN(state) {
        state.userInfo = {}
        state.token = ''
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}