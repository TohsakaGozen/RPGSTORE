//home所属仓库
import { reqTodyList, reqHotList, reqLikeList } from '@/api'

const state = {
    list1: {
        area: ["全部", "国产", "日本", "韩国", "欧美"],
        content: [
            "全部",
            "热血",
            "冒险",
            "恋爱",
            "幻想",
            "奇幻",
            "乙女",
            "机战",
            "异世界",
            "耽美",
            "百合",
        ],
        year: [
            "全部",
            "2000",
            "2005",
            "2010",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
        ],
    },
    list2: {
        content: [
            "全部",
            "古欧",
            "另类",
            "水墨",
            "现代",
            "超现代",
            "组合装",
            "Cos服",
        ],
        shop: [
            "全部",
            "三分",
            "漫囧",
            "秀琴",
            "悠窝窝",
            "初兽猫",
            "火花家",
            "三町目",
            "漫有引力ascosing",
            "御座社",
            "三色堇",
        ],
    },
    list3: {
        area: ["全部", "国产", "日本", "韩国", "欧美"],
        content: [
            "全部",
            "游戏周边",
            "动漫周边",
            "食玩",
            "可动人型",
            "人偶",
            "手办",
            "模型",
            "挂卡",
            "扭蛋",
            "超合金",
        ],
        year: [
            "全部",
            "2000",
            "2005",
            "2010",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
        ],
    },
    list4: {
        area: ["全部", "北京", "上海", "广州", "深圳", "其它"],
        content: [
            "全部",
            "动漫展",
            "车展",
            "美食展",
            "博物展",
            "娃娃展",
            "服装展",
            "模型展",
        ],
        month: [
            "全部",
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
        ],
    },
    list5: {
        area: ["全部", "国行", "日行", "港台版", "美版"],
        content: [
            "全部",
            "开放世界",
            "动作冒险",
            "恋爱剧情",
            "多人",
            "经典",
            "红白机",
            "机战",
            "亲子",
            "赛车",
            "益智",
        ],
        year: [
            "全部",
            "2000",
            "2005",
            "2010",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
        ],
    },
    todayList: {},
    hotList: {},
    likeList: {},
    likeList1: {}
}
const actions = {
    async getTodayList({ commit }) {
        let result = await reqTodyList()
        if (result.code == 200) {
            commit('GETTODAYLIST', result.data)
        }
    },
    async getHotList({ commit }) {
        let result = await reqHotList()
        if (result.code == 200) {
            commit('GETHOTLIST', result.data)
        }
    },
    async getLikeList({ commit }) {
        let result = await reqLikeList()
        if (result.code == 200) {
            commit('GETLIKELIST', result.data)
        }
    },
    async getNewLikeList({ commit }) {
        let result = await reqLikeList()
        if (result.code == 200) {
            commit('GETNEWLIKELIST', result.data)
        }
    },
    async getNewShowList({ commit }) {
        let result = await reqHotList()
        if (result.code == 200) {
            commit('GETNEWSHOWLIST', result.data)
        }
    },
}
const mutations = {
    GETTODAYLIST(state, todayList) {
        state.todayList = todayList
    },
    GETHOTLIST(state, hotList) {
        state.hotList = hotList
        //随机顺序展示
        var hotList1 = Object.values(state.hotList)
        var length = hotList1.length,
            randomIndex,
            temp;
        while (length) {
            randomIndex = Math.floor(Math.random() * (length--));
            temp = hotList1[randomIndex];
            hotList1[randomIndex] = hotList1[length];
            hotList1[length] = temp
        }
        state.hotList = hotList1
    },
    GETLIKELIST(state, likeList) {
        state.likeList = likeList
        //随机顺序展示
        var likeList1 = Object.values(state.likeList.likeList1)
        var length = likeList1.length,
            randomIndex,
            temp;
        while (length) {
            randomIndex = Math.floor(Math.random() * (length--));
            temp = likeList1[randomIndex];
            likeList1[randomIndex] = likeList1[length];
            likeList1[length] = temp
        }
        state.likeList1 = likeList1
    },
    GETNEWLIKELIST(state, likeList) {
        state.likeList = {}
        setTimeout(() => {
            state.likeList = likeList
        }, 100);
    },
    GETNEWSHOWLIST(state, showList) {

        state.hotList = {}
        setTimeout(() => {
            state.hotList = showList
            console.log(1)
        }, 100);
    },
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}