//home所属仓库

const state = {
    shopCarList: JSON.parse(sessionStorage.getItem('shopCarList')) || [],
    buyGoods: JSON.parse(sessionStorage.getItem('buyGoods')) || [],
    payGoods: JSON.parse(sessionStorage.getItem('payGoods')) || []
}
const actions = {
    addShopCar(context, { goodDetail, buyNumber, moreImage }) {
        for (let i of context.state.shopCarList) {
            if (i.goodDetail.path == goodDetail.path) {
                return Promise.reject(new Error('已经在购物车了哦'))
            }
        }
        context.commit('ADDSHOPCAR', { goodDetail, buyNumber, moreImage })
        return '加入购物车成功'
    },
    addBuyGoods({ commit }, checkGoods) {
        if (checkGoods == '') {
            return Promise.reject(new Error('添加订单失败'))
        } else {
            commit('ADDBUYGOODS', checkGoods)
            return '添加订单成功'
        }
    },
    cancelOrder({ commit }, item) {

        commit('CANCELORDER', item)
        return '删除成功'

    }

}
const mutations = {
    CANCELORDER(state, item) {
        console.log(item)
        for (let i of item[1]) {
            if (i == item[0]) {
                item[1].splice(item[1].indexOf(i), 1)
            }
        }
        state.buyGoods[item[2]] = item[1]
        for (let i of state.buyGoods) {
            if (i.length == 0) {
                state.buyGoods.splice(state.buyGoods.indexOf(i), 1)
            }
        }
        sessionStorage.setItem('buyGoods', JSON.stringify(state.buyGoods))
    },
    ADDBUYGOODS(state, checkGoods) {


        if (state.buyGoods.indexOf(checkGoods) == -1) {
            state.buyGoods.push(checkGoods)
        }

        state.payGoods = checkGoods
        sessionStorage.setItem('buyGoods', JSON.stringify(state.buyGoods))
        sessionStorage.setItem('payGoods', JSON.stringify(state.payGoods))
    },
    ADDSHOPCAR(state, shopCarDetail) {
        state.shopCarList.push(shopCarDetail)
        sessionStorage.setItem('shopCarList', JSON.stringify(state.shopCarList))
    },
    DELITEM(state, item) {
        state.shopCarList.splice(state.shopCarList.indexOf(item), 1)
        sessionStorage.setItem('shopCarList', JSON.stringify(state.shopCarList))
    },
    STARITEM(state) {
        sessionStorage.setItem('shopCarList', JSON.stringify(state.shopCarList))
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