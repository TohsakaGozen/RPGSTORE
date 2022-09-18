//search所属仓库
import { reqSearchNav, reqGetSearchInfo } from '@/api'
const state = {
    showList: {},
    searchNav: {},
    starList: JSON.parse(sessionStorage.getItem('star')) || []
}

const actions = {
    async ShowList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        commit('GETSHOWLIST', result)
    },
    async getNewShowList({ commit }) {
        let result = await reqGetSearchInfo()
        commit('GETNEWSHOWLIST', result)
    },
    async getNewSearchNav({ commit }, params = []) {
        let result = await reqSearchNav(params)
        commit('GETNEWSEARCHNAV', result)
    },
    getStarList({ commit }, show) {
        commit("GETSTARLIST", show)
    },
}
const mutations = {
    GETSHOWLIST(state, showList) {
        state.showList = showList
    },
    GETNEWSHOWLIST(state, showList) {
        state.showList = []
        setTimeout(() => {
            state.showList = showList
        }, 100);
    },
    GETNEWSEARCHNAV(state, searchNav) {
        state.searchNav = searchNav
        // sessionStorage.setItem("SearchNavData", JSON.stringify(searchNav))
    },
    SETNEW(state) {
        for (let j of Object.values(state.showList.pageList)) {
            for (let i of state.starList) {
                if (j.path == i.path) {
                    j.isStar = 1
                }
            }
        }
    },
    SETISSTAR(state, show) {

        if (show.isStar == 0) {
            show.isStar = 1
            console.log(111)
        }
        else {
            show.isStar = 0
        }
        sessionStorage.setItem('showList', JSON.stringify(state.showList))
    },
    GETSTARLIST(state, show) {
        console.log(222)
        if (show.isStar == 1) {
            state.starList.push(show)
        }
        else {
            state.starList.splice(state.starList.indexOf(show), 1)
        }
        sessionStorage.setItem('star', JSON.stringify(state.starList))
    }

}
const getters = {
    navList(state) {
        // return state.searchNav.nav1.title
    }
}

export default {
    namespaced: true,//开启命名空间
    state,
    actions,
    mutations,
    getters
}