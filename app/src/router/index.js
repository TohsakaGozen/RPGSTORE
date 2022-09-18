import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '../store'
//当打包构建应用时，js包会变得非常大，影响页面加载
//如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效

//配置路由
let router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import("@/pages/Home"),
            meta: { FooterShow: true }
        },
        {
            name: 'search',
            path: '/search:keyword?',
            component: () => import("@/pages/Search"),
            meta: {
                FooterShow: true,
                hotTitleShow: 1
            }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import("@/pages/Login"),
            meta: { FooterShow: false, headerShow: true }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import("@/pages/Register"),
            meta: { FooterShow: false, headerShow: true }
        },
        {
            name: 'star',
            path: '/star',
            component: () => import("@/pages/Star"),
            meta: { FooterShow: true }
        },
        {
            name: 'details',
            path: '/details/:path1/:path2/:path3?',
            component: () => import("@/pages/Details"),
            meta: { FooterShow: true }
        },
        {
            name: 'shopCar',
            path: '/shopCar',
            component: () => import("@/pages/shopCar"),
            meta: { FooterShow: true, live2dShow: true }
        },
        {
            name: 'orderCenter',
            path: '/orderCenter',
            component: () => import("@/pages/OrderCenter"),
            meta: { FooterShow: true, live2dShow: true }
        },
        {
            name: 'trade',
            path: '/trade',
            component: () => import("@/pages/Trade"),
            meta: { FooterShow: true, live2dShow: true },
            beforeEnter: (to, from, next) => {
                if (from.name == 'shopCar' || from.name == 'orderCenter' || from.name == 'details') {
                    next()

                }
                else {
                    next(false)
                }
            }
        },
        //重定向：在访问的时候，立马让他定向到某个路由组件
        {
            path: '/',
            redirect: '/home'
        },

    ],
    //滚动行为，配置路由跳转之后滚动条的位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

//重复触发了同一个路由。
//这个错误是 vur - router更新以后新出现的错误,以下代码可抛出该错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


//配置路由守卫(全局前置守卫)
router.beforeEach(async (to, from, next) => {
    console.log(store.state.user.token, '11111')
    let token = store.state.user.token
    let userInfo = store.state.user.userInfo
    if (token) {//登录
        if (to.path == '/login') {
            next('/home')
        } else {
            if (userInfo.name) {
                next()
            } else {
                try {
                    await store.dispatch('user/getUserInfo')
                    console.log(111)
                    next()
                } catch (error) {//token过期，重新登录
                    await store.dispatch('user/exitLogin')
                    next('/login')
                }

            }
            next()
        }
    } else {//未登录
        if (to.path == '/home' || to.name == 'details' || to.path == '/login' || to.path == '/register') {
            next()
        } else {
            next('/login')
            alert('请先登录')
        }
    }
})

export default router